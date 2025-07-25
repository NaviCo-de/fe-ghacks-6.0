import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Reddit_Sans, Playfair_Display } from "next/font/google";
import { UserProvider } from "@/context/UserContext";

import Image from "next/image";
import { UUID } from "crypto";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
})

const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans"
})

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display"
})
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${redditSans.variable} ${playfairDisplay.variable} 
        antialiased min-h-screen flex flex-col  bg-[url(/bg-image.png)] bg-repeat bg-contain bg-center`}
      >
        <UserProvider>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <footer className="bg-[#f2e6ec] w-full h-50 flex justify-between items-center px-43">
            <Image src="/Logo_nama.png" width={100} height={100} alt="Logo_nama"/>

            <div className="flex flex-col gap-3">
              <h1>Find Us on Social Media</h1>
              <div className="flex gap-5">
                <Image src="/instagram.png" width={25} height={25} alt="instagram"/>
                <Image src="/twitter.png" width={25} height={25} alt="twitter"/>
                <Image src="/youtube.png" width={25} height={25} alt="youtube"/>
                <Image src="/tiktok.png" width={25} height={25} alt="tiktok"/>
              </div>
              <h1>Contact Us</h1>
              <div className="flex gap-2">
                <p>cs@juita.com</p>
                <Image src="/copy.png" width={23} height={10} alt="copy"/>
              </div>
            </div>
          </footer>
        </UserProvider>
      </body>
    </html>
  );
}
