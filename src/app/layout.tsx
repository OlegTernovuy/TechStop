import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CatalogModal from "../components/CatalogModal";
import ShoppingCartModal from "../components/(ShoppingCart)/ShoppingCartModal";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
        <ShoppingCartModal/>
        <CatalogModal/>
        <Footer />
      </body>
    </html>
  );
}
