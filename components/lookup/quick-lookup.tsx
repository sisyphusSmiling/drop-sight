'use client'

import { useState, useRef } from 'react';
import { NetworkType } from '@/lib/context/network-context';
import { lookupAddress } from '@/lib/flow/scripts';
import { getFlowscanUrl } from '@/lib/utils/network';
import { Copy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHotkeys } from 'react-hotkeys-hook';
import { shortenAddress } from '@/lib/utils';
import { analytics, EventCategory, EventName } from '@/lib/utils/analytics';

interface QuickLookupProps {
  network: NetworkType;
}

export function QuickLookup({ network }: QuickLookupProps) {
  const [inputAddress, setInputAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    flowAddress: string | null;
    evmAddress: string | null;
    transactionId?: string | null;
    timestamp?: string | null;
  } | null>(null);

  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys('/', (e) => {
    e.preventDefault();
    inputRef.current?.focus();
  });

  const copyToClipboard = (text: string, type: 'flow' | 'evm') => {
    navigator.clipboard.writeText(text).then(() => {
      analytics.trackEvent(EventCategory.INTERACTION, EventName.COPY_ADDRESS, {
        addressType: type,
        network
      });
      toast({
        title: "Address copied!"
      });
    });
  };

  const handleFlowscanClick = (type: 'flow' | 'evm') => {
    analytics.trackEvent(EventCategory.INTERACTION, EventName.FLOWSCAN_CLICK, {
      addressType: type,
      network
    });
  };

  const renderAddress = (address: string | null, type: 'flow' | 'evm') => {
    if (!address || address === 'N/A') {
      return <span className="na-text">N/A</span>;
    }

    const baseUrl = getFlowscanUrl(network, type);
    const formattedAddress = type === 'flow' && address.startsWith('0x')
      ? address.slice(2)
      : address;
    const url = type === 'flow'
      ? `${baseUrl}/account/${formattedAddress}`
      : `${baseUrl}/address/${address}`;

    return (
      <div className="address-container">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-hover"
          onClick={() => handleFlowscanClick(type)}
        >
          {window.innerWidth > 640 ? address : shortenAddress(address)}
        </a>
        <button
          onClick={() => copyToClipboard(address, type)}
          className="copy-button"
          aria-label={`Copy ${type === 'flow' ? 'Flow' : 'EVM'} address`}
        >
          <Copy className="copy-icon" />
        </button>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAddress.trim()) return;

    setIsLoading(true);
    try {
      const result = await lookupAddress(inputAddress, network);
      setResult(result);
      analytics.trackLookupSuccess('quick', {
        network,
        addressType: inputAddress.length === 42 ? 'evm' : 'flow',
        hasFlowAddress: !!result.flowAddress,
        hasEvmAddress: !!result.evmAddress
      });
    } catch (error: any) {
      analytics.trackLookupError('quick', error.message, {
        network,
        addressType: inputAddress.length === 42 ? 'evm' : 'flow'
      });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder={network === 'mainnet' ? "Enter Flow or EVM address" : "Enter Flow address"}
          className="flex-1 bg-background border rounded-md px-3 py-2 text-base sm:text-sm"
          autoFocus
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
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
            <h3 className="text-sm font-medium text-muted-foreground">Flow Address</h3>
            {renderAddress(result.flowAddress, 'flow')}
          </div>

          <div className="p-4 space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">EVM Address</h3>
            {renderAddress(result.evmAddress, 'evm')}
          </div>
        </div>
      )}
    </div>
  );
}