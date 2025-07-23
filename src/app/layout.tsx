import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomPrivyProvider from "@/components/PrivyProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asciipanions",
  description: "Collect and trade unique ASCII art pets on the blockchain",
  icons: {
    icon: "/Untitled design (52).png",
    shortcut: "/Untitled design (52).png",
    apple: "/Untitled design (52).png",
  },
  openGraph: {
    title: "Asciipanions",
    description: "Collect and trade unique ASCII art pets on the blockchain",
    images: ["/Untitled design (52).png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asciipanions",
    description: "Collect and trade unique ASCII art pets on the blockchain",
    images: ["/Untitled design (52).png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] text-white min-h-screen`}
      >
        <CustomPrivyProvider>
          <Navbar />
          {children}
        </CustomPrivyProvider>
      </body>
    </html>
  );
}
