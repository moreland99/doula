/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F6F2',
        sand: '#F3EEE8',
        beige: '#E8DED2',
        blush: '#E8DAD6',
        charcoal: '#2B2B2B',
        taupe: '#6B5E55',
        gold: '#C9A646',
        goldDeep: '#B8922E',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 40px -24px rgba(54, 41, 31, 0.25)',
      },
      maxWidth: {
        prosePremium: '68ch',
      },
    },
  },
  plugins: [],
}

