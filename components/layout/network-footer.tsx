"use client";

import { DEPLOYMENT_CONFIG, NetworkType } from "@/lib/config/deployment";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NetworkFooter() {
  const currentNetwork = (process.env.NEXT_PUBLIC_FLOW_NETWORK || "testnet") as NetworkType;

  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-2 bg-background/80 backdrop-blur-sm">
      <div className="flex gap-2 border rounded-lg p-1">
        {(Object.keys(DEPLOYMENT_CONFIG) as NetworkType[]).map((network) => {
          const isActive = network === currentNetwork;
          const config = DEPLOYMENT_CONFIG[network];
          
          return (
            <Link
              key={network}
              href={config.url}
              className={cn(
                "px-4 py-1 rounded-md capitalize transition-colors",
                isActive && network === "mainnet" && "bg-green-500/10 text-green-500",
                isActive && network === "testnet" && "bg-blue-500/10 text-blue-500",
                !isActive && "hover:bg-muted"
              )}
            >
              {network}
              {isActive && (
                <span className="ml-2 inline-block w-2 h-2 rounded-full bg-current" />
              )}
            </Link>
          );
        })}
      </div>
    </footer>
  );
} 