"use client";
import { About } from "@/components/about";
import { AlbumComponent } from "@/components/album";
import { OutfitComponent } from "@/components/outfit";
import Contact from "@/components/contact";
import { Features } from "@/components/feature";
import { Hero } from "@/components/hero";
import Image from "next/image";

export default function HomePage() {
  // Home page
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden
   ">
      <div className="w-full">
        <Hero />
        <div id="first-section"><Features /></div>
        <AlbumComponent />
        <OutfitComponent />
        <Contact />
       
      </div>
    </main>
  );
}
