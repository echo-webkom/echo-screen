/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-forground)",
        },
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};
