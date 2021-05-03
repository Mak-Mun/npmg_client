import {
	S as s,
	i as a,
	s as n,
	D as t,
	e,
	c as l,
	a as c,
	d as o,
	f as r,
	E as u,
	v as $,
	r as i
} from '../chunks/index-31c2d992.js';
function d(s) {
	let a, n;
	const d = s[1].default,
		p = t(d, s, s[0], null);
	return {
		c() {
			(a = e('main')), p && p.c();
		},
		l(s) {
			a = l(s, 'MAIN', {});
			var n = c(a);
			p && p.l(n), n.forEach(o);
		},
		m(s, t) {
			r(s, a, t), p && p.m(a, null), (n = !0);
		},
		p(s, [a]) {
			p && p.p && 1 & a && u(p, d, s, s[0], a, null, null);
		},
		i(s) {
			n || ($(p, s), (n = !0));
		},
		o(s) {
			i(p, s), (n = !1);
		},
		d(s) {
			s && o(a), p && p.d(s);
		}
	};
}
function p(s, a, n) {
	let { $$slots: t = {}, $$scope: e } = a;
	return (
		(s.$$set = (s) => {
			'$$scope' in s && n(0, (e = s.$$scope));
		}),
		[e, t]
	);
}
export default class extends s {
	constructor(s) {
		super(), a(this, s, p, d, n, {});
	}
}
