import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {Album} from "@/types/album";
import axios from "axios";

export const fetchAlbums = (query: AlbumGetAllQuery): Promise<PagedResponse<Album>> => {
    const cleanedQuery: Record<string, any> = {};
    for (const key in query) {
        if (query[key as keyof AlbumGetAllQuery] !== undefined && query[key as keyof AlbumGetAllQuery] !== null) {
            cleanedQuery[key] = query[key as keyof AlbumGetAllQuery];
        }
    }

    const params = new URLSearchParams(cleanedQuery as any).toString();
    console.log("check", cleanedQuery);
    return axios.get(`https://localhost:7192/albums?${params}`)
        .then((response) => {
            return response.data as PagedResponse<Album>;
        })
        .catch((error) => {
            console.error('Failed to fetch albums:', error);
            throw error;
        });
};

export const fetchAlbum = (id: string): Promise<ItemResponse<Album>> => {

    return axios.get(`https://localhost:7192/albums/${id}`)
        .then((response) => {
            return response.data as ItemResponse<Album>;
        })
        .catch((error) => {
            console.error('Failed to fetch albums:', error);
            throw error;
        });
};
