'use client'

import { useState, useRef, useEffect } from 'react';
import { getFlowscanUrl, getEvmFlowscanUrl } from '@/lib/utils/network';
import { executeSingleAddressScript } from '@/lib/flow/scripts';
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

interface QuickLookupProps {
  network: string;
}

export function QuickLookup({ network }: QuickLookupProps) {
  const [address, setAddress] = useState('');
  const [evmAddress, setEvmAddress] = useState('');
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
    if (!address) return;

    setIsLoading(true);
    try {
      const result = await executeSingleAddressScript(address);
      setEvmAddress(result);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch EVM address. Please check the Flow address and try again.",
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

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          ref={inputRef}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Flow address"
          className="flex-1 bg-background border rounded-md px-3 py-2"
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Lookup'}
        </button>
      </form>

      {evmAddress && (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Flow Address</h3>
              <div className="flex items-center gap-2">
                <a
                  href={`${getFlowscanUrl(network)}/account/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {address}
                </a>
                <button
                  onClick={() => copyToClipboard(address)}
                  className="p-1 hover:bg-muted rounded-md transition-colors"
                  aria-label="Copy Flow address"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">EVM Address</h3>
              <div className="flex items-center gap-2">
                <a
                  href={`${getEvmFlowscanUrl(network)}/address/${evmAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {evmAddress}
                </a>
                <button
                  onClick={() => copyToClipboard(evmAddress)}
                  className="p-1 hover:bg-muted rounded-md transition-colors"
                  aria-label="Copy EVM address"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 