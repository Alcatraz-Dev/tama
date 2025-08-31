import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import WhatsAppButton from "@/components/WhatsAppButton";
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
      <meta property="og:title" content="Tama Shop" />
      <meta property="og:description" content="Shop the latest fashion & express your individuality." />
      <meta property="og:image" content="https://tamashop.vercel.app/og.png" />
      <meta property="og:url" content="https://tamashop.vercel.app" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://tamashop.vercel.app/og.png" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tama Shop" />
      <body className={`${jost.className} antialiased bg-slate-200`}>
        <Navbar />
        {children}
        <div className="mx-5 md:mx-0">
          <Footer />
        </div>
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  );
}
