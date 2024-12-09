'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuickLookup } from "./quick-lookup"
import { BulkLookup } from "./bulk-lookup"

interface LookupTabsProps {
  network: string;
}

export const LookupTabs = ({ network }: LookupTabsProps) => {
  return (
    <Tabs defaultValue="quick" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="quick">Quick Lookup</TabsTrigger>
        <TabsTrigger value="bulk">Bulk Lookup</TabsTrigger>
      </TabsList>
      <TabsContent value="quick">
        <QuickLookup network={network} />
      </TabsContent>
      <TabsContent value="bulk">
        <BulkLookup network={network} />
      </TabsContent>
    </Tabs>
  );
}; 