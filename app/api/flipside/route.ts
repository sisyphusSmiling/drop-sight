import { Flipside } from "@flipsidecrypto/sdk";
import { NextResponse } from "next/server";

if (!process.env.FLIPSIDE_API_KEY) {
  throw new Error('FLIPSIDE_API_KEY is not defined');
}

const flipside = new Flipside(
  process.env.FLIPSIDE_API_KEY,
  "https://api-v2.flipsidecrypto.xyz"
);

export async function POST(request: Request) {
  try {
    const { evmAddress, contractAddress } = await request.json();

    if (!evmAddress || !contractAddress) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const formattedAddress = evmAddress.toLowerCase().replace('0x', '');
    
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

    const result = await flipside.query.run({
      sql: query,
      ttlMinutes: 10,
      cached: true
    });

    if (!result?.rows?.length) {
      return NextResponse.json({ results: [] });
    }

    const results = result.rows.map(row => ({
      TX_ID: String(row[0] || ''),
      BLOCK_TIMESTAMP: String(row[1] || ''),
      EVENT_CONTRACT: String(row[2] || ''),
      EVENT_TYPE: String(row[3] || ''),
      ADDRESS: String(row[4] || '')
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Flipside API error:', error);
    return NextResponse.json(
      { error: 'Failed to query Flipside API' },
      { status: 500 }
    );
  }
} 