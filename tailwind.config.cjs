module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				landing: "url('landing.jpg')"
			}),
			gridTemplateColumns:{
				'layout':"15% 85%"
			}
		},
		fontFamily: {
			sans: ['Nunito', 'Nunito Sans', 'sans-serif'],
			sourceSans: ['Lato', 'Source Sans Pro', 'sans-serif'],
			serif: ['ui-serif', 'Georgia'],
			mono: ['ui-monospace', 'SFMono-Regular'],
			display: ['Oswald'],
			body: ['Open Sans']
		},
		textColor: (theme) => ({
			...theme('colors'),
			motherGreen: '#00917C',
			secGreen: '#1FC14C',
			greenAccent: '#00917C',
			successorColor: '#F0A500'
		}),

		backgroundColor: (theme) => ({
			...theme('colors'),
			primaryGreen: '#00917C',
			secondary: '#ffed4a',
			danger: '#e3342f',
			greenAccent: '#B7FFC2',
			blueAccent: '#86C5FF',
			redishAccent: '#86C5FF',
			primaryWhite: '#FCFDFF',
			deemWhite: '#fcfddf'
		})
	},
	plugins: []
};
