/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'img-home': "url('./src/assets/background.jpg')",
        'img-dashboard': "url('./src/assets/background-dashboard.png')"
      }
    },
  },
  plugins: [],
};
