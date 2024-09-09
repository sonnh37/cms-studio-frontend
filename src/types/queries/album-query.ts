import {BaseQueryableQuery} from "./base-query";

export interface AlbumGetAllQuery extends BaseQueryableQuery {
    title?: string;
    description?: string;
    background?: string;
}