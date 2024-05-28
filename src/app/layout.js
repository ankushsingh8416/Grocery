"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [updateCart, setupdateCart] = useState(false)
  const hideHeader = pathname === '/sign-in' || pathname === '/create-account';

  return (
    <html lang="en">
      <title>Grocery Store</title>
      <body className={outfit.className}>
        <UpdateCartContext.Provider value={{updateCart, setupdateCart}}>
          {!hideHeader && <Header />}
          {children}
          <Toaster />

        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
