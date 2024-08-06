import { AlbumComponent } from "@/components/album";
import { OutfitComponent } from "@/components/outfit";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:
      "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
    description: "This is About page description",
  };
  
const OutfitPage = () => {
    return (
        <OutfitComponent/>
    );
}

export default OutfitPage;