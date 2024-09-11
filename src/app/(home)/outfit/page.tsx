import Footer from "@/components/user/layouts/footer";
import {NavbarHeader} from "@/components/user/layouts/navbar";
import {Metadata} from "next";
import {OutfitComponent} from "@/components/user/sections/outfits/outfit";

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
