import {
	S as e,
	i as s,
	s as a,
	e as t,
	t as r,
	k as l,
	c as o,
	a as c,
	g as n,
	d as x,
	n as i,
	b as f,
	f as h,
	F as d,
	K as v,
	G as m,
	C as u,
	H as g,
	j as p,
	m as E,
	o as w,
	v as b,
	r as D,
	w as I
} from '../../chunks/index-31c2d992.js';
import { g as k } from '../../chunks/navigation-9e49acea.js';
import '../../chunks/singletons-6b53f818.js';
function y(e, s, a) {
	const t = e.slice();
	return (t[3] = s[a]), t;
}
function T(e) {
	let s,
		a,
		m,
		u,
		g,
		p,
		E,
		w,
		b,
		D,
		I,
		k,
		y,
		T,
		P = e[3] + '';
	function V() {
		return e[2](e[3]);
	}
	return {
		c() {
			(s = t('tr')),
				(a = t('td')),
				(m = r(P)),
				(u = l()),
				(g = t('td')),
				(p = r('Kwitonda')),
				(E = l()),
				(w = t('td')),
				(b = r('Mucyo Erneste')),
				(D = l()),
				(I = t('td')),
				(k = r('3 hours ago')),
				this.h();
		},
		l(e) {
			s = o(e, 'TR', { class: !0 });
			var t = c(s);
			a = o(t, 'TD', { class: !0 });
			var r = c(a);
			(m = n(r, P)), r.forEach(x), (u = i(t)), (g = o(t, 'TD', { class: !0 }));
			var l = c(g);
			(p = n(l, 'Kwitonda')), l.forEach(x), (E = i(t)), (w = o(t, 'TD', { class: !0 }));
			var f = c(w);
			(b = n(f, 'Mucyo Erneste')), f.forEach(x), (D = i(t)), (I = o(t, 'TD', { class: !0 }));
			var h = c(I);
			(k = n(h, '3 hours ago')), h.forEach(x), t.forEach(x), this.h();
		},
		h() {
			f(a, 'class', 'text-center w-1/5 py-3 svelte-15rxaag'),
				f(g, 'class', 'text-center w-2/5 svelte-15rxaag'),
				f(w, 'class', 'text-center w-2/5 svelte-15rxaag'),
				f(I, 'class', 'text-center w-2/5 svelte-15rxaag'),
				f(
					s,
					'class',
					'flex w-full mb-2 items-center justify-between cursor-pointer shadow hover:text-motherGreen svelte-15rxaag'
				);
		},
		m(e, t) {
			h(e, s, t),
				d(s, a),
				d(a, m),
				d(s, u),
				d(s, g),
				d(g, p),
				d(s, E),
				d(s, w),
				d(w, b),
				d(s, D),
				d(s, I),
				d(I, k),
				y || ((T = v(s, 'click', V)), (y = !0));
		},
		p(s, a) {
			e = s;
		},
		d(e) {
			e && x(s), (y = !1), T();
		}
	};
}
function P(e) {
	let s,
		a,
		p,
		E,
		w,
		b,
		D,
		I,
		k,
		P,
		R,
		A,
		S,
		j,
		H,
		$,
		G,
		C,
		M,
		K,
		L,
		O,
		N,
		B,
		W,
		_,
		F,
		Y,
		q,
		z,
		J,
		Q,
		U,
		X,
		Z,
		ee,
		se,
		ae,
		te,
		re,
		le,
		oe,
		ce,
		ne,
		xe,
		ie,
		fe,
		he,
		de,
		ve,
		me,
		ue,
		ge,
		pe,
		Ee,
		we,
		be,
		De,
		Ie,
		ke,
		ye,
		Te,
		Pe,
		Ve,
		Re,
		Ae,
		Se,
		je,
		He,
		$e,
		Ge,
		Ce,
		Me,
		Ke,
		Le,
		Oe,
		Ne,
		Be,
		We,
		_e,
		Fe,
		Ye,
		qe,
		ze,
		Je,
		Qe,
		Ue = e[0],
		Xe = [];
	for (let t = 0; t < Ue.length; t += 1) Xe[t] = T(y(e, Ue, t));
	return {
		c() {
			(s = l()),
				(a = t('div')),
				(p = t('div')),
				(E = t('h1')),
				(w = r('REPORT VIEWS')),
				(b = l()),
				(D = t('p')),
				(I = r('+')),
				(k = l()),
				(P = t('div')),
				(R = t('div')),
				(A = t('h1')),
				(S = r('RECENT REPORTS')),
				(j = l()),
				(H = t('table')),
				($ = t('thead')),
				(G = t('tr')),
				(C = t('th')),
				(M = l()),
				(K = t('th')),
				(L = r('Gorilla')),
				(O = l()),
				(N = t('th')),
				(B = r('Reporter')),
				(W = l()),
				(_ = t('th')),
				(F = r('Time')),
				(Y = l()),
				(q = t('tbody'));
			for (let e = 0; e < Xe.length; e += 1) Xe[e].c();
			(z = l()),
				(J = t('p')),
				(Q = r('Load More')),
				(U = l()),
				(X = t('div')),
				(Z = t('div')),
				(ee = t('h3')),
				(se = r('Comments and Photos')),
				(ae = l()),
				(te = t('div')),
				(re = t('div')),
				(le = t('p')),
				(oe = r('"It doesnt look health in the way it stands it looks like its leg was broken"')),
				(ce = l()),
				(ne = t('p')),
				(xe = r('Didier on Amahoro report')),
				(ie = l()),
				(fe = t('p')),
				(he = r('3 hours ago')),
				(de = l()),
				(ve = t('div')),
				(me = t('div')),
				(ue = t('img')),
				(pe = l()),
				(Ee = t('p')),
				(we = r('Didier on Amahoro report')),
				(be = l()),
				(De = t('p')),
				(Ie = r('3 hours ago')),
				(ke = l()),
				(ye = t('div')),
				(Te = t('div')),
				(Pe = t('p')),
				(Ve = r('"It doesnt look health in the way it stands it looks like its leg was broken"')),
				(Re = l()),
				(Ae = t('p')),
				(Se = r('Didier on Amahoro report')),
				(je = l()),
				(He = t('p')),
				($e = r('3 hours ago')),
				(Ge = l()),
				(Ce = t('div')),
				(Me = t('div')),
				(Ke = t('img')),
				(Oe = l()),
				(Ne = t('p')),
				(Be = r('Didier on Amahoro report')),
				(We = l()),
				(_e = t('p')),
				(Fe = r('3 hours ago')),
				(Ye = l()),
				(qe = t('span')),
				(ze = r('Load more')),
				this.h();
		},
		l(e) {
			m('[data-svelte="svelte-nxt8i9"]', document.head).forEach(x),
				(s = i(e)),
				(a = o(e, 'DIV', { class: !0 }));
			var t = c(a);
			p = o(t, 'DIV', { class: !0 });
			var r = c(p);
			E = o(r, 'H1', { class: !0 });
			var l = c(E);
			(w = n(l, 'REPORT VIEWS')), l.forEach(x), (b = i(r)), (D = o(r, 'P', { class: !0 }));
			var f = c(D);
			(I = n(f, '+')), f.forEach(x), r.forEach(x), (k = i(t)), (P = o(t, 'DIV', { class: !0 }));
			var h = c(P);
			R = o(h, 'DIV', { class: !0 });
			var d = c(R);
			A = o(d, 'H1', { class: !0 });
			var v = c(A);
			(S = n(v, 'RECENT REPORTS')), v.forEach(x), (j = i(d)), (H = o(d, 'TABLE', { class: !0 }));
			var u = c(H);
			$ = o(u, 'THEAD', { class: !0 });
			var g = c($);
			G = o(g, 'TR', { class: !0 });
			var y = c(G);
			(C = o(y, 'TH', { class: !0 })), c(C).forEach(x), (M = i(y)), (K = o(y, 'TH', { class: !0 }));
			var T = c(K);
			(L = n(T, 'Gorilla')), T.forEach(x), (O = i(y)), (N = o(y, 'TH', { class: !0 }));
			var V = c(N);
			(B = n(V, 'Reporter')), V.forEach(x), (W = i(y)), (_ = o(y, 'TH', { class: !0 }));
			var ge = c(_);
			(F = n(ge, 'Time')),
				ge.forEach(x),
				y.forEach(x),
				g.forEach(x),
				(Y = i(u)),
				(q = o(u, 'TBODY', { class: !0 }));
			var Le = c(q);
			for (let s = 0; s < Xe.length; s += 1) Xe[s].l(Le);
			(z = i(Le)), (J = o(Le, 'P', { class: !0 }));
			var Je = c(J);
			(Q = n(Je, 'Load More')),
				Je.forEach(x),
				Le.forEach(x),
				u.forEach(x),
				d.forEach(x),
				(U = i(h)),
				(X = o(h, 'DIV', { class: !0 }));
			var Qe = c(X);
			Z = o(Qe, 'DIV', { class: !0 });
			var Ue = c(Z);
			ee = o(Ue, 'H3', { class: !0 });
			var Ze = c(ee);
			(se = n(Ze, 'Comments and Photos')),
				Ze.forEach(x),
				(ae = i(Ue)),
				(te = o(Ue, 'DIV', { class: !0 }));
			var es = c(te);
			re = o(es, 'DIV', { class: !0 });
			var ss = c(re);
			le = o(ss, 'P', { class: !0 });
			var as = c(le);
			(oe = n(as, '"It doesnt look health in the way it stands it looks like its leg was broken"')),
				as.forEach(x),
				(ce = i(ss)),
				(ne = o(ss, 'P', { class: !0 }));
			var ts = c(ne);
			(xe = n(ts, 'Didier on Amahoro report')),
				ts.forEach(x),
				(ie = i(ss)),
				(fe = o(ss, 'P', { class: !0 }));
			var rs = c(fe);
			(he = n(rs, '3 hours ago')),
				rs.forEach(x),
				ss.forEach(x),
				es.forEach(x),
				(de = i(Ue)),
				(ve = o(Ue, 'DIV', { class: !0 }));
			var ls = c(ve);
			me = o(ls, 'DIV', { class: !0 });
			var os = c(me);
			(ue = o(os, 'IMG', { alt: !0, src: !0, class: !0 })),
				(pe = i(os)),
				(Ee = o(os, 'P', { class: !0 }));
			var cs = c(Ee);
			(we = n(cs, 'Didier on Amahoro report')),
				cs.forEach(x),
				(be = i(os)),
				(De = o(os, 'P', { class: !0 }));
			var ns = c(De);
			(Ie = n(ns, '3 hours ago')),
				ns.forEach(x),
				os.forEach(x),
				ls.forEach(x),
				(ke = i(Ue)),
				(ye = o(Ue, 'DIV', { class: !0 }));
			var xs = c(ye);
			Te = o(xs, 'DIV', { class: !0 });
			var is = c(Te);
			Pe = o(is, 'P', { class: !0 });
			var fs = c(Pe);
			(Ve = n(fs, '"It doesnt look health in the way it stands it looks like its leg was broken"')),
				fs.forEach(x),
				(Re = i(is)),
				(Ae = o(is, 'P', { class: !0 }));
			var hs = c(Ae);
			(Se = n(hs, 'Didier on Amahoro report')),
				hs.forEach(x),
				(je = i(is)),
				(He = o(is, 'P', { class: !0 }));
			var ds = c(He);
			($e = n(ds, '3 hours ago')),
				ds.forEach(x),
				is.forEach(x),
				xs.forEach(x),
				(Ge = i(Ue)),
				(Ce = o(Ue, 'DIV', { class: !0 }));
			var vs = c(Ce);
			Me = o(vs, 'DIV', { class: !0 });
			var ms = c(Me);
			(Ke = o(ms, 'IMG', { alt: !0, src: !0, class: !0 })),
				(Oe = i(ms)),
				(Ne = o(ms, 'P', { class: !0 }));
			var us = c(Ne);
			(Be = n(us, 'Didier on Amahoro report')),
				us.forEach(x),
				(We = i(ms)),
				(_e = o(ms, 'P', { class: !0 }));
			var gs = c(_e);
			(Fe = n(gs, '3 hours ago')),
				gs.forEach(x),
				ms.forEach(x),
				vs.forEach(x),
				Ue.forEach(x),
				(Ye = i(Qe)),
				(qe = o(Qe, 'SPAN', { class: !0 }));
			var ps = c(qe);
			(ze = n(ps, 'Load more')), ps.forEach(x), Qe.forEach(x), h.forEach(x), t.forEach(x), this.h();
		},
		h() {
			(document.title = 'Reports'),
				f(E, 'class', 'text-xl font-semibold text-center md:text-left svelte-15rxaag'),
				f(
					D,
					'class',
					'bg-primaryGreen px-4 rounded text-white text-xl font-bold cursor-pointer svelte-15rxaag'
				),
				f(p, 'class', 'px:2 m-2 md:px-5 md:m-5 md:mt-1 flex justify-between svelte-15rxaag'),
				f(
					A,
					'class',
					'text-center font-semibold font-sourceSans mb-6 text-greenAccent svelte-15rxaag'
				),
				f(C, 'class', 'text-center w-1/5 svelte-15rxaag'),
				f(K, 'class', 'text-center w-2/5 svelte-15rxaag'),
				f(N, 'class', 'text-center w-2/5 svelte-15rxaag'),
				f(_, 'class', 'text-center w-2/5 svelte-15rxaag'),
				f(G, 'class', 'flex w-full mb-2 items-center justify-between svelte-15rxaag'),
				f($, 'class', 'flex w-full svelte-15rxaag'),
				f(J, 'class', 'cursor-pointer text-successorColor font-semibold svelte-15rxaag'),
				f(
					q,
					'class',
					'flex flex-col items-center justify-between overflow-y-auto w-full mt-3 svelte-15rxaag'
				),
				f(H, 'class', 'text-left w-full md:px-10 svelte-15rxaag'),
				f(
					R,
					'class',
					'w-full sm:w-full md:5/12 lg:w-6/12 bg-white rounded border px-4 py-3 md:px-8 md:py-3 mr-3 svelte-15rxaag'
				),
				f(
					ee,
					'class',
					'text-center text-xl cursor-pointer font-semibold font-sourceSans text-greenAccent svelte-15rxaag'
				),
				f(le, 'class', 'w-full text-center font-semibold text-sm svelte-15rxaag'),
				f(ne, 'class', 'text-xs text-center svelte-15rxaag'),
				f(fe, 'class', 'text-xs text-center svelte-15rxaag'),
				f(re, 'class', 'flex flex-col md:w-5/6 cursor-pointer py-2 svelte-15rxaag'),
				f(
					te,
					'class',
					'w-full flex flex-col mx-auto items-center border rounded mb-2 svelte-15rxaag'
				),
				f(ue, 'alt', 'Success Kid'),
				ue.src !== (ge = V) && f(ue, 'src', ge),
				f(ue, 'class', 'h-24 w-36 shadow rounded-sm cursor-pointer svelte-15rxaag'),
				f(Ee, 'class', 'text-xs text-center svelte-15rxaag'),
				f(De, 'class', 'text-xs text-center svelte-15rxaag'),
				f(me, 'class', 'flex flex-col md:w-5/6 cursor-pointer py-2 svelte-15rxaag'),
				f(
					ve,
					'class',
					'w-full flex flex-col mx-auto items-center border rounded mb-2 svelte-15rxaag'
				),
				f(Pe, 'class', 'w-full text-center font-semibold text-sm svelte-15rxaag'),
				f(Ae, 'class', 'text-xs text-center svelte-15rxaag'),
				f(He, 'class', 'text-xs text-center svelte-15rxaag'),
				f(Te, 'class', 'flex flex-col md:w-5/6 cursor-pointer py-2 svelte-15rxaag'),
				f(
					ye,
					'class',
					'w-full flex flex-col mx-auto items-center border rounded mb-2 svelte-15rxaag'
				),
				f(Ke, 'alt', 'Success Kid'),
				Ke.src !== (Le = V) && f(Ke, 'src', Le),
				f(Ke, 'class', 'h-24 w-36 shadow rounded-sm cursor-pointer svelte-15rxaag'),
				f(Ne, 'class', 'text-xs text-center svelte-15rxaag'),
				f(_e, 'class', 'text-xs text-center svelte-15rxaag'),
				f(Me, 'class', 'flex flex-col md:w-5/6 cursor-pointer py-2 svelte-15rxaag'),
				f(
					Ce,
					'class',
					'w-full flex flex-col mx-auto items-center border rounded mb-2 svelte-15rxaag'
				),
				f(Z, 'class', 'flex flex-col svelte-15rxaag'),
				f(
					qe,
					'class',
					'load-more font-semibold text-sm text-center mx-2 px-10 cursor-pointer svelte-15rxaag'
				),
				f(
					X,
					'class',
					'w-full sm:w-full md:5/12 lg:w-5/12 bg-white rounded border px-4 py-3 mt-4 md:mt-0 md:ml-2 svelte-15rxaag'
				),
				f(P, 'class', 'w-full md:flex svelte-15rxaag'),
				f(a, 'class', 'svelte-15rxaag');
		},
		m(t, r) {
			h(t, s, r),
				h(t, a, r),
				d(a, p),
				d(p, E),
				d(E, w),
				d(p, b),
				d(p, D),
				d(D, I),
				d(a, k),
				d(a, P),
				d(P, R),
				d(R, A),
				d(A, S),
				d(R, j),
				d(R, H),
				d(H, $),
				d($, G),
				d(G, C),
				d(G, M),
				d(G, K),
				d(K, L),
				d(G, O),
				d(G, N),
				d(N, B),
				d(G, W),
				d(G, _),
				d(_, F),
				d(H, Y),
				d(H, q);
			for (let e = 0; e < Xe.length; e += 1) Xe[e].m(q, null);
			d(q, z),
				d(q, J),
				d(J, Q),
				d(P, U),
				d(P, X),
				d(X, Z),
				d(Z, ee),
				d(ee, se),
				d(Z, ae),
				d(Z, te),
				d(te, re),
				d(re, le),
				d(le, oe),
				d(re, ce),
				d(re, ne),
				d(ne, xe),
				d(re, ie),
				d(re, fe),
				d(fe, he),
				d(Z, de),
				d(Z, ve),
				d(ve, me),
				d(me, ue),
				d(me, pe),
				d(me, Ee),
				d(Ee, we),
				d(me, be),
				d(me, De),
				d(De, Ie),
				d(Z, ke),
				d(Z, ye),
				d(ye, Te),
				d(Te, Pe),
				d(Pe, Ve),
				d(Te, Re),
				d(Te, Ae),
				d(Ae, Se),
				d(Te, je),
				d(Te, He),
				d(He, $e),
				d(Z, Ge),
				d(Z, Ce),
				d(Ce, Me),
				d(Me, Ke),
				d(Me, Oe),
				d(Me, Ne),
				d(Ne, Be),
				d(Me, We),
				d(Me, _e),
				d(_e, Fe),
				d(X, Ye),
				d(X, qe),
				d(qe, ze),
				Je || ((Qe = v(D, 'click', e[1])), (Je = !0));
		},
		p(e, [s]) {
			if (1 & s) {
				let a;
				for (Ue = e[0], a = 0; a < Ue.length; a += 1) {
					const t = y(e, Ue, a);
					Xe[a] ? Xe[a].p(t, s) : ((Xe[a] = T(t)), Xe[a].c(), Xe[a].m(q, z));
				}
				for (; a < Xe.length; a += 1) Xe[a].d(1);
				Xe.length = Ue.length;
			}
		},
		i: u,
		o: u,
		d(e) {
			e && x(s), e && x(a), g(Xe, e), (Je = !1), Qe();
		}
	};
}
let V =
	'https://wallup.net/wp-content/uploads/2017/11/10/74767-mountain-ridges-Dolomites_mountains.jpg';
function R(e) {
	return [
		[1, 2, 3, 4, 5, 6, 7, 8],
		() => {
			k('ranger/new_report');
		},
		(e) => {
			k(`/admin/reports/report/${e}`);
		}
	];
}
class A extends e {
	constructor(e) {
		super(), s(this, e, R, P, a, {});
	}
}
function S(e) {
	let s, a, r;
	return (
		(a = new A({})),
		{
			c() {
				(s = t('div')), p(a.$$.fragment);
			},
			l(e) {
				s = o(e, 'DIV', {});
				var t = c(s);
				E(a.$$.fragment, t), t.forEach(x);
			},
			m(e, t) {
				h(e, s, t), w(a, s, null), (r = !0);
			},
			p: u,
			i(e) {
				r || (b(a.$$.fragment, e), (r = !0));
			},
			o(e) {
				D(a.$$.fragment, e), (r = !1);
			},
			d(e) {
				e && x(s), I(a);
			}
		}
	);
}
export default class extends e {
	constructor(e) {
		super(), s(this, e, null, S, a, {});
	}
}