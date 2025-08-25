// app/studio/layout.tsx
import { Jost } from "next/font/google";
import "../../globals.css"; 

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased bg-white`}>
        {children} 
      </body>
    </html>
  );
}