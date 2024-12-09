'use client'

import { useEffect, useState } from 'react';
import { CSVUpload } from '@/components/address-util/csv-upload';
import { ResultsTable } from '@/components/address-util/results-table';
import { configureFlow } from '@/lib/flow/config';
import { executeAddressScript } from '@/lib/flow/scripts';

export default function Home() {
  const [results, setResults] = useState<Record<string, string | null>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const network = process.env.NEXT_PUBLIC_FLOW_NETWORK || 'testnet';

  useEffect(() => {
    configureFlow();
  }, []);

  const handleAddressesLoaded = async (addresses: string[]) => {
    setError(null);
    setLoading(true);

    try {
      const scriptResults = await executeAddressScript(addresses);
      setResults(scriptResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Flow Address Lookup</h1>
        <p className="text-muted-foreground">Lookup Flow EVM addresses</p>
      </div>
      
      {error && (
        <div className="p-4 text-sm border rounded-lg bg-destructive/10 text-destructive border-destructive">
          {error}
        </div>
      )}

      <CSVUpload
        onAddressesLoaded={handleAddressesLoaded}
        onError={setError}
      />

      {loading ? (
        <div className="text-center text-muted-foreground">Processing addresses...</div>
      ) : (
        Object.keys(results).length > 0 && <ResultsTable results={results} network={network} />
      )}
    </div>
  );
} 