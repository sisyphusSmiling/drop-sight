"use client";

import { cn } from "@/lib/utils";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t h-[52px] flex items-center">
      <div className="max-w-2xl mx-auto px-4 w-full flex justify-center">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="https://github.com/sisyphusSmiling/drop-sight"
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
  );
} 