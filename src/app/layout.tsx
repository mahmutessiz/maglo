import type { Metadata } from "next";
import { Geist, Geist_Mono, Kumbh_Sans } from "next/font/google";
import QueryProvider from "../components/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
// @ts-expect-error Missing types
import "./globals.css";

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
  title: "Maglo",
  description: "Financial tracking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Maglo</title>
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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}