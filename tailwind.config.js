/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xxs': '360px',
        'xs': '480px',
      },
      height: {
        '377.58': '377.58px',
      },
      width: {
        '235.99': '235.99px',
      },
    },
  },
  plugins: [ //remove plugin require('@tailwindcss/forms'),
  ],
}
