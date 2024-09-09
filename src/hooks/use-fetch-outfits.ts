import { useState, useEffect } from "react";
import { OutfitGetAllQuery } from "@/types/queries/outfit-query";
import { Outfit } from "@/types/outfit";
import { fetchOutfits } from "@/services/outfit-service";

export const useFetchOutfits = (query: OutfitGetAllQuery) => {
    const [outfits, setOutfits] = useState<Outfit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getOutfits = async () => {
            setLoading(true);
            try {
                const data = await fetchOutfits(query);
                setOutfits(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        getOutfits();
    }, [query]);

    return { outfits, loading, error };
};
