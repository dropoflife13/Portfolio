/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#0a1128",
        paperDeep: "#0e183b",
        ink: {
          DEFAULT: "#ffffff",
          muted: "#94a3b8",
          faint: "#64748b",
        },
        line: "rgba(255, 255, 255, 0.1)",
        accent: {
          DEFAULT: "#2dd4bf",
          soft: "#5eead4",
          dim: "rgba(45, 212, 191, 0.15)",
        },
      },
      maxWidth: {
        prose: "62ch",
        page: "80rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};