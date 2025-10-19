import type { Metadata } from "next";
import { Geist, Geist_Mono, Kumbh_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maglo - Dashboard",
  description: "Financial tracking platform",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Maglo - Dashborard</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/maglo-logo.ico"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kumbhSans.variable} antialiased`}
      >
        <Toaster />
        <div className="flex justify-between gap-[30px]">
         <Sidebar />
        {children} 
        </div>
        
      </body>
    </html>
  );
}