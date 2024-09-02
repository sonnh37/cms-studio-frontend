import { BaseEntity } from "./base";
import { Photo } from "./photo";
export interface Outfit extends BaseEntity {
    type?: string;
    name?: string;
    size?: string;
    price?: number;
    color?: string;
    description?: string;
    photos?: Photo[];
}