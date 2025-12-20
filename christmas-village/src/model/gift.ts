import type { ShopId } from "./shop";

export type Gift = {
    id: string;
    title: string;
    shopId: ShopId;
    url: String;
    priceUsd?: number;
    tags: string[];
    notes?: string;
};