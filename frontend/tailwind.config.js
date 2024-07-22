/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#ffffff',
        dark: '#000000',
        primary: '#007bff',
        secondary: '#61dafb',
        blue: '#007bff',
      },
      // Add more customization as needed
    },
  },
  plugins: [],
}
