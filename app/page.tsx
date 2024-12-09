'use client'

import { useEffect } from 'react';
import { configureFlow } from '@/lib/flow/config';
import { LookupTabs } from '@/components/lookup/lookup-tabs';
import { NetworkSelector } from '@/components/layout/network-selector';
import { useNetwork } from '@/lib/context/network-context';
import { cn } from '@/lib/utils';

export default function Home() {
  const { network } = useNetwork();

  useEffect(() => {
    configureFlow();
  }, [network]);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <div className="flex items-center flex-wrap gap-2">
          <h1 className="text-3xl sm:text-4xl font-mono font-extrabold tracking-tight flex items-center gap-2">
            DropSight <span className="inline-block">🎯</span>
          </h1>
          <NetworkSelector />
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Lookup cross-VM account associations on Flow</p>
      </div>
      
      <LookupTabs network={network} />
    </div>
  );
} 