/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotateslow: {
          '100%': {transform: 'scale(2.1)'},
        }
      },
      animation: {
        rotateslow: 'rotateslow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

