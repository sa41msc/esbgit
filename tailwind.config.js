/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'success': '#10B981',
        'error': '#EF4444',
        'warning': '#F59E0B',
        'info': '#3B82F6',
      }
    },
  },
  plugins: [],
}

