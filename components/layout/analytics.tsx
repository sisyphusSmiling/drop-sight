'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (
      command: 'event',
      action: string,
      params: { [key: string]: any }
    ) => void;
  }
}

export function Analytics() {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore - gtag initialization requires a different signature
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    // @ts-ignore - initialization calls use different signatures
    window.gtag('js', new Date());
    // @ts-ignore - initialization calls use different signatures
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