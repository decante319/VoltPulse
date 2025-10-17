import React, { createContext, useContext, useEffect, useState } from "react";

const EnergyContext = createContext();

export function EnergyProvider({ children }) {
  const [data, setData] = useState({
    hour: 6,
    solar: 0,
    wind: 0,
    grid: 0,
    battery: 70,
    load: 50,
    risk: "LOW",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const hour = prev.hour >= 24 ? 0 : prev.hour + 0.25;

        // --- solar curve ---
        const solar = Math.max(0, 100 * Math.sin((Math.PI * hour) / 12));

        // --- wind power (fluctuates randomly all day) ---
        const wind = 40 + 20 * Math.sin(hour * 0.8) + Math.random() * 15;

        // --- grid backup (only kicks in if battery < 25) ---
        const grid = prev.battery < 25 ? 50 + Math.random() * 30 : 0;

        // --- load pattern ---
        let baseLoad = 30;
        if (hour >= 18 || hour < 6) baseLoad = 55;
        if (hour >= 6 && hour < 9) baseLoad = 40;
        const load = baseLoad + Math.random() * 10;

        // --- battery balance ---
        const input = solar * 0.6 + wind * 0.3 + grid * 0.1;
        const battery = Math.max(
          0,
          Math.min(100, prev.battery + (input - load) * 0.015)
        );

        // --- risk level ---
        const risk =
          battery < 25 || load > 80
            ? "HIGH"
            : battery < 40
            ? "MEDIUM"
            : "LOW";

        return { hour, solar, wind, grid, battery, load, risk };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <EnergyContext.Provider value={data}>{children}</EnergyContext.Provider>
  );
}

export const useEnergy = () => useContext(EnergyContext);
