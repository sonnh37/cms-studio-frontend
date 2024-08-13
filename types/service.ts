import { BaseEntity } from "./base";
export interface Service extends BaseEntity {
    type?: string;
    title?: string;
    description?: string;
    src?: string;
}