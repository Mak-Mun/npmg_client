import {
	S as e,
	i as s,
	s as a,
	e as t,
	k as r,
	t as l,
	c as n,
	a as o,
	d as i,
	n as c,
	g as d,
	b as m,
	f as u,
	F as f,
	K as h,
	C as p
} from './index-31c2d992.js';
function b(e) {
	let s,
		a,
		b,
		v,
		x,
		g,
		y,
		w,
		E,
		I,
		j,
		T,
		U,
		D,
		V,
		N,
		O,
		k,
		P,
		S,
		A,
		B,
		C,
		$,
		z,
		F,
		H,
		K,
		q,
		G,
		J,
		L,
		M,
		Q;
	return {
		c() {
			(s = t('div')),
				(a = t('div')),
				(b = t('div')),
				(v = t('div')),
				(x = r()),
				(g = t('span')),
				(y = l('​')),
				(w = r()),
				(E = t('div')),
				(I = t('div')),
				(j = t('h1')),
				(T = l('Email Invitations')),
				(U = r()),
				(D = t('p')),
				(V = l('Send invitations, type user emails here')),
				(N = r()),
				(O = t('div')),
				(k = t('input')),
				(P = r()),
				(S = t('input')),
				(A = r()),
				(B = t('input')),
				(C = r()),
				($ = t('button')),
				(z = l('+ Add another')),
				(F = r()),
				(H = t('div')),
				(K = t('button')),
				(q = l('Cancel')),
				(G = r()),
				(J = t('button')),
				(L = l('Invite')),
				this.h();
		},
		l(e) {
			s = n(e, 'DIV', { class: !0 });
			var t = o(s);
			a = n(t, 'DIV', { class: !0 });
			var r = o(a);
			b = n(r, 'DIV', { class: !0, 'aria-hidden': !0 });
			var l = o(b);
			(v = n(l, 'DIV', { class: !0 })),
				o(v).forEach(i),
				l.forEach(i),
				(x = c(r)),
				(g = n(r, 'SPAN', { class: !0, 'aria-hidden': !0 }));
			var m = o(g);
			(y = d(m, '​')),
				m.forEach(i),
				(w = c(r)),
				(E = n(r, 'DIV', { class: !0, role: !0, 'aria-modal': !0, 'aria-labelledby': !0 }));
			var u = o(E);
			I = n(u, 'DIV', { class: !0 });
			var f = o(I);
			j = n(f, 'H1', { class: !0 });
			var h = o(j);
			(T = d(h, 'Email Invitations')), h.forEach(i), (U = c(f)), (D = n(f, 'P', { class: !0 }));
			var p = o(D);
			(V = d(p, 'Send invitations, type user emails here')),
				p.forEach(i),
				(N = c(f)),
				(O = n(f, 'DIV', { class: !0 }));
			var M = o(O);
			(k = n(M, 'INPUT', { type: !0, placeholder: !0, class: !0 })),
				(P = c(M)),
				(S = n(M, 'INPUT', { type: !0, placeholder: !0, class: !0 })),
				(A = c(M)),
				(B = n(M, 'INPUT', { type: !0, placeholder: !0, class: !0 })),
				(C = c(M)),
				($ = n(M, 'BUTTON', { type: !0, class: !0 }));
			var Q = o($);
			(z = d(Q, '+ Add another')),
				Q.forEach(i),
				M.forEach(i),
				f.forEach(i),
				(F = c(u)),
				(H = n(u, 'DIV', { class: !0 }));
			var R = o(H);
			K = n(R, 'BUTTON', { type: !0, class: !0 });
			var W = o(K);
			(q = d(W, 'Cancel')), W.forEach(i), (G = c(R)), (J = n(R, 'BUTTON', { type: !0, class: !0 }));
			var X = o(J);
			(L = d(X, 'Invite')),
				X.forEach(i),
				R.forEach(i),
				u.forEach(i),
				r.forEach(i),
				t.forEach(i),
				this.h();
		},
		h() {
			m(v, 'class', 'absolute inset-0 bg-gray-500 opacity-75'),
				m(b, 'class', 'fixed inset-0 transition-opacity'),
				m(b, 'aria-hidden', 'true'),
				m(g, 'class', 'hidden sm:inline-block sm:align-middle sm:h-screen'),
				m(g, 'aria-hidden', 'true'),
				m(j, 'class', 'text-xl font-semibold md:mb-5 uppercase'),
				m(D, 'class', 'md:ml-4'),
				m(k, 'type', 'text'),
				m(k, 'placeholder', 'User email'),
				m(
					k,
					'class',
					'rounded w-full border-2 border-green-new text-sm  py-2 px-3 mb-3 focus:outline-none svelte-2ch0jb'
				),
				m(S, 'type', 'text'),
				m(S, 'placeholder', 'User email'),
				m(
					S,
					'class',
					'rounded w-full border-2 border-green-new text-sm  py-2 px-3 mb-3 focus:outline-none svelte-2ch0jb'
				),
				m(B, 'type', 'text'),
				m(B, 'placeholder', 'User email'),
				m(
					B,
					'class',
					'rounded w-full border-2 border-green-new text-sm  py-2 px-3 mb-3 focus:outline-none svelte-2ch0jb'
				),
				m($, 'type', 'button'),
				m($, 'class', 'text-green mx-3 underline focus:outline-none svelte-2ch0jb'),
				m(O, 'class', 'w-3/4 md:ml-4'),
				m(I, 'class', 'm-3 mt-5'),
				m(K, 'type', 'button'),
				m(
					K,
					'class',
					'bg-logout w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm svelte-2ch0jb'
				),
				m(J, 'type', 'button'),
				m(
					J,
					'class',
					'bg-green mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm svelte-2ch0jb'
				),
				m(H, 'class', 'bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'),
				m(
					E,
					'class',
					'inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-2 border-green-new svelte-2ch0jb'
				),
				m(E, 'role', 'dialog'),
				m(E, 'aria-modal', 'true'),
				m(E, 'aria-labelledby', 'modal-headline'),
				m(
					a,
					'class',
					'flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'
				),
				m(s, 'class', 'fixed z-10 inset-0 overflow-y-auto');
		},
		m(t, r) {
			u(t, s, r),
				f(s, a),
				f(a, b),
				f(b, v),
				f(a, x),
				f(a, g),
				f(g, y),
				f(a, w),
				f(a, E),
				f(E, I),
				f(I, j),
				f(j, T),
				f(I, U),
				f(I, D),
				f(D, V),
				f(I, N),
				f(I, O),
				f(O, k),
				f(O, P),
				f(O, S),
				f(O, A),
				f(O, B),
				f(O, C),
				f(O, $),
				f($, z),
				f(E, F),
				f(E, H),
				f(H, K),
				f(K, q),
				f(H, G),
				f(H, J),
				f(J, L),
				M || ((Q = h(K, 'click', e[0])), (M = !0));
		},
		p: p,
		i: p,
		o: p,
		d(e) {
			e && i(s), (M = !1), Q();
		}
	};
}
function v(e, s, a) {
	let { isOpen: t } = s;
	return (
		(e.$$set = (e) => {
			'isOpen' in e && a(1, (t = e.isOpen));
		}),
		[
			function () {
				a(1, (t = !1));
			},
			t
		]
	);
}
class x extends e {
	constructor(e) {
		super(), s(this, e, v, b, a, { isOpen: 1 });
	}
}
export { x as I };