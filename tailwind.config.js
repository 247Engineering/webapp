/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple': '#6F3289',
        'orange': '#E34B31',
        'orange-light': '#FBF2F0',
        'green': '#008a45',
        'green-light': '#dff1e8',
        'grey': '#EDEFF2',
        'grey-light': 'rgba(0, 0, 0, 0.12)',
        'black': 'rgba(0, 0, 0, 0.87)',
        'black-100': 'rgba(0, 0, 0, 0.6)',
        'pumpkin': '#FA9200',
        'pumpkin-light': '#FFF2E0',
      },
      // fontSize: {
      // sm: '0.8rem',
      // base: '1rem',
      // xl: '1.25rem',
      // 2xl: '1.563rem',
      // 3xl: '1.953rem',
      // 4xl: '2.441rem',
      // 5xl: '3.052rem',
      // }
    },
  },
  plugins: [],
};
