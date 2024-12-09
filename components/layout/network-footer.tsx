"use client";

import { useNetwork } from "@/lib/context/network-context";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function NetworkFooter() {
  const { network, setNetwork, isNetworkChanging } = useNetwork();

  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-2 bg-background/80 backdrop-blur-sm">
      <div className="flex gap-2 border rounded-lg p-1">
        {["mainnet", "testnet"].map((net) => (
          <button
            key={net}
            onClick={() => setNetwork(net as "mainnet" | "testnet")}
            disabled={isNetworkChanging}
            className={cn(
              "px-4 py-1 rounded-md capitalize transition-colors flex items-center gap-2",
              network === net && net === "mainnet" && "bg-green-500/10 text-green-500",
              network === net && net === "testnet" && "bg-blue-500/10 text-blue-500",
              network !== net && "hover:bg-muted",
              isNetworkChanging && "opacity-50 cursor-not-allowed"
            )}
          >
            {net}
            {network === net && !isNetworkChanging && (
              <span className="inline-block w-2 h-2 rounded-full bg-current" />
            )}
            {network === net && isNetworkChanging && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </button>
        ))}
      </div>
    </footer>
  );
} 