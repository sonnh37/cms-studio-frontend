"use client";
import { About } from "@/components/about";
import { Album } from "@/components/album";
import { Clothes } from "@/components/clothes";
import { Features } from "@/components/feature";
import { Hero } from "@/components/hero";
import Image from "next/image";

export default function HomePage() {
  // Home page
  return (
   <main className="relative flex justify-center items-center flex-col overflow-hidden
   ">
    <div className="w-full">
      <Hero/>
      <Features/>
      <About/>
      <Album/>
      <Clothes/>
    </div>
   </main>
  );
}
