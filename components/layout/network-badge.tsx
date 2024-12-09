"use client";

import { DEPLOYMENT_CONFIG, NetworkType } from "@/lib/config/deployment";
import { cn } from "@/lib/utils";

export function NetworkBadge() {
  const currentNetwork = (process.env.NEXT_PUBLIC_FLOW_NETWORK || "testnet") as NetworkType;
  
  return (
    <div
      className={cn(
        "px-3 py-1 rounded-md capitalize text-sm font-medium",
        currentNetwork === "mainnet" && "bg-green-500/10 text-green-500",
        currentNetwork === "testnet" && "bg-blue-500/10 text-blue-500"
      )}
    >
      {currentNetwork}
      <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-current" />
    </div>
  );
} 