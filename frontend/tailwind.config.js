/** @type {import('tailwindcss').Config} */


const THEME_COLORS = {
  primary: '#00A9A7',
  secondary: "#171D44",
  error: "#f87171",
  muted: "#9ca3af",
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        ...THEME_COLORS
      },
      textColor: {
        ...THEME_COLORS
      },
      borderColor: {
        ...THEME_COLORS
      },
      stroke: {
        ...THEME_COLORS
      },
      fill: {
        ...THEME_COLORS
      },

      keyframes: {
        appear: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        grow: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        rtl: {
          '0%': { transformOrigin: 'top right', transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0%)', opacity: 1 },
        },

      },
      animation: {
        appear: 'appear 0.5s ease-out',
        'appear-fast': 'appear 0.2s ease-out',
        rtl: 'rtl 0.3s ease-out',
      }
    },

  },
  plugins: [],
}

