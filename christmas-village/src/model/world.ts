import type { ShopId } from "./shop";

export type MapId = "village"

export type Vec2 = {
    x: number;
    y: number;
};

export type Player = {
    position: Vec2;
};

export type WorldState = {
    mapId: MapId;
    player: Player;
    mode: "world" | "shop";
    enteredShopId?: ShopId;
};