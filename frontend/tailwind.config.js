/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chinese-red': '#C8102E',
        'chinese-gold': '#FFD700',
        'chinese-black': '#1C1C1C',
        'chinese-wood': '#8B4513',
        'chinese-jade': '#00A86B',
      },
      fontFamily: {
        'chinese': ['STKaiti', 'KaiTi', 'serif'],
      }
    },
  },
  plugins: [],
}
