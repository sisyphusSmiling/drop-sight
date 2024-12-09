'use client'

import { useEffect } from 'react';
import { configureFlow } from '@/lib/flow/config';
import { LookupTabs } from '@/components/lookup/lookup-tabs';

export default function Home() {
  const network = process.env.NEXT_PUBLIC_FLOW_NETWORK || 'testnet';

  useEffect(() => {
    configureFlow();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Flow Address Lookup</h1>
        <p className="text-muted-foreground">Lookup Flow EVM addresses by their native account</p>
      </div>
      
      <LookupTabs network={network} />
    </div>
  );
} 