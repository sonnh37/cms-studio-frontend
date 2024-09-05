"use client";
import "./globals.css";
import { ThemeProvider } from "@/app/provider";
import { NavbarHeader } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { SessionProvider } from "next-auth/react";
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head>
        {/* Use Script component for loading external scripts asynchronously */}
        <Script src="https://kit.fontawesome.com/b08cef85f4.js" strategy="lazyOnload" crossOrigin="anonymous" />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="light"
          >
            <main>{children}</main>
          </ThemeProvider>
        </SessionProvider>
      </body>
      <Footer/>
    </html>
  );
}
