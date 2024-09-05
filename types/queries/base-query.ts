
export interface BaseQueryableQuery {
    isPagination: boolean;
    pageNumber?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: SortOrder;
    fromDate?: Date;
    toDate?: Date;
    id?: string;
    createdBy?: string;
    lastUpdatedBy?: string;
    isDeleted?: boolean;
}

export enum SortOrder {
    ascending = 1,
    descending = -1
}