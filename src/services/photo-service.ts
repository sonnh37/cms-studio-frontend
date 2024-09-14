import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {Photo} from "@/types/photo";
import axios from "axios";

export const fetchPhotos = (query: PhotoGetAllQuery): Promise<PagedResponse<Photo>> => {
    const params = new URLSearchParams(query as any).toString();

    return axios.get(`https://localhost:7192/photos?${params}`)
        .then((response) => {
            return response.data as PagedResponse<Photo>;
        })
        .catch((error) => {
            console.error('Failed to fetch photos:', error);
            throw error;
        });
};

export const fetchPhoto = (id: string): Promise<ItemResponse<Photo>> => {

    return axios.get(`https://localhost:7192/photos/${id}`)
        .then((response) => {
            return response.data as ItemResponse<Photo>;
        })
        .catch((error) => {
            console.error('Failed to fetch photos:', error);
            throw error;
        });
};
