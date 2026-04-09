"use client";

import { useState, type FormEvent } from "react";
import type { WaitlistEntry } from "@open-ham-awards/contracts";
import { waitlistI18n as t } from "@/i18n";

export function WaitlistForm() {
  const [callsign, setCallsign] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const entry: WaitlistEntry = {
      callsign: callsign.toUpperCase().trim(),
      email: email.trim(),
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await fetch("https://formspree.io/f/maqlzwwv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(t.errorTransmission);
      }
    } catch {
      setError(t.errorNetwork);
    } finally {
      setSubmitting(false);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (submitted) {
    const siteUrl = typeof window !== "undefined" ? window.location.href : "https://openhamawards.com";
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(t.shareText)}&url=${encodeURIComponent(siteUrl)}`;
    const mastodonUrl = `https://mastodon.social/share?text=${encodeURIComponent(`${t.shareText} ${siteUrl}`)}`;

    const linkClass =
      "px-2 py-1 text-zinc-500 transition-colors hover:text-amber-500 hover:bg-zinc-900/50";

    return (
      <div className="mt-8 space-y-3">
        <div role="status" aria-live="polite" aria-atomic="true" className="rounded-none border border-emerald-700/50 bg-emerald-900/20 px-4 py-3 font-mono text-sm text-emerald-400">
          {t.success} {callsign.toUpperCase() || "OPERATOR"}.
        </div>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {t.transmitX}
          </a>
          <a
            href={mastodonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {t.transmitMastodon}
          </a>
          <button
            type="button"
            onClick={copyLink}
            className={`min-w-[185px] text-left ${linkClass}`}
          >
            {copied ? t.linkCopied : t.copyLink}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <label className="mb-2 block font-mono text-[10px] tracking-widest text-zinc-500">
        {t.formLabel}
      </label>
      <div className="flex flex-col gap-3 md:flex-row md:gap-0">
        <input
          type="text"
          value={callsign}
          onChange={(e) => setCallsign(e.target.value)}
          placeholder={t.callsignPlaceholder}
          aria-label="Callsign"
          required
          minLength={3}
          maxLength={10}
          className="h-12 w-full rounded-none border border-zinc-800 bg-black px-4 font-mono text-sm uppercase text-zinc-200 placeholder-zinc-600 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 md:w-36 md:border-r-0"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          aria-label="Email address"
          required
          className="h-12 w-full rounded-none border border-zinc-800 bg-black px-4 font-mono text-sm text-zinc-200 placeholder-zinc-600 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 md:w-auto md:flex-1"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-glow h-12 w-full rounded-none border border-amber-500 bg-amber-500 px-4 font-mono text-sm font-bold tracking-wider text-black transition hover:bg-amber-400 disabled:opacity-60 md:w-auto md:border-0 md:px-6"
        >
          {submitting ? t.submittingLabel : t.submitLabel}
        </button>
      </div>
      {error && (
        <p className="mt-2 font-mono text-xs text-red-400">{error}</p>
      )}
    </form>
  );
}
