import { HardwarePanel } from "@/components/hardware-panel";
import { SpectrumAnalyzer } from "@/components/spectrum-analyzer";
import { WaitlistForm } from "@/components/waitlist-form";

function SettingsIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.375 3.375 0 0 0 13.125 11h-2.25A3.375 3.375 0 0 0 7.5 14.25v4.5m6-6V6.75A2.25 2.25 0 0 0 11.25 4.5h-.75a2.25 2.25 0 0 0-2.25 2.25V9" />
    </svg>
  );
}

function RadioIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black font-sans">
      {/* ─── HEADER ─── */}
      <header className="border-b border-zinc-800 bg-zinc-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <span className="font-mono text-sm font-bold tracking-widest text-amber-500">
            OPEN HAM AWARDS
          </span>

          {/* Nav */}
          <nav className="hidden items-center gap-1 font-mono text-xs sm:flex">
            <a
              href="https://github.com/OpenHamAwards/open-ham-awards"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm px-3 py-1.5 text-zinc-500 transition hover:text-zinc-300"
            >
              CONTRIBUTE
            </a>
          </nav>

        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="hero-gradient">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-24">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            {/* Headline */}
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Run your club&apos;s{" "}
              <span className="text-amber-500">Ham Radio</span> contests{" "}
              <span className="text-amber-400">without the bloat.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-5 max-w-lg font-mono text-sm leading-relaxed text-zinc-400">
              The professional open-source platform for managing rankings,
              activators, and automated log cross-validation. Precision
              engineered for the amateur radio community.
            </p>

            {/* Waitlist form */}
            <WaitlistForm />
          </div>

          {/* Right column — Spectrum Analyzer */}
          <div className="flex items-center">
            <SpectrumAnalyzer />
          </div>
        </div>
      </section>

      {/* ─── FEATURE GRID ─── */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {/* Custom Award Engine */}
          <HardwarePanel>
            <div className="mb-3 text-amber-500">
              <AwardIcon />
            </div>
            <h3 className="font-mono text-sm font-bold tracking-wide text-zinc-100">
              CUSTOM AWARD ENGINE
            </h3>
            <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-400">
              Easily define award parameters, locations, and scoring
              criteria for your specific club event. No hardcoded
              logic, total flexibility.
            </p>
          </HardwarePanel>

          {/* Activator Hub */}
          <HardwarePanel>
            <div className="mb-3 text-amber-500">
              <RadioIcon />
            </div>
            <h3 className="font-mono text-sm font-bold tracking-wide text-zinc-100">
              ACTIVATOR ANNOUNCEMENTS
            </h3>
            <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-400">
              Operators schedule planned activations directly on
              the platform, building hype for the hunters across
              the bands.
            </p>
          </HardwarePanel>

          {/* Live Progress */}
          <HardwarePanel>
            <div className="mb-3 text-amber-500">
              <ChartIcon />
            </div>
            <h3 className="font-mono text-sm font-bold tracking-wide text-zinc-100">
              LIVE PROGRESS
            </h3>
            <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-400">
              Dynamic ranking boards and live leaderboards
              with sub-second update cycles for ultimate
              award transparency.
            </p>
            {/* Mock leaderboard */}
            <div className="mt-4 space-y-1.5 border-t border-zinc-700 pt-3 font-mono text-xs">
              {[
                { rank: 1, call: "XX1RF", pts: "48,200" },
                { rank: 2, call: "ZZ3HAM", pts: "41,875" },
                { rank: 3, call: "QQ7DX", pts: "39,100" },
                { rank: 4, call: "XX9CW", pts: "36,450" },
              ].map((entry) => (
                <div
                  key={entry.rank}
                  className="flex items-center justify-between"
                >
                  <span className="text-zinc-500">
                    {entry.rank}.{" "}
                    <span className="text-zinc-300">{entry.call}</span>
                  </span>
                  <span className="text-amber-500/80">{entry.pts} PTS</span>
                </div>
              ))}
            </div>
          </HardwarePanel>

          {/* Painless Validation — spans full width, two-column interior */}
          <HardwarePanel className="sm:col-span-2 lg:col-span-3">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
              {/* Left — text content */}
              <div className="flex flex-1 items-start gap-4">
                <div className="mt-0.5 shrink-0 text-amber-500">
                  <CheckCircleIcon />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold tracking-wide text-zinc-100">
                    PAINLESS VALIDATION
                  </h3>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-400">
                    Stop chasing log formatting problems. Our automated engine
                    cross-references hunter and activator logs to generate
                    validated award and contest tracking instantly. Flagging
                    discrepancies with forensic precision. No more chasing ADIF
                    errors via email thread.
                  </p>
                </div>
              </div>

              {/* Right — terminal-style validation output */}
              <div className="shrink-0 rounded-sm border border-zinc-700 bg-black/80 px-4 py-3 font-mono text-[11px] leading-relaxed lg:w-[340px]">
                <p className="text-zinc-500">
                  VALIDATING:{" "}
                  <span className="text-zinc-300">ADIF_UPLOAD_2024_03.LOG</span>
                </p>
                <p className="mt-1.5 text-zinc-500">
                  Parsing QSO: XX1RF-ZZ3HAM (20M/CW) ...{" "}
                  <span className="text-emerald-400">PASS</span>
                </p>
                <p className="text-zinc-500">
                  Parsing QSO: XX1RF-QQ7DX (40M/FT8) ...{" "}
                  <span className="text-emerald-400">PASS</span>
                </p>
                <p className="text-zinc-500">
                  Parsing QSO: XX1RF-XX9CW (15M/SSB) ...{" "}
                  <span className="text-amber-500">WARN:</span>
                </p>
                <p className="ml-4 text-amber-500/80">BAND_MISMATCH</p>
                <p className="mt-1.5 border-t border-zinc-800 pt-1.5 text-zinc-500">
                  System check completed.{" "}
                  <span className="text-zinc-300">98.4% Accuracy.</span>
                </p>
              </div>
            </div>
          </HardwarePanel>
        </div>
      </section>

      {/* ─── SPECS & CLOUD ROW ─── */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 lg:grid-cols-2">
          {/* Technical Specifications */}
          <HardwarePanel>
            <h3 className="mb-4 font-mono text-xs font-bold tracking-widest text-zinc-500">
              TECHNICAL_SPECIFICATIONS_V1.0
            </h3>
            <table className="w-full font-mono text-xs">
              <tbody>
                {[
                  ["LICENSE", "AGPL-3.0 (OPEN SOURCE)"],
                  ["LOG FORMATS", "ADIF 3.1.4, CABRILLO V3"],
                  ["CORE STACK", "NEXT.JS / NEST.JS"],
                  ["DATABASE", "POSTGRESQL (RELATIONAL)"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-zinc-700/50">
                    <td className="py-2 pr-4 text-zinc-500">{label}</td>
                    <td className="py-2 text-zinc-300">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </HardwarePanel>

          {/* Managed Cloud Service */}
          <HardwarePanel>
            <h3 className="mb-4 font-mono text-sm font-bold tracking-wide text-amber-500">
              MANAGED CLOUD SERVICE
            </h3>
            <p className="font-mono text-xs leading-relaxed text-zinc-400">
              The core engine is and always will be open source and free to
              self-host. Deploy it on your own hardware, your own terms.
              For clubs that want zero operational overhead, a Managed Cloud
              service will be available post-product build — handling
              infrastructure, backups, and updates so you can focus on
              what matters: running contests.
            </p>
          </HardwarePanel>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-zinc-800 bg-zinc-900/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <p className="font-mono text-[11px] text-zinc-600">
            &copy; 2025-2026 OPEN HAM AWARDS | LICENSED UNDER AGPLv3
          </p>
        </div>
      </footer>
    </div>
  );
}
