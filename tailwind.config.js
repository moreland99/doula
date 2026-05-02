/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F4EF',
        ivory: '#F2ECE4',
        sand: '#EEE4D8',
        beige: '#E4D8C8',
        blush: '#F1E6E1',
        charcoal: '#2F2A26',
        taupe: '#A99786',
        gold: '#C9AB6C',
        champagne: '#DDC9A0',
        goldDeep: '#B89558',
        sage: '#74877C',
      },
      fontFamily: {
        heading: ['"sweet-gothic-serif"', '"Cormorant Garamond"', 'serif'],
        body: ['"source-sans-pro"', 'Manrope', 'sans-serif'],
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

