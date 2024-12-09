# Flow Address Lookup

A web utility for Flow blockchain address lookup with CSV input and Cadence script integration.

## Deployment Environments

The application supports two deployment environments:

- **Mainnet** (Production): Deployed from the `main` branch
- **Testnet** (Development): Deployed from the `develop` branch

### Environment Variables

Set the following environment variables in your Vercel project:

For Mainnet (Production):
```bash
NEXT_PUBLIC_FLOW_NETWORK=mainnet
```

For Testnet (Development):
```bash
NEXT_PUBLIC_FLOW_NETWORK=testnet
```

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```

## Deployment

The application is automatically deployed to Vercel:

- Push to `main` branch for Mainnet deployment
- Push to `develop` branch for Testnet deployment

### Vercel Configuration

The project uses standard Next.js build settings in Vercel:

- **Build Command**: `next build`
- **Install Command**: `npm install`
- **Output Directory**: `.next` (automatically detected)
- **Framework Preset**: Next.js

These settings are automatically detected by Vercel, but they're also explicitly defined in `vercel.json` for clarity.

Each environment will use its respective configuration based on the `NEXT_PUBLIC_FLOW_NETWORK` environment variable.
