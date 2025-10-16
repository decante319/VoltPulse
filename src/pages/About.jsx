import React from "react";
export default function About() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-4">
      <h2 className="text-3xl font-bold">About Team Neural Nexus</h2>
      <p className="text-white/70">
        We build human-centered AI for Africa. VoltPulse helps communities manage micro-grids with predictive insights,
        offline-friendly tips, and simple voice/SMS alerts.
      </p>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl border border-white/10">Affordable</div>
        <div className="p-4 rounded-xl border border-white/10">Offline-capable</div>
        <div className="p-4 rounded-xl border border-white/10">AI-enhanced</div>
      </div>
    </section>
  );
}
