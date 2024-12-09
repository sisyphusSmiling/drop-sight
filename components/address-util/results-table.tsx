'use client'

import { getFlowscanUrl, getEvmFlowscanUrl } from '@/lib/utils/network';

interface ResultsTableProps {
  results: Record<string, string | null>;
  network: string;
}

export function ResultsTable({ results, network }: ResultsTableProps) {
  const truncateAddress = (addr: string | null) => {
    if (!addr || addr === "N/A") return addr;
    if (window.innerWidth > 640) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
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
                  {evmAddress ? (
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
  );
} 