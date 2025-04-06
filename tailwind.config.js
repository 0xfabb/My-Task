/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark1: 'rgb(8,8,8)',
        dark2: 'rgb(16,16,16)',
        dark3: 'rgb(24,24,24)',
        dark4: 'rgb(32,32,32)',
        dark5: 'rgb(48,48,48)',
        accent: '#9B5DE5', // Soft purple-pink
        accent2: '#F15BB5', // Warm magenta
        accent3: '#00BBF9', // Electric blue
        success: '#00F5D4',
        warning: '#FEE440',
        danger: '#FF006E',
      },
    },
  },
  plugins: [],
}
