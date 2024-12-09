export const NETWORK_CONFIG = {
  mainnet: {
    url: 'https://flow-evm-lookup.vercel.app', // your production URL
    color: 'green',
    label: 'MAINNET'
  },
  testnet: {
    url: 'https://flow-evm-lookup-git-staging-sisyphussmilings-projects.vercel.app',
    color: 'blue',
    label: 'TESTNET'
  }
} as const; 