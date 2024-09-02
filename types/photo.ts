import { Album } from "./album";
import { BaseEntity } from "./base";
import { Outfit } from "./outfit";

export interface Photo extends BaseEntity {
  title?: string;
  description?: string;
  href?: string;
  src?: string;
  type?: string;
  albumId?: string;
  outfitId?: string;
  album?: Album;
  outfit?: Outfit;
}