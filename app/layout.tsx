"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { NavbarHeader } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head>
        {/* Use Script component for loading external scripts asynchronously */}
        <Script src="https://kit.fontawesome.com/b08cef85f4.js" strategy="lazyOnload" crossOrigin="anonymous" />
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
  );
}
