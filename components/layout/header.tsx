"use client";

import { NetworkBadge } from "./network-badge";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Flow Address Lookup</h1>
        <NetworkBadge />
      </div>
    </header>
  );
} 