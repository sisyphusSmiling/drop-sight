'use client'

import { useState, useRef, useEffect } from 'react';
import { getFlowscanUrl, getEvmFlowscanUrl } from '@/lib/utils/network';
import { executeSingleAddressScript } from '@/lib/flow/scripts';
import { useToast } from "@/hooks/use-toast";

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
      // Only trigger if not in an input/textarea
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
        title: "Copied!",
        description: "Address copied to clipboard",
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
          <div className="p-4 border rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Flow Address</h3>
                <p className="font-mono">{address}</p>
                <a
                  href={getFlowscanUrl(address, network)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  View on Flowscan
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(address)}
                className="p-2 hover:bg-muted rounded-md"
              >
                Copy
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">EVM Address</h3>
                <p className="font-mono">{evmAddress}</p>
                <a
                  href={getEvmFlowscanUrl(evmAddress, network)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  View on Flowscan
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(evmAddress)}
                className="p-2 hover:bg-muted rounded-md"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 