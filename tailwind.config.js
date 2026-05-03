/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#560591", // bg-brand-primary, text-brand-primary
          light: "#7B2FBE", // bg-brand-light
          lighter: "#A855F7", // bg-brand-lighter
          dark: "#3B0369", // bg-brand-dark
          danger: "#DC2626",
          success: "#16A34A",
          warning: "#D97706",
        },
        surface: {
          // bg-surface-base, border-surface-border
          base: "#FFFFFF",
          raised: "#F5F3FF",
          overlay: "#EDE9FE",
          border: "#DDD6FE",
          "dark-base": "#0F0A1A",
          "dark-raised": "#1C1030",
          "dark-overlay": "#2D1B4E",
          "dark-border": "#4C2E7A",
        },
        content: {
          // text-content-primary, text-content-secondary
          primary: "#1A0533",
          secondary: "#6D4E8A",
          disabled: "#A78BC0",
          inverse: "#FFFFFF",
          "dark-primary": "#F3EEFF",
          "dark-secondary": "#C4A8E0",
          "dark-disabled": "#7A5C99",
        },
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },

      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },

      boxShadow: {
        card: "0 1px 3px rgba(86,5,145,0.08), 0 1px 2px rgba(86,5,145,0.04)",
        raised: "0 4px 6px rgba(86,5,145,0.12), 0 2px 4px rgba(86,5,145,0.06)",
        modal: "0 20px 25px rgba(86,5,145,0.15), 0 10px 10px rgba(86,5,145,0.06)",
      },
    },
  },
  plugins: [],
};

