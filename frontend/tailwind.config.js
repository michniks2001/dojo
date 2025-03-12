// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "scale-up": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "scale-up": "scale-up 0.2s ease-out",
      },
      transformStyle: {
        preserve3d: "preserve-3d",
      },
      perspective: {
        1000: "1000px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
