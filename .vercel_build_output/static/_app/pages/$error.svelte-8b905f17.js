import {
	S as s,
	i as t,
	s as a,
	e,
	t as r,
	c,
	a as o,
	g as n,
	d as u,
	f as l,
	F as d,
	h as i,
	k as m,
	l as f,
	G as h,
	n as p,
	C as k
} from '../chunks/index-31c2d992.js';
function v(s) {
	let t,
		a,
		m = s[1].stack + '';
	return {
		c() {
			(t = e('pre')), (a = r(m));
		},
		l(s) {
			t = c(s, 'PRE', {});
			var e = o(t);
			(a = n(e, m)), e.forEach(u);
		},
		m(s, e) {
			l(s, t, e), d(t, a);
		},
		p(s, t) {
			2 & t && m !== (m = s[1].stack + '') && i(a, m);
		},
		d(s) {
			s && u(t);
		}
	};
}
function E(s) {
	let t,
		a,
		E,
		g,
		x,
		P,
		$,
		j,
		C,
		F = s[1].message + '';
	document.title = t = s[0];
	let G = s[2] && s[1].stack && v(s);
	return {
		c() {
			(a = m()),
				(E = e('h1')),
				(g = r(s[0])),
				(x = m()),
				(P = e('p')),
				($ = r(F)),
				(j = m()),
				G && G.c(),
				(C = f());
		},
		l(t) {
			h('[data-svelte="svelte-1o9r2ue"]', document.head).forEach(u),
				(a = p(t)),
				(E = c(t, 'H1', {}));
			var e = o(E);
			(g = n(e, s[0])), e.forEach(u), (x = p(t)), (P = c(t, 'P', {}));
			var r = o(P);
			($ = n(r, F)), r.forEach(u), (j = p(t)), G && G.l(t), (C = f());
		},
		m(s, t) {
			l(s, a, t),
				l(s, E, t),
				d(E, g),
				l(s, x, t),
				l(s, P, t),
				d(P, $),
				l(s, j, t),
				G && G.m(s, t),
				l(s, C, t);
		},
		p(s, [a]) {
			1 & a && t !== (t = s[0]) && (document.title = t),
				1 & a && i(g, s[0]),
				2 & a && F !== (F = s[1].message + '') && i($, F),
				s[2] && s[1].stack
					? G
						? G.p(s, a)
						: ((G = v(s)), G.c(), G.m(C.parentNode, C))
					: G && (G.d(1), (G = null));
		},
		i: k,
		o: k,
		d(s) {
			s && u(a), s && u(E), s && u(x), s && u(P), s && u(j), G && G.d(s), s && u(C);
		}
	};
}
function g(s, t, a) {
	let { status: e } = t,
		{ error: r } = t;
	return (
		(s.$$set = (s) => {
			'status' in s && a(0, (e = s.status)), 'error' in s && a(1, (r = s.error));
		}),
		[e, r, !1]
	);
}
export default class extends s {
	constructor(s) {
		super(), t(this, s, g, E, a, { status: 0, error: 1 });
	}
}
