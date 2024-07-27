"use client";
import Hero from "@/components/hero";
import Image from "next/image";

export default function HomePage() {
  // Home page
  return (
   <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden
   mx-auto sm:px-10 px-5
   ">
    <div className="max-w-7xl w-full">
      <Hero/>
    </div>
   </main>
  );
}
