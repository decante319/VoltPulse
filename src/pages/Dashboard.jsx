import React from "react";
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
import { useEnergy } from "../EnergyContext";

export default function Dashboard() {
  const { solar, battery, load, risk, hour } = useEnergy();

  // Simple history for visual feel
  const history = Array.from({ length: 10 }, (_, i) => {
    const t = hour - (10 - i) * 0.25;
    return {
      time: t.toFixed(1),
      Solar: Math.max(0, 100 * Math.sin((Math.PI * t) / 12)),
      Battery: battery,
      Load: load,
    };
  });

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold glow text-vp_green">
        VoltPulse Energy Dashboard
      </h2>
      <p className="text-white/60">
        Real-time telemetry synced with the Guardian AI monitor.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Solar Input" value={solar.toFixed(0)} unit="%" color="bg-vp_green" />
        <Stat label="Battery State" value={battery.toFixed(0)} unit="%" color="bg-vp_blue" />
        <Stat label="Active Load" value={load.toFixed(0)} unit="%" color="bg-vp_gold" />
      </div>

      <div className="mt-10 bg-white/5 rounded-2xl border border-white/10 p-4">
        <h3 className="text-white/80 text-sm font-semibold mb-2">
          Energy Trends
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
            <Line type="monotone" dataKey="Solar" stroke="#00FF88" dot={false} />
            <Line type="monotone" dataKey="Battery" stroke="#00BFFF" dot={false} />
            <Line type="monotone" dataKey="Load" stroke="#FFD700" dot={false} />
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
