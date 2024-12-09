import { ImageResponse } from '@vercel/og'
 
export const runtime = 'edge'
 
export async function GET() {
  const jetBrainsMonoMedium = await fetch(
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500',
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    }
  ).then((res) => res.arrayBuffer())
 
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090B',
          padding: 80,
          gap: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontFamily: 'JetBrains Mono',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            DropSight <span style={{ fontSize: 72 }}>🎯</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            fontFamily: 'JetBrains Mono',
            color: '#A1A1AA',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Look up cross-VM account associations on Flow blockchain
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: '#22C55E',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 24,
              fontFamily: 'JetBrains Mono',
            }}
          >
            mainnet
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'currentColor',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: '#3B82F6',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 24,
              fontFamily: 'JetBrains Mono',
            }}
          >
            testnet
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'currentColor',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: jetBrainsMonoMedium,
          style: 'normal',
        },
      ],
    },
  )
} 