import {
	S as s,
	i as e,
	s as t,
	e as a,
	k as r,
	t as l,
	c,
	a as n,
	d as o,
	n as i,
	g as h,
	b as f,
	f as u,
	F as p,
	h as d,
	K as x,
	C as m,
	H as g,
	P as v,
	Q as w,
	D as $,
	j as b,
	m as E,
	o as y,
	E as k,
	v as I,
	r as D,
	w as j,
	R as S,
	T as V,
	U as G
} from '../../chunks/index-31c2d992.js';
import { g as N } from '../../chunks/navigation-9e49acea.js';
import '../../chunks/singletons-6b53f818.js';
function P(s, e, t) {
	const a = s.slice();
	return (a[2] = e[t]), a;
}
function A(s) {
	let e,
		t,
		x,
		m,
		g,
		v,
		w,
		$,
		b,
		E = s[2].name + '';
	return {
		c() {
			(e = a('li')),
				(t = a('a')),
				(x = a('span')),
				(m = a('i')),
				(g = r()),
				(v = a('span')),
				(w = l(E)),
				(b = r()),
				this.h();
		},
		l(s) {
			e = c(s, 'LI', {});
			var a = n(e);
			t = c(a, 'A', { href: !0, class: !0 });
			var r = n(t);
			x = c(r, 'SPAN', { class: !0 });
			var l = n(x);
			(m = c(l, 'I', { class: !0 })),
				n(m).forEach(o),
				l.forEach(o),
				(g = i(r)),
				(v = c(r, 'SPAN', { class: !0 }));
			var f = n(v);
			(w = h(f, E)), f.forEach(o), r.forEach(o), (b = i(a)), a.forEach(o), this.h();
		},
		h() {
			f(m, 'class', 'bx bx-home'),
				f(x, 'class', 'inline-flex items-center justify-center h-12 w-12 text-lg text-gray-800'),
				f(v, 'class', 'text-sm font-medium font-sourceSans'),
				f(t, 'href', ($ = s[2].url)),
				f(
					t,
					'class',
					'flex flex-row items-center h-12 transform  text-gray-800 hover:text-motherGreen'
				);
		},
		m(s, a) {
			u(s, e, a), p(e, t), p(t, x), p(x, m), p(t, g), p(t, v), p(v, w), p(e, b);
		},
		p(s, e) {
			1 & e && E !== (E = s[2].name + '') && d(w, E),
				1 & e && $ !== ($ = s[2].url) && f(t, 'href', $);
		},
		d(s) {
			s && o(e);
		}
	};
}
function M(s) {
	let e,
		t,
		d,
		v,
		w,
		$,
		b,
		E,
		y,
		k,
		I,
		D,
		j,
		S,
		V,
		G = s[0],
		N = [];
	for (let a = 0; a < G.length; a += 1) N[a] = A(P(s, G, a));
	return {
		c() {
			(e = a('div')),
				(t = a('div')),
				(d = a('div')),
				(v = a('a')),
				(w = a('h1')),
				($ = l('NPMG')),
				(b = r()),
				(E = a('ul'));
			for (let s = 0; s < N.length; s += 1) N[s].c();
			(y = r()), (k = a('div')), (I = a('h1')), (D = a('a')), (j = l('Logout')), this.h();
		},
		l(s) {
			e = c(s, 'DIV', { class: !0 });
			var a = n(e);
			t = c(a, 'DIV', { class: !0 });
			var r = n(t);
			d = c(r, 'DIV', { class: !0 });
			var l = n(d);
			v = c(l, 'A', { href: !0 });
			var f = n(v);
			w = c(f, 'H1', { class: !0 });
			var u = n(w);
			($ = h(u, 'NPMG')),
				u.forEach(o),
				f.forEach(o),
				l.forEach(o),
				(b = i(r)),
				(E = c(r, 'UL', { class: !0 }));
			var p = n(E);
			for (let e = 0; e < N.length; e += 1) N[e].l(p);
			p.forEach(o), r.forEach(o), (y = i(a)), (k = c(a, 'DIV', { class: !0 }));
			var x = n(k);
			I = c(x, 'H1', { class: !0 });
			var m = n(I);
			D = c(m, 'A', { href: !0 });
			var g = n(D);
			(j = h(g, 'Logout')), g.forEach(o), m.forEach(o), x.forEach(o), a.forEach(o), this.h();
		},
		h() {
			f(w, 'class', 'text-3xl uppercase text-red-500 font-sourceSans'),
				f(v, 'href', '/'),
				f(d, 'class', 'flex items-center justify-center h-20 shadow-md'),
				f(E, 'class', 'flex flex-col py-4'),
				f(t, 'class', ''),
				f(D, 'href', '/auth/login'),
				f(
					I,
					'class',
					'text-red-500 font-semibold bg-logout px-4 py-2 text-center bottom-0 cursor-pointer font-sourceSans svelte-vwjy3n'
				),
				f(k, 'class', ''),
				f(e, 'class', 'flex flex-col w-56 bg-white  overflow-hidden h-screen justify-between');
		},
		m(a, r) {
			u(a, e, r), p(e, t), p(t, d), p(d, v), p(v, w), p(w, $), p(t, b), p(t, E);
			for (let s = 0; s < N.length; s += 1) N[s].m(E, null);
			p(e, y), p(e, k), p(k, I), p(I, D), p(D, j), S || ((V = x(I, 'click', s[1])), (S = !0));
		},
		p(s, [e]) {
			if (1 & e) {
				let t;
				for (G = s[0], t = 0; t < G.length; t += 1) {
					const a = P(s, G, t);
					N[t] ? N[t].p(a, e) : ((N[t] = A(a)), N[t].c(), N[t].m(E, null));
				}
				for (; t < N.length; t += 1) N[t].d(1);
				N.length = G.length;
			}
		},
		i: m,
		o: m,
		d(s) {
			s && o(e), g(N, s), (S = !1), V();
		}
	};
}
function H(s, e, t) {
	let { list: a } = e;
	return (
		(s.$$set = (s) => {
			'list' in s && t(0, (a = s.list));
		}),
		[
			a,
			() => {
				N('/');
			}
		]
	);
}
class L extends s {
	constructor(s) {
		super(), e(this, s, H, M, t, { list: 0 });
	}
}
function T(s) {
	let e, t, d, x, g, $, b, E, y, k, I, D, j, S;
	return {
		c() {
			(e = a('div')),
				(t = a('div')),
				(d = a('input')),
				(x = r()),
				(g = a('button')),
				($ = v('svg')),
				(b = v('path')),
				(E = r()),
				(y = a('div')),
				(k = a('p')),
				(I = l('Help Guide')),
				(D = r()),
				(j = a('img')),
				this.h();
		},
		l(s) {
			e = c(s, 'DIV', { class: !0 });
			var a = n(e);
			t = c(a, 'DIV', { class: !0 });
			var r = n(t);
			(d = c(r, 'INPUT', { type: !0, name: !0, placeholder: !0, class: !0 })),
				(x = i(r)),
				(g = c(r, 'BUTTON', { type: !0, class: !0 }));
			var l = n(g);
			$ = c(
				l,
				'svg',
				{
					class: !0,
					xmlns: !0,
					'xmlns:xlink': !0,
					version: !0,
					id: !0,
					x: !0,
					y: !0,
					viewBox: !0,
					style: !0,
					'xml:space': !0,
					width: !0,
					height: !0
				},
				1
			);
			var f = n($);
			(b = c(f, 'path', { d: !0 }, 1)),
				n(b).forEach(o),
				f.forEach(o),
				l.forEach(o),
				r.forEach(o),
				(E = i(a)),
				(y = c(a, 'DIV', { class: !0 }));
			var u = n(y);
			k = c(u, 'P', { class: !0 });
			var p = n(k);
			(I = h(p, 'Help Guide')),
				p.forEach(o),
				(D = i(u)),
				(j = c(u, 'IMG', { alt: !0, src: !0, class: !0 })),
				u.forEach(o),
				a.forEach(o),
				this.h();
		},
		h() {
			f(d, 'type', 'search'),
				f(d, 'name', 'search'),
				f(d, 'placeholder', 'Search'),
				f(d, 'class', 'bg-white h-7  w-64 px-3 border py-2 rounded text-xs focus:outline-none'),
				f(
					b,
					'd',
					'M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z'
				),
				f($, 'class', 'h-3 w-3 text-black-100 fill-current'),
				f($, 'xmlns', 'http://www.w3.org/2000/svg'),
				f($, 'xmlns:xlink', 'http://www.w3.org/1999/xlink'),
				f($, 'version', '1.1'),
				f($, 'id', 'Capa_1'),
				f($, 'x', '0px'),
				f($, 'y', '0px'),
				f($, 'viewBox', '0 0 56.966 56.966'),
				w($, 'enable-background', 'new 0 0 56.966 56.966'),
				f($, 'xml:space', 'preserve'),
				f($, 'width', '512px'),
				f($, 'height', '512px'),
				f(g, 'type', 'submit'),
				f(g, 'class', 'absolute right-0 top-4 mt-2 mr-2'),
				f(t, 'class', 'relative text-gray-600'),
				f(k, 'class', 'text-sm font-semibold cursor-pointer mx-4 mb-0 mt-1'),
				f(j, 'alt', ''),
				j.src !==
					(S = 'https://6.viki.io/image/d7dcd68efa8d4abc93a7355b3f5089e9.jpeg?s=900x600&e=t') &&
					f(
						j,
						'src',
						'https://6.viki.io/image/d7dcd68efa8d4abc93a7355b3f5089e9.jpeg?s=900x600&e=t'
					),
				f(j, 'class', 'h-6 w-6 rounded-full cursor-pointer '),
				f(y, 'class', 'flex'),
				f(e, 'class', 'flex justify-between bg-white w-full h-16 py-4 px-8 shadow-sm');
		},
		m(s, a) {
			u(s, e, a),
				p(e, t),
				p(t, d),
				p(t, x),
				p(t, g),
				p(g, $),
				p($, b),
				p(e, E),
				p(e, y),
				p(y, k),
				p(k, I),
				p(y, D),
				p(y, j);
		},
		p: m,
		i: m,
		o: m,
		d(s) {
			s && o(e);
		}
	};
}
class z extends s {
	constructor(s) {
		super(), e(this, s, null, T, t, {});
	}
}
class U {
	constructor(s, e) {
		(this.url = s), (this.name = e);
	}
}
function B(s) {
	let e, t, l, h, d, x, m, g, v;
	function w(e) {
		s[3](e);
	}
	let N = {};
	void 0 !== s[0] && (N.list = s[0]),
		(t = new L({ props: N })),
		S.push(() => V(t, 'list', w)),
		(x = new z({}));
	const P = s[2].default,
		A = $(P, s, s[1], null);
	return {
		c() {
			(e = a('div')),
				b(t.$$.fragment),
				(h = r()),
				(d = a('div')),
				b(x.$$.fragment),
				(m = r()),
				(g = a('main')),
				A && A.c(),
				this.h();
		},
		l(s) {
			e = c(s, 'DIV', { class: !0 });
			var a = n(e);
			E(t.$$.fragment, a), (h = i(a)), (d = c(a, 'DIV', { class: !0 }));
			var r = n(d);
			E(x.$$.fragment, r), (m = i(r)), (g = c(r, 'MAIN', { class: !0 }));
			var l = n(g);
			A && A.l(l), l.forEach(o), r.forEach(o), a.forEach(o), this.h();
		},
		h() {
			f(g, 'class', 'float-left svelte-13qbx1d'),
				f(d, 'class', 'flex flex-col w-screen h-screen overflow-y-auto'),
				f(e, 'class', 'min-h-screen flex flex-row bg-gray-100');
		},
		m(s, a) {
			u(s, e, a),
				y(t, e, null),
				p(e, h),
				p(e, d),
				y(x, d, null),
				p(d, m),
				p(d, g),
				A && A.m(g, null),
				(v = !0);
		},
		p(s, [e]) {
			const a = {};
			!l && 1 & e && ((l = !0), (a.list = s[0]), G(() => (l = !1))),
				t.$set(a),
				A && A.p && 2 & e && k(A, P, s, s[1], e, null, null);
		},
		i(s) {
			v || (I(t.$$.fragment, s), I(x.$$.fragment, s), I(A, s), (v = !0));
		},
		o(s) {
			D(t.$$.fragment, s), D(x.$$.fragment, s), D(A, s), (v = !1);
		},
		d(s) {
			s && o(e), j(t), j(x), A && A.d(s);
		}
	};
}
function C(s, e, t) {
	let { $$slots: a = {}, $$scope: r } = e,
		l = [
			new U('/user', 'Dashboard'),
			new U('/user/tasks', 'Tasks'),
			new U('/user/gorillas', 'Gorillas'),
			new U('/user/rangers', 'Rangers'),
			new U('/user/doctors', 'Doctors'),
			new U('/user/kwitizina', 'Kwitizina'),
			new U('/user/reports', 'Reports'),
			new U('/user/settings', 'Settings')
		];
	return (
		(s.$$set = (s) => {
			'$$scope' in s && t(1, (r = s.$$scope));
		}),
		[
			l,
			r,
			a,
			function (s) {
				(l = s), t(0, l);
			}
		]
	);
}
export default class extends s {
	constructor(s) {
		super(), e(this, s, C, B, t, {});
	}
}
