import { BaseEntity } from "./base";
import { Photo } from "./photo";
export interface Outfit extends BaseEntity {
    sku?: string;
    categoryId?: string; // Guid trong TypeScript thường được biểu diễn bằng string
    sizeId?: string;
    colorId?: string;
    name?: string;
    price?: number;
    description?: string;
    color?: Color; // Định nghĩa Color nếu cần
    category?: Category; // Định nghĩa Category nếu cần
    size?: Size; // Định nghĩa Size nếu cần
    status: OutfitStatus; // Định nghĩa OutfitStatus nếu cần
    outfitXPhotos: OutfitXPhoto[];
}

export interface Color extends BaseEntity{
    name?: string;
    outfits: Outfit[];
}

export interface Category extends BaseEntity{
    name?: string;
    outfits: Outfit[];
}

export interface Size extends BaseEntity{
    name?: string;
    outfits: Outfit[];
}

export interface OutfitXPhoto extends BaseEntity {
    outfitId?: string;
    photoId?: string;
    outfit?: Outfit;
    photo?: Photo;
}

enum OutfitStatus {
    Unspecified = 0,
    Available = 1,
    Rented = 2,
    InMaintenance = 3,
    Discontinued = 4
}