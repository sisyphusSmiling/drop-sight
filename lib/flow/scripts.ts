import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { configureFlow } from "./config";
import { NetworkType } from "@/lib/context/network-context";
import { validateLookupRequest } from "@/lib/utils/address";
import { queryFlipside, FlipsideQueryResult } from "@/lib/services/flipside";
import flowConfig from "@/flow.json";

import GetEVMAddresses from '@/cadence/scripts/get_evm_addresses.cdc';
import GetEVMAddress from '@/cadence/scripts/get_evm_address.cdc';

interface LookupResult {
  flowAddress: string | null;
  evmAddress: string | null;
  transactionId?: string | null;
  timestamp?: string | null;
}

export const executeSingleAddressScript = async (address: string): Promise<string | null> => {
  const cadenceAddress = address.replace("0x", "");

  try {
    await configureFlow();
    
    const response = await fcl.query({
      cadence: GetEVMAddress,
      args: () => [
        fcl.arg(`0x${cadenceAddress}`, t.Address)
      ],
    });

    return response;
  } catch (error) {
    console.error("Error executing Cadence script:", error);
    throw error;
  }
};

export const executeAddressScript = async (addresses: string[]) => {
  const cadenceAddresses = addresses.map(addr => addr.replace("0x", ""));

  try {
    await configureFlow();
    
    const response = await fcl.query({
      cadence: GetEVMAddresses,
      args: () => [
        fcl.arg(cadenceAddresses.map(addr => `0x${addr}`), t.Array(t.Address))
      ],
    });

    return response;
  } catch (error) {
    console.error("Error executing Cadence script:", error);
    throw error;
  }
};

async function getTransactionAuthorizer(txId: string): Promise<string | null> {
  try {
    const cleanId = txId.replace('0x', '').toLowerCase();
    const tx = await fcl.send([fcl.getTransaction(cleanId)]).then(fcl.decode);
    
    if (tx?.authorizers?.length) {
      return tx.authorizers[0];
    }
    
    return null;
  } catch (error) {
    console.error("Error getting transaction:", error);
    return null;
  }
}

async function lookupEVMAddress(evmAddress: string, network: NetworkType): Promise<LookupResult> {
  const evmContractAddress = flowConfig.dependencies.EVM.aliases.mainnet;
  const results = await queryFlipside(evmAddress, evmContractAddress);
  
  if (!results.length) {
    return {
      flowAddress: null,
      evmAddress,
      transactionId: null,
      timestamp: null
    };
  }

  const { TX_ID, BLOCK_TIMESTAMP } = results[0];
  const rawAuthorizerAddress = await getTransactionAuthorizer(TX_ID);
  
  if (!rawAuthorizerAddress) {
    return {
      flowAddress: null,
      evmAddress,
      transactionId: TX_ID,
      timestamp: BLOCK_TIMESTAMP
    };
  }

  const authorizerAddress = rawAuthorizerAddress.startsWith('0x') 
    ? rawAuthorizerAddress 
    : `0x${rawAuthorizerAddress}`;

  const verificationResult = await executeSingleAddressScript(authorizerAddress);
  const normalizedEVM = evmAddress.toLowerCase();
  const normalizedVerification = verificationResult?.toLowerCase() || '';
  const isVerified = normalizedVerification === normalizedEVM;

  return {
    flowAddress: isVerified ? authorizerAddress : null,
    evmAddress,
    transactionId: TX_ID,
    timestamp: BLOCK_TIMESTAMP
  };
}

export async function lookupAddress(address: string, network: NetworkType): Promise<LookupResult> {
  try {
    const { isEVM, address: normalizedAddress } = validateLookupRequest(address, network);
    
    if (!isEVM) {
      const evmAddress = await executeSingleAddressScript(normalizedAddress);
      return {
        flowAddress: normalizedAddress,
        evmAddress: evmAddress || null
      };
    }

    return lookupEVMAddress(normalizedAddress, network);
  } catch (error) {
    console.error('Lookup error:', error);
    throw error;
  }
} 