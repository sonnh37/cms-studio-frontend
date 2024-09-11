import {useEffect, useState} from "react";
import {ServiceGetAllQuery} from "@/types/queries/service-query";
import {Service} from "@/types/service";
import {fetchServices} from "@/services/service-service";

export const useFetchServices = (query: ServiceGetAllQuery) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getServices = async () => {
            setLoading(true);
            try {
                const data = await fetchServices(query);
                setServices(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        getServices();
    }, [query]);

    return {services, loading, error};
};
