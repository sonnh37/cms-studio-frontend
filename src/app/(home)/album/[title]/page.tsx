"use client";
import {useEffect, useState} from "react";
import axios from "axios";
import {FocusCards} from "@/components/ui/focus-cards";
import {Album, AlbumXPhoto} from "@/types/album";
import {Photo} from "@/types/photo";
import {toSlug} from "@/lib/slug-helper";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {fetchAlbums} from "@/services/album-service";

export default function Page({params}: { params: { title: string } }) {
    const [cards, setCards] = useState<{ title: string; src: string }[]>([]);
    const [album, setAlbum] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [albumXPhoto, setAlbumXPhoto] = useState<AlbumXPhoto[]>([]);
    const {title} = params;

    const query: AlbumGetAllQuery = {
        isPagination: true,
        title: '',
    }

    useEffect(() => {
        const fetchPhotos = async () => {
            if (!title) {
                console.error("Title is null or undefined");
                return;
            }
            try {
                query.title = title;
                const response = await fetchAlbums(query);

                if (response && response.results && response.results.length > 0) {
                    const fetchedAlbum = response.results[0] as Album;
                    setAlbum(fetchedAlbum);
                    const fetchedAlbumXPhotos = fetchedAlbum.albumXPhotos || [];
                    setAlbumXPhoto(fetchedAlbumXPhotos);
                    const photosInAlbum = fetchedAlbumXPhotos
                        ? fetchedAlbumXPhotos.map((x) => x.photo).filter((photo): photo is Photo => photo !== undefined)
                        : [];

                    setPhotos(photosInAlbum);
                    const formattedCards = photosInAlbum.map((photo) => ({
                        title: photo.title || "Untitled",
                        src: photo.src || "", // Handle cases where src might be missing
                    }));

                    setCards(formattedCards);
                } else {
                    console.error("No album found with the given title");
                }
            } catch (error) {
                console.error("Failed to fetch photos:", error);
            }
        };

        fetchPhotos();
    }, [title]);

    return (

        <FocusCards cards={cards}/>

    );
}
