const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {},
  },
  plugins: [],
}
