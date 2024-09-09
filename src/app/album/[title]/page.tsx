"use client";
import {useEffect, useState} from "react";
import axios from "axios";
import {FocusCards} from "@/components/ui/focus-cards";
import {Album} from "@/types/album";
import {Photo} from "@/types/photo";
import {NavbarHeader} from "@/components/user/layouts/navbar";
import Footer from "@/components/user/layouts/footer";

export default function Page({params}: { params: { title: string } }) {
    const [cards, setCards] = useState<{ title: string; src: string }[]>([]);
    const [album, setAlbum] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const {title} = params;

    useEffect(() => {
        const fetchPhotos = async () => {
            if (!title) {
                console.error("Title is null or undefined");
                return;
            }
            try {
                const response = await axios.get("https://localhost:7192/albums", {
                    params: {title},
                });

                if (
                    response.data &&
                    response.data.results &&
                    response.data.results.length > 0
                ) {
                    const fetchedAlbum = response.data.results[0] as Album;
                    setAlbum(fetchedAlbum);

                    const fetchedPhotos = fetchedAlbum.photos || [];
                    setPhotos(fetchedPhotos);

                    const formattedCards = fetchedPhotos.map((photo) => ({
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
        <>
            <NavbarHeader/>
            <FocusCards cards={cards}/>
            <Footer/>
        </>
    );
}
