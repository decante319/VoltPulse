import React, { useEffect, useState } from "react";

export default function Guardian() {
  const [battery, setBattery] = useState(70);
  const [solar, setSolar] = useState(0);
  const [load, setLoad] = useState(40);
  const [risk, setRisk] = useState("LOW");
  const [hour, setHour] = useState(6);
  const [logs, setLogs] = useState([
    {
      text: "🧠 Guardian online. Monitoring systems in real time...",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHour((prev) => (prev >= 24 ? 0 : prev + 0.25));
    }, 3000); // update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // --- energy logic ---
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

    // --- guardian decision making ---
    const newMessages = [];
    if (solarInput < 20 && hour >= 18) {
      newMessages.push("🌙 Night detected. Switching to battery reserve mode.");
    }
    if (boundedBattery < 30 && solarInput < 10) {
      newMessages.push("⚠️ Battery low. Recommending reduced consumption.");
    }
    if (boundedBattery > 90 && solarInput > 80) {
      newMessages.push("🔋 Battery full. Diverting excess to grid or storage.");
    }
    if (loadVariation > 75) {
      newMessages.push("⚡ High demand detected. Prioritizing essential loads.");
    }

    if (newMessages.length > 0) {
      const timestamp = new Date().toLocaleTimeString();
      const formatted = newMessages.map((msg) => ({
        text: msg,
        time: timestamp,
      }));
      setLogs((prev) => [...formatted, ...prev.slice(0, 8)]); // limit to latest 9
    }
  }, [hour]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold glow text-vp_green">
        Energy Guardian Monitor
      </h2>
      <p className="text-white/60">
        The Guardian AI continuously watches the system, predicts issues, and
        sends live updates.
      </p>

      {/* status cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Stat label="Solar Input" value={solar} unit="%" />
        <Stat label="Battery" value={battery.toFixed(0)} unit="%" />
        <Stat label="Load" value={load} unit="%" />
        <Stat label="Risk" value={risk} color={riskColor(risk)} />
      </div>

      {/* Guardian Chat */}
      <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
        <h3 className="text-sm font-semibold text-white/70 mb-3">
          Guardian Activity Feed
        </h3>
        <div className="h-64 overflow-y-auto space-y-3 flex flex-col-reverse">
          {logs.map((entry, i) => (
            <div
              key={i}
              className="flex items-start gap-2 animate-fadeIn"
            >
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

// --- Components ---
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
