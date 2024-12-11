import { NetworkType } from "@/lib/context/network-context";

// Event categories for better organization
export const EventCategory = {
  LOOKUP: 'lookup',
  INTERACTION: 'interaction',
  ERROR: 'error',
  PREMIUM: 'premium',
} as const;

// Event names for consistency
export const EventName = {
  // Lookup events
  QUICK_LOOKUP: 'quick_lookup',
  BULK_LOOKUP: 'bulk_lookup',
  
  // Interaction events
  NETWORK_SWITCH: 'network_switch',
  THEME_SWITCH: 'theme_switch',
  COPY_ADDRESS: 'copy_address',
  EXPORT_CSV: 'export_csv',
  FLOWSCAN_CLICK: 'flowscan_click',
  
  // Error events
  API_ERROR: 'api_error',
  VALIDATION_ERROR: 'validation_error',
  CSV_ERROR: 'csv_error',
  
  // Premium events
  PREMIUM_FEATURE_ACCESS: 'premium_feature_access',
  RATE_LIMIT_HIT: 'rate_limit_hit',
} as const;

type EventProperties = {
  network?: NetworkType;
  status?: 'success' | 'error';
  error?: string;
  addressType?: 'flow' | 'evm';
  addressCount?: number;
  theme?: 'light' | 'dark' | 'system';
  feature?: string;
  [key: string]: any;
};

class Analytics {
  private static instance: Analytics;
  
  private constructor() {
    // Initialize any additional analytics services here
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  /**
   * Track an event with the specified category, name, and properties
   */
  public trackEvent(
    category: typeof EventCategory[keyof typeof EventCategory],
    name: typeof EventName[keyof typeof EventName],
    properties: EventProperties = {}
  ) {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', name, {
        event_category: category,
        ...properties,
      });
    }

    // Log events in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${category}:${name}`, properties);
    }

    // Future: Add additional analytics services
    // this.trackAmplitude(name, properties);
    // this.trackMixpanel(name, properties);
  }

  /**
   * Track a successful lookup
   */
  public trackLookupSuccess(
    type: 'quick' | 'bulk',
    properties: EventProperties
  ) {
    this.trackEvent(
      EventCategory.LOOKUP,
      type === 'quick' ? EventName.QUICK_LOOKUP : EventName.BULK_LOOKUP,
      { ...properties, status: 'success' }
    );
  }

  /**
   * Track a lookup error
   */
  public trackLookupError(
    type: 'quick' | 'bulk',
    error: string,
    properties: EventProperties
  ) {
    this.trackEvent(
      EventCategory.LOOKUP,
      type === 'quick' ? EventName.QUICK_LOOKUP : EventName.BULK_LOOKUP,
      { ...properties, status: 'error', error }
    );
  }

  /**
   * Track user interactions
   */
  public trackInteraction(
    name: typeof EventName[keyof typeof EventName],
    properties: EventProperties
  ) {
    this.trackEvent(EventCategory.INTERACTION, name, properties);
  }

  /**
   * Track premium feature usage
   */
  public trackPremiumFeature(
    feature: string,
    properties: EventProperties
  ) {
    this.trackEvent(
      EventCategory.PREMIUM,
      EventName.PREMIUM_FEATURE_ACCESS,
      { ...properties, feature }
    );
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// Type declaration for Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      params: { [key: string]: any }
    ) => void;
  }
} 