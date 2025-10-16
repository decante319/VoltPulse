import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Guardian from "./pages/Guardian.jsx";
import About from "./pages/About.jsx";
import logo from "./assets/logo-animated.svg";

function Nav() {
  const link = "px-3 py-2 rounded-xl text-vp_text/80 hover:text-vp_text hover:bg-white/5 transition";
  const active = "text-vp_text bg-white/10";
  return (
    <nav className="sticky top-0 z-50 bg-vp_bg/80 backdrop-blur border-b border-white/5">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="VoltPulse" className="h-8 w-8 animate-pulse" />
          <span className="font-semibold tracking-wide glow text-vp_text">
            VOLT<span className="text-vp_green">PULSE</span>
          </span>
        </a>
        <div className="flex gap-1 text-sm">
          <NavLink to="/" className={({isActive})=> `${link} ${isActive?active:""}`}>Home</NavLink>
          <NavLink to="/dashboard" className={({isActive})=> `${link} ${isActive?active:""}`}>Dashboard</NavLink>
          <NavLink to="/guardian" className={({isActive})=> `${link} ${isActive?active:""}`}>Energy Guardian</NavLink>
          <NavLink to="/about" className={({isActive})=> `${link} ${isActive?active:""}`}>About</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-vp_bg text-vp_text">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guardian" element={<Guardian />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer className="border-t border-white/5 mt-12">
        <div className="max-w-5xl mx-auto p-6 text-xs text-white/50">
          Built by Team Neural Nexus • VoltPulse — “Energy with a heartbeat.”
        </div>
      </footer>
    </div>
  );
}
