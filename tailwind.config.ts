import type { Config } from "tailwindcss";

// Tailwind theme: Wrist Works dark palette + Playfair Display / DM Sans fonts
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",       // page background
        paper: "#050505",     // footer / raised background
        card: "#0d0d0d",      // product cards
        line: "#1a1a1a",      // hairline borders
        line2: "#2a2a2a",     // secondary borders
        muted: "#888888",     // muted text
        muted2: "#999999",    // secondary muted text
        whatsapp: "#25D366",  // WhatsApp brand green
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: ".18em",
        widest2: ".32em",
      },
    },
  },
  plugins: [],
};

export default config;
