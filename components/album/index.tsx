// Album.tsx
"use client";
import { useEffect, useState } from "react";
import { ParallaxScroll } from "../ui/parallax-scroll";
import axios from "axios";
import { Photo } from "@/types/photo";
import type { Album } from "@/types/album";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { motion } from "framer-motion";

export function AlbumComponent() {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7192/album-management/albums');
        const albums: Album[] = response.data.results

        setAlbums(albums);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-10">
      <div className="flex flex-row items-center justify-center  relative w-full">
        <div className="max-w-7xl mx-auto w-full relative overflow-hidden px-4">
          <motion.div
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="div"
          >
            <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
              Album
            </h2>
            <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
              Với đa màu sắc, đầy phong cách đến từ nhà NhuMyStudio
            </p>
          </motion.div>

        </div>
      </div>
      <div className="pt-10 w-full relative flex flex-col md:flex-row items-center mx-auto justify-center max-w-7xl gap-2">

        {albums.map(album => (
          <DirectionAwareHover key={album.id} imageUrl={album.background || ""}>
            <p className="font-bold text-white text-xl">{album.title}</p>
            <p className="font-normal text-white">{album.description}</p>
          </DirectionAwareHover>
        ))}
      </div>
    </div>
  );
}
