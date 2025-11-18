"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/translationContext";
import { Button } from "@/components/ui/button";
import { Ruler, Shirt, Circle } from "lucide-react";
import Link from "next/link";

function SizeGuide() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState("tops");

  const tabs = [
    { id: "tops", label: t("tops"), icon: Shirt },
    { id: "bottoms", label: t("bottoms"), icon: Circle },
    { id: "dresses", label: t("dresses"), icon: Shirt },
    { id: "outerwear", label: t("outerwear"), icon: Circle },
  ];

  const sizeData = {
    tops: {
      sizes: [t("xs"), t("s"), t("m"), t("l"), t("xl"), t("xxl")],
      measurements: [
        {
          label: t("chest"),
          inches: ["32-34", "34-36", "36-38", "38-40", "40-42", "42-44"],
          cm: ["81-86", "86-91", "91-97", "97-102", "102-107", "107-112"],
        },
        {
          label: t("waist"),
          inches: ["24-26", "26-28", "28-30", "30-32", "32-34", "34-36"],
          cm: ["61-66", "66-71", "71-76", "76-81", "81-86", "86-91"],
        },
        {
          label: t("shoulder"),
          inches: ["14.5", "15", "15.5", "16", "16.5", "17"],
          cm: ["37", "38", "39", "41", "42", "43"],
        },
        {
          label: t("sleeve"),
          inches: ["23", "23.5", "24", "24.5", "25", "25.5"],
          cm: ["58", "60", "61", "62", "64", "65"],
        },
      ],
    },
    bottoms: {
      sizes: [t("xs"), t("s"), t("m"), t("l"), t("xl"), t("xxl")],
      measurements: [
        {
          label: t("waist"),
          inches: ["24-26", "26-28", "28-30", "30-32", "32-34", "34-36"],
          cm: ["61-66", "66-71", "71-76", "76-81", "81-86", "86-91"],
        },
        {
          label: t("hips"),
          inches: ["34-36", "36-38", "38-40", "40-42", "42-44", "44-46"],
          cm: ["86-91", "91-97", "97-102", "102-107", "107-112", "112-117"],
        },
        {
          label: t("inseam"),
          inches: ["28", "29", "30", "31", "32", "33"],
          cm: ["71", "74", "76", "79", "81", "84"],
        },
      ],
    },
    dresses: {
      sizes: [t("xs"), t("s"), t("m"), t("l"), t("xl"), t("xxl")],
      measurements: [
        {
          label: t("chest"),
          inches: ["32-34", "34-36", "36-38", "38-40", "40-42", "42-44"],
          cm: ["81-86", "86-91", "91-97", "97-102", "102-107", "107-112"],
        },
        {
          label: t("waist"),
          inches: ["24-26", "26-28", "28-30", "30-32", "32-34", "34-36"],
          cm: ["61-66", "66-71", "71-76", "76-81", "81-86", "86-91"],
        },
        {
          label: t("hips"),
          inches: ["34-36", "36-38", "38-40", "40-42", "42-44", "44-46"],
          cm: ["86-91", "91-97", "97-102", "102-107", "107-112", "112-117"],
        },
      ],
    },
    outerwear: {
      sizes: [t("xs"), t("s"), t("m"), t("l"), t("xl"), t("xxl")],
      measurements: [
        {
          label: t("chest"),
          inches: ["34-36", "36-38", "38-40", "40-42", "42-44", "44-46"],
          cm: ["86-91", "91-97", "97-102", "102-107", "107-112", "112-117"],
        },
        {
          label: t("waist"),
          inches: ["28-30", "30-32", "32-34", "34-36", "36-38", "38-40"],
          cm: ["71-76", "76-81", "81-86", "86-91", "91-97", "97-102"],
        },
        {
          label: t("shoulder"),
          inches: ["15", "15.5", "16", "16.5", "17", "17.5"],
          cm: ["38", "39", "41", "42", "43", "44"],
        },
        {
          label: t("sleeve"),
          inches: ["24", "24.5", "25", "25.5", "26", "26.5"],
          cm: ["61", "62", "64", "65", "66", "67"],
        },
      ],
    },
  };

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Ruler className={`w-12 h-12 text-zinc-600 dark:text-zinc-400 ${language === 'ar' ? 'ml-4' : 'mr-4'} `} />
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
              {t("sizeGuide")}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t("sizeGuideDescription")}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        {/* How to Measure */}
        <div className="bg-card rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
            {t("howToMeasure")}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            {t("measurementTips")}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white">
                    {t("chest")}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t('chestInstruction')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white">
                    {t("waist")}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t('waistInstruction')}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white">
                    {t("hips")}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t('hipsInstruction')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white">
                    {t("inseam")}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t('inseamInstruction')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Size Guide Tabs */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-700 ">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 py-4 px-6  font-extrabold transition-colors ${
                    activeTab === tab.id
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="w-2.5 h-2.5 lg:w-4 lg:h-4" />
                  <span className="text-[10px] lg:text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Size Chart */}
          <div className="p-2 sm:p-8">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left py-1 sm:py-4 px-1 sm:px-4 font-semibold text-black dark:text-white">
                    {t("guideSize")}
                  </th>
                  {sizeData[activeTab as keyof typeof sizeData].sizes.map(
                    (size) => (
                      <th
                        key={size}
                        className="text-center py-1 sm:py-4 px-0.5 sm:px-4 font-semibold text-black dark:text-white"
                      >
                        {size}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {sizeData[
                  activeTab as keyof typeof sizeData
                ].measurements.map((measurement, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-100 dark:border-zinc-800"
                  >
                    <td className="py-1 sm:py-4 px-1 sm:px-4 font-medium text-zinc-900 dark:text-zinc-100">
                      {measurement.label}
                    </td>
                    {measurement.inches.map(
                      (inchValue: string, i: number) => (
                        <td
                          key={i}
                          className="text-center py-1 sm:py-4 px-0.5 sm:px-4 text-zinc-600 dark:text-zinc-400"
                        >
                          <div className="text-xs">
                            {inchValue} {t("inches")}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                            ({measurement.cm[i]} {t("cm")})
                          </div>
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            {t('sizeGuideHelp')}
          </p>
          <Link href={"/contact"}>
            <Button className="bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black">
              {t('contactUsBtn')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default SizeGuide;
