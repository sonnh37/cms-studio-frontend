import { BaseEntity } from "./base";

export interface Photo extends BaseEntity {
  title?: string;
  description?: string;
  href?: string;
  src?: string;
  type?: string;
}