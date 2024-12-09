import { NetworkIndicator } from './common/NetworkIndicator';
import { Footer } from './common/Footer';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-16"> {/* Add padding bottom for footer */}
      <NetworkIndicator />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
} 