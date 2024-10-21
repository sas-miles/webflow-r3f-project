/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Geist Sans'", "sans-serif"], // Ensure the font name matches the loaded font
      },
    },
  },
  plugins: [],
};
