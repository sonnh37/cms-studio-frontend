import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {Album} from "@/types/album";
import axios from "axios";

export const fetchAlbums = async (query: AlbumGetAllQuery): Promise<Album[]> => {
    const params = new URLSearchParams(query as any).toString();
    try {
        const response = await axios.get(`https://localhost:7192/albums?${params}`);
        return response.data.results as Album[];
    } catch (error) {
        console.error('Failed to fetch albums:', error);
        throw error;
    }
};