"use client";

import { NetworkType, useNetwork } from "@/lib/context/network-context";
import { cn } from "@/lib/utils";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NetworkSelector() {
  const { network, setNetwork, isNetworkChanging } = useNetwork();

  const networks: NetworkType[] = ["mainnet", "testnet"];
  const alternativeNetwork = networks.find(n => n !== network)!;

  // Desktop view - show both networks
  const DesktopSelector = () => (
    <div className="hidden sm:flex items-center gap-2">
      {networks.map((net) => (
        <button
          key={net}
          onClick={() => setNetwork(net)}
          disabled={isNetworkChanging}
          className={cn(
            "network-badge flex items-center gap-2",
            network === net && net === "mainnet" && "network-badge-mainnet",
            network === net && net === "testnet" && "network-badge-testnet",
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

  // Mobile view - show active network and dropdown for alternative
  const MobileSelector = () => (
    <div className="sm:hidden flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger disabled={isNetworkChanging} className="flex items-center">
          <div
            className={cn(
              "network-badge flex items-center gap-2",
              network === "mainnet" && "network-badge-mainnet",
              network === "testnet" && "network-badge-testnet",
              isNetworkChanging && "opacity-50 cursor-not-allowed"
            )}
          >
            {network}
            {!isNetworkChanging && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
            )}
            {isNetworkChanging ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setNetwork(alternativeNetwork)} className="font-mono">
            Switch to {alternativeNetwork}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="ml-2 sm:ml-3">
      <DesktopSelector />
      <MobileSelector />
    </div>
  );
} 