// Web Audio API synthesized terminal sounds (zero external assets needed)

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        audioCtx = new AudioContextClass()
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {})
    }
    return audioCtx
  } catch {
    return null
  }
}

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (typeof localStorage === 'undefined' || !localStorage) return false
    return localStorage.getItem('terminal_sound') === 'true'
  } catch {
    return false
  }
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return
  try {
    if (typeof localStorage !== 'undefined' && localStorage) {
      localStorage.setItem('terminal_sound', enabled ? 'true' : 'false')
    }
  } catch {}
}

export function playKeyClick(): void {
  try {
    if (!isSoundEnabled()) return
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.03)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.03)
  } catch {
    // Audio context may be restricted by autoplay policy or unsupported
  }
}

export function playSuccessBeep(): void {
  try {
    if (!isSoundEnabled()) return
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.06) // E5
    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.12) // G5

    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.22)
  } catch {
    // Ignore autoplay restriction or audio context errors
  }
}
