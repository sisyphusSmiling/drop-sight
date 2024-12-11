'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script';

export function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DWW43XNYXL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-DWW43XNYXL');
        `}
      </Script>
      <VercelAnalytics />
    </>
  );
} 