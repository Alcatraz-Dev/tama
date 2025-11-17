"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/translationContext";

function About() {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex justify-center items-center md:m-10 m-5" dir={language === "ar" ? "rtl" : "ltr"}>
      <section className="w-full max-w-5xl mx-auto px-6 py-16 bg-card rounded-3xl p-5">

          <div className="flex justify-center items-center lg:mx-0 mx-auto ">
            <h1 className="text-xl lg:text-4xl font-bold text-center mx-5 text-black dark:text-white">{t('aboutTitle')}</h1>
            <Image
              src={mounted && theme === "dark" ? "/tama-light.svg" : "/tama.svg"}
              alt="Tama Logo"
              width={150}
              height={150}
              className="w-[70px] h-[70px] md:w-[120px] md:h-[120px] mb-3"
            />
            <h1 className="text-xl lg:text-4xl font-bold text-center mx-5 text-black dark:text-white">{t('aboutClothing')}</h1>
          </div>


        <p className="lg:text-lg text-sm text-gray-700 dark:text-gray-300 text-center mb-12">
          {t('aboutDescription')}
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-black dark:text-white">{t('ourStory')}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed lg:text-lg text-sm">
              {t('ourStoryDescription')}
            </p>
          </div>

          <div>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-black dark:text-white">{t('ourMission')}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed lg:text-lg text-sm">
              {t('ourMissionDescription')}
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="flex justify-center items-center lg:mx-0 mx-auto ">
            <h1 className="text-xl lg:text-4xl font-bold text-center mx-5 text-black dark:text-white">{t('whyTitle')}</h1>
            <Image
              src={mounted && theme === "dark" ? "/tama-light.svg" : "/tama.svg"}
              alt="Tama Logo"
              width={150}
              height={150}
              className="w-[70px] h-[70px] md:w-[120px] md:h-[120px] mb-2"
            />
            <h1 className="text-xl lg:text-4xl font-bold text-center mx-5 text-black dark:text-white">{t('whyQuestion')}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed lg:text-lg text-sm">
            {t('whyDescription')}
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
