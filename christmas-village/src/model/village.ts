import type { Shop } from "./shop"
import type { Gift } from "./gift"

export type VillageState = {
    shops: Shop[];
    gifts: Gift[];
}