"use client";

import { NetworkType, useNetwork } from "@/lib/context/network-context";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function NetworkSelector() {
  const { network, setNetwork, isNetworkChanging } = useNetwork();

  const networks: NetworkType[] = ["mainnet", "testnet"];

  return (
    <div className="flex items-center gap-2">
      {networks.map((net) => (
        <button
          key={net}
          onClick={() => setNetwork(net)}
          disabled={isNetworkChanging}
          className={cn(
            "px-3 py-1 rounded-md capitalize text-sm font-medium transition-colors flex items-center gap-2",
            network === net && net === "mainnet" && "bg-green-500/10 text-green-500",
            network === net && net === "testnet" && "bg-blue-500/10 text-blue-500",
            network !== net && "hover:bg-muted",
            isNetworkChanging && "opacity-50 cursor-not-allowed"
          )}
        >
          {net}
          {network === net && !isNetworkChanging && (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
          )}
          {network === net && isNetworkChanging && (
            <Loader2 className="h-3 w-3 animate-spin" />
          )}
        </button>
      ))}
    </div>
  );
} 