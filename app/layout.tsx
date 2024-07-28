"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { NavbarHeader } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head>
      <script src="https://kit.fontawesome.com/b08cef85f4.js" crossOrigin="anonymous"></script>
      </head>
      <body>
      <SessionProvider>
            <NextUIProvider>
              <ThemeProvider
                attribute="class"
                enableSystem={true}
                defaultTheme="light"
              >
                <NavbarHeader />
                {children}
              </ThemeProvider>
            </NextUIProvider>

          </SessionProvider>
      </body>
    </html>
  )
}
