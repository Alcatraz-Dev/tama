"use client";

import dynamic from "next/dynamic";

const SimplePopupTest = dynamic(() => import("@/components/SimplePopupTest"), {
  ssr: false,
  loading: () => null,
});

export default function PopupTestWrapper() {
  return <SimplePopupTest />;
}