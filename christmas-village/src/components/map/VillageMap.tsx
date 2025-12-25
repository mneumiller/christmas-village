import { useState, useEffect } from "react";
import type { Shop } from "../../model/shop";
import type { ShopId } from "../../model/shop";
import type { Vec2 } from "../../model/world";
import type { Character } from "../../model/character";
import { MAP_WIDTH, MAP_HEIGHT } from "../../constants";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useInteractions } from "../../hooks/useInteractions";
import { ShopMarker } from "./ShopMarker";
import { CharacterMarker } from "./CharacterMarker";
import { PlayerAvatar } from "./PlayerAvatar";
import { InteractionPrompt } from "./InteractionPrompt";

type Props = {
  shops: Shop[];
  selectedShopId?: Shop["id"];
  onSelect: (id: Shop["id"]) => void;
  playerPosition: Vec2;
  onEnterShop: (id: ShopId) => void;
  characters: Character[];
  onInteractWithCharacter?: (character: Character) => void;
};

export function VillageMap({
  shops,
  selectedShopId,
  onSelect,
  playerPosition,
  onEnterShop,
  characters,
  onInteractWithCharacter,
}: Props) {
  const [hoveredShopId, setHoveredShopId] = useState<Shop["id"] | undefined>();
  const isDarkMode = useDarkMode();
  const { nearbyShop, nearbyCharacter } = useInteractions(playerPosition, shops, characters);

  // Handle E key press to enter shop or interact with character
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "e" || e.key === "E") {
        if (nearbyCharacter && onInteractWithCharacter) {
          onInteractWithCharacter(nearbyCharacter);
        } else if (nearbyShop) {
          onEnterShop(nearbyShop.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nearbyShop, nearbyCharacter, onEnterShop, onInteractWithCharacter]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "900px" }}>
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: `${MAP_HEIGHT}px`,
          maxWidth: "900px",
          border: `1px solid ${isDarkMode ? "#555" : "#ddd"}`,
          borderRadius: 8,
          backgroundColor: isDarkMode ? "#1a1a1a" : "white",
        }}
      >
        {/* Render shops */}
        {shops.map((shop) => (
          <ShopMarker
            key={shop.id}
            shop={shop}
            isSelected={shop.id === selectedShopId}
            isHovered={shop.id === hoveredShopId}
            isNearby={nearbyShop?.id === shop.id}
            isDarkMode={isDarkMode}
            onSelect={onSelect}
            onMouseEnter={setHoveredShopId}
            onMouseLeave={() => setHoveredShopId(undefined)}
            shopImage={shop.image}
          />
        ))}

        {/* Render characters */}
        {characters.map((character) => (
          <CharacterMarker
            key={character.id}
            character={character}
            playerPosition={playerPosition}
            onInteract={(char: Character) => {
              if (onInteractWithCharacter) {
                onInteractWithCharacter(char);
              }
            }}
            isDarkMode={isDarkMode}
          />
        ))}

        {/* Render player avatar */}
        <PlayerAvatar position={playerPosition} />
      </svg>

      {/* Interaction prompts */}
      {nearbyShop && !nearbyCharacter && (
        <InteractionPrompt
          position={playerPosition}
          message={`Press E to enter ${nearbyShop.name}`}
        />
      )}

      {nearbyCharacter && (
        <InteractionPrompt
          position={playerPosition}
          message={`Press E to talk to ${nearbyCharacter.name}`}
        />
      )}
    </div>
  );
}
