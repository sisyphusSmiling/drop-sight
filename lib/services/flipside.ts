import { toast } from "@/hooks/use-toast";

export interface FlipsideQueryResult {
  TX_ID: string;
  BLOCK_TIMESTAMP: string;
  EVENT_CONTRACT: string;
  EVENT_TYPE: string;
  ADDRESS: string;
}

function formatAddress(address: string): string {
  return address.toLowerCase().replace('0x', '');
}

export async function queryFlipside(evmAddress: string, contractAddress: string): Promise<FlipsideQueryResult[]> {
  try {
    const response = await fetch('/api/flipside', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        evmAddress,
        contractAddress,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to query Flipside API');
    }

    const data = await response.json();
    return data.results;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred while querying Flipside');
  }
} 