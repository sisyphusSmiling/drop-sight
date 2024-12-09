'use client'

import { useState } from 'react';
import { Copy } from "lucide-react";
import { getFlowscanUrl, getEvmFlowscanUrl } from '@/lib/utils/network';
import { executeSingleAddressScript } from '@/lib/flow/scripts';
import { useToast } from "@/hooks/use-toast";

interface QuickLookupProps {
  network: string;
}

export const QuickLookup = ({ network }: QuickLookupProps) => {
  const [address, setAddress] = useState('');
  const [evmAddress, setEvmAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Address copied to clipboard!",
      duration: 2000,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setError(null);
    setLoading(true);
    setEvmAddress(null);

    try {
      const result = await executeSingleAddressScript(address);
      setEvmAddress(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const flowscanBaseUrl = getFlowscanUrl(network);
  const evmFlowscanBaseUrl = getEvmFlowscanUrl(network);

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Flow address (0x...)"
            className="flex-1 bg-background px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button
            type="submit"
            disabled={!address || loading}
            className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Looking up...' : 'Lookup'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 text-sm border rounded-lg bg-destructive/10 text-destructive border-destructive">
          {error}
        </div>
      )}

      {evmAddress && (
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Flow Address</div>
            <div className="flex items-center gap-2">
              <a 
                href={`${flowscanBaseUrl}/account/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {address}
              </a>
              <button
                onClick={() => handleCopy(address)}
                className="p-1 hover:bg-primary/10 rounded-md transition-colors"
                aria-label="Copy Flow address"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">EVM Address</div>
            {evmAddress !== "N/A" ? (
              <div className="flex items-center gap-2">
                <a
                  href={`${evmFlowscanBaseUrl}/address/${evmAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {evmAddress}
                </a>
                <button
                  onClick={() => handleCopy(evmAddress)}
                  className="p-1 hover:bg-primary/10 rounded-md transition-colors"
                  aria-label="Copy EVM address"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <span className="text-muted-foreground">N/A</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 