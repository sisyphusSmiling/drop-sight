'use client'

import { getFlowscanUrl, getEvmFlowscanUrl } from '@/lib/utils/network';

interface ResultsTableProps {
  results: Record<string, string | null>;
  network: string;
}

export const ResultsTable = ({ results, network }: ResultsTableProps) => {
  const flowscanBaseUrl = getFlowscanUrl(network);
  const evmFlowscanBaseUrl = getEvmFlowscanUrl(network);

  const handleExportCSV = () => {
    // Create CSV with headers and data
    const headers = 'Cadence,EVM\n';
    const rows = Object.entries(results)
      .map(([cadence, evm]) => `${cadence},${evm}`)
      .join('\n');
    const csvContent = headers + rows;
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'flow_evm_addresses.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
        >
          Export CSV
        </button>
      </div>
      <div className="rounded-lg border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Cadence
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                EVM
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(results).map(([address, evmAddress]) => (
              <tr key={address} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle">
                  <a 
                    href={`${flowscanBaseUrl}/account/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {address}
                  </a>
                </td>
                <td className="p-4 align-middle">
                  {evmAddress && evmAddress !== "N/A" ? (
                    <a
                      href={`${evmFlowscanBaseUrl}/address/${evmAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {evmAddress}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 