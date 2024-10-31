/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    backgroundImage: {
      dashboard: "url('/scrc/assets/dashboard.png')",
    },
    extend: {
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
