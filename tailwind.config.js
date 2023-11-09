/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        main: ["Nunito", "sans-serif"],
      },
      colors: {
        'main': "#7c1cf4",
        'dark-bg': '#292929',
        'darker-bg': '#121212',
        'dark-obj': '#1d1d1d'
      },
      zIndex: {
        '99': '99',
        '999': '999',
        '9999': '9999',
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
}