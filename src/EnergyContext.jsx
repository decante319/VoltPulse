import React, { createContext, useContext, useState, useEffect } from "react";

const EnergyContext = createContext();

export function EnergyProvider({ children }) {
  const [data, setData] = useState({
    solar: 0,
    battery: 70,
    load: 50,
    risk: "LOW",
    hour: 6,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const hour = prev.hour >= 24 ? 0 : prev.hour + 0.25;
        const solar = Math.max(0, 100 * Math.sin((Math.PI * hour) / 12));

        let baseLoad = 30;
        if (hour >= 18 || hour < 6) baseLoad = 55;
        if (hour >= 6 && hour < 9) baseLoad = 40;
        const load = baseLoad + Math.random() * 10;

        const battery = Math.max(
          0,
          Math.min(100, prev.battery + (solar - load) * 0.02)
        );

        const risk =
          battery < 25 || load > 80
            ? "HIGH"
            : battery < 40
            ? "MEDIUM"
            : "LOW";

        return { solar, battery, load, risk, hour };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <EnergyContext.Provider value={data}>{children}</EnergyContext.Provider>
  );
}

export const useEnergy = () => useContext(EnergyContext);
