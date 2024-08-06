import { BaseEntity } from "./base";
import { Photo } from "./photo";

export interface Album extends BaseEntity {
    title?: string;
    description?: string;
    background?: string;
    photos?: Photo[];
}