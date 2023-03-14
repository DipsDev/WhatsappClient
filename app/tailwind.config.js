/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ["codenext"],
        main: ["'Assistant', sans-serif"],
      },
      colors: {
        primary: "#231F1F",
        secondary: "#262222",
        accent: "#73DC8C",
        background: "#1C1818",
        heading: "white",
        paragraph: "#602307",
        "accent-second": "#D6CEE9",
        "primary-darker": "#0c0b0b",
      },
    },
  },
  plugins: [],
};
