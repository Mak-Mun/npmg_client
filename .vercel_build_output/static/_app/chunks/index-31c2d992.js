function t() {}
function n(t, n) {
	for (const e in n) t[e] = n[e];
	return t;
}
function e(t) {
	return t();
}
function o() {
	return Object.create(null);
}
function r(t) {
	t.forEach(e);
}
function u(t) {
	return 'function' == typeof t;
}
function c(t, n) {
	return t != t ? n == n : t !== n || (t && 'object' == typeof t) || 'function' == typeof t;
}
function s(n, e, o) {
	n.$$.on_destroy.push(
		(function (n, ...e) {
			if (null == n) return t;
			const o = n.subscribe(...e);
			return o.unsubscribe ? () => o.unsubscribe() : o;
		})(e, o)
	);
}
function i(t, n, e, o) {
	if (t) {
		const r = a(t, n, e, o);
		return t[0](r);
	}
}
function a(t, e, o, r) {
	return t[1] && r ? n(o.ctx.slice(), t[1](r(e))) : o.ctx;
}
function f(t, n, e, o, r, u, c) {
	const s = (function (t, n, e, o) {
		if (t[2] && o) {
			const r = t[2](o(e));
			if (void 0 === n.dirty) return r;
			if ('object' == typeof r) {
				const t = [],
					e = Math.max(n.dirty.length, r.length);
				for (let o = 0; o < e; o += 1) t[o] = n.dirty[o] | r[o];
				return t;
			}
			return n.dirty | r;
		}
		return n.dirty;
	})(n, o, r, u);
	if (s) {
		const r = a(n, e, o, c);
		t.p(r, s);
	}
}
function l(t, n) {
	t.appendChild(n);
}
function d(t, n, e) {
	t.insertBefore(n, e || null);
}
function p(t) {
	t.parentNode.removeChild(t);
}
function h(t, n) {
	for (let e = 0; e < t.length; e += 1) t[e] && t[e].d(n);
}
function $(t) {
	return document.createElement(t);
}
function m(t) {
	return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function g(t) {
	return document.createTextNode(t);
}
function y() {
	return g(' ');
}
function b() {
	return g('');
}
function _(t, n, e, o) {
	return t.addEventListener(n, e, o), () => t.removeEventListener(n, e, o);
}
function x(t) {
	return function (n) {
		return n.preventDefault(), t.call(this, n);
	};
}
function v(t, n, e) {
	null == e ? t.removeAttribute(n) : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function w(t) {
	return Array.from(t.childNodes);
}
function E(t, n, e, o) {
	for (let r = 0; r < t.length; r += 1) {
		const o = t[r];
		if (o.nodeName === n) {
			let n = 0;
			const u = [];
			for (; n < o.attributes.length; ) {
				const t = o.attributes[n++];
				e[t.name] || u.push(t.name);
			}
			for (let t = 0; t < u.length; t++) o.removeAttribute(u[t]);
			return t.splice(r, 1)[0];
		}
	}
	return o ? m(n) : $(n);
}
function k(t, n) {
	for (let e = 0; e < t.length; e += 1) {
		const o = t[e];
		if (3 === o.nodeType) return (o.data = '' + n), t.splice(e, 1)[0];
	}
	return g(n);
}
function A(t) {
	return k(t, ' ');
}
function j(t, n) {
	(n = '' + n), t.wholeText !== n && (t.data = n);
}
function N(t, n) {
	t.value = null == n ? '' : n;
}
function S(t, n, e, o) {
	t.style.setProperty(n, e, o ? 'important' : '');
}
function q(t, n) {
	for (let e = 0; e < t.options.length; e += 1) {
		const o = t.options[e];
		if (o.__value === n) return void (o.selected = !0);
	}
}
function L(t) {
	const n = t.querySelector(':checked') || t.options[0];
	return n && n.__value;
}
function O(t, n, e) {
	t.classList[e ? 'add' : 'remove'](n);
}
function T(t, n = document.body) {
	return Array.from(n.querySelectorAll(t));
}
let C;
function M(t) {
	C = t;
}
function P() {
	if (!C) throw new Error('Function called outside component initialization');
	return C;
}
function z(t) {
	P().$$.on_mount.push(t);
}
function B(t) {
	P().$$.after_update.push(t);
}
function D(t) {
	P().$$.on_destroy.push(t);
}
function F(t, n) {
	P().$$.context.set(t, n);
}
function G(t) {
	return P().$$.context.get(t);
}
const H = [],
	I = [],
	J = [],
	K = [],
	Q = Promise.resolve();
let R = !1;
function U() {
	R || ((R = !0), Q.then(tt));
}
function V() {
	return U(), Q;
}
function W(t) {
	J.push(t);
}
function X(t) {
	K.push(t);
}
let Y = !1;
const Z = new Set();
function tt() {
	if (!Y) {
		Y = !0;
		do {
			for (let t = 0; t < H.length; t += 1) {
				const n = H[t];
				M(n), nt(n.$$);
			}
			for (M(null), H.length = 0; I.length; ) I.pop()();
			for (let t = 0; t < J.length; t += 1) {
				const n = J[t];
				Z.has(n) || (Z.add(n), n());
			}
			J.length = 0;
		} while (H.length);
		for (; K.length; ) K.pop()();
		(R = !1), (Y = !1), Z.clear();
	}
}
function nt(t) {
	if (null !== t.fragment) {
		t.update(), r(t.before_update);
		const n = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, n), t.after_update.forEach(W);
	}
}
const et = new Set();
let ot;
function rt() {
	ot = { r: 0, c: [], p: ot };
}
function ut() {
	ot.r || r(ot.c), (ot = ot.p);
}
function ct(t, n) {
	t && t.i && (et.delete(t), t.i(n));
}
function st(t, n, e, o) {
	if (t && t.o) {
		if (et.has(t)) return;
		et.add(t),
			ot.c.push(() => {
				et.delete(t), o && (e && t.d(1), o());
			}),
			t.o(n);
	}
}
function it(t, n) {
	const e = {},
		o = {},
		r = { $$scope: 1 };
	let u = t.length;
	for (; u--; ) {
		const c = t[u],
			s = n[u];
		if (s) {
			for (const t in c) t in s || (o[t] = 1);
			for (const t in s) r[t] || ((e[t] = s[t]), (r[t] = 1));
			t[u] = s;
		} else for (const t in c) r[t] = 1;
	}
	for (const c in o) c in e || (e[c] = void 0);
	return e;
}
function at(t) {
	return 'object' == typeof t && null !== t ? t : {};
}
function ft(t, n, e) {
	const o = t.$$.props[n];
	void 0 !== o && ((t.$$.bound[o] = e), e(t.$$.ctx[o]));
}
function lt(t) {
	t && t.c();
}
function dt(t, n) {
	t && t.l(n);
}
function pt(t, n, o, c) {
	const { fragment: s, on_mount: i, on_destroy: a, after_update: f } = t.$$;
	s && s.m(n, o),
		c ||
			W(() => {
				const n = i.map(e).filter(u);
				a ? a.push(...n) : r(n), (t.$$.on_mount = []);
			}),
		f.forEach(W);
}
function ht(t, n) {
	const e = t.$$;
	null !== e.fragment &&
		(r(e.on_destroy),
		e.fragment && e.fragment.d(n),
		(e.on_destroy = e.fragment = null),
		(e.ctx = []));
}
function $t(n, e, u, c, s, i, a = [-1]) {
	const f = C;
	M(n);
	const l = (n.$$ = {
		fragment: null,
		ctx: null,
		props: i,
		update: t,
		not_equal: s,
		bound: o(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(f ? f.$$.context : e.context || []),
		callbacks: o(),
		dirty: a,
		skip_bound: !1
	});
	let d = !1;
	if (
		((l.ctx = u
			? u(n, e.props || {}, (t, e, ...o) => {
					const r = o.length ? o[0] : e;
					return (
						l.ctx &&
							s(l.ctx[t], (l.ctx[t] = r)) &&
							(!l.skip_bound && l.bound[t] && l.bound[t](r),
							d &&
								(function (t, n) {
									-1 === t.$$.dirty[0] && (H.push(t), U(), t.$$.dirty.fill(0)),
										(t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
								})(n, t)),
						e
					);
			  })
			: []),
		l.update(),
		(d = !0),
		r(l.before_update),
		(l.fragment = !!c && c(l.ctx)),
		e.target)
	) {
		if (e.hydrate) {
			const t = w(e.target);
			l.fragment && l.fragment.l(t), t.forEach(p);
		} else l.fragment && l.fragment.c();
		e.intro && ct(n.$$.fragment), pt(n, e.target, e.anchor, e.customElement), tt();
	}
	M(f);
}
class mt {
	$destroy() {
		ht(this, 1), (this.$destroy = t);
	}
	$on(t, n) {
		const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
		return (
			e.push(n),
			() => {
				const t = e.indexOf(n);
				-1 !== t && e.splice(t, 1);
			}
		);
	}
	$set(t) {
		var n;
		this.$$set &&
			((n = t), 0 !== Object.keys(n).length) &&
			((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
	}
}
export {
	n as A,
	rt as B,
	t as C,
	i as D,
	f as E,
	l as F,
	T as G,
	h as H,
	N as I,
	q as J,
	_ as K,
	r as L,
	W as M,
	L as N,
	x as O,
	m as P,
	S as Q,
	I as R,
	mt as S,
	ft as T,
	X as U,
	s as V,
	D as W,
	O as X,
	G as Y,
	V as Z,
	w as a,
	v as b,
	E as c,
	p as d,
	$ as e,
	d as f,
	k as g,
	j as h,
	$t as i,
	lt as j,
	y as k,
	b as l,
	dt as m,
	A as n,
	pt as o,
	it as p,
	at as q,
	st as r,
	c as s,
	g as t,
	ut as u,
	ct as v,
	ht as w,
	F as x,
	B as y,
	z
};
