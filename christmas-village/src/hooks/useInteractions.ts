import { useMemo } from "react";
import type { Shop } from "../model/shop";
import type { Character } from "../model/character";
import type { Vec2 } from "../model/world";
import { INTERACTION_DISTANCE } from "../constants";
import { getDistance } from "../utils/math";
import { getShopCenter } from "../utils/shop";

export function useInteractions(playerPosition: Vec2, shops: Shop[], characters: Character[]) {
  const nearbyShop = useMemo(() => {
    return shops.find((shop) => {
      const shopCenter = getShopCenter(shop);
      const distance = getDistance(playerPosition, shopCenter);
      return distance <= INTERACTION_DISTANCE;
    });
  }, [shops, playerPosition]);

  const nearbyCharacter = useMemo(() => {
    return characters.find((character) => {
      const distance = getDistance(playerPosition, character.position);
      return distance <= INTERACTION_DISTANCE;
    });
  }, [characters, playerPosition]);

  return { nearbyShop, nearbyCharacter };
}

