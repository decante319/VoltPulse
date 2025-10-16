import { useState } from "react";

const tips = {
  low_battery: "Battery is low. Suggest switching to priority loads only and scheduling non-critical tasks for daytime.",
  high_load: "High demand detected. Consider staggering usage for milling, pumping, or heating.",
  dusty_panels: "Solar input low at noon? Clean panels and check shade.",
};

export default function Guardian() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([{ role: "bot", text: "Hello! I’m your Energy Guardian. How can I help today?" }]);

  function handleSend() {
    if (!input.trim()) return;
    const lower = input.toLowerCase();
    let reply = "Got it. Monitoring your system…";
    if (lower.includes("battery") && lower.includes("low")) reply = tips.low_battery;
    if (lower.includes("load") || lower.includes("overload")) reply = tips.high_load;
    if (lower.includes("solar") && lower.includes("noon")) reply = tips.dusty_panels;
    setLog((l) => [...l, { role: "user", text: input }, { role: "bot", text: reply }]);
    setInput("");
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-4">Energy Guardian</h2>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 h-[60vh] overflow-y-auto space-y-3">
        {log.map((m, i) => (
          <div key={i} className={`max-w-[85%] ${m.role === "bot" ? "" : "ml-auto"}`}>
            <div
              className={`px-3 py-2 rounded-2xl text-sm ${
                m.role === "bot" ? "bg-white/10" : "bg-vp_green text-black"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm"
          placeholder="Ask about battery, load, or solar…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="px-4 py-3 rounded-xl bg-vp_green text-black font-semibold shadow-glow"
        >
          Send
        </button>
      </div>
    </section>
  );
}
