/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
