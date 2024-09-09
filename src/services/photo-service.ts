import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {Photo} from "@/types/photo";
import axios from "axios";

export const fetchPhotos = async (query: PhotoGetAllQuery): Promise<Photo[]> => {
    const params = new URLSearchParams(query as any).toString();
    try {
        const response = await axios.get(`https://localhost:7192/photos?${params}`);
        return response.data.results as Photo[];
    } catch (error) {
        console.error('Failed to fetch photos:', error);
        throw error;
    }
};