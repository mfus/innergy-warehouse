import { Material } from "./material";

export interface Warehouse {
    name: string;
    totalCount: number;
    materials: Material[];
}
