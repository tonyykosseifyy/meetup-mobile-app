/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cabaret: {
          50: '#fbf4f7',
          100: '#f9eaf0',
          200: '#f5d5e0',
          300: '#eeb3c6',
          400: '#e284a1',
          500: '#d14d72',
          600: '#c2405e',
          700: '#a72f47',
          800: '#8b293c',
          900: '#742736',
          950: '#46111b',
      },      
      },
      fontFamily: {
        sans: [
          'Inter_400Regular', 
          'Inter_500Medium', 
          'Inter_700Bold',
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          '"Helvetica Neue"', 
          'Arial', 
          '"Noto Sans"', 
          'sans-serif', 
          '"Apple Color Emoji"', 
          '"Segoe UI Emoji"', 
          '"Segoe UI Symbol"', 
          '"Noto Color Emoji"'
        ],
      },
    },
  },
  plugins: [],
}
