import {
	S as s,
	i as a,
	s as e,
	e as t,
	t as r,
	k as o,
	c,
	a as d,
	g as n,
	d as l,
	n as h,
	b as p,
	f as i,
	F as m,
	C as f
} from '../../chunks/index-31c2d992.js';
function u(s) {
	let a, e, u, x, v, b;
	return {
		c() {
			(a = t('div')),
				(e = t('h1')),
				(u = r('Doctor store')),
				(x = o()),
				(v = t('p')),
				(b = r('Under development')),
				this.h();
		},
		l(s) {
			a = c(s, 'DIV', { class: !0 });
			var t = d(a);
			e = c(t, 'H1', { class: !0 });
			var r = d(e);
			(u = n(r, 'Doctor store')), r.forEach(l), (x = h(t)), (v = c(t, 'P', {}));
			var o = d(v);
			(b = n(o, 'Under development')), o.forEach(l), t.forEach(l), this.h();
		},
		h() {
			p(e, 'class', 'font-semibold mb-4 text-2xl'),
				p(a, 'class', 'bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3  md:w-5/6 longer');
		},
		m(s, t) {
			i(s, a, t), m(a, e), m(e, u), m(a, x), m(a, v), m(v, b);
		},
		p: f,
		i: f,
		o: f,
		d(s) {
			s && l(a);
		}
	};
}
export default class extends s {
	constructor(s) {
		super(), a(this, s, null, u, e, {});
	}
}
