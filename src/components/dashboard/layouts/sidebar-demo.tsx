"use client";
import React, {useState} from "react";
import {IconArrowLeft,} from "@tabler/icons-react";
import Link from "next/link";
import {motion} from "framer-motion";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Sidebar, SidebarBody, SidebarLink} from "@/components/ui/sidebar";
import {FcServices, FcStackOfPhotos} from "react-icons/fc";

export function SidebarDemo({children}: { children: React.ReactNode; }) {
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <Image
                    src="/images/dashboard.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                />
            ),
        },
        {
            label: "Album",
            href: "/dashboard/album",
            icon: (
                <Image
                    src="/images/gallery.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                />
            ),
        },
        {
            label: "Photo",
            href: "/dashboard/photo",
            icon: (
                <FcStackOfPhotos className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
        },
        {
            label: "Service",
            href: "/dashboard/service",
            icon: (
                <FcServices className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
        },
        {
            label: "Outfit",
            href: "/dashboard/outfit",
            icon: (
                <Image
                    src="/images/fashion-design.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                />
            ),
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-200 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700",
                "h-full" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="fixed overflow-y-auto overflow-x-hidden">
                        {open ? <Logo/> : <LogoIcon/>}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link}/>
                            ))}
                        </div>
                    </div>
                    <div className="fixed bottom-5">
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <Image
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Dashboard>{children}</Dashboard>
        </div>
    );
}

export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div
                className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"/>
            <motion.span
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Acet Labs
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div
                className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"/>
        </Link>
    );
};

// Dummy dashboard component with content
const Dashboard = ({children}: { children: React.ReactNode; }) => {
    return (
        <div className="flex flex-1">
            {/*Children*/}
            <div
                className="p-2 md:p-10 rounded-tl-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                {children}
            </div>
            {/*<div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">*/}
            {/*    <div className="flex gap-2">*/}
            {/*        {[...new Array(4)].map((i) => (*/}
            {/*            <div*/}
            {/*                key={"first-array" + i}*/}
            {/*                className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"*/}
            {/*            ></div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*    <div className="flex gap-2 flex-1">*/}
            {/*        {[...new Array(2)].map((i) => (*/}
            {/*            <div*/}
            {/*                key={"second-array" + i}*/}
            {/*                className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"*/}
            {/*            ></div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};
