import {BaseQueryableQuery} from "./base-query";

export interface ServiceGetAllQuery extends BaseQueryableQuery {
    name?: string;
    description?: string;
    src?: string;
    price?: number;
    duration?: string; // TimeSpan không có kiểu tương đương trực tiếp, có thể dùng string để lưu trữ ISO 8601 duration
    promotion?: string;
    isActive?: boolean;
}