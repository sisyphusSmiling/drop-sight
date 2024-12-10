import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address: string | null | undefined, chars = 4): string {
  if (!address) return 'N/A';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function isValidAddress(address: string | null | undefined): boolean {
  if (!address) return false;
  return /^(0x)?[0-9a-fA-F]{40}$/.test(address) || /^[0-9a-fA-F]{16}$/.test(address);
}
