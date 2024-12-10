"use client";

import { useNetwork } from "@/lib/context/network-context";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function NetworkBadge() {
  const { network, isLoading } = useNetwork();
  
  if (isLoading) {
    return (
      <div className="network-badge opacity-50">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        "network-badge",
        network === "mainnet" ? "network-badge-mainnet" : "network-badge-testnet"
      )}
    >
      {network}
      <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-current" />
    </div>
  );
} 