"use client";

import { useNetwork } from "@/lib/context/network-context";
import { cn } from "@/lib/utils";

export function NetworkBadge() {
  const { network } = useNetwork();
  
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