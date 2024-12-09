'use client'

import { getFlowscanUrl, getEvmFlowscanUrl } from '@/lib/utils/network';

interface ResultsTableProps {
  results: Record<string, string | null>;
  network: string;
}

export const ResultsTable = ({ results, network }: ResultsTableProps) => {
  const flowscanBaseUrl = getFlowscanUrl(network);
  const evmFlowscanBaseUrl = getEvmFlowscanUrl(network);

  return (
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
                {evmAddress ? (
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
  );
}; 