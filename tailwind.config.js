module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      xxxs: "360px",
      xxs: "380px",
      // => @media (min-width: 380px) { ... }

      xs: "512px",
      // => @media (min-width: 512px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }
      mdx: "800px",
      // => @media (min-width: 800px) { ... }
      mdxx: "850px",
      // => @media (min-width: 850px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1600px",
      // => @media (min-width: 1600px) { ... }

      "4xl": "1920px",
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
      transitionProperty: {
        height: "height",
      },
      corePlugins: {
        // ...
        transitionProperty: true,
        transitionDuration: true,
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        opaq: "0 4px 16px 6px rgba(0,0,0,0.4)",
        full: "0 3px 1px -2px rgba(0,0,0, 0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12) ",
      },
      colors: {
        primary: "#FFBE40",
        "primary-light": "#FFDA92",
        "primary-dark": "#E6A300", // Added primary-dark as a darker shade of primary (e.g., a darker gold)
        "secondary": "#EBFFF2",
        "third": "#22C55E",
        "third-bold": "#2F9D55",
        "third-light": "#DCFCE7",
        "third-light2": "#BDF9D1",
        "primary-text": "#333F51",
        "primary-text-light": "#556987",
        "secondary-text": "#655E5E",
        "dark-primary": "#283649",
        "dark-text-primary": "#91ABCE",
        "dark-primary-light": "#283A2E",
        "dark-secondary": "#20003F",
        "dark-secondary-light": "#2B193C",
        "dark-third": "#0F172A",
        "dark-text-secondary": "#BBC3CF",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require('@vueform/slider/tailwind'),
  ],
};