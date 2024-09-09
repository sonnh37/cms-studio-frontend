import Footer from "@/components/user/layouts/footer";
import {NavbarHeader} from "@/components/user/layouts/navbar";
import {OutfitByCategoryComponent} from "@/components/sections/outfits/outfit-type";

const OutfitDetailPage = () => {
    return (
        <>
            <NavbarHeader/>
            <OutfitByCategoryComponent/>
            <Footer/>
        </>
    );
};

export default OutfitDetailPage;
