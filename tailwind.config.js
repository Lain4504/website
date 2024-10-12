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
    },
  },
  plugins: [ //remove plugin require('@tailwindcss/forms'),
  ],
}
