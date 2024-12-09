'use client'

import { getFlowscanUrl, getEvmFlowscanUrl } from '@/lib/utils/network';
import { Download } from 'lucide-react';

interface ResultsTableProps {
  results: Record<string, string | null>;
  network: string;
}

export function ResultsTable({ results, network }: ResultsTableProps) {
  const truncateAddress = (addr: string | null) => {
    if (!addr) return "N/A";
    if (addr === "N/A") return addr;
    if (window.innerWidth > 640) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const exportToCSV = () => {
    const csvContent = Object.entries(results)
      .map(([cadence, evm]) => `${cadence},${evm || 'N/A'}`)
      .join('\n');
    
    const blob = new Blob([`Cadence Address,EVM Address\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'address-lookup-results.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>
      
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Flow Address</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">EVM Address</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results).map(([flowAddress, evmAddress]) => (
                <tr key={flowAddress} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <a
                      href={`${getFlowscanUrl(network)}/account/${flowAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline break-all"
                    >
                      {truncateAddress(flowAddress)}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {evmAddress && evmAddress !== "N/A" ? (
                      <a
                        href={`${getEvmFlowscanUrl(network)}/address/${evmAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline break-all"
                      >
                        {truncateAddress(evmAddress)}
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
    </div>
  );
} 