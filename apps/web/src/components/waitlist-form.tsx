"use client";

import { useState, type FormEvent } from "react";
import type { WaitlistEntry } from "@open-ham-awards/contracts";

export function WaitlistForm() {
  const [callsign, setCallsign] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
        setError("TRANSMISSION FAILED — PLEASE RETRY.");
      }
    } catch {
      setError("NETWORK ERROR — CHECK YOUR CONNECTION.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-8 rounded-none border border-emerald-700/50 bg-emerald-900/20 px-4 py-3 font-mono text-sm text-emerald-400">
        REGISTRATION RECEIVED — YOU&apos;RE ON THE LIST, {callsign.toUpperCase() || "OPERATOR"}.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <label className="mb-2 block font-mono text-[10px] tracking-widest text-zinc-500">
        OPERATOR@STATION_REGISTRATION
      </label>
      <div className="flex flex-col gap-3 md:flex-row md:gap-0">
        <input
          type="text"
          value={callsign}
          onChange={(e) => setCallsign(e.target.value)}
          placeholder="CALLSIGN"
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
          placeholder="your@email.net"
          aria-label="Email address"
          required
          className="h-12 w-full rounded-none border border-zinc-800 bg-black px-4 font-mono text-sm text-zinc-200 placeholder-zinc-600 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 md:w-auto md:flex-1"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-glow h-12 w-full rounded-none border border-amber-500 bg-amber-500 px-4 font-mono text-sm font-bold tracking-wider text-black transition hover:bg-amber-400 disabled:opacity-60 md:w-auto md:border-0 md:px-6"
        >
          {submitting ? "SENDING..." : "JOIN WAITLIST"}
        </button>
      </div>
      {error && (
        <p className="mt-2 font-mono text-xs text-red-400">{error}</p>
      )}
    </form>
  );
}
