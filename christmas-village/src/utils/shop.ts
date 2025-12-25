import type { Shop } from "../model/shop";
import type { Vec2 } from "../model/world";

export function getShopCenter(shop: Shop): Vec2 {
  return {
    x: shop.building.x + shop.building.width / 2,
    y: shop.building.y + shop.building.height / 2,
  };
}

