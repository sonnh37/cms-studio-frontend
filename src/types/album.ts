import {BaseEntity} from "./base";
import {Photo} from "./photo";

export interface Album extends BaseEntity {
    title?: string;
    description?: string;
    background?: string;
    albumXPhotos?: AlbumXPhoto[];
}

export interface AlbumXPhoto extends BaseEntity {
    albumId?: string;
    photoId?: string;
    album?: Album;
    photo?: Photo;
}

