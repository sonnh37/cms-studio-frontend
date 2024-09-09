import Footer from "@/components/user/layouts/footer";
import {NavbarHeader} from "@/components/user/layouts/navbar";
import {AlbumComponent} from "@/components/sections/album";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
    description: "This is About page description",
};

const AlbumPage = () => {
    return (
        <>
            <NavbarHeader/>
            <AlbumComponent/>
            <Footer/>
        </>
    );
};

export default AlbumPage;