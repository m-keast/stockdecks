import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockDecks",
  description: "Your trading card deck app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="bg-zinc-700 flex justify-between items-center px-5 w-full h-16 top-0 fixed z-50">
          <ul className="flex list-none">
            <li className="mr-3.5"><Link className="font-bold px-2.5 py-3.5 text-white hover:bg-zinc-500 hover:rounded-sm" href="/home">Home</Link></li>
            <li className="mr-3.5"><Link className="font-bold px-2.5 py-3.5 text-white hover:bg-zinc-500 hover:rounded-sm" href="/deck">My Deck</Link></li>
            <li className="mr-3.5"><Link className="font-bold px-2.5 py-3.5 text-white hover:bg-zinc-500 hover:rounded-sm" href="/buy">Buy Packs</Link></li>
          </ul>
          <ul className="flex list-none">
            <li className="mr-3.5"><Link className="font-bold px-2.5 py-3.5 text-white hover:bg-zinc-500 hover:rounded-sm" href="/wallet">Wallet</Link></li>
            <li className="mr-3.5"><Link className="font-bold px-2.5 py-3.5 text-white bg-blue-600 hover:bg-blue-800 rounded-[5px] transition-colors duration-300 ease-in-out" href="/login">Log out</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
