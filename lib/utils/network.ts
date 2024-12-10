import { NetworkType } from "@/lib/context/network-context";

export function getFlowscanUrl(network: NetworkType, type: 'flow' | 'evm') {
  if (type === 'flow') {
    return network === 'mainnet'
      ? 'https://flowscan.io'
      : 'https://testnet.flowscan.io';
  } else {
    return network === 'mainnet'
      ? 'https://evm.flowscan.io'
      : 'https://evm-testnet.flowscan.io';
  }
}