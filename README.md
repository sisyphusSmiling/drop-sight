# Flow Address Lookup

A web utility for Flow blockchain address lookup with CSV input and Cadence script integration.

## Features

- Quick lookup for single Flow addresses
- Bulk lookup via CSV upload
- Network selection (Mainnet/Testnet) with persistent user preference
- Copy to clipboard functionality
- Direct links to Flowscan
- Keyboard shortcut (`/`) for quick lookup

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

- Push to `main` branch for production deployment
- Push to `develop` branch for preview deployment

### Network Selection

The application supports both Mainnet and Testnet networks through a single deployment:
- Users can switch between networks using the network selector in the UI
- Network preference is persisted in the browser's localStorage
- No environment variables or separate deployments needed

### Vercel Configuration

The project uses standard Next.js build settings in Vercel:
- Framework Preset: Next.js
- Build Command: `next build` (auto-detected)
- Install Command: `npm install` (auto-detected)
- Output Directory: `.next` (auto-detected)
