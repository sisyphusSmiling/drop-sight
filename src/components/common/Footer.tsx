import { useRouter } from 'next/router';
import { NETWORK_CONFIG } from '@/config/networks';

export function Footer() {
  const router = useRouter();
  const currentNetwork = process.env.NEXT_PUBLIC_FLOW_NETWORK;

  const networkButtons = Object.entries(NETWORK_CONFIG).map(([network, config]) => {
    const isActive = currentNetwork === network;
    const baseClasses = "px-4 py-1 rounded-full text-sm font-medium transition-colors";
    const colorClasses = network === 'mainnet' 
      ? 'hover:bg-green-100 text-green-700'
      : 'hover:bg-blue-100 text-blue-700';
    const activeClasses = isActive ? 'bg-opacity-20 bg-current' : '';

    return (
      <button
        key={network}
        className={`${baseClasses} ${colorClasses} ${activeClasses}`}
        onClick={() => window.location.href = config.url}
      >
        {config.label}
      </button>
    );
  });

  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4">
      <div className="flex justify-center space-x-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
        {networkButtons}
      </div>
    </footer>
  );
} 