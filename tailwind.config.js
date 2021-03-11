module.exports = {
  future: {},
  purge: {
    mode: 'all',
    content: ['./src/**/*.svelte', './src/**/*.html'],
  },
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
    },
    fontFamily: {
      'sans': ['Nunito Sans', 'Source Code Sans','sans-serif'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['Open Sans'],
     },
     textColor: {
      motherGreen: '#017A4C',
      secGreen: '#1FC14C',
      successorColor:'#F0A500', 
  },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  plugins: [],
}