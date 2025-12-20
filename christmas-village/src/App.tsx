import { useMemo, useState } from "react";
import { shops } from "./data/shops";
import { gifts } from "./data/gifts";
import type { ShopId } from "./model/shop";
import { VillageMap } from "./components/VillageMap";
import type { WorldState } from "./model/world";

function App() {
  const [world, setWorld] = useState<WorldState>({
    mapId: "village",
    player: { position: { x: 100, y: 100 } },
    mode: "world",
  });
  const [selectedShopId, setSelectedShopId] = useState<ShopId | undefined>();

  const selectedShop = useMemo(
    () => shops.find((s) => s.id === selectedShopId),
    [selectedShopId]
  );

  const selectedGifts = useMemo(
    () => gifts.filter((g) => g.shopId === selectedShopId),
    [selectedShopId]
  )

  return (
    <div style={{ padding: 24, display: "grid", gridTemplateColumns: "320px 1fr", gap: 24 }}>
        <h1>Christmas Village</h1>

      <div>
            <VillageMap 
              shops={shops} 
              selectedShopId={selectedShopId} 
              onSelect={setSelectedShopId}
            />
    </div>
    </div>
)}

export default App;