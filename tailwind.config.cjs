const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      sans: ["Quicksand", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
      },
      fontSize: {
        xs: '.75rem',
      },
      animation: {
        'flash-green': 'flashGreen 1s infinite',
        'flash-red': 'flashRed 1s infinite',
      },
      keyframes: {
        flashGreen: {
          '0%': { background: '#D1FAE5' },
          '100%': { background: 'white' },
        },
        flashRed: {
          '0%': { background: '#FEE2E2' },
          '100%': { background: 'white' },
        }
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

module.exports = config;
