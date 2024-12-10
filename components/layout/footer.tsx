"use client";

import { useNetwork } from "@/lib/context/network-context";
import { cn } from "@/lib/utils";
import { Loader2, Github, Twitter } from "lucide-react";
import Link from "next/link";

function NetworkSelector() {
  const { network, setNetwork, isNetworkChanging } = useNetwork();
  
  return (
    <div className={cn("flex gap-2 border rounded-lg p-1 font-mono bg-background/80 backdrop-blur-sm shadow-sm")}>
      {["mainnet", "testnet"].map((net) => (
        <button
          key={net}
          onClick={() => setNetwork(net as "mainnet" | "testnet")}
          disabled={isNetworkChanging}
          className={cn(
            "px-4 py-1 rounded-md capitalize transition-colors flex items-center gap-2 text-sm tracking-tight",
            network === net && net === "mainnet" && "bg-green-500 text-green-200 dark:bg-green-900 dark:text-green-400 font-bold",
            network === net && net === "testnet" && "bg-blue-500 text-blue-200 dark:bg-blue-900 dark:text-blue-400 font-bold",
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

export function Footer() {
  return (
    <>
      <div className="fixed bottom-[72px] left-0 right-0 flex justify-center z-50">
        <NetworkSelector />
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t h-[52px] flex items-center">
        <div className="max-w-2xl mx-auto px-4 w-full flex justify-center">
          <div className="flex items-center justify-center gap-4">
            <Link
              href="https://github.com/giovanniabbruzzo/drop-sight"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-1 text-sm link-hover'
              )}
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://x.com/gio_incognito"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-1 text-sm link-hover'
              )}
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
} 