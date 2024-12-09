import { NETWORK_CONFIG } from '@/config/networks';

export function NetworkIndicator() {
  const network = process.env.NEXT_PUBLIC_FLOW_NETWORK;
  const config = NETWORK_CONFIG[network as keyof typeof NETWORK_CONFIG];
  
  const colorClasses = network === 'mainnet'
    ? 'bg-green-100 text-green-800 border-green-200'
    : 'bg-blue-100 text-blue-800 border-blue-200';

  return (
    <div className={`
      fixed top-4 right-4 
      px-3 py-1 
      rounded-full 
      text-sm font-medium 
      border 
      ${colorClasses}
    `}>
      {config.label}
    </div>
  );
} 