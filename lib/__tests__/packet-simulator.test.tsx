import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import PacketSimulator from '@/components/PacketSimulator'

describe('PacketSimulator component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders and simulates packet flow without throwing', () => {
    render(<PacketSimulator />)
    const injectBtn = screen.getByText(/\$ Inject Packet/i)
    expect(injectBtn).toBeTruthy()

    act(() => {
      fireEvent.click(injectBtn)
    })

    // Advance through the stages
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(screen.getByText(/\[PARSER\]/i)).toBeTruthy()

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(screen.getByText(/\[CLASSIFIER\]/i)).toBeTruthy()

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(screen.getByText(/\[VERDICT\]/i)).toBeTruthy()
  })

  it('switches between presets and tabs without crashing', () => {
    render(<PacketSimulator />)
    const archBtn = screen.getByText(/\$ c\+\+-architecture/i)

    act(() => {
      fireEvent.click(archBtn)
    })
    expect(screen.getByText(/Zero-Copy Buffer Pool/i)).toBeTruthy()

    const flowBtn = screen.getByText(/\$ flow-inspector/i)
    act(() => {
      fireEvent.click(flowBtn)
    })
    expect(screen.getByText(/Select Network Frame/i)).toBeTruthy()
  })
})
