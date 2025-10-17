import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [hour, setHour] = useState(6); // start at 6 AM
  const [battery, setBattery] = useState(70);
  const [solar, setSolar] = useState(0);
  const [load, setLoad] = useState(50);
  const [risk, setRisk] = useState("LOW");

  useEffect(() => {
    const interval = setInterval(() => {
      setHour((prev) => (prev >= 24 ? 0 : prev + 0.25)); // simulate 15 min steps
    }, 2000); // update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 🌞 Solar intensity curve (peaks at noon)
    const solarInput = Math.max(0, 100 * Math.sin((Math.PI * hour) / 12));
    setSolar(Math.round(solarInput));

    // 💡 Load pattern (higher in evening)
    let baseLoad = 30;
    if (hour >= 18 || hour < 6) baseLoad = 55; // evening/night
    if (hour >= 6 && hour < 9) baseLoad = 40; // morning ramp
    const loadVariation = baseLoad + Math.random() * 10;
    setLoad(Math.round(loadVariation));

    // 🔋 Battery balance update
    const newBattery = battery + (solarInput - loadVariation) * 0.02;
    const boundedBattery = Math.max(0, Math.min(100, newBattery));
    setBattery(boundedBattery);

    // ⚠️ Risk level
    let newRisk = "LOW";
    if (boundedBattery < 25 || loadVariation > 80) newRisk = "HIGH";
    else if (boundedBattery < 40) newRisk = "MEDIUM";
    setRisk(newRisk);
  }, [hour]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold glow text-vp_green">
        VoltPulse Energy Flow
      </h2>
      <p className="text-white/60">
        Simulating a 24-hour solar micro-grid: generation, usage, and storage
        dynamics.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Solar Input" value={solar} unit="%" color="bg-vp_green" />
        <Stat label="Battery State" value={battery.toFixed(0)} unit="%" color="bg-vp_blue" />
        <Stat label="Active Load" value={load} unit="%" color="bg-vp_gold" />
      </div>

      <div className="p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between mt-8">
        <div>
          <div className="text-white/60 text-xs">Outage Risk</div>
          <div
            className={`text-2xl font-bold ${
              risk === "HIGH"
                ? "text-vp_gold"
                : risk === "MEDIUM"
                ? "text-vp_blue"
                : "text-vp_green"
            }`}
          >
            {risk}
          </div>
          <div className="text-white/60 text-xs mt-2">
            {risk === "HIGH"
              ? "⚠️ High demand or low battery — consider backup."
              : risk === "MEDIUM"
              ? "⚡ Stable but monitor usage closely."
              : "✅ All systems balanced and optimal."}
          </div>
        </div>
        <div className="text-right text-white/60 text-sm">
          <p>Simulated Time: {hour.toFixed(2)} hrs</p>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, unit, color }) {
  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-white/5 shadow-inner">
      <div className="text-white/60 text-xs">{label}</div>
      <div className="text-2xl font-bold mt-1">
        {value}
        <span className="text-white/50 text-base ml-1">{unit}</span>
      </div>
      <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
