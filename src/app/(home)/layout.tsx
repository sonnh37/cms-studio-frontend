"use client";
import React from 'react';
import {NavbarHeader} from "@/components/user/layouts/navbar";
import Footer from "@/components/user/layouts/footer";

export default function HomeLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div >
            <NavbarHeader/>
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    );
}
