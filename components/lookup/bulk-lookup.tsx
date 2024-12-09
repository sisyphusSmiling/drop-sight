'use client'

import { useState } from 'react';
import { CSVUpload } from '@/components/address-util/csv-upload';
import { ResultsTable } from '@/components/address-util/results-table';
import { executeAddressScript } from '@/lib/flow/scripts';

interface BulkLookupProps {
  network: string;
}

export const BulkLookup = ({ network }: BulkLookupProps) => {
  const [results, setResults] = useState<Record<string, string | null>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div className="space-y-8">
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
}; 