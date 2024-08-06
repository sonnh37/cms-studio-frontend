import { AlbumComponent } from "@/components/album";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:
      "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
    description: "This is About page description",
  };
  
const AlbumPage = () => {
    return (
        <AlbumComponent/>
    );
}

export default AlbumPage;