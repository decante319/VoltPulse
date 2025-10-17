import React, { useEffect, useMemo, useState } from "react";

function Stat({ label, value, unit, bar, color }) {
  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-white/5 shadow-inner">
      <div className="text-white/60 text-xs">{label}</div>
      <div className="text-2xl font-bold mt-1">
        {value}
        <span className="text-white/50 text-base ml-1">{unit}</span>
      </div>
      {typeof bar === "number" && (
        <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${color}`}
            style={{ width: `${bar}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [t, setT] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 1500);
    return () => clearInterval(id);
  }, []);

  const data = useMemo(() => {
    const solar = 60 + Math.round(25 * Math.sin(t / 2));
    const battery = 35 + Math.round(40 * Math.sin(t / 3 + 1));
    const load = 40 + Math.round(35 * Math.cos(t / 2.2));
    const risk =
      battery < 25 || load > 80 ? "HIGH" : battery < 35 ? "MEDIUM" : "LOW";
    return { solar, battery, load, risk };
  }, [t]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold mb-4 glow text-vp_green">
        Community Energy Pulse
      </h2>
      <p className="text-white/60 mb-6">
        Simulated micro-grid telemetry updating in real-time. VoltPulse predicts
        potential power dips and sends community alerts.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        <Stat
          label="Solar Input"
          value={data.solar}
          unit="%"
          bar={data.solar}
          color="bg-vp_green"
        />
        <Stat
          label="Battery State"
          value={data.battery}
          unit="%"
          bar={data.battery}
          color="bg-vp_blue"
        />
        <Stat
          label="Active Load"
          value={data.load}
          unit="%"
          bar={data.load}
          color="bg-vp_gold"
        />
      </div>

      <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between">
        <div>
          <div className="text-white/60 text-xs">Outage Risk</div>
          <div
            className={`text-2xl font-bold ${
              data.risk === "HIGH"
                ? "text-vp_gold"
                : data.risk === "MEDIUM"
                ? "text-vp_blue"
                : "text-vp_green"
            }`}
          >
            {data.risk}
          </div>
          <div className="text-white/60 text-xs mt-2">
            {data.risk === "HIGH"
              ? "⚠️ Power dip likely – switch to backup."
              : data.risk === "MEDIUM"
              ? "⚡ Monitor evening usage carefully."
              : "✅ All systems optimal."}
          </div>
        </div>
        <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center pulse-glow">
          <div className="w-16 h-16 rounded-full bg-vp_green/40 blur-sm" />
        </div>
      </div>
    </section>
  );
}
