import { toast } from "@/hooks/use-toast";
import { NetworkType } from "@/lib/context/network-context";

export function validateLookupRequest(address: string, network: NetworkType) {
  const isEVM = address.length === 42;
  
  if (isEVM && network === 'testnet') {
    toast({
      description: "EVM address lookup is not currently supported on testnet",
      duration: 2000,
    });
    throw new Error('EVM lookup not supported on testnet');
  }
  
  return {
    isEVM,
    address: address.toLowerCase()
  };
} 