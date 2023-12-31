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
      spacing: {
        'full-gap': 'calc(100% + 0.5rem)',
      },
      colors: {
        'main': "var(--main)",
        'dark-bg': '#292929',
        'darker-bg': '#121212',
        'dark-obj': '#1d1d1d'
      },
      zIndex: {
        '99': '99',
        '999': '999',
        '9999': '9999',
        'absolute': '9999999999'
      },
      maxWidth: {
        '8xl': '88rem',
      },
      minHeight: {
        'sm': '13.5rem',
      },
      width: {
        '1/10': '10%',
        '1/20': '5%',
      },
      padding: {
        '1/10': '10%',
        '1/20': '5%',
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/forms'), 'prettier-plugin-tailwindcss'],
}