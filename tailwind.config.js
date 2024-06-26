/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#6F3289",
        orange: "#E34B31",
        "orange-light": "#FBF2F0",
        "orange-light-100": "#F4D9D3",
        green: "#008a45",
        "green-100": "#80CBA6",
        "green-light": "#dff1e8",
        "green-light-100": "#F4FAF7",
        grey: "#EDEFF2",
        "grey-light": "rgba(0, 0, 0, 0.12)",
        "grey-light-100": "rgba(0, 0, 0, 0.08)",
        "grey-light-200": "#F6F7F8",
        "grey-light-300": "#D9D9D9",
        black: "rgba(0, 0, 0, 0.87)",
        "black-100": "rgba(0, 0, 0, 0.6)",
        pumpkin: "#FA9200",
        "pumpkin-light": "#FFF2E0",
        error: "#EF9AA8",
        red: "#E53451",
      },
      boxShadow: {
        sm: "0px 8px 16px rgba(0, 0, 0, 0.12)",
        "sm-alt": "0px 2px 8px rgba(0, 0, 0, 0.12)",
        md: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
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
