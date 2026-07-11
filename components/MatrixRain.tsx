'use client'

import { useEffect, useRef } from 'react'

const KATAKANA =
  'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'

interface Props {
  active: boolean
}

export default function MatrixRain({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -canvas.height / fontSize)
    )

    const frameRate = 45
    let id: ReturnType<typeof setTimeout>

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 13, 18, 0.045)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = KATAKANA[Math.floor(Math.random() * KATAKANA.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillStyle = `hsla(${120 + Math.random() * 40}, 100%, ${50 + Math.random() * 30}%, 0.${Math.floor(30 + Math.random() * 50)})`
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      id = setTimeout(draw, frameRate)
    }

    draw()

    return () => {
      clearTimeout(id)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{ opacity: active ? 0.35 : 0, transition: 'opacity 0.6s ease' }}
    />
  )
}
