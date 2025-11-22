import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import ChatWidget from "@/components/ChatWidget";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "next-themes";
import { TranslationProvider } from "@/lib/translationContext";
import FloatingActionButtons from "@/components/FloatingActionButtons";

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
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <meta property="og:title" content="Tama Shop" />
      <meta
        property="og:description"
        content="Shop the latest fashion & express your individuality."
      />
      <meta property="og:image" content="https://tamashop.vercel.app/og.png" />
      <meta property="og:url" content="https://tamashop.vercel.app" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://tamashop.vercel.app/og.png" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tama Shop" />
      <body className={`${jost.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TranslationProvider>
            <ErrorBoundary>
              <Navbar />
              {children}
              <div className="mx-5 md:mx-0">
                <Footer />
              </div>
              <Toaster />
              {/* <WhatsAppButton /> */}
              <FloatingActionButtons />
            </ErrorBoundary>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
