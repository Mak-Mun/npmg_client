import {
	S as s,
	i as e,
	s as a,
	D as t,
	e as c,
	t as l,
	k as n,
	c as r,
	a as o,
	g as i,
	d as f,
	n as h,
	b as u,
	f as $,
	F as p,
	E as x,
	v as d,
	r as m
} from '../../chunks/index-31c2d992.js';
function E(s) {
	let e, a, E, b, v, N;
	const k = s[1].default,
		G = t(k, s, s[0], null);
	return {
		c() {
			(e = c('section')),
				(a = c('section')),
				(E = c('h2')),
				(b = l('NPMG')),
				(v = n()),
				G && G.c(),
				this.h();
		},
		l(s) {
			e = r(s, 'SECTION', { class: !0 });
			var t = o(e);
			a = r(t, 'SECTION', { class: !0 });
			var c = o(a);
			E = r(c, 'H2', { class: !0 });
			var l = o(E);
			(b = i(l, 'NPMG')),
				l.forEach(f),
				(v = h(c)),
				G && G.l(c),
				c.forEach(f),
				t.forEach(f),
				this.h();
		},
		h() {
			u(E, 'class', 'font-sans text-motherGreen font-black text-5xl text-center mb-10'),
				u(a, 'class', 'flex  justify-center items-center h-full flex-col'),
				u(e, 'class', 'bg-primaryWhite h-screen w-screen');
		},
		m(s, t) {
			$(s, e, t), p(e, a), p(a, E), p(E, b), p(a, v), G && G.m(a, null), (N = !0);
		},
		p(s, [e]) {
			G && G.p && 1 & e && x(G, k, s, s[0], e, null, null);
		},
		i(s) {
			N || (d(G, s), (N = !0));
		},
		o(s) {
			m(G, s), (N = !1);
		},
		d(s) {
			s && f(e), G && G.d(s);
		}
	};
}
function b(s, e, a) {
	let { $$slots: t = {}, $$scope: c } = e;
	return (
		(s.$$set = (s) => {
			'$$scope' in s && a(0, (c = s.$$scope));
		}),
		[c, t]
	);
}
export default class extends s {
	constructor(s) {
		super(), e(this, s, b, E, a, {});
	}
}