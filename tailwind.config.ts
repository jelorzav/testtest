import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        madrid: "#ffb703"
      },
      boxShadow: {
        glow: "0 20px 80px rgba(255, 107, 107, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
