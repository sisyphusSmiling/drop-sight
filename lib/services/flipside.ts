import { Flipside } from "@flipsidecrypto/sdk";
import { toast } from "@/hooks/use-toast";

const FLIPSIDE_API_KEY = "666783bf-9a37-4dd9-919b-b4ed4772acd7";

const flipside = new Flipside(
  FLIPSIDE_API_KEY,
  "https://api-v2.flipsidecrypto.xyz"
);

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
  const formattedAddress = formatAddress(evmAddress);
  
  const query = `
    WITH COA_CREATION AS (
      SELECT *
      FROM flow.core.fact_events
      WHERE EVENT_CONTRACT LIKE 'A.${contractAddress}.EVM'
      AND EVENT_TYPE LIKE 'CadenceOwnedAccountCreated' AND TX_SUCCEEDED
    )
    
    SELECT TX_ID, BLOCK_TIMESTAMP, EVENT_CONTRACT, EVENT_TYPE, EVENT_DATA:address :: STRING as ADDRESS
    FROM COA_CREATION
    WHERE ADDRESS = '${formattedAddress}'
  `;

  try {
    const result = await flipside.query.run({
      sql: query,
      ttlMinutes: 10,
      cached: true
    });

    if (!result?.rows?.length) {
      return [];
    }

    return result.rows.map(row => ({
      TX_ID: String(row[0] || ''),
      BLOCK_TIMESTAMP: String(row[1] || ''),
      EVENT_CONTRACT: String(row[2] || ''),
      EVENT_TYPE: String(row[3] || ''),
      ADDRESS: String(row[4] || '')
    }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred while querying Flipside');
  }
} 