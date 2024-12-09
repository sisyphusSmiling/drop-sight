export const getFlowscanUrl = (network: string) => {
  return network === 'mainnet' 
    ? 'https://flowscan.io'
    : 'https://testnet.flowscan.io';
};

export const getEvmFlowscanUrl = (network: string) => {
  return network === 'mainnet'
    ? 'https://evm.flowscan.io'
    : 'https://evm-testnet.flowscan.io';
}; 