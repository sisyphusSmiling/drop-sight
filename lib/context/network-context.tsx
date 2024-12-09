"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { configureFlow } from "@/lib/flow/config";

export type NetworkType = "mainnet" | "testnet";

interface NetworkContextType {
  network: NetworkType;
  setNetwork: (network: NetworkType) => void;
  isNetworkChanging: boolean;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [network, setNetworkState] = useState<NetworkType>(() => {
    // Try to get from localStorage during initialization
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("preferred-network");
      if (stored === "mainnet" || stored === "testnet") {
        return stored;
      }
    }
    return "testnet"; // Default to testnet
  });

  const [isNetworkChanging, setIsNetworkChanging] = useState(false);

  // Persist network choice to localStorage and reconfigure Flow
  useEffect(() => {
    localStorage.setItem("preferred-network", network);
    configureFlow();
  }, [network]);

  const setNetwork = async (newNetwork: NetworkType) => {
    setIsNetworkChanging(true);
    setNetworkState(newNetwork);
    
    // Small delay to ensure Flow configuration is updated
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Refresh the page to ensure all components are properly updated
    window.location.reload();
  };

  return (
    <NetworkContext.Provider value={{ network, setNetwork, isNetworkChanging }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
} 