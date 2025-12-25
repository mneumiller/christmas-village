import { useState } from "react";
import type { WorldState } from "../model/world";
import type { ShopId } from "../model/shop";
import type { Gift } from "../model/gift";
import { addToBag, removeFromBag } from "../model/shoppingBag";

export function useWorldState() {
  const [world, setWorld] = useState<WorldState>({
    mapId: "village",
    player: { position: { x: 100, y: 200 } },
    mode: "world",
    shoppingBag: { items: [] },
  });

  const enterShop = (shopId: ShopId) => {
    setWorld((prev) => ({
      ...prev,
      mode: "shop",
      enteredShopId: shopId,
    }));
  };

  const exitShop = () => {
    setWorld((prev) => ({
      ...prev,
      mode: "world",
      enteredShopId: undefined,
    }));
  };

  const updatePlayerPosition = (position: WorldState["player"]["position"]) => {
    setWorld((prev) => ({
      ...prev,
      player: { position },
    }));
  };

  const addGiftToBag = (gift: Gift) => {
    setWorld((prev) => ({
      ...prev,
      shoppingBag: addToBag(prev.shoppingBag, gift),
    }));
  };

  const removeGiftFromBag = (giftId: string) => {
    setWorld((prev) => ({
      ...prev,
      shoppingBag: removeFromBag(prev.shoppingBag, giftId),
    }));
  };

  return {
    world,
    enterShop,
    exitShop,
    updatePlayerPosition,
    addGiftToBag,
    removeGiftFromBag,
  };
}

