export const DEPLOYMENT_CONFIG = {
  mainnet: {
    url: "https://flow-evm-lookup.vercel.app", // Update this with your production URL
    color: "green",
  },
  testnet: {
    url: "https://flow-evm-lookup-git-staging-sisyphussmilings-projects.vercel.app",
    color: "blue",
  },
} as const;

export type NetworkType = keyof typeof DEPLOYMENT_CONFIG; 