import Footer from "@/components/user/layouts/footer";
import {NavbarHeader} from "@/components/user/layouts/navbar";
import {OutfitComponent} from "@/components/sections/outfits/outfit";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
    description: "This is About page description",
};

const OutfitPage = () => {
    return (
        <>
            <NavbarHeader/>
            <OutfitComponent/>
            <Footer/>
        </>
    );
};

export default OutfitPage;
