"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { CardComponent } from "../card";
import { Outfit } from "../../../types/outfit";
import { useParams } from "next/navigation";
export interface OutfitGetAllQuery {
  type: string;
}
export function OutfitByTypeComponent() {
  // Mảng dữ liệu cho các thẻ by outfit
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [outfitGetAllQuery, setOutfitGetAllQuery] = useState<OutfitGetAllQuery | undefined>();
  const param = useParams();
  //console.log("check", param.slug)
  useEffect(() => {
    if (param.slug) {
      setOutfitGetAllQuery({ type: param.slug as string });
    }
  }, [param.slug]);

  useEffect(() => {
    
    if (outfitGetAllQuery?.type != undefined) {
      console.log("check", outfitGetAllQuery)
      const fetchData = async () => {
        try {
          const response = await axios.get('https://localhost:7192/outfit-management/outfits', {
            params: {
              type : outfitGetAllQuery?.type
            }
          });
          const outfits: Outfit[] = response.data.results

          setOutfits(outfits);
        } catch (error) {
          console.error('Failed to fetch images:', error);
        }
      };

      fetchData();
    }
  }, [outfitGetAllQuery]);


  return (
    <div className="h-[40rem] w-full py-10">
      <div className="flex flex-row items-center justify-center relative w-full">
        <div className="max-w-7xl mx-auto w-full relative overflow-hidden px-4">
          <div
            className="div"
            style={{
              opacity: 1,
              transform: "translateY(0px)",
              transition: "opacity 1s, transform 1s"
            }}
          >
            <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
              Trang phục
            </h2>
            <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
              Trang trọng - Lịch lãm - Quý phái
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-5 pt-10">
        {outfits.map((card, index) => (

          <CardComponent
            key={index}
            title={card.type as string}
            description={card.description as string}
            imageUrl={card.photos && card.photos.length > 0 ? (card.photos[0].src as string) : ""}
            hoverImageUrl={card.photos && card.photos.length > 1 ? (card.photos[1].src as string) : ""}
          />
        ))}
      </div>
    </div>
  );
}
