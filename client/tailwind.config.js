/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'bglogin':"url('../public/Login-bg-1.svg')",
        'headerbg':"url(/Header-bg.svg)"
      },
      fontFamily: {
        roboto: ['Roboto', 'sans'],
      },
    },
  },
  plugins: [],
}