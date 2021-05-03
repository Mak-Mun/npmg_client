import {
	S as a,
	i as r,
	s as e,
	k as s,
	e as o,
	t as l,
	G as t,
	d as c,
	n,
	c as u,
	a as i,
	g as d,
	b as p,
	f,
	F as b,
	I as h,
	J as v,
	K as g,
	C as E,
	L as m,
	M as N,
	N as y
} from '../../chunks/index-31c2d992.js';
function x(a) {
	let r,
		e,
		y,
		x,
		I,
		O,
		T,
		S,
		q,
		w,
		U,
		B,
		D,
		F,
		C,
		G,
		M,
		H,
		j,
		J,
		K,
		V,
		z,
		Q,
		W,
		X,
		Y,
		Z,
		$,
		aa,
		ra,
		ea,
		sa,
		oa,
		la,
		ta,
		ca,
		na,
		ua,
		ia,
		da,
		pa,
		fa,
		ba,
		ha,
		va,
		ga,
		Ea,
		ma,
		Na,
		ya,
		xa,
		Pa,
		Aa,
		La,
		Ra;
	return {
		c() {
			(r = s()),
				(e = o('form')),
				(y = o('label')),
				(x = o('span')),
				(I = l('Full name')),
				(O = s()),
				(T = o('input')),
				(S = s()),
				(q = o('label')),
				(w = o('span')),
				(U = l('Last name')),
				(B = s()),
				(D = o('input')),
				(F = s()),
				(C = o('label')),
				(G = o('span')),
				(M = l('Phone')),
				(H = s()),
				(j = o('input')),
				(J = s()),
				(K = o('label')),
				(V = o('span')),
				(z = l('Email')),
				(Q = s()),
				(W = o('input')),
				(X = s()),
				(Y = o('label')),
				(Z = o('span')),
				($ = l('Password')),
				(aa = s()),
				(ra = o('input')),
				(ea = s()),
				(sa = o('label')),
				(oa = o('span')),
				(la = l('Role')),
				(ta = s()),
				(ca = o('select')),
				(na = o('option')),
				(ua = l('USER')),
				(ia = o('option')),
				(da = l('RANGER')),
				(pa = o('option')),
				(fa = l('DOCTOR')),
				(ba = o('option')),
				(ha = l('ADMIN')),
				(va = s()),
				(ga = o('input')),
				(Ea = s()),
				(ma = o('div')),
				(Na = o('span')),
				(ya = l('Have an account')),
				(xa = s()),
				(Pa = o('a')),
				(Aa = l('Login here?')),
				this.h();
		},
		l(a) {
			t('[data-svelte="svelte-f1nrop"]', document.head).forEach(c),
				(r = n(a)),
				(e = u(a, 'FORM', { class: !0 }));
			var s = i(e);
			y = u(s, 'LABEL', { for: !0, class: !0 });
			var o = i(y);
			x = u(o, 'SPAN', { class: !0 });
			var l = i(x);
			(I = d(l, 'Full name')),
				l.forEach(c),
				(O = n(o)),
				(T = u(o, 'INPUT', { type: !0, id: !0, placeholder: !0, class: !0, required: !0 })),
				o.forEach(c),
				(S = n(s)),
				(q = u(s, 'LABEL', { for: !0, class: !0 }));
			var p = i(q);
			w = u(p, 'SPAN', { class: !0 });
			var f = i(w);
			(U = d(f, 'Last name')),
				f.forEach(c),
				(B = n(p)),
				(D = u(p, 'INPUT', { type: !0, id: !0, placeholder: !0, class: !0, required: !0 })),
				p.forEach(c),
				(F = n(s)),
				(C = u(s, 'LABEL', { for: !0, class: !0 }));
			var b = i(C);
			G = u(b, 'SPAN', { class: !0 });
			var h = i(G);
			(M = d(h, 'Phone')),
				h.forEach(c),
				(H = n(b)),
				(j = u(b, 'INPUT', { type: !0, id: !0, placeholder: !0, class: !0, required: !0 })),
				b.forEach(c),
				(J = n(s)),
				(K = u(s, 'LABEL', { for: !0, class: !0 }));
			var v = i(K);
			V = u(v, 'SPAN', { class: !0 });
			var g = i(V);
			(z = d(g, 'Email')),
				g.forEach(c),
				(Q = n(v)),
				(W = u(v, 'INPUT', { type: !0, id: !0, placeholder: !0, class: !0, required: !0 })),
				v.forEach(c),
				(X = n(s)),
				(Y = u(s, 'LABEL', { for: !0, class: !0 }));
			var E = i(Y);
			Z = u(E, 'SPAN', { class: !0 });
			var m = i(Z);
			($ = d(m, 'Password')),
				m.forEach(c),
				(aa = n(E)),
				(ra = u(E, 'INPUT', { type: !0, id: !0, class: !0, required: !0 })),
				E.forEach(c),
				(ea = n(s)),
				(sa = u(s, 'LABEL', { htmlfor: !0, class: !0 }));
			var N = i(sa);
			oa = u(N, 'SPAN', {});
			var P = i(oa);
			(la = d(P, 'Role')),
				P.forEach(c),
				(ta = n(N)),
				(ca = u(N, 'SELECT', { id: !0, class: !0, required: !0 }));
			var A = i(ca);
			na = u(A, 'OPTION', { value: !0 });
			var L = i(na);
			(ua = d(L, 'USER')), L.forEach(c), (ia = u(A, 'OPTION', { value: !0 }));
			var R = i(ia);
			(da = d(R, 'RANGER')), R.forEach(c), (pa = u(A, 'OPTION', { value: !0 }));
			var k = i(pa);
			(fa = d(k, 'DOCTOR')), k.forEach(c), (ba = u(A, 'OPTION', { value: !0 }));
			var _ = i(ba);
			(ha = d(_, 'ADMIN')),
				_.forEach(c),
				A.forEach(c),
				N.forEach(c),
				(va = n(s)),
				(ga = u(s, 'INPUT', { type: !0, value: !0, class: !0 })),
				(Ea = n(s)),
				(ma = u(s, 'DIV', { class: !0 }));
			var La = i(ma);
			Na = u(La, 'SPAN', {});
			var Ra = i(Na);
			(ya = d(Ra, 'Have an account')),
				Ra.forEach(c),
				(xa = n(La)),
				(Pa = u(La, 'A', { href: !0, class: !0 }));
			var ka = i(Pa);
			(Aa = d(ka, 'Login here?')), ka.forEach(c), La.forEach(c), s.forEach(c), this.h();
		},
		h() {
			(document.title = 'Register'),
				p(x, 'class', 'text-gray-700'),
				p(T, 'type', 'text'),
				p(T, 'id', 'First name'),
				p(T, 'placeholder', 'Boston Rockstack'),
				p(
					T,
					'class',
					'block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300'
				),
				(T.required = !0),
				p(y, 'for', 'First name'),
				p(y, 'class', 'block'),
				p(w, 'class', 'text-gray-700'),
				p(D, 'type', 'text'),
				p(D, 'id', 'LastName'),
				p(D, 'placeholder', 'Boston Rockstack'),
				p(
					D,
					'class',
					'block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300'
				),
				(D.required = !0),
				p(q, 'for', 'LastName'),
				p(q, 'class', 'block'),
				p(G, 'class', 'text-gray-700'),
				p(j, 'type', 'text'),
				p(j, 'id', 'phone'),
				p(j, 'placeholder', '2507147115'),
				p(
					j,
					'class',
					'block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300'
				),
				(j.required = !0),
				p(C, 'for', 'phone'),
				p(C, 'class', 'block'),
				p(V, 'class', 'text-gray-700'),
				p(W, 'type', 'email'),
				p(W, 'id', 'email'),
				p(W, 'placeholder', 'test@gmail.com'),
				p(
					W,
					'class',
					'block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300'
				),
				(W.required = !0),
				p(K, 'for', 'email'),
				p(K, 'class', 'block'),
				p(Z, 'class', 'text-gray-700'),
				p(ra, 'type', 'password'),
				p(ra, 'id', 'password'),
				p(
					ra,
					'class',
					'block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300'
				),
				(ra.required = !0),
				p(Y, 'for', 'password'),
				p(Y, 'class', 'block'),
				(na.__value = 'USER'),
				(na.value = na.__value),
				(ia.__value = 'RANGER'),
				(ia.value = ia.__value),
				(pa.__value = 'DOCTOR'),
				(pa.value = pa.__value),
				(ba.__value = 'ADMIN'),
				(ba.value = ba.__value),
				p(ca, 'id', 'role'),
				p(
					ca,
					'class',
					'block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300'
				),
				(ca.required = !0),
				void 0 === _ && N(() => a[5].call(ca)),
				p(sa, 'htmlfor', 'role'),
				p(sa, 'class', 'block'),
				p(ga, 'type', 'submit'),
				(ga.value = 'Register here'),
				p(
					ga,
					'class',
					'bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-3 '
				),
				p(Pa, 'href', '/auth/login'),
				p(Pa, 'class', ' text-blue-500'),
				p(ma, 'class', 'text-center'),
				p(e, 'class', 'grid grid-cols-1 gap-6');
		},
		m(s, o) {
			f(s, r, o),
				f(s, e, o),
				b(e, y),
				b(y, x),
				b(x, I),
				b(y, O),
				b(y, T),
				h(T, P),
				b(e, S),
				b(e, q),
				b(q, w),
				b(w, U),
				b(q, B),
				b(q, D),
				h(D, A),
				b(e, F),
				b(e, C),
				b(C, G),
				b(G, M),
				b(C, H),
				b(C, j),
				h(j, L),
				b(e, J),
				b(e, K),
				b(K, V),
				b(V, z),
				b(K, Q),
				b(K, W),
				h(W, R),
				b(e, X),
				b(e, Y),
				b(Y, Z),
				b(Z, $),
				b(Y, aa),
				b(Y, ra),
				h(ra, k),
				b(e, ea),
				b(e, sa),
				b(sa, oa),
				b(oa, la),
				b(sa, ta),
				b(sa, ca),
				b(ca, na),
				b(na, ua),
				b(ca, ia),
				b(ia, da),
				b(ca, pa),
				b(pa, fa),
				b(ca, ba),
				b(ba, ha),
				v(ca, _),
				b(e, va),
				b(e, ga),
				b(e, Ea),
				b(e, ma),
				b(ma, Na),
				b(Na, ya),
				b(ma, xa),
				b(ma, Pa),
				b(Pa, Aa),
				La ||
					((Ra = [
						g(T, 'input', a[0]),
						g(D, 'input', a[1]),
						g(j, 'input', a[2]),
						g(W, 'input', a[3]),
						g(ra, 'input', a[4]),
						g(ca, 'change', a[5])
					]),
					(La = !0));
		},
		p(a, [r]) {
			0 & r && T.value !== P && h(T, P),
				0 & r && D.value !== A && h(D, A),
				0 & r && j.value !== L && h(j, L),
				0 & r && W.value !== R && h(W, R),
				0 & r && ra.value !== k && h(ra, k),
				0 & r && v(ca, _);
		},
		i: E,
		o: E,
		d(a) {
			a && c(r), a && c(e), (La = !1), m(Ra);
		}
	};
}
let P, A, L, R, k, _;
function I(a, r, e) {
	return [
		function () {
			P = this.value;
		},
		function () {
			A = this.value;
		},
		function () {
			L = this.value;
		},
		function () {
			R = this.value;
		},
		function () {
			k = this.value;
		},
		function () {
			_ = y(this);
		}
	];
}
export default class extends a {
	constructor(a) {
		super(), r(this, a, I, x, e, {});
	}
}
