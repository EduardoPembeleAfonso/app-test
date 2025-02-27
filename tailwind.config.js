/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
        poppins: "Poppins",
      },
      colors: {
        primary: "#6957e9",
        rose: "#f580f2",
        secondary: "#FFFFFF",
        textSecondaryColor: "#9D9D9D",
      },
    },
  },
  plugins: [],
};
