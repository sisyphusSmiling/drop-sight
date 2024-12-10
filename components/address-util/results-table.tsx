'use client'

import { NetworkType } from '@/lib/context/network-context';
import { getFlowscanUrl } from '@/lib/utils/network';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { shortenAddress } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ResultsTableProps {
  results: Array<{
    flowAddress: string | null;
    evmAddress: string | null;
  }>;
  network: NetworkType;
}

export function ResultsTable({ results, network }: ResultsTableProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Address copied!"
      });
    });
  };

  const exportToCSV = () => {
    const csvData = `Flow Address,EVM Address\n${results.map(r => `${r.flowAddress || 'N/A'},${r.evmAddress || 'N/A'}`).join('\n')}`;
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'address-lookup-results.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const renderAddress = (address: string | null) => {
    if (!address || address === 'N/A') {
      return <span className="na-text">N/A</span>;
    }

    return (
      <div className="address-container">
        <a
          href={`${getFlowscanUrl(network)}${address.startsWith('0x') ? '/contract/A.1654653399040a61.FlowEVMToken/address/' : '/account/'}${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-hover"
        >
          {window.innerWidth > 640 ? address : shortenAddress(address)}
        </a>
        <button
          onClick={() => copyToClipboard(address)}
          className="copy-button"
          aria-label={`Copy ${address.startsWith('0x') ? 'EVM' : 'Flow'} address`}
        >
          <Copy className="copy-icon" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={exportToCSV}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Flow Address</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">EVM Address</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 align-middle">
                    {renderAddress(result.flowAddress)}
                  </td>
                  <td className="p-4 align-middle">
                    {renderAddress(result.evmAddress)}
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