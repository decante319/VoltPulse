import React, { useEffect, useState } from "react";
import logo from "../assets/logo-animated.svg";

const loadingPhrases = [
  "⚡ Calibrating neural energy matrix...",
  "🔋 Analyzing solar flow dynamics...",
  "🌬️ Synchronizing wind channels...",
  "🔌 Checking grid stability...",
  "🧠 Initializing Guardian AI protocols...",
  "💡 Bringing VoltPulse online...",
];

export default function Loading({ onFinish }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 800);

    const finishTimeout = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => {
      clearInterval(phraseInterval);
      clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-vp_bg text-white space-y-5">
      <img
        src={logo}
        alt="VoltPulse"
        className="w-20 h-20 animate-pulse drop-shadow-[0_0_20px_#00ff88]"
      />
      <div className="text-center text-sm tracking-wide text-white/80 transition-all duration-500">
        {loadingPhrases[index]}
      </div>
      <div className="w-40 h-1 mt-4 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-vp_green animate-[pulse_1.2s_ease-in-out_infinite]"
          style={{
            width: `${((index + 1) / loadingPhrases.length) * 100}%`,
          }}
        ></div>
      </div>
      <p className="text-xs text-white/40 mt-3">Powering Africa’s Future ⚡</p>
    </div>
  );
}
