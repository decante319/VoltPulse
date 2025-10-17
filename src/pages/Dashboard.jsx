import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [hour, setHour] = useState(6);
  const [battery, setBattery] = useState(70);
  const [solar, setSolar] = useState(0);
  const [load, setLoad] = useState(50);
  const [risk, setRisk] = useState("LOW");
  const [history, setHistory] = useState([]);

  // simulate time flow
  useEffect(() => {
    const interval = setInterval(() => {
      setHour((prev) => (prev >= 24 ? 0 : prev + 0.25)); // advance 15 min
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 🌞 Solar curve (peaks at noon)
    const solarInput = Math.max(0, 100 * Math.sin((Math.PI * hour) / 12));
    let baseLoad = 30;
    if (hour >= 18 || hour < 6) baseLoad = 55;
    if (hour >= 6 && hour < 9) baseLoad = 40;
    const loadVariation = baseLoad + Math.random() * 10;
    const newBattery = battery + (solarInput - loadVariation) * 0.02;
    const boundedBattery = Math.max(0, Math.min(100, newBattery));

    let newRisk = "LOW";
    if (boundedBattery < 25 || loadVariation > 80) newRisk = "HIGH";
    else if (boundedBattery < 40) newRisk = "MEDIUM";

    setSolar(Math.round(solarInput));
    setLoad(Math.round(loadVariation));
    setBattery(boundedBattery);
    setRisk(newRisk);

    // Save history for graph
    setHistory((h) => [
      ...h.slice(-24), // keep latest ~6 hours of points
      {
        time: hour.toFixed(1),
        Solar: Math.round(solarInput),
        Battery: Math.round(boundedBattery),
        Load: Math.round(loadVariation),
      },
    ]);
  }, [hour]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold glow text-vp_green">
        VoltPulse Energy Flow
      </h2>
      <p className="text-white/60">
        Live simulation of solar input, consumption, and storage dynamics.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Solar Input" value={solar} unit="%" color="bg-vp_green" />
        <Stat label="Battery State" value={battery.toFixed(0)} unit="%" color="bg-vp_blue" />
        <Stat label="Active Load" value={load} unit="%" color="bg-vp_gold" />
      </div>

      <div className="mt-10 bg-white/5 rounded-2xl border border-white/10 p-4">
        <h3 className="text-white/80 text-sm font-semibold mb-2">
          Energy Trends (Last 6h Simulated)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
                color: "#00FF88",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Solar"
              stroke="#00FF88"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Battery"
              stroke="#00BFFF"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Load"
              stroke="#FFD700"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between">
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
