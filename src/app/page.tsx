"use client";
import {NavbarHeader} from "@/components/user/layouts/navbar";
import {Contact} from "lucide-react";
import Footer from "@/components/user/layouts/footer";
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
                <NavbarHeader/>
                <Hero/>
                <div id="first-section"><Features/></div>
                <AlbumComponent/>
                <OutfitComponent/>
                <Contact/>
                <Footer/>
            </div>
        </main>
    );
}
