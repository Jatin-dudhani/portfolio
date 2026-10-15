'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { playKeyClick, playSuccessBeep } from '@/lib/sound'

type PacketPreset = {
  id: string
  name: string
  protocol: 'TCP' | 'UDP' | 'TLS' | 'HTTP'
  src: string
  dst: string
  sniOrHost: string
  classification: string
  verdict: 'FORWARD' | 'DROP'
  ruleApplied: string
  hexSnippet: string
  details: string
}

const PRESETS: PacketPreset[] = [
  {
    id: 'youtube',
    name: 'TLS Client Hello (YouTube)',
    protocol: 'TLS',
    src: '192.168.1.105:54210',
    dst: '142.250.190.46:443',
    sniOrHost: 'www.youtube.com',
    classification: 'YouTube Streaming',
    verdict: 'DROP',
    ruleApplied: 'Rule #12: Block Video Streaming on Corporate VLAN',
    hexSnippet: '16 03 01 01 2f 01 00 01 2b 03 03 ... 00 00 13 77 77 77 2e 79 6f 75 74 75 62 65 2e 63 6f 6d',
    details: 'Extracted Server Name Indication (SNI) from plaintext TLS 1.3 Client Hello handshake.',
  },
  {
    id: 'github',
    name: 'TLS Client Hello (GitHub)',
    protocol: 'TLS',
    src: '192.168.1.105:51842',
    dst: '140.82.121.4:443',
    sniOrHost: 'github.com',
    classification: 'GitHub / Git Protocol',
    verdict: 'FORWARD',
    ruleApplied: 'Rule #01: Whitelist Developer Infrastructure',
    hexSnippet: '16 03 03 00 e5 01 00 00 e1 03 03 ... 00 0a 00 00 07 67 69 74 68 75 62 2e 63 6f 6d',
    details: 'Matched developer tooling signature. Flow forwarded to internal worker threads.',
  },
  {
    id: 'tiktok',
    name: 'DNS Query (TikTok / ByteDance)',
    protocol: 'UDP',
    src: '192.168.1.105:53211',
    dst: '8.8.8.8:53',
    sniOrHost: 'api.tiktokv.com',
    classification: 'TikTok / ByteDance App',
    verdict: 'DROP',
    ruleApplied: 'Rule #08: Blacklist Entertainment & Tracker Domains',
    hexSnippet: '7b 21 01 00 00 01 00 00 00 00 ... 03 61 70 69 07 74 69 6b 74 6f 6b 76 03 63 6f 6d',
    details: 'DNS payload parsed via recursive label decoder. Matched blacklist pattern.',
  },
  {
    id: 'http',
    name: 'HTTP GET /api/v1/health',
    protocol: 'HTTP',
    src: '10.0.0.12:49812',
    dst: '10.0.0.1:80',
    sniOrHost: 'internal.service.local',
    classification: 'Internal Microservice',
    verdict: 'FORWARD',
    ruleApplied: 'Rule #02: Allow Health Check Probes',
    hexSnippet: '47 45 54 20 2f 61 70 69 2f 76 31 2f 68 65 61 6c 74 68 20 48 54 54 50 2f 31 2e 31',
    details: 'L7 HTTP Header inspection. Valid HTTP/1.1 method and sanitized target uri.',
  },
]

