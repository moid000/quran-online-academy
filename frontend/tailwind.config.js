/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#05100d',
          900: '#0a1f1a',
          850: '#0d2b24',
          800: '#0d4f3c',
          700: '#15634c',
          600: '#1a7a5c',
          500: '#249d76',
          400: '#38c195',
          100: '#d1fae5',
          50: '#f0fdf4',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f0d77b',
          lighter: '#fcf8e8',
          dark: '#b38f24',
          hover: '#c5a028',
        },
        sand: {
          50: '#fcfbf7',
          100: '#f7f4ea',
          200: '#ece5d3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Amiri', 'Scheherazade New', 'serif'],
      },
      backgroundImage: {
        'islamic-pattern': "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)",
        'hero-gradient': "linear-gradient(135deg, #0a1f1a 0%, #0d4f3c 50%, #1a7a5c 100%)",
      }
    },
  },
  plugins: [],
}
