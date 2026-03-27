/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00eaff',
        secondary: '#ff00e1',
        dark: '#05060a',
        'dark-secondary': '#0a0f1e',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 234, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 234, 255, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
