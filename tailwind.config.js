/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      },
      colors: {
        primary: {
          50: "var(--color50)",
          100: "var(--color100)",
          200: "var(--color200)",
          300: "var(--color300)",
          400: "var(--color400)",
          500: "var(--color500)",
          600: "var(--color600)",
          700: "var(--color700)",
          800: "var(--color800)",
          900: "var(--color900)",
        },
      },
      opacity: {
        "04": ".04",
      },
      width: {
        'max-content': 'max-content'
      }
    },
    fontFamily: {
      sans: ["Poppins"],
    },
  },
  plugins: [],
}
