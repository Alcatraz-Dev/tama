import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getBanner } from "@/lib/useQuery";
import AnimatedBanner from "./AnimatedBanner"; // import wrapper

export default async function Banner() {
  const bannerData = await getBanner();
  if (!bannerData) return null;

  return (
    <AnimatedBanner>
      <div className="mx-5 ">
        <div className="relative w-full h-[420px] sm:h-[480px] md:h-[550px] mt-8 sm:mt-12 px-20  flex items-center justify-center text-center text-white max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-lg">
          {bannerData.backgroundImageUrl && (
            <Image
              src={bannerData.backgroundImageUrl}
              alt={bannerData.title}
              fill
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 px-6 sm:px-10">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-xl">
              {bannerData.title}
            </h1>
            <p className="text-base sm:text-lg md:text-2xl max-w-xl sm:max-w-2xl drop-shadow-xl mt-10">
              {bannerData.subtitle}
            </p>
            <Link href={bannerData.buttonLink} className="mt-8 gap-3 flex">
              <Button
                aria-label={bannerData.buttonText}
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-700 text-black dark:text-white px-8 py-6 rounded-full hover:bg-slate-200 dark:hover:bg-gray-600 transition hover:cursor-pointer"
              >
                {bannerData.buttonText}
              </Button>
              <Button className="mt-1 inline-flex items-center gap-2 bg-white dark:bg-gray-700 text-black dark:text-white px-5 py-5 rounded-full hover:bg-slate-100 dark:hover:bg-gray-600 transition -rotate-45 hover:rotate-0 hover:cursor-pointer">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedBanner>
  );
}
