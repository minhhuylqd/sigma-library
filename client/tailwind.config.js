/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue-1': '#e6f7ff',
        'light-blue-6': '#1890ff',
        'dark-blue-1': '#111d2c',
        'dark-blue-6': '#177ddc',
        'dark-blue-10': '#b7e3fa',
        'light-gold-1': '#fffbe6',
        'light-gold-6': '#faad14',
        'dark-gold-1': '#2b2111',
        'dark-gold-6': '#d89614',
        'dark-gold-10': '#faedb5',
        'light-primary': '#ffffff',
        'dark-primary': '#141414'
      }
    },
  },
  plugins: [],
}
