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
                            "bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
                            // Preload hover image by setting it in a pseudo-element
                            "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)]",
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
                            "bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
                            // Preload hover image by setting it in a pseudo-element
                            "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)]",
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
                            "bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
                            // Preload hover image by setting it in a pseudo-element
                            "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                            "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)]",
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
