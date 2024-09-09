"use client";
import {Contact} from "lucide-react";
import {AlbumComponent} from "@/components/user/sections/album";
import {Hero} from "@/components/user/sections/hero";
import Features from "@/components/user/sections/feature";
import {OutfitComponent} from "@/components/user/sections/outfits/outfit";

export default function HomePage() {
    // Home page
    return (
        <main className="relative flex justify-center items-center flex-col overflow-hidden
   ">
            <div className="w-full">
                <Hero/>
                <div id="first-section"><Features/></div>
                <AlbumComponent/>
                <OutfitComponent/>
                <Contact/>
            </div>
        </main>
    );
}
