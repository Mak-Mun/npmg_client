module.exports = {
  future: {},
  purge: {
    mode: 'all',
    content: ['./src/**/*.svelte', './src/**/*.html'],
  },
  theme: {
    extend: {},
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
  variants: {},
  plugins: [],
}