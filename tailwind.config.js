/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#F9E6A8',
          gold: '#F2A900',
          amber: '#CC6F00',
          espresso: '#4D2A00',
          dark: '#1E1205',
        },
      },
    },
  },
  plugins: [],
};

