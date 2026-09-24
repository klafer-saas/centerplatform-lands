import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        brand: "#FEB000",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "brand-glow": "0 12px 40px rgba(255, 138, 0, 0.26)",
      },
    },
  },
  plugins: [],
} satisfies Config;
