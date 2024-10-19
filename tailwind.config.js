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
        88: '22rem', // Thay đổi giá trị này nếu bạn muốn chiều cao khác
      },
    },
  },
  plugins: [ //remove plugin require('@tailwindcss/forms'),
  ],
}
