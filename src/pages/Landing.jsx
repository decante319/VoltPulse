export default function Landing() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
        Keep the <span className="text-vp_green glow">lights alive</span> with AI.
      </h1>
      <p className="text-white/70 max-w-2xl mx-auto">
        VoltPulse is an AI “energy buddy” for communities — predicting outages,
        guiding maintenance, and making micro-grids feel alive with a heartbeat.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
        <a href="/dashboard" className="px-5 py-3 rounded-2xl bg-vp_green/90 text-black font-semibold shadow-glow">
          Explore Dashboard
        </a>
        <a href="/guardian" className="px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/5">
          Meet Energy Guardian
        </a>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-white/60">
        <div className="p-3 rounded-xl border border-white/10">Offline-friendly</div>
        <div className="p-3 rounded-xl border border-white/10">SMS / Voice Alerts</div>
        <div className="p-3 rounded-xl border border-white/10">Solar-aware</div>
        <div className="p-3 rounded-xl border border-white/10">Swahili toggle</div>
      </div>
    </section>
  );
}
