import Link from "next/link";
import { notFound } from "next/navigation";
import { HardwarePanel } from "@/components/hardware-panel";
import { SpectrumAnalyzer } from "@/components/spectrum-analyzer";
import { WaitlistForm } from "@/components/waitlist-form";
import { getDictionary, hasLocale } from "./dictionaries";

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

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { header: h, hero, features: f, specs: s, footer: ft } = dict;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black font-sans">
      {/* ─── HEADER ─── */}
      <header className="border-b border-zinc-800 bg-zinc-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3 sm:px-12">
          {/* Logo */}
          <Link href={`/${lang}`} className="whitespace-nowrap font-mono text-xs font-bold tracking-widest text-amber-500 md:text-sm">
            {h.logo}
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1 font-mono text-[10px] md:text-xs">
            <a
              href="https://www.qrz.com/db/EA5JMC"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-2 py-1.5 text-zinc-500 transition hover:text-zinc-300 md:px-3"
            >
              {h.opLabel}
            </a>
            <a
              href="https://github.com/OpenHamAwards/open-ham-awards"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-2 py-1.5 text-zinc-500 transition hover:text-zinc-300 md:px-3"
            >
              {h.contribute}
            </a>
          </nav>

        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="hero-gradient">
        <div className="mx-auto grid max-w-7xl gap-4 px-8 py-10 sm:px-12 lg:grid-cols-2 lg:gap-8 lg:py-14">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            {/* Headline */}
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {hero.headlinePre}{" "}
              <span className="text-amber-500">{hero.headlineHighlight}</span> {hero.headlineMid}{" "}
              <span className="text-amber-400">{hero.headlineTail}</span>
            </h1>

            {/* Subtext */}
            <p className="mt-3 max-w-[600px] font-mono text-base leading-relaxed text-zinc-400 md:text-xl">
              {hero.subtext}
            </p>

            {/* Waitlist form */}
            <WaitlistForm strings={dict.waitlist} />
          </div>

          {/* Right column — Spectrum Analyzer */}
          <div className="flex items-center">
            <SpectrumAnalyzer strings={dict.spectrum} />
          </div>
        </div>
      </section>

      {/* ─── FEATURE GRID ─── */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto grid max-w-7xl gap-4 px-8 py-10 sm:grid-cols-2 sm:px-12 lg:grid-cols-3">
          {/* Custom Award Engine */}
          <HardwarePanel>
            <div className="mb-2 text-amber-500">
              <AwardIcon />
            </div>
            <h3 className="mb-3 font-mono text-sm font-bold tracking-wide text-zinc-100">
              {f.awardEngineTitle}
            </h3>
            <p className="mt-1.5 font-mono text-sm leading-snug text-zinc-400">
              {f.awardEngineDesc}
            </p>
          </HardwarePanel>

          {/* Activator Hub */}
          <HardwarePanel>
            <div className="mb-2 text-amber-500">
              <RadioIcon />
            </div>
            <h3 className="mb-3 font-mono text-sm font-bold tracking-wide text-zinc-100">
              {f.activatorTitle}
            </h3>
            <p className="mt-1.5 font-mono text-sm leading-snug text-zinc-400">
              {f.activatorDesc}
            </p>
          </HardwarePanel>

          {/* Live Progress */}
          <HardwarePanel>
            <div className="mb-2 text-amber-500">
              <ChartIcon />
            </div>
            <h3 className="mb-3 font-mono text-sm font-bold tracking-wide text-zinc-100">
              {f.progressTitle}
            </h3>
            <p className="mt-1.5 font-mono text-sm leading-snug text-zinc-400">
              {f.progressDesc}
            </p>
            {/* Mock leaderboard */}
            <div className="mt-3 space-y-1.5 border-t border-zinc-800 pt-3 font-mono text-sm">
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
                  <span className="text-amber-500/80">{entry.pts} {f.leaderboardUnit}</span>
                </div>
              ))}
            </div>
          </HardwarePanel>

          {/* Painless Validation — spans full width, two-column interior */}
          <HardwarePanel className="sm:col-span-2 lg:col-span-3">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
              {/* Left — text content */}
              <div className="flex-1">
                <div className="mb-2 text-amber-500">
                  <CheckCircleIcon />
                </div>
                <h3 className="mb-3 font-mono text-sm font-bold tracking-wide text-zinc-100">
                  {f.validationTitle}
                </h3>
                <p className="mt-1.5 font-mono text-sm leading-snug text-zinc-400">
                  {f.validationDesc}
                </p>
              </div>

              {/* Right — terminal-style validation output */}
              <div className="shrink-0 rounded-none border border-zinc-800 bg-black/80 px-4 py-3 font-mono text-[10px] leading-tight sm:text-xs md:text-sm md:leading-snug lg:w-[420px]">
                <p className="text-zinc-500">
                  {f.terminalValidating}{" "}
                  <span className="text-zinc-300">{f.terminalFilename}</span>
                </p>
                <p className="mt-1.5 text-zinc-500">
                  Parsing QSO: XX1RF-ZZ3HAM (20M/CW) ...{" "}
                  <span className="text-emerald-400">{f.terminalPass}</span>
                </p>
                <p className="text-zinc-500">
                  Parsing QSO: XX1RF-QQ7DX (40M/FT8) ...{" "}
                  <span className="text-emerald-400">{f.terminalPass}</span>
                </p>
                <p className="text-zinc-500">
                  Parsing QSO: XX1RF-XX9CW (15M/SSB) ...{" "}
                  <span className="text-amber-500">{f.terminalWarn}</span>
                </p>
                <p className="ml-4 text-amber-500/80">{f.terminalBandMismatch}</p>
                <p className="mt-1.5 border-t border-zinc-800 pt-1.5 text-zinc-500">
                  {f.terminalComplete}{" "}
                  <span className="text-zinc-300">{f.terminalAccuracy}</span>
                </p>
              </div>
            </div>
          </HardwarePanel>
        </div>
      </section>

      {/* ─── SPECS & CLOUD ROW ─── */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto grid max-w-7xl gap-4 px-8 py-10 sm:px-12 lg:grid-cols-2">
          {/* Technical Specifications */}
          <HardwarePanel>
            <h3 className="mb-3 font-mono text-sm font-bold tracking-widest text-zinc-500">
              {s.title}
            </h3>
            <table className="w-full font-mono text-sm">
              <tbody>
                {[
                  [s.labelLicense, s.valueLicense],
                  [s.labelLogFormats, s.valueLogFormats],
                  [s.labelStack, s.valueStack],
                  [s.labelDatabase, s.valueDatabase],
                  [s.labelMaintainer, s.valueMaintainer],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-zinc-800/50">
                    <td className="py-2 pr-4 text-zinc-500">{label}</td>
                    <td className="py-2 text-zinc-300">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </HardwarePanel>

          {/* Managed Cloud Service */}
          <HardwarePanel>
            <h3 className="mb-3 font-mono text-sm font-bold tracking-wide text-amber-500">
              {s.cloudTitle}
            </h3>
            <p className="font-mono text-sm leading-relaxed text-zinc-400">
              {s.cloudDesc}{" "}
              <span className="text-amber-400">{s.cloudOpenSource}</span>{" & "}
              <span className="text-amber-400">{s.cloudSelfHost}</span>.{" "}
              {s.cloudDescTail}
            </p>
          </HardwarePanel>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-zinc-800 bg-zinc-900/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-8 py-6 text-center md:flex-row md:justify-between md:text-left sm:px-12">
          <p className="font-mono text-[11px] text-zinc-600">
            {ft.copyright}
          </p>
          <a
            href="https://cwilgenhoff.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-zinc-600 transition hover:text-zinc-400"
          >
            {ft.projectBy}
          </a>
        </div>
      </footer>
    </div>
  );
}
