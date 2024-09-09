import { useState, useEffect } from "react";
import { PhotoGetAllQuery } from "@/types/queries/photo-query";
import { Photo } from "@/types/photo";
import { fetchPhotos } from "@/services/photo-service";

export const useFetchPhotos = (query: PhotoGetAllQuery) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getPhotos = async () => {
            setLoading(true);
            try {
                const data = await fetchPhotos(query);
                setPhotos(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        getPhotos();
    }, [query]);

    return { photos, loading, error };
};
