import type { Shop } from "../model/shop";

export const shops: Shop[] = [
    {
        id: "uncommongoods",
        name: "Uncommon Goods",
        district: "WorkshopLane",
        building: { x: 50, y: 40, width: 80, height: 60 },
    },
    {
        id: "nflshop",
        name: "NFL Shop",
        district: "SportsRow",
        building: { x: 200, y: 40, width: 80, height: 60 }
    },
];