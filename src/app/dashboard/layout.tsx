import type { Metadata } from "next";
import { Geist, Geist_Mono, Kumbh_Sans } from "next/font/google";
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
   
      <div
        className={`${geistSans.variable} ${geistMono.variable} ${kumbhSans.variable} antialiased`}
      >
        <div className="flex justify-between gap-[30px]">
         <Sidebar />
        {children} 
        </div>
        
      </div>
   
  );
}