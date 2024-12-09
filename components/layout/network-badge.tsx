"use client";

import { useNetwork } from "@/lib/context/network-context";
import { cn } from "@/lib/utils";

export function NetworkBadge() {
  const { network } = useNetwork();
  
  return (
    <div
      className={cn(
        "px-3 py-1 rounded-md capitalize text-sm font-medium",
        network === "mainnet" && "bg-green-500/10 text-green-500",
        network === "testnet" && "bg-blue-500/10 text-blue-500"
      )}
    >
      {network}
      <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-current" />
    </div>
  );
} 