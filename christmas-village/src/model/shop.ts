export type ShopId =
    | "uncommongoods"
    | "nflshop"
    | "amazon";

export type District =
    | "MainStreet"
    | "SportsRow"
    | "WorkshopLane";

export type Shop = {
    id: ShopId;
    name: string;
    district: District;
    building: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
};