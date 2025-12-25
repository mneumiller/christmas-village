import { useState } from "react";
import type { Shop } from "../model/shop";
import type { ShopId } from "../model/shop";
import type { Vec2 } from "../model/world";
import type { Character } from "../model/character";
import type { Gift } from "../model/gift";
import type { ShoppingBag } from "../model/shoppingBag";
import { characters as initialCharacters } from "../../data/characters";
import { VillageMap } from "../map/VillageMap";
import { ControlsPanel } from "../ui/ControlsPanel";
import { QuestDialog } from "../ui/QuestDialog";
import { ShoppingBagPanel } from "../ui/ShoppingBag";

type WorldViewProps = {
  shops: Shop[];
  selectedShopId?: ShopId;
  playerPosition: Vec2;
  onSelectShop: (id: ShopId) => void;
  onEnterShop: (id: ShopId) => void;
  gifts: Gift[];
  shoppingBag: ShoppingBag;
  onRemoveFromBag: (giftId: string) => void;
};

export function WorldView({
  shops,
  selectedShopId,
  playerPosition,
  onSelectShop,
  onEnterShop,
  gifts,
  shoppingBag,
  onRemoveFromBag,
}: WorldViewProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleInteractWithCharacter = (character: Character) => {
    // Find the current version of the character from state
    const currentCharacter = characters.find(c => c.id === character.id);
    setSelectedCharacter(currentCharacter || character);
  };

  const handleGiveGift = (characterId: string, giftId: string) => {
    console.log(`Gave gift ${giftId} to ${characterId}`);
    
    // Update the character's quest status to completed
    setCharacters(prevCharacters =>
      prevCharacters.map(char => {
        if (char.id === characterId && char.quest && char.quest.status === "active") {
          return {
            ...char,
            quest: {
              ...char.quest,
              status: "completed",
              completedGiftId: giftId,
            },
          };
        }
        return char;
      })
    );
    
    // Update selected character if it's the one receiving the gift
    if (selectedCharacter && selectedCharacter.id === characterId) {
      setSelectedCharacter(prev => {
        if (prev && prev.quest && prev.quest.status === "active") {
          return {
            ...prev,
            quest: {
              ...prev.quest,
              status: "completed",
              completedGiftId: giftId,
            },
          };
        }
        return prev;
      });
    }
    
    // Remove gift from bag after giving
    onRemoveFromBag(giftId);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24, marginTop: 24 }}>
      <div>
        <ControlsPanel />
        <ShoppingBagPanel bag={shoppingBag} onRemoveItem={onRemoveFromBag} />
      </div>
      
      <div>
        <VillageMap 
          shops={shops} 
          selectedShopId={selectedShopId} 
          onSelect={onSelectShop}
          playerPosition={playerPosition}
          onEnterShop={onEnterShop}
          characters={characters}
          onInteractWithCharacter={handleInteractWithCharacter}
        />
        
        {selectedCharacter && (
          <QuestDialog
            character={selectedCharacter}
            shoppingBag={shoppingBag}
            onClose={() => setSelectedCharacter(null)}
            onGiveGift={handleGiveGift}
          />
        )}
      </div>
    </div>
  );
}

