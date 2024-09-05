/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      textColor: {
        menuPrimary: "#00D2FF",
        subMenuPrimary: "#1043A5"
      },
      backgroundColor: {
        menuPrimary: "#E4F6FF"
      }
    }
  },
  plugins: [require("@tailwindcss/line-clamp")]
};
