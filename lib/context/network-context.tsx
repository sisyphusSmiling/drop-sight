"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { configureFlow } from "@/lib/flow/config";

export type NetworkType = "mainnet" | "testnet";

interface NetworkContextType {
  network: NetworkType;
  setNetwork: (network: NetworkType) => void;
  isNetworkChanging: boolean;
  isLoading: boolean;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [network, setNetworkState] = useState<NetworkType>(() => {
    // Try to get from localStorage during initialization
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("preferred-network");
      if (stored === "mainnet" || stored === "testnet") {
        return stored;
      }
    }
    return "mainnet"; // Default to mainnet
  });

  const [isNetworkChanging, setIsNetworkChanging] = useState(false);

  // Initialize network and loading state
  useEffect(() => {
    const stored = localStorage.getItem("preferred-network");
    if (stored === "mainnet" || stored === "testnet") {
      setNetworkState(stored);
    }
    setIsLoading(false);
  }, []);

  // Persist network choice to localStorage and reconfigure Flow
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("preferred-network", network);
      configureFlow();
    }
  }, [network, isLoading]);

  const setNetwork = async (newNetwork: NetworkType) => {
    setIsNetworkChanging(true);
    setNetworkState(newNetwork);
    
    // Small delay to ensure Flow configuration is updated
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Refresh the page to ensure all components are properly updated
    window.location.reload();
  };

  if (isLoading) {
    return null;
  }

  return (
    <NetworkContext.Provider value={{ network, setNetwork, isNetworkChanging, isLoading }}>
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