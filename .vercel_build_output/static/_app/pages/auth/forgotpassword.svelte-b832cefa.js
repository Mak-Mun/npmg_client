import {
	S as a,
	i as e,
	s,
	k as r,
	e as o,
	t,
	G as c,
	d as l,
	n,
	c as i,
	a as u,
	g as d,
	b as h,
	f as p,
	F as f,
	C as m
} from '../../chunks/index-31c2d992.js';
function b(a) {
	let e, s, b, g, y, v, E, x, w, R, k, A, L, N, P, S;
	return {
		c() {
			(e = r()),
				(s = o('form')),
				(b = o('label')),
				(g = o('span')),
				(y = t('Email')),
				(v = r()),
				(E = o('input')),
				(x = r()),
				(w = o('input')),
				(R = r()),
				(k = o('div')),
				(A = o('span')),
				(L = t('Remember your account')),
				(N = r()),
				(P = o('a')),
				(S = t('Login here?')),
				this.h();
		},
		l(a) {
			c('[data-svelte="svelte-wnoeo8"]', document.head).forEach(l),
				(e = n(a)),
				(s = i(a, 'FORM', { class: !0 }));
			var r = u(s);
			b = i(r, 'LABEL', { for: !0, class: !0 });
			var o = u(b);
			g = i(o, 'SPAN', { class: !0 });
			var t = u(g);
			(y = d(t, 'Email')),
				t.forEach(l),
				(v = n(o)),
				(E = i(o, 'INPUT', { type: !0, id: !0, placeholder: !0, class: !0 })),
				o.forEach(l),
				(x = n(r)),
				(w = i(r, 'INPUT', { type: !0, value: !0, class: !0 })),
				(R = n(r)),
				(k = i(r, 'DIV', { class: !0 }));
			var h = u(k);
			A = i(h, 'SPAN', {});
			var p = u(A);
			(L = d(p, 'Remember your account')),
				p.forEach(l),
				(N = n(h)),
				(P = i(h, 'A', { href: !0, class: !0 }));
			var f = u(P);
			(S = d(f, 'Login here?')), f.forEach(l), h.forEach(l), r.forEach(l), this.h();
		},
		h() {
			(document.title = 'Reset password'),
				h(g, 'class', 'text-gray-700'),
				h(E, 'type', 'email'),
				h(E, 'id', 'email'),
				h(E, 'placeholder', 'enter your email here'),
				h(
					E,
					'class',
					'block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300'
				),
				h(b, 'for', 'email'),
				h(b, 'class', 'block mb-6'),
				h(w, 'type', 'submit'),
				(w.value = 'Reset your password'),
				h(
					w,
					'class',
					'bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-2 '
				),
				h(P, 'href', '/auth/login'),
				h(P, 'class', ' text-blue-500'),
				h(k, 'class', 'text-center'),
				h(s, 'class', 'grid grid-cols-1 gap-6');
		},
		m(a, r) {
			p(a, e, r),
				p(a, s, r),
				f(s, b),
				f(b, g),
				f(g, y),
				f(b, v),
				f(b, E),
				f(s, x),
				f(s, w),
				f(s, R),
				f(s, k),
				f(k, A),
				f(A, L),
				f(k, N),
				f(k, P),
				f(P, S);
		},
		p: m,
		i: m,
		o: m,
		d(a) {
			a && l(e), a && l(s);
		}
	};
}
export default class extends a {
	constructor(a) {
		super(), e(this, a, null, b, s, {});
	}
}
