import {
	S as s,
	i as a,
	s as e,
	e as t,
	t as o,
	c as i,
	a as l,
	g as r,
	d as c,
	f as n,
	F as h,
	C as u
} from '../chunks/index-31c2d992.js';
function d(s) {
	let a, e;
	return {
		c() {
			(a = t('p')), (e = o('Hello this is home'));
		},
		l(s) {
			a = i(s, 'P', {});
			var t = l(a);
			(e = r(t, 'Hello this is home')), t.forEach(c);
		},
		m(s, t) {
			n(s, a, t), h(a, e);
		},
		p: u,
		i: u,
		o: u,
		d(s) {
			s && c(a);
		}
	};
}
export default class extends s {
	constructor(s) {
		super(), a(this, s, null, d, e, {});
	}
}
