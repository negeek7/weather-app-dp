/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
    content: [
      "./index.html",
      "./src/**/*.{jsx,ts,js,tsx}",
    ],
    theme: {
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
    },
    plugins: [],
  }