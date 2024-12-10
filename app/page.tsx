'use client'

import { useEffect } from 'react';
import { configureFlow } from '@/lib/flow/config';
import { QuickLookup } from '@/components/lookup/quick-lookup';
import { BulkLookup } from '@/components/lookup/bulk-lookup';
import { NetworkSelector } from '@/components/layout/network-selector';
import { useNetwork } from '@/lib/context/network-context';
import { SectionHeader } from '@/components/ui/section-header';
import { Divider } from '@/components/ui/divider';
import Link from 'next/link';

export default function Home() {
  const { network } = useNetwork();

  useEffect(() => {
    configureFlow();
  }, [network]);

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center flex-wrap gap-2">
          <h1 className="text-3xl sm:text-4xl font-mono font-extrabold tracking-tight flex items-center gap-2">
            DropSight <span className="inline-block">🎯</span>
          </h1>
          <NetworkSelector />
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Lookup cross-VM account associations on{' '}
          <Link 
            href="https://flow.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Flow
          </Link>
        </p>
      </div>
      
      {/* Quick Lookup Section */}
      <section className="space-y-4">
        <SectionHeader 
          title="Quick Lookup"
          description="Enter a Flow or EVM address to find its cross-VM association"
        />
        <div className="max-w-2xl">
          <QuickLookup network={network} />
        </div>
      </section>

      <Divider />

      {/* Bulk Lookup Section */}
      <section className="space-y-4">
        <SectionHeader 
          title="Bulk Lookup"
          description="Upload a CSV file containing Flow addresses for batch processing"
        />
        <BulkLookup network={network} />
      </section>
    </div>
  );
} 