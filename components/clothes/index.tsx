"use client";
import { cn } from "@/lib/utils";

export function Clothes() {
    return (
        <div className="h-[40rem] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-5 py-20">
                <div className="max-w-xl w-full">
                    <div
                        className={cn(
                            "group w-full cursor-pointer overflow-hidden relative card h-[30rem] rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
                            "bg-[url('/images/64-anh-cuoi-nen-trang-2.jpg')] bg-cover",
                            // Preload hover image by setting it in a pseudo-element
                            "before:bg-[url('/images/64-anh-cuoi-nen-trang-2.jpg')] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url('/images/64-anh-cuoi-nen-trang-2.jpg')]",
                            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                            "transition-all duration-500"
                        )}
                    >
                        <div className="text relative z-50">
                            <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                                Váy cưới
                            </h1>
                            <p className="font-normal text-base text-gray-50 relative my-4">
                                This card is for some special elements, like displaying background
                                gifs on hover only.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl w-full">
                    <div
                        className={cn(
                            "group w-full cursor-pointer overflow-hidden relative card h-[30rem] rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
                            "bg-[url('/images/ao-vest-cuoi-chu-re-mau-den-ve-nhon-phi-bong-1.jpeg')] bg-cover",
                            // Preload hover image by setting it in a pseudo-element
                            "before:bg-[url('/images/ao-vest-cuoi-chu-re-mau-den-ve-nhon-phi-bong-1.jpeg')] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url('/images/ao-vest-cuoi-chu-re-mau-den-ve-nhon-phi-bong-1.jpeg')]",
                            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                            "transition-all duration-500"
                        )}
                    >
                        <div className="text relative z-50">
                            <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                                Vest
                            </h1>
                            <p className="font-normal text-base text-gray-50 relative my-4">
                                This card is for some special elements, like displaying background
                                gifs on hover only.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="max-w-xl w-full">
                    <div
                        className={cn(
                            "group w-full cursor-pointer overflow-hidden relative card h-[30rem] rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
                            "bg-[url('/images/NICOLEBRIDAL_AO-DAI-CUOI-TRANG-DDTRF90-3-576x864.jpg')] bg-cover",
                            // Preload hover image by setting it in a pseudo-element
                            "before:bg-[url('/images/NICOLEBRIDAL_AO-DAI-CUOI-TRANG-DDTRF90-3-576x864.jpg')] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url('/images/NICOLEBRIDAL_AO-DAI-CUOI-TRANG-DDTRF90-3-576x864.jpg')]",
                            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                            "transition-all duration-500"
                        )}
                    >
                        <div className="text relative z-50">
                            <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                                Áo dài
                            </h1>
                            <p className="font-normal text-base text-gray-50 relative my-4">
                                This card is for some special elements, like displaying background
                                gifs on hover only.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
