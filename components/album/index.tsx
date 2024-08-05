// Album.tsx
"use client";
import { useEffect, useState } from "react";
import { ParallaxScroll } from "../ui/parallax-scroll";
import axios from "axios";
import { Photo } from "@/types/photo";

export function Album() {
  const [images, setImages] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7192/photo-management/photos');
        // Assuming the response data contains a list of Photo objects
        const photos: Photo[] = response.data.results;
        
        setImages(photos);
        console.log("album",images.map(photo => photo.src as string))
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchData();
  }, []);

  return <ParallaxScroll images={images.map(photo => photo.src as string)} />;
}
