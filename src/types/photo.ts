import {AlbumXPhoto} from "./album";
import {BaseEntity} from "./base";
import {OutfitXPhoto} from "./outfit";

export interface Photo extends BaseEntity {
    title?: string;
    description?: string;
    src?: string;
    href?: string;
    tag?: string;
    albumXPhotos?: AlbumXPhoto[];
    outfitXPhotos?: OutfitXPhoto[];
}