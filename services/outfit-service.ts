import { CategoryGetAllQuery, OutfitGetAllQuery } from "@/types/queries/outfit-query";
import { Category, Outfit } from "@/types/outfit";
import axios from "axios";

export const fetchOutfits = async (query: OutfitGetAllQuery): Promise<Outfit[]> => {
    const params = new URLSearchParams(query as any).toString();
    try {
        const response = await axios.get(`https://localhost:7192/outfits?${params}`);
        return response.data.results as Outfit[];
    } catch (error) {
        console.error('Failed to fetch outfits:', error);
        throw error;
    }
};

export const fetchCategories = async (query: CategoryGetAllQuery): Promise<Category[]> => {
    const params = new URLSearchParams(query as any).toString();
    try {
        const response = await axios.get(`https://localhost:7192/categories?${params}`);
        return response.data.results as Category[];
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};