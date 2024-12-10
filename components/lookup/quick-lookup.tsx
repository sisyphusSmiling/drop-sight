'use client'

import { useState, useRef, useEffect } from 'react';
import { getFlowscanUrl, getEvmFlowscanUrl } from '@/lib/utils/network';
import { lookupAddress } from '@/lib/flow/scripts';
import { useToast } from "@/hooks/use-toast";
import { Copy, Loader2 } from "lucide-react";
import { NetworkType } from '@/lib/context/network-context';

interface QuickLookupProps {
  network: NetworkType;
}

interface LookupResult {
  flowAddress: string | null;
  evmAddress: string | null;
  transactionId?: string | null;
  timestamp?: string | null;
}

export function QuickLookup({ network }: QuickLookupProps) {
  const [inputAddress, setInputAddress] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        e.key === '/'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAddress) return;

    setIsLoading(true);
    try {
      const result = await lookupAddress(inputAddress, network);
      setResult(result);
      setInputAddress(''); // Clear input after successful lookup
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to lookup address. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Address copied!"
      });
    });
  };

  const truncateAddress = (addr: string | null) => {
    if (!addr) return "N/A";
    if (window.innerWidth > 640) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder={network === 'mainnet' ? "Enter Flow or EVM address" : "Enter Flow address"}
          className="flex-1 bg-background border rounded-md px-3 py-2 text-sm"
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 whitespace-nowrap flex items-center gap-2 text-sm font-bold"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {result && (
        <div className="rounded-lg border divide-y">
          <div className="p-4 space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Cadence Address</h3>
            {result.flowAddress ? (
              <div className="flex items-center gap-2">
                <a
                  href={`${getFlowscanUrl(network)}/account/${result.flowAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-medium text-primary hover:underline break-all text-sm"
                >
                  {truncateAddress(result.flowAddress)}
                </a>
                <button
                  onClick={() => copyToClipboard(result.flowAddress!)}
                  className="p-1 hover:bg-muted rounded-md transition-colors shrink-0"
                  aria-label="Copy Cadence address"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">N/A</span>
            )}
          </div>

          <div className="p-4 space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">EVM Address</h3>
            {result.evmAddress ? (
              <div className="flex items-center gap-2">
                <a
                  href={`${getEvmFlowscanUrl(network)}/address/${result.evmAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-medium text-primary hover:underline break-all text-sm"
                >
                  {truncateAddress(result.evmAddress)}
                </a>
                <button
                  onClick={() => copyToClipboard(result.evmAddress!)}
                  className="p-1 hover:bg-muted rounded-md transition-colors shrink-0"
                  aria-label="Copy EVM address"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">N/A</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}