export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // This enables dark mode
  theme: {
    extend: {
      colors: {
        radiant: {
          DEFAULT: '#92A525',
          dark: '#586318',
        },
        dire: {
          DEFAULT: '#C23C2A',
          dark: '#A42A1B',
        },
      },
    },
  },
  plugins: [],
};
