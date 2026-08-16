"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// GA4 측정 ID (G-XXXXXXX). Vercel/로컬 환경변수 NEXT_PUBLIC_GA_ID 로 주입.
// 값이 없으면 아무것도 렌더하지 않는다(로컬·미설정 환경에서 안전).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  // 최초 조회는 아래 gtag('config')가 자동 전송하므로 건너뛰고,
  // 이후 App Router 클라이언트 네비게이션(경로 변경)만 수동으로 page_view 전송.
  useEffect(() => {
    if (!GA_ID) return;
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
