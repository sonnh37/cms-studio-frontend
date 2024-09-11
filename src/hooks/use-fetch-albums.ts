import {useEffect, useState} from "react";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {Album} from "@/types/album";
import {fetchAlbums} from "@/services/album-service";

export const useFetchAlbums = (query: AlbumGetAllQuery) => {
    const [pagedResponse, setPagedResponse] = useState<PagedResponse<Album>>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getAlbums = async () => {
            setLoading(true);
            try {
                const data = await fetchAlbums(query);
                setPagedResponse(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        getAlbums();
    }, [query]);

    return {pagedResponse, loading, error};
};
