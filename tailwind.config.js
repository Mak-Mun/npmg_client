module.exports = {
  future: {},
  purge: {
    mode: "all",
    content: ["./src/**/*.svelte", "./src/**/*.html"],
  },
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Nunito", "Nunito Sans", "sans-serif"],
      sourceSans: ["Source Sans Pro", "sans-serif"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ["Open Sans"],
    },
    textColor: (theme) => ({
      ...theme("colors"),
      motherGreen: "#00917C",
      secGreen: "#1FC14C",
      successorColor: "#F0A500",
    }),
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primaryGreen: "#00917C",
      secondary: "#ffed4a",
      danger: "#e3342f",
      greenAccent: "#B7FFC2",
      blueAccent: "#86C5FF",
      redishAccent: "#86C5FF",
      primaryWhite: "#FCFDFF",
    }),
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
}
