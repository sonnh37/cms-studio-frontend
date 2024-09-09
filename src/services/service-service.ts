import {ServiceGetAllQuery} from "@/types/queries/service-query";
import {Service} from "@/types/service";
import axios from "axios";

export const fetchServices = async (query: ServiceGetAllQuery): Promise<Service[]> => {
    const params = new URLSearchParams(query as any).toString();
    try {
        const response = await axios.get(`https://localhost:7192/services?${params}`);
        return response.data.results as Service[];
    } catch (error) {
        console.error('Failed to fetch services:', error);
        throw error;
    }
};