"use client";
import Image from "next/image";
import { NavbarHeader } from "@/components/layout/navbar";
import { AlbumComponent } from "@/components/partial-page/album";
import { Hero } from "@/components/partial-page/hero";
import { OutfitComponent } from "@/components/partial-page/outfits/outfit";
import { Contact } from "lucide-react";
import Features from "@/components/partial-page/feature";

export default function HomePage() {
  // Home page
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden
   ">
      <div className="w-full">
        <NavbarHeader/>
        <Hero />
        <div id="first-section"><Features /></div>
        <AlbumComponent />
        <OutfitComponent />
        <Contact />
       
      </div>
    </main>
  );
}
