# DropSight

A web utility for Flow blockchain Cadence & EVM address lookup

## Features

- Quick lookup for single Flow addresses
- Bulk lookup via CSV upload
- Network selection (Mainnet/Testnet) with persistent user preference
- Copy to clipboard functionality
- Direct links to Flowscan
- Keyboard shortcut (`/`) for quick lookup
- EVM address lookup support (Mainnet only)

## Prerequisites

- Node.js (v18 or later recommended)
- A Flipside API key (for EVM address lookups)

## Environment Variables

Create a `.env.local` file in the root directory with the following:

```bash
FLIPSIDE_API_KEY=your_flipside_api_key_here
```

Note: Never commit your `.env.local` file or expose your API keys.

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables as described above
4. Run the development server:
```bash
npm run dev
```

## Deployment

The application is automatically deployed to Vercel:

- Push to `main` branch for production deployment
- Push to `staging` branch for staging deployment at staging.flow-evm-lookup.vercel.app

### Environment Setup on Vercel

1. Add your `FLIPSIDE_API_KEY` in the Vercel project settings under Environment Variables
2. Ensure the variable is added to all deployment environments (Production, Preview, Development)

### Network Selection

The application supports both Mainnet and Testnet networks through a single deployment:
- Users can switch between networks using the network selector in the UI
- Network preference is persisted in the browser's localStorage
- EVM address lookup is only available on Mainnet
- No environment variables needed for network configuration

## API Routes

The application includes a server-side API route for secure Flipside queries:

- `/api/flipside` - POST endpoint for EVM address lookups
  - Requires a valid Flipside API key in server environment
  - Handles address formatting and query execution
  - Returns sanitized response data

## Contributing

1. Fork the repository
2. Create your feature branch
3. Ensure environment variables are properly set up
4. Make your changes
5. Submit a pull request

## Security Notes

- API keys are handled server-side only
- Environment variables without `NEXT_PUBLIC_` prefix are never exposed to the client
- All user input is sanitized before processing
