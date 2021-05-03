var e = Object.defineProperty,
	t = Object.prototype.hasOwnProperty,
	s = Object.getOwnPropertySymbols,
	a = Object.prototype.propertyIsEnumerable,
	r = (t, s, a) =>
		s in t ? e(t, s, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (t[s] = a),
	l = (e, l) => {
		for (var c in l || (l = {})) t.call(l, c) && r(e, c, l[c]);
		if (s) for (var c of s(l)) a.call(l, c) && r(e, c, l[c]);
		return e;
	};
import {
	S as c,
	i as n,
	s as o,
	D as i,
	e as f,
	c as d,
	a as u,
	d as h,
	b as p,
	f as $,
	K as m,
	E as v,
	v as x,
	r as w,
	V as b,
	x as g,
	z as E,
	y as T,
	W as y,
	X as D,
	Y as j,
	Z as S,
	R as I,
	B as H,
	u as O,
	t as _,
	k,
	g as P,
	n as K,
	F as C,
	C as R,
	j as V,
	G as L,
	m as N,
	o as B,
	w as G,
	H as z
} from '../../chunks/index-31c2d992.js';
import { w as A } from '../../chunks/index-c2ea1688.js';
let U = 1;
function Y() {
	return 'svelte-tabs-' + U++;
}
function F(e) {
	let t, s, a, r;
	const l = e[4].default,
		c = i(l, e, e[3], null);
	return {
		c() {
			(t = f('div')), c && c.c(), this.h();
		},
		l(e) {
			t = d(e, 'DIV', { class: !0 });
			var s = u(t);
			c && c.l(s), s.forEach(h), this.h();
		},
		h() {
			p(t, 'class', 'svelte-tabs');
		},
		m(l, n) {
			$(l, t, n), c && c.m(t, null), (s = !0), a || ((r = m(t, 'keydown', e[1])), (a = !0));
		},
		p(e, [t]) {
			c && c.p && 8 & t && v(c, l, e, e[3], t, null, null);
		},
		i(e) {
			s || (x(c, e), (s = !0));
		},
		o(e) {
			w(c, e), (s = !1);
		},
		d(e) {
			e && h(t), c && c.d(e), (a = !1), r();
		}
	};
}
const q = {};
function M(e, t, s) {
	let a,
		{ $$slots: r = {}, $$scope: c } = t,
		{ initialSelectedIndex: n = 0 } = t;
	const o = [],
		i = [],
		f = [],
		d = A({}),
		u = A({}),
		h = A(null);
	b(e, h, (e) => s(5, (a = e)));
	const p = A(null);
	function $(e, t, s) {
		e.push(t),
			s.update((e) => e || t),
			y(() =>
				(function (e, t, s) {
					const a = e.indexOf(t);
					e.splice(a, 1), s.update((s) => (s === t ? e[a] || e[e.length - 1] : s));
				})(e, t, s)
			);
	}
	function m(e) {
		const t = i.indexOf(e);
		h.set(e), p.set(f[t]);
	}
	return (
		g(q, {
			registerTab(e) {
				$(i, e, h);
			},
			registerTabElement(e) {
				o.push(e);
			},
			registerPanel(e) {
				$(f, e, p);
			},
			selectTab: m,
			selectedTab: h,
			selectedPanel: p,
			controls: d,
			labeledBy: u
		}),
		E(() => {
			m(i[n]);
		}),
		T(() => {
			for (let e = 0; e < i.length; e++)
				d.update((t) => l(l({}, t), { [i[e].id]: f[e].id })),
					u.update((t) => l(l({}, t), { [f[e].id]: i[e].id }));
		}),
		(e.$$set = (e) => {
			'initialSelectedIndex' in e && s(2, (n = e.initialSelectedIndex)),
				'$$scope' in e && s(3, (c = e.$$scope));
		}),
		[
			h,
			async function (e) {
				if (e.target.classList.contains('svelte-tabs__tab')) {
					let t = i.indexOf(a);
					switch (e.key) {
						case 'ArrowRight':
							(t += 1), t > i.length - 1 && (t = 0), m(i[t]), o[t].focus();
							break;
						case 'ArrowLeft':
							(t -= 1), t < 0 && (t = i.length - 1), m(i[t]), o[t].focus();
					}
				}
			},
			n,
			c,
			r
		]
	);
}
class W extends c {
	constructor(e) {
		super(), n(this, e, M, F, o, { initialSelectedIndex: 2 });
	}
}
function X(e) {
	let t, s, a, r, l, c;
	const n = e[9].default,
		o = i(n, e, e[8], null);
	return {
		c() {
			(t = f('li')), o && o.c(), this.h();
		},
		l(e) {
			t = d(e, 'LI', {
				role: !0,
				id: !0,
				'aria-controls': !0,
				'aria-selected': !0,
				tabindex: !0,
				class: !0
			});
			var s = u(t);
			o && o.l(s), s.forEach(h), this.h();
		},
		h() {
			p(t, 'role', 'tab'),
				p(t, 'id', e[3].id),
				p(t, 'aria-controls', (s = e[2][e[3].id])),
				p(t, 'aria-selected', e[1]),
				p(t, 'tabindex', (a = e[1] ? 0 : -1)),
				p(t, 'class', 'svelte-tabs__tab svelte-dw8jip'),
				D(t, 'svelte-tabs__selected', e[1]);
		},
		m(s, a) {
			$(s, t, a),
				o && o.m(t, null),
				e[10](t),
				(r = !0),
				l || ((c = m(t, 'click', e[11])), (l = !0));
		},
		p(e, [l]) {
			o && o.p && 256 & l && v(o, n, e, e[8], l, null, null),
				(!r || (4 & l && s !== (s = e[2][e[3].id]))) && p(t, 'aria-controls', s),
				(!r || 2 & l) && p(t, 'aria-selected', e[1]),
				(!r || (2 & l && a !== (a = e[1] ? 0 : -1))) && p(t, 'tabindex', a),
				2 & l && D(t, 'svelte-tabs__selected', e[1]);
		},
		i(e) {
			r || (x(o, e), (r = !0));
		},
		o(e) {
			w(o, e), (r = !1);
		},
		d(s) {
			s && h(t), o && o.d(s), e[10](null), (l = !1), c();
		}
	};
}
function Z(e, t, s) {
	let a,
		r,
		l,
		{ $$slots: c = {}, $$scope: n } = t;
	const o = { id: Y() },
		{ registerTab: i, registerTabElement: f, selectTab: d, selectedTab: u, controls: h } = j(q);
	let p;
	b(e, u, (e) => s(7, (a = e))),
		b(e, h, (e) => s(2, (r = e))),
		i(o),
		E(async () => {
			await S(), f(l);
		});
	return (
		(e.$$set = (e) => {
			'$$scope' in e && s(8, (n = e.$$scope));
		}),
		(e.$$.update = () => {
			128 & e.$$.dirty && s(1, (p = a === o));
		}),
		[
			l,
			p,
			r,
			o,
			d,
			u,
			h,
			a,
			n,
			c,
			function (e) {
				I[e ? 'unshift' : 'push'](() => {
					(l = e), s(0, l);
				});
			},
			() => d(o)
		]
	);
}
class J extends c {
	constructor(e) {
		super(), n(this, e, Z, X, o, {});
	}
}
function Q(e) {
	let t, s;
	const a = e[1].default,
		r = i(a, e, e[0], null);
	return {
		c() {
			(t = f('ul')), r && r.c(), this.h();
		},
		l(e) {
			t = d(e, 'UL', { role: !0, class: !0 });
			var s = u(t);
			r && r.l(s), s.forEach(h), this.h();
		},
		h() {
			p(t, 'role', 'tablist'), p(t, 'class', 'svelte-tabs__tab-list svelte-10iava4');
		},
		m(e, a) {
			$(e, t, a), r && r.m(t, null), (s = !0);
		},
		p(e, [t]) {
			r && r.p && 1 & t && v(r, a, e, e[0], t, null, null);
		},
		i(e) {
			s || (x(r, e), (s = !0));
		},
		o(e) {
			w(r, e), (s = !1);
		},
		d(e) {
			e && h(t), r && r.d(e);
		}
	};
}
function ee(e, t, s) {
	let { $$slots: a = {}, $$scope: r } = t;
	return (
		(e.$$set = (e) => {
			'$$scope' in e && s(0, (r = e.$$scope));
		}),
		[r, a]
	);
}
class te extends c {
	constructor(e) {
		super(), n(this, e, ee, Q, o, {});
	}
}
function se(e) {
	let t;
	const s = e[6].default,
		a = i(s, e, e[5], null);
	return {
		c() {
			a && a.c();
		},
		l(e) {
			a && a.l(e);
		},
		m(e, s) {
			a && a.m(e, s), (t = !0);
		},
		p(e, t) {
			a && a.p && 32 & t && v(a, s, e, e[5], t, null, null);
		},
		i(e) {
			t || (x(a, e), (t = !0));
		},
		o(e) {
			w(a, e), (t = !1);
		},
		d(e) {
			a && a.d(e);
		}
	};
}
function ae(e) {
	let t,
		s,
		a,
		r = e[1] === e[2] && se(e);
	return {
		c() {
			(t = f('div')), r && r.c(), this.h();
		},
		l(e) {
			t = d(e, 'DIV', { id: !0, 'aria-labelledby': !0, class: !0, role: !0 });
			var s = u(t);
			r && r.l(s), s.forEach(h), this.h();
		},
		h() {
			p(t, 'id', e[2].id),
				p(t, 'aria-labelledby', (s = e[0][e[2].id])),
				p(t, 'class', 'svelte-tabs__tab-panel svelte-vl3qcy'),
				p(t, 'role', 'tabpanel');
		},
		m(e, s) {
			$(e, t, s), r && r.m(t, null), (a = !0);
		},
		p(e, [l]) {
			e[1] === e[2]
				? r
					? (r.p(e, l), 2 & l && x(r, 1))
					: ((r = se(e)), r.c(), x(r, 1), r.m(t, null))
				: r &&
				  (H(),
				  w(r, 1, 1, () => {
						r = null;
				  }),
				  O()),
				(!a || (1 & l && s !== (s = e[0][e[2].id]))) && p(t, 'aria-labelledby', s);
		},
		i(e) {
			a || (x(r), (a = !0));
		},
		o(e) {
			w(r), (a = !1);
		},
		d(e) {
			e && h(t), r && r.d();
		}
	};
}
function re(e, t, s) {
	let a,
		r,
		{ $$slots: l = {}, $$scope: c } = t;
	const n = { id: Y() },
		{ registerPanel: o, selectedPanel: i, labeledBy: f } = j(q);
	return (
		b(e, i, (e) => s(1, (r = e))),
		b(e, f, (e) => s(0, (a = e))),
		o(n),
		(e.$$set = (e) => {
			'$$scope' in e && s(5, (c = e.$$scope));
		}),
		[a, r, n, i, f, c, l]
	);
}
class le extends c {
	constructor(e) {
		super(), n(this, e, re, ae, o, {});
	}
}
function ce(e) {
	let t,
		s,
		a,
		r,
		l,
		c,
		n,
		o,
		i,
		m,
		v,
		x,
		w,
		b,
		g,
		E,
		T,
		y,
		D,
		j,
		S,
		I,
		H,
		O,
		V,
		L,
		N,
		B,
		G,
		z,
		A,
		U,
		Y,
		F,
		q,
		M,
		W,
		X,
		Z,
		J,
		Q,
		ee,
		te,
		se,
		ae,
		re,
		le,
		ce,
		ne,
		oe,
		ie,
		fe,
		de,
		ue,
		he,
		pe,
		$e,
		me,
		ve,
		xe,
		we,
		be,
		ge,
		Ee,
		Te,
		ye,
		De,
		je,
		Se,
		Ie,
		He,
		Oe,
		_e,
		ke,
		Pe,
		Ke,
		Ce,
		Re,
		Ve,
		Le,
		Ne,
		Be,
		Ge,
		ze,
		Ae,
		Ue,
		Ye,
		Fe,
		qe,
		Me,
		We,
		Xe,
		Ze,
		Je,
		Qe,
		et,
		tt,
		st,
		at,
		rt,
		lt,
		ct,
		nt,
		ot,
		it,
		ft,
		dt,
		ut,
		ht,
		pt,
		$t,
		mt,
		vt,
		xt,
		wt,
		bt;
	return {
		c() {
			(t = f('div')),
				(s = f('div')),
				(a = f('div')),
				(r = f('h3')),
				(l = _('New Ceremony')),
				(c = k()),
				(n = f('div')),
				(o = f('table')),
				(i = f('thead')),
				(m = f('tr')),
				(v = f('th')),
				(x = _('Year')),
				(w = k()),
				(b = f('th')),
				(g = _('Special Guests')),
				(E = k()),
				(T = f('th')),
				(y = _('Gorillas named')),
				(D = k()),
				(j = f('th')),
				(S = _('Namers')),
				(I = k()),
				(H = f('th')),
				(O = _('Full Date')),
				(V = k()),
				(L = f('th')),
				(N = _('Location')),
				(B = k()),
				(G = f('tbody')),
				(z = f('tr')),
				(A = f('td')),
				(U = _('2020')),
				(Y = k()),
				(F = f('td')),
				(q = _('18')),
				(M = k()),
				(W = f('td')),
				(X = _('27')),
				(Z = k()),
				(J = f('td')),
				(Q = _('27')),
				(ee = k()),
				(te = f('td')),
				(se = _('22')),
				(ae = f('sup')),
				(re = _('nd')),
				(le = _(' September')),
				(ce = k()),
				(ne = f('td')),
				(oe = _('Kinigi')),
				(ie = k()),
				(fe = f('tr')),
				(de = f('td')),
				(ue = _('2019')),
				(he = k()),
				(pe = f('td')),
				($e = _('18')),
				(me = k()),
				(ve = f('td')),
				(xe = _('27')),
				(we = k()),
				(be = f('td')),
				(ge = _('27')),
				(Ee = k()),
				(Te = f('td')),
				(ye = _('22')),
				(De = f('sup')),
				(je = _('nd')),
				(Se = _(' September')),
				(Ie = k()),
				(He = f('td')),
				(Oe = _('Kinigi')),
				(_e = k()),
				(ke = f('tr')),
				(Pe = f('td')),
				(Ke = _('2018')),
				(Ce = k()),
				(Re = f('td')),
				(Ve = _('18')),
				(Le = k()),
				(Ne = f('td')),
				(Be = _('27')),
				(Ge = k()),
				(ze = f('td')),
				(Ae = _('27')),
				(Ue = k()),
				(Ye = f('td')),
				(Fe = _('22')),
				(qe = f('sup')),
				(Me = _('nd')),
				(We = _(' September')),
				(Xe = k()),
				(Ze = f('td')),
				(Je = _('Kinigi')),
				(Qe = k()),
				(et = f('tr')),
				(tt = f('td')),
				(st = _('2017')),
				(at = k()),
				(rt = f('td')),
				(lt = _('18')),
				(ct = k()),
				(nt = f('td')),
				(ot = _('27')),
				(it = k()),
				(ft = f('td')),
				(dt = _('27')),
				(ut = k()),
				(ht = f('td')),
				(pt = _('22')),
				($t = f('sup')),
				(mt = _('nd')),
				(vt = _(' September')),
				(xt = k()),
				(wt = f('td')),
				(bt = _('Kinigi')),
				this.h();
		},
		l(e) {
			t = d(e, 'DIV', { class: !0 });
			var f = u(t);
			s = d(f, 'DIV', { class: !0 });
			var p = u(s);
			a = d(p, 'DIV', { class: !0 });
			var $ = u(a);
			r = d($, 'H3', { class: !0 });
			var _ = u(r);
			(l = P(_, 'New Ceremony')),
				_.forEach(h),
				$.forEach(h),
				p.forEach(h),
				(c = K(f)),
				(n = d(f, 'DIV', { class: !0 }));
			var k = u(n);
			o = d(k, 'TABLE', { class: !0 });
			var C = u(o);
			i = d(C, 'THEAD', { class: !0 });
			var R = u(i);
			m = d(R, 'TR', { class: !0 });
			var gt = u(m);
			v = d(gt, 'TH', { class: !0 });
			var Et = u(v);
			(x = P(Et, 'Year')), Et.forEach(h), (w = K(gt)), (b = d(gt, 'TH', { class: !0 }));
			var Tt = u(b);
			(g = P(Tt, 'Special Guests')), Tt.forEach(h), (E = K(gt)), (T = d(gt, 'TH', { class: !0 }));
			var yt = u(T);
			(y = P(yt, 'Gorillas named')), yt.forEach(h), (D = K(gt)), (j = d(gt, 'TH', { class: !0 }));
			var Dt = u(j);
			(S = P(Dt, 'Namers')), Dt.forEach(h), (I = K(gt)), (H = d(gt, 'TH', { class: !0 }));
			var jt = u(H);
			(O = P(jt, 'Full Date')), jt.forEach(h), (V = K(gt)), (L = d(gt, 'TH', { class: !0 }));
			var St = u(L);
			(N = P(St, 'Location')),
				St.forEach(h),
				gt.forEach(h),
				R.forEach(h),
				(B = K(C)),
				(G = d(C, 'TBODY', { class: !0 }));
			var It = u(G);
			z = d(It, 'TR', { class: !0 });
			var Ht = u(z);
			A = d(Ht, 'TD', { class: !0 });
			var Ot = u(A);
			(U = P(Ot, '2020')), Ot.forEach(h), (Y = K(Ht)), (F = d(Ht, 'TD', { class: !0 }));
			var _t = u(F);
			(q = P(_t, '18')), _t.forEach(h), (M = K(Ht)), (W = d(Ht, 'TD', { class: !0 }));
			var kt = u(W);
			(X = P(kt, '27')), kt.forEach(h), (Z = K(Ht)), (J = d(Ht, 'TD', { class: !0 }));
			var Pt = u(J);
			(Q = P(Pt, '27')), Pt.forEach(h), (ee = K(Ht)), (te = d(Ht, 'TD', { class: !0 }));
			var Kt = u(te);
			(se = P(Kt, '22')), (ae = d(Kt, 'SUP', {}));
			var Ct = u(ae);
			(re = P(Ct, 'nd')),
				Ct.forEach(h),
				(le = P(Kt, ' September')),
				Kt.forEach(h),
				(ce = K(Ht)),
				(ne = d(Ht, 'TD', { class: !0 }));
			var Rt = u(ne);
			(oe = P(Rt, 'Kinigi')),
				Rt.forEach(h),
				Ht.forEach(h),
				(ie = K(It)),
				(fe = d(It, 'TR', { class: !0 }));
			var Vt = u(fe);
			de = d(Vt, 'TD', { class: !0 });
			var Lt = u(de);
			(ue = P(Lt, '2019')), Lt.forEach(h), (he = K(Vt)), (pe = d(Vt, 'TD', { class: !0 }));
			var Nt = u(pe);
			($e = P(Nt, '18')), Nt.forEach(h), (me = K(Vt)), (ve = d(Vt, 'TD', { class: !0 }));
			var Bt = u(ve);
			(xe = P(Bt, '27')), Bt.forEach(h), (we = K(Vt)), (be = d(Vt, 'TD', { class: !0 }));
			var Gt = u(be);
			(ge = P(Gt, '27')), Gt.forEach(h), (Ee = K(Vt)), (Te = d(Vt, 'TD', { class: !0 }));
			var zt = u(Te);
			(ye = P(zt, '22')), (De = d(zt, 'SUP', {}));
			var At = u(De);
			(je = P(At, 'nd')),
				At.forEach(h),
				(Se = P(zt, ' September')),
				zt.forEach(h),
				(Ie = K(Vt)),
				(He = d(Vt, 'TD', { class: !0 }));
			var Ut = u(He);
			(Oe = P(Ut, 'Kinigi')),
				Ut.forEach(h),
				Vt.forEach(h),
				(_e = K(It)),
				(ke = d(It, 'TR', { class: !0 }));
			var Yt = u(ke);
			Pe = d(Yt, 'TD', { class: !0 });
			var Ft = u(Pe);
			(Ke = P(Ft, '2018')), Ft.forEach(h), (Ce = K(Yt)), (Re = d(Yt, 'TD', { class: !0 }));
			var qt = u(Re);
			(Ve = P(qt, '18')), qt.forEach(h), (Le = K(Yt)), (Ne = d(Yt, 'TD', { class: !0 }));
			var Mt = u(Ne);
			(Be = P(Mt, '27')), Mt.forEach(h), (Ge = K(Yt)), (ze = d(Yt, 'TD', { class: !0 }));
			var Wt = u(ze);
			(Ae = P(Wt, '27')), Wt.forEach(h), (Ue = K(Yt)), (Ye = d(Yt, 'TD', { class: !0 }));
			var Xt = u(Ye);
			(Fe = P(Xt, '22')), (qe = d(Xt, 'SUP', {}));
			var Zt = u(qe);
			(Me = P(Zt, 'nd')),
				Zt.forEach(h),
				(We = P(Xt, ' September')),
				Xt.forEach(h),
				(Xe = K(Yt)),
				(Ze = d(Yt, 'TD', { class: !0 }));
			var Jt = u(Ze);
			(Je = P(Jt, 'Kinigi')),
				Jt.forEach(h),
				Yt.forEach(h),
				(Qe = K(It)),
				(et = d(It, 'TR', { class: !0 }));
			var Qt = u(et);
			tt = d(Qt, 'TD', { class: !0 });
			var es = u(tt);
			(st = P(es, '2017')), es.forEach(h), (at = K(Qt)), (rt = d(Qt, 'TD', { class: !0 }));
			var ts = u(rt);
			(lt = P(ts, '18')), ts.forEach(h), (ct = K(Qt)), (nt = d(Qt, 'TD', { class: !0 }));
			var ss = u(nt);
			(ot = P(ss, '27')), ss.forEach(h), (it = K(Qt)), (ft = d(Qt, 'TD', { class: !0 }));
			var as = u(ft);
			(dt = P(as, '27')), as.forEach(h), (ut = K(Qt)), (ht = d(Qt, 'TD', { class: !0 }));
			var rs = u(ht);
			(pt = P(rs, '22')), ($t = d(rs, 'SUP', {}));
			var ls = u($t);
			(mt = P(ls, 'nd')),
				ls.forEach(h),
				(vt = P(rs, ' September')),
				rs.forEach(h),
				(xt = K(Qt)),
				(wt = d(Qt, 'TD', { class: !0 }));
			var cs = u(wt);
			(bt = P(cs, 'Kinigi')),
				cs.forEach(h),
				Qt.forEach(h),
				It.forEach(h),
				C.forEach(h),
				k.forEach(h),
				f.forEach(h),
				this.h();
		},
		h() {
			p(r, 'class', 'text-white'),
				p(a, 'class', 'bg-green-600 rounded p-2 cursor-pointer svelte-1ijg4ko'),
				p(s, 'class', 'w-full svelte-1ijg4ko'),
				p(v, 'class', 'p-4 w-1/6'),
				p(b, 'class', 'p-4 w-1/6'),
				p(T, 'class', 'p-4 w-1/6'),
				p(j, 'class', 'p-4 w-1/6'),
				p(H, 'class', 'p-4 w-1/6'),
				p(L, 'class', 'p-4 w-1/6'),
				p(m, 'class', 'justify-between'),
				p(i, 'class', 'w-full'),
				p(A, 'class', 'text-center p-4 py-8 w-1/6'),
				p(F, 'class', 'text-center p-4 w-1/6'),
				p(W, 'class', 'text-center p-4 w-1/6 text-sm'),
				p(J, 'class', 'text-center w-1/6 text-sm'),
				p(te, 'class', 'text-center p-4 w-1/6'),
				p(ne, 'class', ' text-center p-4 w-1/6'),
				p(z, 'class', 'mt-3 justify-between bg-white border-b-2 cursor-pointer '),
				p(de, 'class', 'text-center p-4 py-8 w-1/6'),
				p(pe, 'class', 'text-center p-4 w-1/6'),
				p(ve, 'class', 'text-center p-4 w-1/6 text-sm'),
				p(be, 'class', 'text-center w-1/6 text-sm'),
				p(Te, 'class', 'text-center p-4 w-1/6'),
				p(He, 'class', ' text-center p-4 w-1/6'),
				p(fe, 'class', 'mt-3 justify-between bg-white border-b-2 cursor-pointer '),
				p(Pe, 'class', 'text-center p-4 py-8 w-1/6'),
				p(Re, 'class', 'text-center p-4 w-1/6'),
				p(Ne, 'class', 'text-center p-4 w-1/6 text-sm'),
				p(ze, 'class', 'text-center w-1/6 text-sm'),
				p(Ye, 'class', 'text-center p-4 w-1/6'),
				p(Ze, 'class', ' text-center p-4 w-1/6'),
				p(ke, 'class', 'mt-3 justify-between bg-white border-b-2 cursor-pointer '),
				p(tt, 'class', 'text-center p-4 py-8 w-1/6'),
				p(rt, 'class', 'text-center p-4 w-1/6'),
				p(nt, 'class', 'text-center p-4 w-1/6 text-sm'),
				p(ft, 'class', 'text-center w-1/6 text-sm'),
				p(ht, 'class', 'text-center p-4 w-1/6'),
				p(wt, 'class', ' text-center p-4 w-1/6'),
				p(et, 'class', 'mt-3 justify-between bg-white border-b-2 cursor-pointer '),
				p(G, 'class', 'w-full'),
				p(o, 'class', 'w-full justify-between mt-0'),
				p(n, 'class', 'w-full svelte-1ijg4ko'),
				p(t, 'class', 'flex flex-col w-full unlimited svelte-1ijg4ko');
		},
		m(e, f) {
			$(e, t, f),
				C(t, s),
				C(s, a),
				C(a, r),
				C(r, l),
				C(t, c),
				C(t, n),
				C(n, o),
				C(o, i),
				C(i, m),
				C(m, v),
				C(v, x),
				C(m, w),
				C(m, b),
				C(b, g),
				C(m, E),
				C(m, T),
				C(T, y),
				C(m, D),
				C(m, j),
				C(j, S),
				C(m, I),
				C(m, H),
				C(H, O),
				C(m, V),
				C(m, L),
				C(L, N),
				C(o, B),
				C(o, G),
				C(G, z),
				C(z, A),
				C(A, U),
				C(z, Y),
				C(z, F),
				C(F, q),
				C(z, M),
				C(z, W),
				C(W, X),
				C(z, Z),
				C(z, J),
				C(J, Q),
				C(z, ee),
				C(z, te),
				C(te, se),
				C(te, ae),
				C(ae, re),
				C(te, le),
				C(z, ce),
				C(z, ne),
				C(ne, oe),
				C(G, ie),
				C(G, fe),
				C(fe, de),
				C(de, ue),
				C(fe, he),
				C(fe, pe),
				C(pe, $e),
				C(fe, me),
				C(fe, ve),
				C(ve, xe),
				C(fe, we),
				C(fe, be),
				C(be, ge),
				C(fe, Ee),
				C(fe, Te),
				C(Te, ye),
				C(Te, De),
				C(De, je),
				C(Te, Se),
				C(fe, Ie),
				C(fe, He),
				C(He, Oe),
				C(G, _e),
				C(G, ke),
				C(ke, Pe),
				C(Pe, Ke),
				C(ke, Ce),
				C(ke, Re),
				C(Re, Ve),
				C(ke, Le),
				C(ke, Ne),
				C(Ne, Be),
				C(ke, Ge),
				C(ke, ze),
				C(ze, Ae),
				C(ke, Ue),
				C(ke, Ye),
				C(Ye, Fe),
				C(Ye, qe),
				C(qe, Me),
				C(Ye, We),
				C(ke, Xe),
				C(ke, Ze),
				C(Ze, Je),
				C(G, Qe),
				C(G, et),
				C(et, tt),
				C(tt, st),
				C(et, at),
				C(et, rt),
				C(rt, lt),
				C(et, ct),
				C(et, nt),
				C(nt, ot),
				C(et, it),
				C(et, ft),
				C(ft, dt),
				C(et, ut),
				C(et, ht),
				C(ht, pt),
				C(ht, $t),
				C($t, mt),
				C(ht, vt),
				C(et, xt),
				C(et, wt),
				C(wt, bt);
		},
		p: R,
		i: R,
		o: R,
		d(e) {
			e && h(t);
		}
	};
}
class ne extends c {
	constructor(e) {
		super(), n(this, e, null, ce, o, {});
	}
}
function oe(e, t, s) {
	const a = e.slice();
	return (a[1] = t[s]), a;
}
function ie(e) {
	let t;
	return {
		c() {
			t = _('Ceremonies');
		},
		l(e) {
			t = P(e, 'Ceremonies');
		},
		m(e, s) {
			$(e, t, s);
		},
		d(e) {
			e && h(t);
		}
	};
}
function fe(e) {
	let t;
	return {
		c() {
			t = _('Namers');
		},
		l(e) {
			t = P(e, 'Namers');
		},
		m(e, s) {
			$(e, t, s);
		},
		d(e) {
			e && h(t);
		}
	};
}
function de(e) {
	let t, s, a, r;
	return (
		(t = new J({ props: { $$slots: { default: [ie] }, $$scope: { ctx: e } } })),
		(a = new J({ props: { $$slots: { default: [fe] }, $$scope: { ctx: e } } })),
		{
			c() {
				V(t.$$.fragment), (s = k()), V(a.$$.fragment);
			},
			l(e) {
				N(t.$$.fragment, e), (s = K(e)), N(a.$$.fragment, e);
			},
			m(e, l) {
				B(t, e, l), $(e, s, l), B(a, e, l), (r = !0);
			},
			p(e, s) {
				const r = {};
				16 & s && (r.$$scope = { dirty: s, ctx: e }), t.$set(r);
				const l = {};
				16 & s && (l.$$scope = { dirty: s, ctx: e }), a.$set(l);
			},
			i(e) {
				r || (x(t.$$.fragment, e), x(a.$$.fragment, e), (r = !0));
			},
			o(e) {
				w(t.$$.fragment, e), w(a.$$.fragment, e), (r = !1);
			},
			d(e) {
				G(t, e), e && h(s), G(a, e);
			}
		}
	);
}
function ue(e) {
	let t, s;
	return (
		(t = new ne({})),
		{
			c() {
				V(t.$$.fragment);
			},
			l(e) {
				N(t.$$.fragment, e);
			},
			m(e, a) {
				B(t, e, a), (s = !0);
			},
			i(e) {
				s || (x(t.$$.fragment, e), (s = !0));
			},
			o(e) {
				w(t.$$.fragment, e), (s = !1);
			},
			d(e) {
				G(t, e);
			}
		}
	);
}
function he(e) {
	let t,
		s,
		a,
		r,
		l,
		c,
		n,
		o,
		i,
		m,
		v,
		x,
		w,
		b,
		g,
		E,
		T = e[1] + '';
	return {
		c() {
			(t = f('tr')),
				(s = f('td')),
				(a = _(T)),
				(r = k()),
				(l = f('td')),
				(c = _('Osita Iheme')),
				(n = k()),
				(o = f('td')),
				(i = _('didiermunezero@gmail.com 078324452343')),
				(m = k()),
				(v = f('td')),
				(x = _('Cyizere')),
				(w = k()),
				(b = f('td')),
				(g = _('This is special to this one')),
				(E = k()),
				this.h();
		},
		l(e) {
			t = d(e, 'TR', { class: !0 });
			var f = u(t);
			s = d(f, 'TD', { class: !0 });
			var p = u(s);
			(a = P(p, T)), p.forEach(h), (r = K(f)), (l = d(f, 'TD', { class: !0 }));
			var $ = u(l);
			(c = P($, 'Osita Iheme')), $.forEach(h), (n = K(f)), (o = d(f, 'TD', { class: !0 }));
			var y = u(o);
			(i = P(y, 'didiermunezero@gmail.com 078324452343')),
				y.forEach(h),
				(m = K(f)),
				(v = d(f, 'TD', { class: !0 }));
			var D = u(v);
			(x = P(D, 'Cyizere')), D.forEach(h), (w = K(f)), (b = d(f, 'TD', { class: !0 }));
			var j = u(b);
			(g = P(j, 'This is special to this one')), j.forEach(h), (E = K(f)), f.forEach(h), this.h();
		},
		h() {
			p(s, 'class', 'text-center p-4 py-8 w-1/5 svelte-1jmvu5x'),
				p(l, 'class', 'text-center p-4 w-1/5 svelte-1jmvu5x'),
				p(o, 'class', 'text-center p-4 w-1/5 text-sm svelte-1jmvu5x'),
				p(v, 'class', 'text-center w-1/5 text-sm svelte-1jmvu5x'),
				p(b, 'class', 'text-center p-4 w-1/5 svelte-1jmvu5x'),
				p(t, 'class', 'mt-3 justify-between bg-white border-b-2 cursor-pointer  svelte-1jmvu5x');
		},
		m(e, f) {
			$(e, t, f),
				C(t, s),
				C(s, a),
				C(t, r),
				C(t, l),
				C(l, c),
				C(t, n),
				C(t, o),
				C(o, i),
				C(t, m),
				C(t, v),
				C(v, x),
				C(t, w),
				C(t, b),
				C(b, g),
				C(t, E);
		},
		p: R,
		d(e) {
			e && h(t);
		}
	};
}
function pe(e) {
	let t,
		s,
		a,
		r,
		l,
		c,
		n,
		o,
		i,
		m,
		v,
		x,
		w,
		b,
		g,
		E,
		T,
		y,
		D,
		j = e[0],
		S = [];
	for (let f = 0; f < j.length; f += 1) S[f] = he(oe(e, j, f));
	return {
		c() {
			(t = f('div')),
				(s = f('table')),
				(a = f('thead')),
				(r = f('tr')),
				(l = f('th')),
				(c = k()),
				(n = f('th')),
				(o = _('Namer')),
				(i = k()),
				(m = f('th')),
				(v = _('Contacts')),
				(x = k()),
				(w = f('th')),
				(b = _('Gorillas named')),
				(g = k()),
				(E = f('th')),
				(T = _('More')),
				(y = k()),
				(D = f('tbody'));
			for (let e = 0; e < S.length; e += 1) S[e].c();
			this.h();
		},
		l(e) {
			t = d(e, 'DIV', { class: !0 });
			var f = u(t);
			s = d(f, 'TABLE', { class: !0 });
			var p = u(s);
			a = d(p, 'THEAD', { class: !0 });
			var $ = u(a);
			r = d($, 'TR', { class: !0 });
			var j = u(r);
			(l = d(j, 'TH', { class: !0 })), u(l).forEach(h), (c = K(j)), (n = d(j, 'TH', { class: !0 }));
			var I = u(n);
			(o = P(I, 'Namer')), I.forEach(h), (i = K(j)), (m = d(j, 'TH', { class: !0 }));
			var H = u(m);
			(v = P(H, 'Contacts')), H.forEach(h), (x = K(j)), (w = d(j, 'TH', { class: !0 }));
			var O = u(w);
			(b = P(O, 'Gorillas named')), O.forEach(h), (g = K(j)), (E = d(j, 'TH', { class: !0 }));
			var _ = u(E);
			(T = P(_, 'More')),
				_.forEach(h),
				j.forEach(h),
				$.forEach(h),
				(y = K(p)),
				(D = d(p, 'TBODY', { class: !0 }));
			var k = u(D);
			for (let t = 0; t < S.length; t += 1) S[t].l(k);
			k.forEach(h), p.forEach(h), f.forEach(h), this.h();
		},
		h() {
			p(l, 'class', 'p-4 w-1/5 svelte-1jmvu5x'),
				p(n, 'class', 'p-4 w-1/5 svelte-1jmvu5x'),
				p(m, 'class', 'p-4 w-1/5 svelte-1jmvu5x'),
				p(w, 'class', 'p-4 w-1/5 svelte-1jmvu5x'),
				p(E, 'class', 'p-4 w-1/5 svelte-1jmvu5x'),
				p(r, 'class', 'justify-between svelte-1jmvu5x'),
				p(a, 'class', 'w-full svelte-1jmvu5x'),
				p(D, 'class', 'w-full svelte-1jmvu5x'),
				p(s, 'class', 'w-full svelte-1jmvu5x'),
				p(
					t,
					'class',
					'bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 md:flex md:w-full unlimited svelte-1jmvu5x'
				);
		},
		m(e, f) {
			$(e, t, f),
				C(t, s),
				C(s, a),
				C(a, r),
				C(r, l),
				C(r, c),
				C(r, n),
				C(n, o),
				C(r, i),
				C(r, m),
				C(m, v),
				C(r, x),
				C(r, w),
				C(w, b),
				C(r, g),
				C(r, E),
				C(E, T),
				C(s, y),
				C(s, D);
			for (let t = 0; t < S.length; t += 1) S[t].m(D, null);
		},
		p(e, t) {
			if (1 & t) {
				let s;
				for (j = e[0], s = 0; s < j.length; s += 1) {
					const a = oe(e, j, s);
					S[s] ? S[s].p(a, t) : ((S[s] = he(a)), S[s].c(), S[s].m(D, null));
				}
				for (; s < S.length; s += 1) S[s].d(1);
				S.length = j.length;
			}
		},
		d(e) {
			e && h(t), z(S, e);
		}
	};
}
function $e(e) {
	let t, s, a, r, l, c;
	return (
		(t = new te({ props: { $$slots: { default: [de] }, $$scope: { ctx: e } } })),
		(a = new le({ props: { $$slots: { default: [ue] }, $$scope: { ctx: e } } })),
		(l = new le({ props: { $$slots: { default: [pe] }, $$scope: { ctx: e } } })),
		{
			c() {
				V(t.$$.fragment), (s = k()), V(a.$$.fragment), (r = k()), V(l.$$.fragment);
			},
			l(e) {
				N(t.$$.fragment, e), (s = K(e)), N(a.$$.fragment, e), (r = K(e)), N(l.$$.fragment, e);
			},
			m(e, n) {
				B(t, e, n), $(e, s, n), B(a, e, n), $(e, r, n), B(l, e, n), (c = !0);
			},
			p(e, s) {
				const r = {};
				16 & s && (r.$$scope = { dirty: s, ctx: e }), t.$set(r);
				const c = {};
				16 & s && (c.$$scope = { dirty: s, ctx: e }), a.$set(c);
				const n = {};
				16 & s && (n.$$scope = { dirty: s, ctx: e }), l.$set(n);
			},
			i(e) {
				c || (x(t.$$.fragment, e), x(a.$$.fragment, e), x(l.$$.fragment, e), (c = !0));
			},
			o(e) {
				w(t.$$.fragment, e), w(a.$$.fragment, e), w(l.$$.fragment, e), (c = !1);
			},
			d(e) {
				G(t, e), e && h(s), G(a, e), e && h(r), G(l, e);
			}
		}
	);
}
function me(e) {
	let t, s, a;
	return (
		(s = new W({ props: { $$slots: { default: [$e] }, $$scope: { ctx: e } } })),
		{
			c() {
				(t = k()), V(s.$$.fragment), this.h();
			},
			l(e) {
				L('[data-svelte="svelte-1i3a86q"]', document.head).forEach(h),
					(t = K(e)),
					N(s.$$.fragment, e),
					this.h();
			},
			h() {
				document.title = 'Kwitizina';
			},
			m(e, r) {
				$(e, t, r), B(s, e, r), (a = !0);
			},
			p(e, [t]) {
				const a = {};
				16 & t && (a.$$scope = { dirty: t, ctx: e }), s.$set(a);
			},
			i(e) {
				a || (x(s.$$.fragment, e), (a = !0));
			},
			o(e) {
				w(s.$$.fragment, e), (a = !1);
			},
			d(e) {
				e && h(t), G(s, e);
			}
		}
	);
}
function ve(e) {
	return [[1, 2, 3, 4, 5, 6, 7]];
}
class xe extends c {
	constructor(e) {
		super(), n(this, e, ve, me, o, {});
	}
}
function we(e) {
	let t, s, a;
	return (
		(s = new xe({})),
		{
			c() {
				(t = f('div')), V(s.$$.fragment);
			},
			l(e) {
				t = d(e, 'DIV', {});
				var a = u(t);
				N(s.$$.fragment, a), a.forEach(h);
			},
			m(e, r) {
				$(e, t, r), B(s, t, null), (a = !0);
			},
			p: R,
			i(e) {
				a || (x(s.$$.fragment, e), (a = !0));
			},
			o(e) {
				w(s.$$.fragment, e), (a = !1);
			},
			d(e) {
				e && h(t), G(s);
			}
		}
	);
}
export default class extends c {
	constructor(e) {
		super(), n(this, e, null, we, o, {});
	}
}