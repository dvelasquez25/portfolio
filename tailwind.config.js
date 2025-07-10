/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "geist-mono": [
          "Geist Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Roboto Mono",
          "Menlo",
          "Monaco",
          "Liberation Mono",
          "DejaVu Sans Mono",
          "Courier New",
          "monospace",
        ],
        mono: [
          "Geist Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Roboto Mono",
          "Menlo",
          "Monaco",
          "Liberation Mono",
          "DejaVu Sans Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        // Dark theme colors
        dark: {
          bg: "#111827",
          "bg-secondary": "#1f2937",
          "bg-tertiary": "#374151",
          text: "#f9fafb",
          "text-secondary": "#d1d5db",
          border: "#374151",
          accent: "#60a5fa",
        },
      },
    },
  },
  plugins: [],
};
