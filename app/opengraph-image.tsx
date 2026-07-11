import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Jatin Dudhani — Full-Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0a0d12',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          padding: 60,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ fontSize: 28, color: '#3fb950' }}>$ cat /home/jatin</div>
          <div style={{ fontSize: 64, fontWeight: 700, color: '#c9d1d9' }}>jatin-dudhani</div>
          <div style={{ fontSize: 32, color: '#8b949e' }}>
            Full-Stack Developer &bull; DevOps / Cloud
          </div>
          <div style={{ fontSize: 22, color: '#8b949e', marginTop: 8 }}>
            React &bull; Next.js &bull; TypeScript &bull; C++ &bull; AWS &bull; Docker
          </div>
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              gap: 12,
              color: '#3fb950',
              fontSize: 18,
            }}
          >
            <span>github.com/Jatin-dudhani</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