export default function PacketSimulator() {
  const [selected, setSelected] = useState<PacketPreset>(PRESETS[0])
  const [stage, setStage] = useState<number>(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeTab, setActiveTab] = useState<'simulator' | 'architecture'>('simulator')
  const [stats, setStats] = useState({ total: 142, forwarded: 124, dropped: 18 })
  const [log, setLog] = useState<string[]>([
    '[DPI Engine C++17] Multi-threaded worker pool online (4 threads)',
    '[RuleEngine] Loaded 25 application classifiers + 14 security rules',
    'Ready. Select a packet profile and click "Inject Packet".',
  ])

  const runSimulation = (preset: PacketPreset) => {
    if (isSimulating) return
    playKeyClick()
    setIsSimulating(true)
    setStage(1)

    setLog((prev) => [
      `[INGEST] Packet received from ${preset.src} → ${preset.dst} (${preset.protocol})`,
      ...prev.slice(0, 7),
    ])

    setTimeout(() => {
      setStage(2)
      setLog((prev) => [
        `[PARSER] Unpacked Ethernet/IP/${preset.protocol}. Discovered identifier: "${preset.sniOrHost}"`,
        ...prev,
      ])
    }, 450)

    setTimeout(() => {
      setStage(3)
      setLog((prev) => [
        `[CLASSIFIER] Matched signature: ${preset.classification}`,
        ...prev,
      ])
    }, 900)

    setTimeout(() => {
      setStage(4)
      const isDrop = preset.verdict === 'DROP'
      setStats((s) => ({
        total: s.total + 1,
        forwarded: isDrop ? s.forwarded : s.forwarded + 1,
        dropped: isDrop ? s.dropped + 1 : s.dropped,
      }))

      setLog((prev) => [
        `[VERDICT] ${preset.verdict} — ${preset.ruleApplied}`,
        ...prev,
      ])

      if (isDrop) {
        playKeyClick()
      } else {
        playSuccessBeep()
      }
      setIsSimulating(false)
    }, 1350)
  }

  return (
    <section id="dpi-simulator" className="py-20 font-mono text-[var(--foreground)]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm text-[var(--green)]">
            $ <span className="text-[var(--muted)]">./dpi_engine_mt</span> --interactive --inspect
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
            <h2 className="text-2xl font-bold"># Live C++ DPI Packet Simulator</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-[var(--muted)]">
                <span className="size-2 rounded-full bg-[var(--green)] animate-pulse" />
                DPI Thread Pool: 4 workers
              </span>
              <span className="text-[var(--muted)]">|</span>
              <span className="text-[var(--green)]">Forwarded: {stats.forwarded}</span>
              <span className="text-[var(--red)]">Dropped: {stats.dropped}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <p className="text-xs text-[var(--muted)] max-w-2xl">
              Simulate deep packet inspection using the architecture from Jatin&apos;s C++ DPI engine.
              Inject test network frames and watch zero-copy packet dissection, TLS SNI extraction, and rule enforcement in action.
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  playKeyClick()
                  setActiveTab('simulator')
                }}
                className={`px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
                  activeTab === 'simulator'
                    ? 'border-[var(--green)] bg-[var(--green)]/15 text-[var(--green)] font-semibold'
                    : 'border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                $ flow-inspector
              </button>
              <button
                onClick={() => {
                  playKeyClick()
                  setActiveTab('architecture')
                }}
                className={`px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'border-[var(--green)] bg-[var(--green)]/15 text-[var(--green)] font-semibold'
                    : 'border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                $ c++-architecture
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'architecture' ? (
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3">
              <div className="text-xs font-bold text-[var(--green)]">
                # C++17 Multi-Threaded Engine Internals & Zero-Copy Pipeline
              </div>
              <span className="text-[10px] text-[var(--muted)]">Target: 10 Gbps Line-Rate &bull; Multi-Core</span>
            </div>

            <pre className="overflow-x-auto text-[10px] sm:text-[11px] leading-relaxed font-mono p-4 rounded bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)]">
{`┌──────────────────────────────────────────────────────────────────────────────────┐
│                   C++ MULTI-THREADED DPI ENGINE ARCHITECTURE                     │
│                                                                                  │
│  [NIC / PCAP Interface]                                                          │
│         │                                                                        │
│         ▼ (Zero-Copy Buffer Pool: std::span<const uint8_t>)                      │
│  [SPSC Ring Buffer Queue] ──────────┐                                            │
│         │                           │                                            │
│         ▼                           ▼                                            │
│  ┌───────────────┐           ┌───────────────┐                                   │
│  │ Worker #1     │           │ Worker #2     │  ... [Worker #3 & #4]             │
│  │ Dissection    │           │ Dissection    │                                   │
│  └───────┬───────┘           └───────┬───────┘                                   │
│          │                           │                                           │
│          └─────────────┬─────────────┘                                           │
│                        ▼                                                         │
│     [L2 Ethernet / L3 IPv4 & IPv6 / L4 TCP & UDP Header Parsing]                 │
│                        │                                                         │
│                        ▼                                                         │
│     [L7 State Machine: TLS SNI Extractor & DNS Recursive Label Decoder]          │
│                        │                                                         │
│                        ▼                                                         │
│     [Rule Engine: Aho-Corasick Multi-Pattern Trie + Port Mapping (25+ Rules)]    │
│                        │                                                         │
│              ┌─────────┴─────────┐                                               │
│              ▼                   ▼                                               │
│      [VERDICT: FORWARD]   [VERDICT: DROP & LOG]                                  │
└──────────────────────────────────────────────────────────────────────────────────┘`}
            </pre>

            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded border border-[var(--card-border)] bg-[var(--background)]/40 p-3">
                <div className="text-[var(--green)] font-bold text-[11px]">01. Zero-Copy Dissection</div>
                <p className="mt-1 text-[10px] text-[var(--muted)] leading-relaxed">
                  Zero-allocation packet slices using pointer arithmetic over raw ethernet frames, eliminating heap allocations in the critical packet path.
                </p>
              </div>
              <div className="rounded border border-[var(--card-border)] bg-[var(--background)]/40 p-3">
                <div className="text-[var(--amber)] font-bold text-[11px]">02. Lock-Free Threading</div>
                <p className="mt-1 text-[10px] text-[var(--muted)] leading-relaxed">
                  Single-producer single-consumer ring buffers distributing flow hash buckets across dedicated worker cores without mutex contention.
                </p>
              </div>
              <div className="rounded border border-[var(--card-border)] bg-[var(--background)]/40 p-3">
                <div className="text-[var(--green-bright)] font-bold text-[11px]">03. L7 SNI Classifier</div>
                <p className="mt-1 text-[10px] text-[var(--muted)] leading-relaxed">
                  Stateful TLS 1.2/1.3 Client Hello parser traversing extension records to isolate domain targets without certificate decryption overhead.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left panel: Controls & Pipeline Visualizer */}
            <div className="space-y-4">
              <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
                <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
                  Select Network Frame:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        playKeyClick()
                        setSelected(p)
                        setStage(0)
                      }}
                      className={`text-left rounded border p-2.5 transition-all duration-150 cursor-pointer ${
                        selected.id === p.id
                          ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--foreground)]'
                          : 'border-[var(--card-border)] bg-[var(--background)]/40 text-[var(--muted)] hover:border-[var(--card-border)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{p.protocol}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            p.verdict === 'FORWARD'
                              ? 'bg-[var(--green)]/20 text-[var(--green)]'
                              : 'bg-[var(--red)]/20 text-[var(--red)]'
                          }`}
                        >
                          {p.verdict}
                        </span>
                      </div>
                      <div className="text-[11px] truncate mt-1 text-[var(--foreground)] font-medium">
                        {p.name}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 pt-3 border-t border-[var(--card-border)]">
                  <div className="text-xs text-[var(--muted)] truncate">
                    Target: <span className="text-[var(--green)]">{selected.sniOrHost}</span>
                  </div>
                  <button
                    onClick={() => runSimulation(selected)}
                    disabled={isSimulating}
                    className="rounded border border-[var(--green)] bg-[var(--green)] px-4 py-2 text-xs font-bold text-[var(--background)] transition-all duration-200 hover:shadow-[0_0_18px_rgba(63,185,80,0.4)] disabled:opacity-50 cursor-pointer"
                  >
                    {isSimulating ? '$ dissecting...' : '$ Inject Packet ➔'}
                  </button>
                </div>
              </div>

              {/* Pipeline Stage Cards */}
              <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
                <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider block mb-3">
                  Dissection Pipeline:
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    { num: '01', title: 'PCAP Ingest', desc: 'Raw Frame' },
                    { num: '02', title: 'Parse L2-L4', desc: 'IP / TCP' },
                    { num: '03', title: 'SNI Extract', desc: selected.protocol },
                    { num: '04', title: 'Verdict', desc: selected.verdict },
                  ].map((step, idx) => {
                    const stepNum = idx + 1
                    const isCurrent = stage === stepNum
                    const isDone = stage >= stepNum

                    return (
                      <motion.div
                        key={step.num}
                        animate={{
                          scale: isCurrent ? 1.05 : 1,
                        }}
                        className={`rounded border p-2 flex flex-col items-center justify-center transition-colors ${
                          isDone
                            ? isCurrent
                              ? 'border-[var(--green)] bg-[var(--green)]/15 text-[var(--green)] shadow-[0_0_12px_rgba(63,185,80,0.2)]'
                              : 'border-[var(--green)]/40 bg-[var(--green)]/5 text-[var(--green)]'
                            : 'border-[var(--card-border)] bg-[var(--background)]/30 text-[var(--muted)]'
                        }`}
                      >
                        <span className="text-[10px] font-bold opacity-60">{step.num}</span>
                        <span className="text-[11px] font-bold mt-0.5 truncate w-full">{step.title}</span>
                        <span className="text-[9px] text-[var(--muted)] mt-0.5">{step.desc}</span>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Hex Preview */}
                <div className="mt-4 pt-3 border-t border-[var(--card-border)]">
                  <div className="flex items-center justify-between text-[10px] text-[var(--muted)] mb-1">
                    <span>RAW PAYLOAD HEX STREAM:</span>
                    <span>L7 OFFSET: 0x0040</span>
                  </div>
                  <div className="rounded bg-[var(--background)] p-2.5 text-[10px] leading-relaxed font-mono text-[var(--muted)] overflow-x-auto border border-[var(--card-border)]/50">
                    <span className="text-[var(--green)]">{selected.hexSnippet}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel: Terminal Inspection Logs */}
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4 flex flex-col h-full min-h-[340px]">
              <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[var(--red)]" />
                  <span className="size-2.5 rounded-full bg-[var(--amber)]" />
                  <span className="size-2.5 rounded-full bg-[var(--green)]" />
                  <span className="ml-2 text-xs text-[var(--muted)]">dpi-worker-log.stdout</span>
                </div>
                <button
                  onClick={() => setLog([])}
                  className="text-[10px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                >
                  clear
                </button>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto text-xs leading-5">
                <AnimatePresence initial={false}>
                  {log.map((item, i) => (
                    <motion.div
                      key={`${item}-${i}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`font-mono ${
                        item.includes('[VERDICT] DROP')
                          ? 'text-[var(--red)] font-semibold'
                          : item.includes('[VERDICT] FORWARD')
                          ? 'text-[var(--green)] font-semibold'
                          : item.includes('[PARSER]')
                          ? 'text-[var(--amber)]'
                          : item.includes('[CLASSIFIER]')
                          ? 'text-[var(--green-bright)]'
                          : 'text-[var(--muted)]'
                      }`}
                    >
                      {item}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--card-border)] text-[11px] text-[var(--muted)] flex items-center justify-between">
                <span>Engine: C++17 / Zero-Copy Parser</span>
                <span className="text-[var(--green)]">Active Classifiers: 25+</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
