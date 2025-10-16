/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vp_bg: "#0A0A0A",
        vp_text: "#F5F5F5",
        vp_green: "#00FF88",
        vp_blue: "#00BFFF",
        vp_gold: "#FFD700"
      },
      boxShadow: {
        glow: "0 0 30px rgba(0,255,136,0.35)"
      }
    }
  },
  plugins: []
}
