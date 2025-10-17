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
  const { solar, wind, grid, battery, load, risk, hour } = useEnergy();

  const history = Array.from({ length: 10 }, (_, i) => {
    const t = hour - (10 - i) * 0.25;
    return {
      time: t.toFixed(1),
      Solar: Math.max(0, 100 * Math.sin((Math.PI * t) / 12)),
      Wind: 40 + 20 * Math.sin(t * 0.8),
      Grid: grid,
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
        Real-time telemetry of solar, wind and grid inputs driving community power.
      </p>

      {/* 🔋 Summary stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Solar Input" value={solar.toFixed(0)} unit="%" color="bg-vp_green" />
        <Stat label="Wind Input" value={wind.toFixed(0)} unit="%" color="bg-vp_blue" />
        <Stat label="Grid Backup" value={grid.toFixed(0)} unit="%" color="bg-vp_gold" />
      </div>

      {/* 🔄 Energy mix */}
      <EnergyMix solar={solar} wind={wind} grid={grid} />

      {/* 📈 Chart */}
      <div className="mt-10 bg-white/5 rounded-2xl border border-white/10 p-4">
        <h3 className="text-white/80 text-sm font-semibold mb-2">
          Energy Source Trends
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
            <Line type="monotone" dataKey="Wind" stroke="#00BFFF" dot={false} />
            <Line type="monotone" dataKey="Grid" stroke="#FFD700" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🧭 Battery & Risk */}
      <div className="p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between">
        <div>
          <div className="text-white/60 text-xs">Battery</div>
          <div className="text-2xl font-bold text-vp_blue">
            {battery.toFixed(0)}%
          </div>
          <div className="text-white/60 text-xs mt-2">
            Risk Level:{" "}
            <span
              className={`font-semibold ${
                risk === "HIGH"
                  ? "text-vp_gold"
                  : risk === "MEDIUM"
                  ? "text-vp_blue"
                  : "text-vp_green"
              }`}
            >
              {risk}
            </span>
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
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

/* 🌍 Energy Mix Visualization */
function EnergyMix({ solar, wind, grid }) {
  const total = solar + wind + grid;
  const solarP = ((solar / total) * 100).toFixed(1);
  const windP = ((wind / total) * 100).toFixed(1);
  const gridP = ((grid / total) * 100).toFixed(1);

  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
      <h3 className="text-sm font-semibold text-white/70 mb-2">
        Energy Source Mix
      </h3>
      <div className="h-3 bg-white/10 rounded-full flex overflow-hidden">
        <div className="bg-vp_green" style={{ width: `${solarP}%` }}></div>
        <div className="bg-vp_blue" style={{ width: `${windP}%` }}></div>
        <div className="bg-vp_gold" style={{ width: `${gridP}%` }}></div>
      </div>
      <div className="flex justify-between text-xs text-white/60 mt-2">
        <span>☀️ Solar {solarP}%</span>
        <span>🌬️ Wind {windP}%</span>
        <span>⚡ Grid {gridP}%</span>
      </div>
    </div>
  );
}
