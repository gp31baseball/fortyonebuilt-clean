/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A1A2F",
        gold: "#E4B343",
        red: "#C21F1F",
        offwhite: "#F5F3E7",
      },
    },
  },
  plugins: [],
};
