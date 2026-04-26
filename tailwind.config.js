/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'as-cream': '#F2EFE9',   // Background from your logo
        'as-coral': '#FF8A7A',   // Pink/Coral text from your logo
        'as-charcoal': '#5A5452', // Rainbow grey from your logo
      },
    },
  },
  plugins: [],
}