"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Service } from "@/types/service";
import axios from "axios";

export interface CardToMapService {
  category: string,
  title: string,
  src: string,
  content: React.JSX.Element,
  description: string,
}

export function Features() {

  const [services, setServices] = useState<Service[]>([]);
  const [cards_, setCards] = useState<CardToMapService[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7192/service-management/services');
        const services: Service[] = response.data.results

        setServices(services);

        const cardToMapServices = services.map(service => {
          return {
            category: service.type || '',
            title: service.title || '',
            src: service.src || '',
            content: <div>{service.description}</div>,
            description: service.description || ''
          } as CardToMapService;
        });

        setCards(cardToMapServices);
        
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchData();


  }, []);

  const cards = cards_.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Hãy đến với các dịch vụ của chúng tôi.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};


