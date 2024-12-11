'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-DWW43XNYXL');
  }, []);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DWW43XNYXL"
        strategy="afterInteractive"
      />
      <VercelAnalytics />
    </>
  );
} 