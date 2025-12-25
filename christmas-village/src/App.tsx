import { useMemo, useState } from "react";
import { shops } from "./data/shops";
import { gifts } from "./data/gifts";
import type { ShopId } from "./model/shop";
import { useWorldState } from "./hooks/useWorldState";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { ShopView } from "./components/views/ShopView";
import { WorldView } from "./components/views/WorldView";

function App() {
  const { world, enterShop, exitShop, updatePlayerPosition, addGiftToBag, removeGiftFromBag } = useWorldState();
  const [selectedShopId, setSelectedShopId] = useState<ShopId | undefined>();

  const selectedShop = useMemo(
    () => shops.find((s) => s.id === selectedShopId),
    [selectedShopId]
  );

  const selectedGifts = useMemo(
    () => gifts.filter((g) => g.shopId === selectedShopId),
    [selectedShopId]
  );

  const handleEnterShop = (shopId: ShopId) => {
    enterShop(shopId);
    setSelectedShopId(shopId);
  };

  useKeyboardControls({
    mode: world.mode,
    currentPosition: world.player.position,
    onMove: updatePlayerPosition,
    onExitShop: exitShop,
    bounds: { width: 700, height: 450 },
  });

  return (
    <div style={{ padding: 24 }}>
      <h1>Christmas Village</h1>
      
      {world.mode === "shop" && selectedShop ? (
        <ShopView 
          shop={selectedShop} 
          gifts={selectedGifts} 
          onExit={exitShop}
          onAddToBag={addGiftToBag}
          shoppingBag={world.shoppingBag}
          onRemoveFromBag={removeGiftFromBag}
        />
      ) : (
        <WorldView
          shops={shops}
          selectedShopId={selectedShopId}
          playerPosition={world.player.position}
          onSelectShop={setSelectedShopId}
          onEnterShop={handleEnterShop}
          gifts={gifts}
          shoppingBag={world.shoppingBag}
          onRemoveFromBag={removeGiftFromBag}
        />
      )}
    </div>
  );
}

export default App;