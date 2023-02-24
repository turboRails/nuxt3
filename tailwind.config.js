/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "2xsm": "10px",
        xsm: "12px",
        sm: "13px",
        reg: "15px",
        lg: "18px",
        "2xl": "22px",
        "3xl": "25px",
        "4xl": "32px",
        "5xl": "40px",
        "6xl": "50px",
        "7xl": "70px",
      },
      colors: {
        'primary' : '#5555ff'
      },
      spacing : {
        '13' : '3.25rem'
      }
    },
  },
  plugins: [],
}