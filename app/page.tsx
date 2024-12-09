'use client'

import { useEffect } from 'react';
import { configureFlow } from '@/lib/flow/config';
import { LookupTabs } from '@/components/lookup/lookup-tabs';
import { NetworkSelector } from '@/components/layout/network-selector';
import { useNetwork } from '@/lib/context/network-context';

export default function Home() {
  const { network } = useNetwork();

  useEffect(() => {
    configureFlow();
  }, [network]);

  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight">Flow Address Lookup</h1>
          <NetworkSelector />
        </div>
        <p className="text-muted-foreground">Lookup Flow EVM addresses by their native account</p>
      </div>
      
      <LookupTabs network={network} />
    </div>
  );
} 