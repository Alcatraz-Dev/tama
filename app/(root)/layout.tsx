import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tama Shop",
  description: "Shop the latest fashion & express your individuality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased bg-slate-200`}>
        <Navbar />
        {children}
        <div className="mx-5 md:mx-0">
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
