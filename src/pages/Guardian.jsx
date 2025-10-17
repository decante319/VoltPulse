import React, { useEffect, useState } from "react";
import { useEnergy } from "../EnergyContext";

export default function Guardian() {
  const { solar, battery, load, risk, hour } = useEnergy();
  const [logs, setLogs] = useState([]);
  const [heartbeatTimer, setHeartbeatTimer] = useState(0);

  useEffect(() => {
    const newMessages = [];

    // 🔍 Smart alerts — only when thresholds are crossed
    if (solar < 20 && hour >= 18) {
      newMessages.push("🌙 Night detected. Switching to battery reserve mode.");
    }
    if (battery < 30 && solar < 10) {
      newMessages.push("⚠️ Battery low. Recommending reduced consumption.");
    }
    if (battery > 90 && solar > 80) {
      newMessages.push("🔋 Battery full. Diverting excess to grid or storage.");
    }
    if (load > 75) {
      newMessages.push("⚡ High demand detected. Prioritizing essential loads.");
    }

    const timestamp = new Date().toLocaleTimeString();

    // 💬 Add event-based logs
    if (newMessages.length > 0) {
      const formatted = newMessages.map((msg) => ({
        text: msg,
        time: timestamp,
      }));
      setLogs((prev) => [...formatted, ...prev.slice(0, 8)]);
      setHeartbeatTimer(0); // reset heartbeat timer on active alert
    } else {
      // ⏱️ Heartbeat every ~15 seconds
      setHeartbeatTimer((prev) => prev + 1);
      if (heartbeatTimer >= 7) {
        const stableMsg =
          risk === "HIGH"
            ? "⚠️ Monitoring critical load levels..."
            : risk === "MEDIUM"
            ? "🟡 Systems stable but under moderate load."
            : "🟢 Monitoring... all systems nominal.";
        setLogs((prev) => [
          { text: stableMsg, time: timestamp },
          ...prev.slice(0, 8),
        ]);
        setHeartbeatTimer(0);
      }
    }
  }, [solar, battery, load, risk, hour, heartbeatTimer]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold glow text-vp_green">
        Energy Guardian Monitor
      </h2>
      <GuardianSummary battery={battery} risk={risk} />

      {/* Stat cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Stat label="Solar Input" value={solar.toFixed(0)} unit="%" />
        <Stat label="Battery" value={battery.toFixed(0)} unit="%" />
        <Stat label="Load" value={load.toFixed(0)} unit="%" />
        <Stat label="Risk" value={risk} color={riskColor(risk)} />
      </div>

      {/* Guardian Feed */}
      <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
        <h3 className="text-sm font-semibold text-white/70 mb-3">
          Guardian Activity Feed
        </h3>
        <div className="h-64 overflow-y-auto space-y-3 flex flex-col-reverse">
          {logs.map((entry, i) => (
            <div key={i} className="flex items-start gap-2 animate-fadeIn">
              <div className="w-2 h-2 mt-2 bg-vp_green rounded-full shadow-[0_0_6px_#00ff88]" />
              <div className="flex flex-col">
                <div className="bg-vp_bg/70 border border-vp_green/20 rounded-xl px-3 py-2 text-white/80 text-sm max-w-[80%]">
                  {entry.text}
                </div>
                <span className="text-[10px] text-white/40 mt-1 ml-1">
                  {entry.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right text-xs text-white/50">
        Simulated Time: {hour.toFixed(2)} hrs
      </div>
    </section>
  );
}

function GuardianSummary({ battery, risk }) {
  const status =
    risk === "HIGH"
      ? "⚠️ Critical load detected. Backup recommended."
      : risk === "MEDIUM"
      ? "⚡ Moderate consumption. Monitoring closely."
      : "✅ Systems stable. Power flow optimal.";

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between text-white/80">
      <p>{status}</p>
      <p className="text-vp_green font-semibold">
        Battery: {battery.toFixed(0)}%
      </p>
    </div>
  );
}

function Stat({ label, value, unit, color }) {
  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
      <div className="text-white/60 text-xs">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${color || ""}`}>
        {value}
        {unit && <span className="text-white/50 text-base ml-1">{unit}</span>}
      </div>
    </div>
  );
}

function riskColor(risk) {
  if (risk === "HIGH") return "text-vp_gold";
  if (risk === "MEDIUM") return "text-vp_blue";
  return "text-vp_green";
}
