/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors to match ChatGPT's dark theme
      colors: {
        'gpt-dark': '#202123',      // Sidebar background
        'gpt-medium': '#343541',    // Main chat background
        'gpt-light': '#40414f',     // Assistant message background / Input bar
        'gpt-green': '#10a37f',     // New chat button color
      },
    },
  },
  plugins: [],
}