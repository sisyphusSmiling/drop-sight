'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuickLookup } from "./quick-lookup"
import { BulkLookup } from "./bulk-lookup"
import { NetworkType } from "@/lib/context/network-context"

interface LookupTabsProps {
  network: NetworkType;
}

export function LookupTabs({ network }: LookupTabsProps) {
  return (
    <Tabs defaultValue="quick" className="space-y-4">
      <TabsList>
        <TabsTrigger value="quick">Quick</TabsTrigger>
        <TabsTrigger value="bulk">Bulk</TabsTrigger>
      </TabsList>
      <TabsContent value="quick">
        <QuickLookup network={network} />
      </TabsContent>
      <TabsContent value="bulk">
        <BulkLookup network={network} />
      </TabsContent>
    </Tabs>
  );
} 