import {ServiceGetAllQuery} from "@/types/queries/service-query";
import {Service} from "@/types/service";
import axios from "axios";


export const fetchServices = (query: ServiceGetAllQuery): Promise<PagedResponse<Service>> => {
    const params = new URLSearchParams(query as any).toString();

    return axios.get(`https://localhost:7192/services?${params}`)
        .then((response) => {
            return response.data as PagedResponse<Service>;
        })
        .catch((error) => {
            console.error('Failed to fetch services:', error);
            throw error;
        });
};

export const fetchService = (id: string): Promise<ItemResponse<Service>> => {

    return axios.get(`https://localhost:7192/services/${id}`)
        .then((response) => {
            return response.data as ItemResponse<Service>;
        })
        .catch((error) => {
            console.error('Failed to fetch services:', error);
            throw error;
        });
};
