import type { SpectrumStrings } from "@/i18n/types";

// Deterministic seeded PRNG — produces the same "random" spectrum on every
// render / SSR pass so React hydration never mismatches.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Shape helpers — each returns a y‑offset to subtract from the noise floor.
// All values are in SVG‑coordinate pixels (0 = top, 160 = bottom).

/** Gaussian‑ish bell used to envelope every signal. */
function gaussian(x: number, center: number, width: number): number {
  const d = (x - center) / width;
  return Math.exp(-0.5 * d * d);
}

interface Signal {
  /** Centre x‑coordinate in the 500‑wide viewBox. */
  center: number;
  /** Gaussian σ — controls how wide the signal appears. */
  width: number;
  /** Peak amplitude in SVG px (how far above noise floor). */
  amplitude: number;
  /**
   * Optional micro‑peak modulation depth (0–1).
   * > 0 adds internal "ragged" peaks to simulate SSB voice.
   */
  modulation?: number;
  /** Modulation period in x‑pixels. */
  modPeriod?: number;
}

function generateSpectrum(): string {
  const rand = mulberry32(42);
  const WIDTH = 500;
  const POINTS = 200; // high‑resolution polyline
  const STEP = WIDTH / (POINTS - 1);

  // Noise floor sits between y = 136 and y = 144 (85%–90% of 160).
  const NOISE_BASE = 140;
  const NOISE_AMP = 4;

  // ── Signal definitions ──────────────────────────────────────────────
  const signals: Signal[] = [
    // 1. Main SSB station at 14.225 MHz  →  x ≈ 250 (centre of 500)
    {
      center: 250,
      width: 22,
      amplitude: 115,
      modulation: 0.35,
      modPeriod: 5,
    },
    // 2. CW pileup — three tight peaks just below the main station
    { center: 190, width: 6, amplitude: 55, modulation: 0.5, modPeriod: 3 },
    { center: 200, width: 5, amplitude: 45, modulation: 0.4, modPeriod: 2.5 },
    { center: 208, width: 5, amplitude: 50, modulation: 0.45, modPeriod: 3 },
    // 3. Broad digital station (FT8‑like plateau)
    { center: 340, width: 30, amplitude: 30, modulation: 0.15, modPeriod: 8 },
    // 4. Faint distant SSB
    { center: 110, width: 14, amplitude: 25, modulation: 0.25, modPeriod: 6 },
  ];

  const points: string[] = [];

  for (let i = 0; i < POINTS; i++) {
    const x = i * STEP;

    // Base noise floor with jitter
    let y = NOISE_BASE + (rand() * 2 - 1) * NOISE_AMP;

    // Subtract each signal's contribution
    for (const sig of signals) {
      const env = gaussian(x, sig.center, sig.width) * sig.amplitude;
      if (env < 0.5) continue; // skip negligible contributions

      // Internal micro‑peak modulation
      let mod = 1;
      if (sig.modulation && sig.modPeriod) {
        // Deterministic per‑point modulation using sin + noise
        mod =
          1 -
          sig.modulation *
            (0.5 +
              0.5 * Math.sin((x / sig.modPeriod) * Math.PI * 2) * (0.6 + 0.4 * rand()));
      }

      y -= env * mod;
    }

    // Clamp so nothing goes above the SVG top
    y = Math.max(4, Math.min(y, 156));

    points.push(i === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return points.join(" ");
}

// Pre‑compute once at module level so it's the same on server & client.
const tracePath = generateSpectrum();
const fillPath = `M0,160 ${tracePath.replace(/^M[\d.]+,[\d.]+/, "L0,144")} L500,160 Z`;

export function SpectrumAnalyzer({ strings: sp }: { strings: SpectrumStrings }) {
  return (
    <div className="w-full rounded-none border border-zinc-800 bg-black/60 p-4 panel-inset">
      {/* Header labels */}
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] text-zinc-500">
        <span>
          {sp.centerLabel} <span className="text-zinc-300">{sp.centerValue}</span>
        </span>
        <span>
          {sp.spanLabel} <span className="text-zinc-300">{sp.spanValue}</span>
        </span>
      </div>

      {/* Spectrum SVG — wide aspect ratio */}
      <div className="relative mt-2">
        <svg
          viewBox="0 0 500 160"
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
          {/* Horizontal grid lines */}
          {[0, 32, 64, 96, 128, 160].map((y) => (
            <line
              key={`h-${y}`}
              x1="0"
              y1={y}
              x2="500"
              y2={y}
              stroke="#27272a"
              strokeWidth="0.5"
            />
          ))}
          {/* Vertical grid lines */}
          {[0, 62.5, 125, 187.5, 250, 312.5, 375, 437.5, 500].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="160"
              stroke="#27272a"
              strokeWidth="0.5"
            />
          ))}

          {/* Spectrum gradient fill */}
          <path d={fillPath} fill="url(#spectrumGradient)" opacity="0.3" />

          {/* Main signal trace with glow */}
          <path
            d={tracePath}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 3px rgba(245, 158, 11, 0.6))",
            }}
          />

          <defs>
            <linearGradient
              id="spectrumGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom frequency labels */}
      <div className="mt-2 flex justify-between font-mono text-[9px] text-zinc-600">
        <span>14.175</span>
        <span>14.200</span>
        <span className="text-amber-500/70">{sp.centerValue}</span>
        <span>14.250</span>
        <span>14.275</span>
      </div>
      <div className="mt-1 flex justify-between font-mono text-[9px] text-zinc-600">
        <span>{sp.centerLabel} {sp.centerValue}</span>
        <span>{sp.spanLabel} {sp.spanValue}</span>
      </div>
    </div>
  );
}
