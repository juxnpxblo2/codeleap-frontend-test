/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "figma-frame": "#ddd",
      black: "#000",
      white: "#fff",
      blue: "#7695ec",
      red: "#ff5151",
      green: "#47b960",
      darker: "#777",
      dark: "#999",
      placeholder: "#ccc",
    },
    extend: {},
  },
  plugins: [],
};
