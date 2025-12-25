import type { Shop } from "../model/shop";
import nflshopImage from "../assets/nflshop.png";
import uncommongoodsshopImage from "../assets/uncommongoodsshop.png";
import amazonshopImage from "../assets/amazonshop.png";

export const shops: Shop[] = [
    // Workshop Lane - Left side
    {
        id: "uncommongoods",
        name: "Uncommon Goods",
        district: "WorkshopLane",
        building: { x: 30, y: 20, width: 250, height: 190 },
        image: uncommongoodsshopImage,
    },
    {
        id: "amazon",
        name: "Amazon",
        district: "WorkshopLane",
        building: { x: 30, y: 240, width: 250, height: 190 },
        image: amazonshopImage,
    },
    // Sports Row - Right side top
    {
        id: "nflshop",
        name: "NFL Shop",
        district: "SportsRow",
        building: { x: 280, y: 20, width: 250, height: 190 },
        image: nflshopImage,
    },
];