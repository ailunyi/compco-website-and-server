/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'montserrat':['Montserrat-Bold'],
      'franklin':['"Franklin Gothic Medium"', 'Arial Narrow', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
}

