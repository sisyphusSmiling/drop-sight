import * as fcl from "@onflow/fcl";
import flowConfig from "../../flow.json";

const getNetworkFromEnv = (): "mainnet" | "testnet" => {
  // Try to get from localStorage first
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("preferred-network");
    if (stored === "mainnet" || stored === "testnet") {
      return stored;
    }
  }
  return "testnet";
};

export const configureFlow = async () => {
  const network = getNetworkFromEnv();
  
  // Configure FCL with all options at once
  await fcl
    .config({
      'flow.network': network,
      'accessNode.api': network === 'mainnet' 
        ? 'https://rest-mainnet.onflow.org'
        : 'https://rest-testnet.onflow.org',
      'discovery.wallet': `https://fcl-discovery.onflow.org/${network}/authn`,
      'app.detail.title': 'Flow Address Lookup',
      'app.detail.icon': 'https://avatars.githubusercontent.com/u/62387156?v=4',
    })
    .load({ flowJSON: flowConfig });
}; 