function e(e, t) {
  const n = Object.create(null),
    o = e.split(',')
  for (let e = 0; e < o.length; e++) n[o[e]] = !0
  return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}
const t = e(
    'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl'
  ),
  n = e(
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly'
  )
function o(e) {
  if (w(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        l = o(x(r) ? s(r) : r)
      if (l) for (const e in l) t[e] = l[e]
    }
    return t
  }
  if (S(e)) return e
}
const r = /;(?![^(]*\))/g,
  l = /:(.+)/
function s(e) {
  const t = {}
  return (
    e.split(r).forEach(e => {
      if (e) {
        const n = e.split(l)
        n.length > 1 && (t[n[0].trim()] = n[1].trim())
      }
    }),
    t
  )
}
function a(e) {
  let t = ''
  if (x(e)) t = e
  else if (w(e)) for (let n = 0; n < e.length; n++) t += a(e[n]) + ' '
  else if (S(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
function i(e, t) {
  if (e === t) return !0
  let n = T(e),
    o = T(t)
  if (n || o) return !(!n || !o) && e.getTime() === t.getTime()
  if (((n = w(e)), (o = w(t)), n || o))
    return (
      !(!n || !o) &&
      (function (e, t) {
        if (e.length !== t.length) return !1
        let n = !0
        for (let o = 0; n && o < e.length; o++) n = i(e[o], t[o])
        return n
      })(e, t)
    )
  if (((n = S(e)), (o = S(t)), n || o)) {
    if (!n || !o) return !1
    if (Object.keys(e).length !== Object.keys(t).length) return !1
    for (const n in e) {
      const o = e.hasOwnProperty(n),
        r = t.hasOwnProperty(n)
      if ((o && !r) || (!o && r) || !i(e[n], t[n])) return !1
    }
  }
  return String(e) === String(t)
}
function c(e, t) {
  return e.findIndex(e => i(e, t))
}
const u = e => (null == e ? '' : S(e) ? JSON.stringify(e, f, 2) : String(e)),
  f = (e, t) =>
    O(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (e, [t, n]) => ((e[`${t} =>`] = n), e),
            {}
          )
        }
      : L(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : !S(t) || w(t) || M(t)
      ? t
      : String(t),
  p = {},
  d = [],
  m = () => {},
  _ = () => !1,
  g = /^on[^a-z]/,
  h = e => g.test(e),
  v = e => e.startsWith('onUpdate:'),
  b = Object.assign,
  y = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  k = Object.prototype.hasOwnProperty,
  F = (e, t) => k.call(e, t),
  w = Array.isArray,
  O = e => '[object Map]' === N(e),
  L = e => '[object Set]' === N(e),
  T = e => e instanceof Date,
  I = e => 'function' == typeof e,
  x = e => 'string' == typeof e,
  E = e => 'symbol' == typeof e,
  S = e => null !== e && 'object' == typeof e,
  P = e => S(e) && I(e.then) && I(e.catch),
  C = Object.prototype.toString,
  N = e => C.call(e),
  M = e => '[object Object]' === N(e),
  j = e => x(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  $ = e(
    ',key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  R = e => {
    const t = Object.create(null)
    return n => t[n] || (t[n] = e(n))
  },
  W = /-(\w)/g,
  A = R(e => e.replace(W, (e, t) => (t ? t.toUpperCase() : ''))),
  D = /\B([A-Z])/g,
  V = R(e => e.replace(D, '-$1').toLowerCase()),
  U = R(e => e.charAt(0).toUpperCase() + e.slice(1)),
  H = R(e => (e ? `on${U(e)}` : '')),
  B = (e, t) => e !== t && (e == e || t == t),
  Y = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  z = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  G = e => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  },
  q = new WeakMap(),
  K = []
let J
const Z = Symbol(''),
  Q = Symbol('')
function X(e, t = p) {
  ;(function (e) {
    return e && !0 === e._isEffect
  })(e) && (e = e.raw)
  const n = (function (e, t) {
    const n = function () {
      if (!n.active) return t.scheduler ? void 0 : e()
      if (!K.includes(n)) {
        ne(n)
        try {
          return re.push(oe), (oe = !0), K.push(n), (J = n), e()
        } finally {
          K.pop(), se(), (J = K[K.length - 1])
        }
      }
    }
    return (
      (n.id = te++),
      (n.allowRecurse = !!t.allowRecurse),
      (n._isEffect = !0),
      (n.active = !0),
      (n.raw = e),
      (n.deps = []),
      (n.options = t),
      n
    )
  })(e, t)
  return t.lazy || n(), n
}
function ee(e) {
  e.active && (ne(e), e.options.onStop && e.options.onStop(), (e.active = !1))
}
let te = 0
function ne(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let oe = !0
const re = []
function le() {
  re.push(oe), (oe = !1)
}
function se() {
  const e = re.pop()
  oe = void 0 === e || e
}
function ae(e, t, n) {
  if (!oe || void 0 === J) return
  let o = q.get(e)
  o || q.set(e, (o = new Map()))
  let r = o.get(n)
  r || o.set(n, (r = new Set())), r.has(J) || (r.add(J), J.deps.push(r))
}
function ie(e, t, n, o, r, l) {
  const s = q.get(e)
  if (!s) return
  const a = new Set(),
    i = e => {
      e &&
        e.forEach(e => {
          ;(e !== J || e.allowRecurse) && a.add(e)
        })
    }
  if ('clear' === t) s.forEach(i)
  else if ('length' === n && w(e))
    s.forEach((e, t) => {
      ;('length' === t || t >= o) && i(e)
    })
  else
    switch ((void 0 !== n && i(s.get(n)), t)) {
      case 'add':
        w(e) ? j(n) && i(s.get('length')) : (i(s.get(Z)), O(e) && i(s.get(Q)))
        break
      case 'delete':
        w(e) || (i(s.get(Z)), O(e) && i(s.get(Q)))
        break
      case 'set':
        O(e) && i(s.get(Z))
    }
  a.forEach(e => {
    e.options.scheduler ? e.options.scheduler(e) : e()
  })
}
const ce = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map(e => Symbol[e])
      .filter(E)
  ),
  ue = _e(),
  fe = _e(!1, !0),
  pe = _e(!0),
  de = _e(!0, !0),
  me = {}
function _e(e = !1, t = !1) {
  return function (n, o, r) {
    if ('__v_isReactive' === o) return !e
    if ('__v_isReadonly' === o) return e
    if ('__v_raw' === o && r === (e ? Ue : Ve).get(n)) return n
    const l = w(n)
    if (!e && l && F(me, o)) return Reflect.get(me, o, r)
    const s = Reflect.get(n, o, r)
    if (E(o) ? ce.has(o) : '__proto__' === o || '__v_isRef' === o) return s
    if ((e || ae(n, 0, o), t)) return s
    if (Qe(s)) {
      return !l || !j(o) ? s.value : s
    }
    return S(s) ? (e ? Ye(s) : Be(s)) : s
  }
}
;['includes', 'indexOf', 'lastIndexOf'].forEach(e => {
  const t = Array.prototype[e]
  me[e] = function (...e) {
    const n = Je(this)
    for (let e = 0, t = this.length; e < t; e++) ae(n, 0, e + '')
    const o = t.apply(n, e)
    return -1 === o || !1 === o ? t.apply(n, e.map(Je)) : o
  }
}),
  ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(e => {
    const t = Array.prototype[e]
    me[e] = function (...e) {
      le()
      const n = t.apply(this, e)
      return se(), n
    }
  })
function ge(e = !1) {
  return function (t, n, o, r) {
    const l = t[n]
    if (!e && ((o = Je(o)), !w(t) && Qe(l) && !Qe(o))) return (l.value = o), !0
    const s = w(t) && j(n) ? Number(n) < t.length : F(t, n),
      a = Reflect.set(t, n, o, r)
    return (
      t === Je(r) && (s ? B(o, l) && ie(t, 'set', n, o) : ie(t, 'add', n, o)), a
    )
  }
}
const he = {
    get: ue,
    set: ge(),
    deleteProperty: function (e, t) {
      const n = F(e, t),
        o = (e[t], Reflect.deleteProperty(e, t))
      return o && n && ie(e, 'delete', t, void 0), o
    },
    has: function (e, t) {
      const n = Reflect.has(e, t)
      return (E(t) && ce.has(t)) || ae(e, 0, t), n
    },
    ownKeys: function (e) {
      return ae(e, 0, w(e) ? 'length' : Z), Reflect.ownKeys(e)
    }
  },
  ve = { get: pe, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
  be = b({}, he, { get: fe, set: ge(!0) }),
  ye = (b({}, ve, { get: de }), e => (S(e) ? Be(e) : e)),
  ke = e => (S(e) ? Ye(e) : e),
  Fe = e => e,
  we = e => Reflect.getPrototypeOf(e)
function Oe(e, t, n = !1, o = !1) {
  const r = Je((e = e.__v_raw)),
    l = Je(t)
  t !== l && !n && ae(r, 0, t), !n && ae(r, 0, l)
  const { has: s } = we(r),
    a = n ? ke : o ? Fe : ye
  return s.call(r, t) ? a(e.get(t)) : s.call(r, l) ? a(e.get(l)) : void 0
}
function Le(e, t = !1) {
  const n = this.__v_raw,
    o = Je(n),
    r = Je(e)
  return (
    e !== r && !t && ae(o, 0, e),
    !t && ae(o, 0, r),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  )
}
function Te(e, t = !1) {
  return (e = e.__v_raw), !t && ae(Je(e), 0, Z), Reflect.get(e, 'size', e)
}
function Ie(e) {
  e = Je(e)
  const t = Je(this),
    n = we(t).has.call(t, e)
  return t.add(e), n || ie(t, 'add', e, e), this
}
function xe(e, t) {
  t = Je(t)
  const n = Je(this),
    { has: o, get: r } = we(n)
  let l = o.call(n, e)
  l || ((e = Je(e)), (l = o.call(n, e)))
  const s = r.call(n, e)
  return (
    n.set(e, t), l ? B(t, s) && ie(n, 'set', e, t) : ie(n, 'add', e, t), this
  )
}
function Ee(e) {
  const t = Je(this),
    { has: n, get: o } = we(t)
  let r = n.call(t, e)
  r || ((e = Je(e)), (r = n.call(t, e)))
  o && o.call(t, e)
  const l = t.delete(e)
  return r && ie(t, 'delete', e, void 0), l
}
function Se() {
  const e = Je(this),
    t = 0 !== e.size,
    n = e.clear()
  return t && ie(e, 'clear', void 0, void 0), n
}
function Pe(e, t) {
  return function (n, o) {
    const r = this,
      l = r.__v_raw,
      s = Je(l),
      a = e ? ke : t ? Fe : ye
    return !e && ae(s, 0, Z), l.forEach((e, t) => n.call(o, a(e), a(t), r))
  }
}
function Ce(e, t, n) {
  return function (...o) {
    const r = this.__v_raw,
      l = Je(r),
      s = O(l),
      a = 'entries' === e || (e === Symbol.iterator && s),
      i = 'keys' === e && s,
      c = r[e](...o),
      u = t ? ke : n ? Fe : ye
    return (
      !t && ae(l, 0, i ? Q : Z),
      {
        next() {
          const { value: e, done: t } = c.next()
          return t
            ? { value: e, done: t }
            : { value: a ? [u(e[0]), u(e[1])] : u(e), done: t }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function Ne(e) {
  return function (...t) {
    return 'delete' !== e && this
  }
}
const Me = {
    get(e) {
      return Oe(this, e)
    },
    get size() {
      return Te(this)
    },
    has: Le,
    add: Ie,
    set: xe,
    delete: Ee,
    clear: Se,
    forEach: Pe(!1, !1)
  },
  je = {
    get(e) {
      return Oe(this, e, !1, !0)
    },
    get size() {
      return Te(this)
    },
    has: Le,
    add: Ie,
    set: xe,
    delete: Ee,
    clear: Se,
    forEach: Pe(!1, !0)
  },
  $e = {
    get(e) {
      return Oe(this, e, !0)
    },
    get size() {
      return Te(this, !0)
    },
    has(e) {
      return Le.call(this, e, !0)
    },
    add: Ne('add'),
    set: Ne('set'),
    delete: Ne('delete'),
    clear: Ne('clear'),
    forEach: Pe(!0, !1)
  }
function Re(e, t) {
  const n = t ? je : e ? $e : Me
  return (t, o, r) =>
    '__v_isReactive' === o
      ? !e
      : '__v_isReadonly' === o
      ? e
      : '__v_raw' === o
      ? t
      : Reflect.get(F(n, o) && o in t ? n : t, o, r)
}
;['keys', 'values', 'entries', Symbol.iterator].forEach(e => {
  ;(Me[e] = Ce(e, !1, !1)), ($e[e] = Ce(e, !0, !1)), (je[e] = Ce(e, !1, !0))
})
const We = { get: Re(!1, !1) },
  Ae = { get: Re(!1, !0) },
  De = { get: Re(!0, !1) },
  Ve = new WeakMap(),
  Ue = new WeakMap()
function He(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : (function (e) {
        switch (e) {
          case 'Object':
          case 'Array':
            return 1
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
            return 2
          default:
            return 0
        }
      })((e => N(e).slice(8, -1))(e))
}
function Be(e) {
  return e && e.__v_isReadonly ? e : ze(e, !1, he, We)
}
function Ye(e) {
  return ze(e, !0, ve, De)
}
function ze(e, t, n, o) {
  if (!S(e)) return e
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e
  const r = t ? Ue : Ve,
    l = r.get(e)
  if (l) return l
  const s = He(e)
  if (0 === s) return e
  const a = new Proxy(e, 2 === s ? o : n)
  return r.set(e, a), a
}
function Ge(e) {
  return qe(e) ? Ge(e.__v_raw) : !(!e || !e.__v_isReactive)
}
function qe(e) {
  return !(!e || !e.__v_isReadonly)
}
function Ke(e) {
  return Ge(e) || qe(e)
}
function Je(e) {
  return (e && Je(e.__v_raw)) || e
}
const Ze = e => (S(e) ? Be(e) : e)
function Qe(e) {
  return Boolean(e && !0 === e.__v_isRef)
}
function Xe(e) {
  return (function (e, t = !1) {
    if (Qe(e)) return e
    return new et(e, t)
  })(e)
}
class et {
  constructor(e, t = !1) {
    ;(this._rawValue = e),
      (this._shallow = t),
      (this.__v_isRef = !0),
      (this._value = t ? e : Ze(e))
  }
  get value() {
    return ae(Je(this), 0, 'value'), this._value
  }
  set value(e) {
    B(Je(e), this._rawValue) &&
      ((this._rawValue = e),
      (this._value = this._shallow ? e : Ze(e)),
      ie(Je(this), 'set', 'value', e))
  }
}
const tt = {
  get: (e, t, n) => {
    return Qe((o = Reflect.get(e, t, n))) ? o.value : o
    var o
  },
  set: (e, t, n, o) => {
    const r = e[t]
    return Qe(r) && !Qe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, o)
  }
}
function nt(e) {
  return Ge(e) ? e : new Proxy(e, tt)
}
class ot {
  constructor(e, t) {
    ;(this._object = e), (this._key = t), (this.__v_isRef = !0)
  }
  get value() {
    return this._object[this._key]
  }
  set value(e) {
    this._object[this._key] = e
  }
}
class rt {
  constructor(e, t, n) {
    ;(this._setter = t),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = X(e, {
        lazy: !0,
        scheduler: () => {
          this._dirty || ((this._dirty = !0), ie(Je(this), 'set', 'value'))
        }
      })),
      (this.__v_isReadonly = n)
  }
  get value() {
    return (
      this._dirty && ((this._value = this.effect()), (this._dirty = !1)),
      ae(Je(this), 0, 'value'),
      this._value
    )
  }
  set value(e) {
    this._setter(e)
  }
}
function lt(e, t, n, o) {
  let r
  try {
    r = o ? e(...o) : e()
  } catch (e) {
    at(e, t, n)
  }
  return r
}
function st(e, t, n, o) {
  if (I(e)) {
    const r = lt(e, t, n, o)
    return (
      r &&
        P(r) &&
        r.catch(e => {
          at(e, t, n)
        }),
      r
    )
  }
  const r = []
  for (let l = 0; l < e.length; l++) r.push(st(e[l], t, n, o))
  return r
}
function at(e, t, n, o = !0) {
  t && t.vnode
  if (t) {
    let o = t.parent
    const r = t.proxy,
      l = n
    for (; o; ) {
      const t = o.ec
      if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, l)) return
      o = o.parent
    }
    const s = t.appContext.config.errorHandler
    if (s) return void lt(s, null, 10, [e, r, l])
  }
  !(function (e, t, n, o = !0) {
    console.error(e)
  })(e, 0, 0, o)
}
let it = !1,
  ct = !1
const ut = []
let ft = 0
const pt = []
let dt = null,
  mt = 0
const _t = []
let gt = null,
  ht = 0
const vt = Promise.resolve()
let bt = null,
  yt = null
function kt(e) {
  const t = bt || vt
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Ft(e) {
  ;(ut.length && ut.includes(e, it && e.allowRecurse ? ft + 1 : ft)) ||
    e === yt ||
    (ut.push(e), wt())
}
function wt() {
  it || ct || ((ct = !0), (bt = vt.then(xt)))
}
function Ot(e, t, n, o) {
  w(e)
    ? n.push(...e)
    : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e),
    wt()
}
function Lt(e, t = null) {
  if (pt.length) {
    for (
      yt = t, dt = [...new Set(pt)], pt.length = 0, mt = 0;
      mt < dt.length;
      mt++
    )
      dt[mt]()
    ;(dt = null), (mt = 0), (yt = null), Lt(e, t)
  }
}
function Tt(e) {
  if (_t.length) {
    const e = [...new Set(_t)]
    if (((_t.length = 0), gt)) return void gt.push(...e)
    for (gt = e, gt.sort((e, t) => It(e) - It(t)), ht = 0; ht < gt.length; ht++)
      gt[ht]()
    ;(gt = null), (ht = 0)
  }
}
const It = e => (null == e.id ? 1 / 0 : e.id)
function xt(e) {
  ;(ct = !1), (it = !0), Lt(e), ut.sort((e, t) => It(e) - It(t))
  try {
    for (ft = 0; ft < ut.length; ft++) {
      const e = ut[ft]
      e && lt(e, null, 14)
    }
  } finally {
    ;(ft = 0),
      (ut.length = 0),
      Tt(),
      (it = !1),
      (bt = null),
      (ut.length || _t.length) && xt(e)
  }
}
function Et(e, t, ...n) {
  const o = e.vnode.props || p
  let r = n
  const l = t.startsWith('update:'),
    s = l && t.slice(7)
  if (s && s in o) {
    const e = `${'modelValue' === s ? 'model' : s}Modifiers`,
      { number: t, trim: l } = o[e] || p
    l ? (r = n.map(e => e.trim())) : t && (r = n.map(G))
  }
  let a = H(A(t)),
    i = o[a]
  !i && l && ((a = H(V(t))), (i = o[a])), i && st(i, e, 6, r)
  const c = o[a + 'Once']
  if (c) {
    if (e.emitted) {
      if (e.emitted[a]) return
    } else (e.emitted = {})[a] = !0
    st(c, e, 6, r)
  }
}
function St(e, t, n = !1) {
  if (!t.deopt && void 0 !== e.__emits) return e.__emits
  const o = e.emits
  let r = {},
    l = !1
  if (!I(e)) {
    const o = e => {
      ;(l = !0), b(r, St(e, t, !0))
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  return o || l
    ? (w(o) ? o.forEach(e => (r[e] = null)) : b(r, o), (e.__emits = r))
    : (e.__emits = null)
}
function Pt(e, t) {
  return (
    !(!e || !h(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')),
    F(e, t[0].toLowerCase() + t.slice(1)) || F(e, V(t)) || F(e, t))
  )
}
let Ct = null
function Nt(e) {
  Ct = e
}
function Mt(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: l,
    propsOptions: [s],
    slots: a,
    attrs: i,
    emit: c,
    render: u,
    renderCache: f,
    data: p,
    setupState: d,
    ctx: m
  } = e
  let _
  Ct = e
  try {
    let e
    if (4 & n.shapeFlag) {
      const t = r || o
      ;(_ = Qn(u.call(t, t, f, l, d, p, m))), (e = i)
    } else {
      const n = t
      0,
        (_ = Qn(
          n.length > 1 ? n(l, { attrs: i, slots: a, emit: c }) : n(l, null)
        )),
        (e = t.props ? i : $t(i))
    }
    let g = _
    if (!1 !== t.inheritAttrs && e) {
      const t = Object.keys(e),
        { shapeFlag: n } = g
      t.length &&
        (1 & n || 6 & n) &&
        (s && t.some(v) && (e = Rt(e, s)), (g = Jn(g, e)))
    }
    n.dirs && (g.dirs = g.dirs ? g.dirs.concat(n.dirs) : n.dirs),
      n.transition && (g.transition = n.transition),
      (_ = g)
  } catch (t) {
    at(t, e, 1), (_ = Kn(Rn))
  }
  return (Ct = null), _
}
function jt(e) {
  let t
  for (let n = 0; n < e.length; n++) {
    const o = e[n]
    if (!Bn(o)) return
    if (o.type !== Rn || 'v-if' === o.children) {
      if (t) return
      t = o
    }
  }
  return t
}
const $t = e => {
    let t
    for (const n in e)
      ('class' === n || 'style' === n || h(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  Rt = (e, t) => {
    const n = {}
    for (const o in e) (v(o) && o.slice(9) in t) || (n[o] = e[o])
    return n
  }
function Wt(e, t, n) {
  const o = Object.keys(t)
  if (o.length !== Object.keys(e).length) return !0
  for (let r = 0; r < o.length; r++) {
    const l = o[r]
    if (t[l] !== e[l] && !Pt(n, l)) return !0
  }
  return !1
}
function At(e) {
  if ((I(e) && (e = e()), w(e))) {
    e = jt(e)
  }
  return Qn(e)
}
let Dt = 0
const Vt = e => (Dt += e)
function Ut(e, t, n, o = !1) {
  const r = {},
    l = {}
  z(l, zn, 1),
    Ht(e, t, r, l),
    n
      ? (e.props = o ? r : ze(r, !1, be, Ae))
      : e.type.props
      ? (e.props = r)
      : (e.props = l),
    (e.attrs = l)
}
function Ht(e, t, n, o) {
  const [r, l] = e.propsOptions
  if (t)
    for (const l in t) {
      const s = t[l]
      if ($(l)) continue
      let a
      r && F(r, (a = A(l))) ? (n[a] = s) : Pt(e.emitsOptions, l) || (o[l] = s)
    }
  if (l) {
    const t = Je(n)
    for (let o = 0; o < l.length; o++) {
      const s = l[o]
      n[s] = Bt(r, t, s, t[s], e)
    }
  }
}
function Bt(e, t, n, o, r) {
  const l = e[n]
  if (null != l) {
    const e = F(l, 'default')
    if (e && void 0 === o) {
      const e = l.default
      l.type !== Function && I(e) ? (yo(r), (o = e(t)), yo(null)) : (o = e)
    }
    l[0] &&
      (F(t, n) || e ? !l[1] || ('' !== o && o !== V(n)) || (o = !0) : (o = !1))
  }
  return o
}
function Yt(e, t, n = !1) {
  if (!t.deopt && e.__props) return e.__props
  const o = e.props,
    r = {},
    l = []
  let s = !1
  if (!I(e)) {
    const o = e => {
      s = !0
      const [n, o] = Yt(e, t, !0)
      b(r, n), o && l.push(...o)
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  if (!o && !s) return (e.__props = d)
  if (w(o))
    for (let e = 0; e < o.length; e++) {
      const t = A(o[e])
      zt(t) && (r[t] = p)
    }
  else if (o)
    for (const e in o) {
      const t = A(e)
      if (zt(t)) {
        const n = o[e],
          s = (r[t] = w(n) || I(n) ? { type: n } : n)
        if (s) {
          const e = Kt(Boolean, s.type),
            n = Kt(String, s.type)
          ;(s[0] = e > -1),
            (s[1] = n < 0 || e < n),
            (e > -1 || F(s, 'default')) && l.push(t)
        }
      }
    }
  return (e.__props = [r, l])
}
function zt(e) {
  return '$' !== e[0]
}
function Gt(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/)
  return t ? t[1] : ''
}
function qt(e, t) {
  return Gt(e) === Gt(t)
}
function Kt(e, t) {
  if (w(t)) {
    for (let n = 0, o = t.length; n < o; n++) if (qt(t[n], e)) return n
  } else if (I(t)) return qt(t, e) ? 0 : -1
  return -1
}
function Jt(e, t, n = vo, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      l =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return
          le(), yo(n)
          const r = st(t, n, e, o)
          return yo(null), se(), r
        })
    return o ? r.unshift(l) : r.push(l), l
  }
}
const Zt = e => (t, n = vo) => !ko && Jt(e, t, n),
  Qt = Zt('bm'),
  Xt = Zt('m'),
  en = Zt('bu'),
  tn = Zt('u'),
  nn = Zt('bum'),
  on = Zt('um'),
  rn = Zt('rtg'),
  ln = Zt('rtc'),
  sn = {}
function an(e, t, n) {
  return cn(e, t, n)
}
function cn(
  e,
  t,
  { immediate: n, deep: o, flush: r, onTrack: l, onTrigger: s } = p,
  a = vo
) {
  let i,
    c,
    u = !1
  if (
    (Qe(e)
      ? ((i = () => e.value), (u = !!e._shallow))
      : Ge(e)
      ? ((i = () => e), (o = !0))
      : (i = w(e)
          ? () =>
              e.map(e =>
                Qe(e) ? e.value : Ge(e) ? fn(e) : I(e) ? lt(e, a, 2) : void 0
              )
          : I(e)
          ? t
            ? () => lt(e, a, 2)
            : () => {
                if (!a || !a.isUnmounted) return c && c(), lt(e, a, 3, [f])
              }
          : m),
    t && o)
  ) {
    const e = i
    i = () => fn(e())
  }
  const f = e => {
    c = h.options.onStop = () => {
      lt(e, a, 4)
    }
  }
  let d = w(e) ? [] : sn
  const _ = () => {
    if (h.active)
      if (t) {
        const e = h()
        ;(o || u || B(e, d)) &&
          (c && c(), st(t, a, 3, [e, d === sn ? void 0 : d, f]), (d = e))
      } else h()
  }
  let g
  ;(_.allowRecurse = !!t),
    (g =
      'sync' === r
        ? _
        : 'post' === r
        ? () => Tn(_, a && a.suspense)
        : () => {
            !a || a.isMounted
              ? (function (e) {
                  Ot(e, dt, pt, mt)
                })(_)
              : _()
          })
  const h = X(i, { lazy: !0, onTrack: l, onTrigger: s, scheduler: g })
  return (
    Oo(h, a),
    t ? (n ? _() : (d = h())) : 'post' === r ? Tn(h, a && a.suspense) : h(),
    () => {
      ee(h), a && y(a.effects, h)
    }
  )
}
function un(e, t, n) {
  const o = this.proxy
  return cn(x(e) ? () => o[e] : e.bind(o), t.bind(o), n, this)
}
function fn(e, t = new Set()) {
  if (!S(e) || t.has(e)) return e
  if ((t.add(e), Qe(e))) fn(e.value, t)
  else if (w(e)) for (let n = 0; n < e.length; n++) fn(e[n], t)
  else if (L(e) || O(e))
    e.forEach(e => {
      fn(e, t)
    })
  else for (const n in e) fn(e[n], t)
  return e
}
const pn = e => e.type.__isKeepAlive
function dn(e, t, n = vo) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let t = n
      for (; t; ) {
        if (t.isDeactivated) return
        t = t.parent
      }
      e()
    })
  if ((Jt(t, o, n), n)) {
    let e = n.parent
    for (; e && e.parent; ) pn(e.parent.vnode) && mn(o, t, n, e), (e = e.parent)
  }
}
function mn(e, t, n, o) {
  const r = Jt(t, e, o, !0)
  on(() => {
    y(o[t], r)
  }, n)
}
const _n = e => '_' === e[0] || '$stable' === e,
  gn = e => (w(e) ? e.map(Qn) : [Qn(e)]),
  hn = (e, t, n) =>
    (function (e, t = Ct) {
      if (!t) return e
      const n = (...n) => {
        Dt || Vn(!0)
        const o = Ct
        Nt(t)
        const r = e(...n)
        return Nt(o), Dt || Un(), r
      }
      return (n._c = !0), n
    })(e => gn(t(e)), n),
  vn = (e, t) => {
    const n = e._ctx
    for (const o in e) {
      if (_n(o)) continue
      const r = e[o]
      if (I(r)) t[o] = hn(0, r, n)
      else if (null != r) {
        const e = gn(r)
        t[o] = () => e
      }
    }
  },
  bn = (e, t) => {
    const n = gn(t)
    e.slots.default = () => n
  }
function yn(e, t) {
  if (null === Ct) return e
  const n = Ct.proxy,
    o = e.dirs || (e.dirs = [])
  for (let e = 0; e < t.length; e++) {
    let [r, l, s, a = p] = t[e]
    I(r) && (r = { mounted: r, updated: r }),
      o.push({
        dir: r,
        instance: n,
        value: l,
        oldValue: void 0,
        arg: s,
        modifiers: a
      })
  }
  return e
}
function kn(e, t, n, o) {
  const r = e.dirs,
    l = t && t.dirs
  for (let s = 0; s < r.length; s++) {
    const a = r[s]
    l && (a.oldValue = l[s].value)
    const i = a.dir[o]
    i && st(i, n, 8, [e.el, a, e, t])
  }
}
function Fn() {
  return {
    app: null,
    config: {
      isNativeTag: _,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      isCustomElement: _,
      errorHandler: void 0,
      warnHandler: void 0
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null)
  }
}
let wn = 0
function On(e, t) {
  return function (n, o = null) {
    null == o || S(o) || (o = null)
    const r = Fn(),
      l = new Set()
    let s = !1
    const a = (r.app = {
      _uid: wn++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      version: Io,
      get config() {
        return r.config
      },
      set config(e) {},
      use: (e, ...t) => (
        l.has(e) ||
          (e && I(e.install)
            ? (l.add(e), e.install(a, ...t))
            : I(e) && (l.add(e), e(a, ...t))),
        a
      ),
      mixin: e => (
        r.mixins.includes(e) ||
          (r.mixins.push(e), (e.props || e.emits) && (r.deopt = !0)),
        a
      ),
      component: (e, t) => (t ? ((r.components[e] = t), a) : r.components[e]),
      directive: (e, t) => (t ? ((r.directives[e] = t), a) : r.directives[e]),
      mount(l, i) {
        if (!s) {
          const c = Kn(n, o)
          return (
            (c.appContext = r),
            i && t ? t(c, l) : e(c, l),
            (s = !0),
            (a._container = l),
            (l.__vue_app__ = a),
            c.component.proxy
          )
        }
      },
      unmount() {
        s && e(null, a._container)
      },
      provide: (e, t) => ((r.provides[e] = t), a)
    })
    return a
  }
}
const Ln = { scheduler: Ft, allowRecurse: !0 },
  Tn = function (e, t) {
    t && t.pendingBranch
      ? w(e)
        ? t.effects.push(...e)
        : t.effects.push(e)
      : Ot(e, gt, _t, ht)
  },
  In = (e, t, n, o) => {
    if (w(e))
      return void e.forEach((e, r) => In(e, t && (w(t) ? t[r] : t), n, o))
    let r
    r =
      !o || o.type.__asyncLoader
        ? null
        : 4 & o.shapeFlag
        ? o.component.exposed || o.component.proxy
        : o.el
    const { i: l, r: s } = e,
      a = t && t.r,
      i = l.refs === p ? (l.refs = {}) : l.refs,
      c = l.setupState
    if (
      (null != a &&
        a !== s &&
        (x(a)
          ? ((i[a] = null), F(c, a) && (c[a] = null))
          : Qe(a) && (a.value = null)),
      x(s))
    ) {
      const e = () => {
        ;(i[s] = r), F(c, s) && (c[s] = r)
      }
      r ? ((e.id = -1), Tn(e, n)) : e()
    } else if (Qe(s)) {
      const e = () => {
        s.value = r
      }
      r ? ((e.id = -1), Tn(e, n)) : e()
    } else I(s) && lt(s, l, 12, [r, i])
  }
function xn(e) {
  return (function (e, t) {
    const {
        insert: n,
        remove: o,
        patchProp: r,
        forcePatchProp: l,
        createElement: s,
        createText: a,
        createComment: i,
        setText: c,
        setElementText: u,
        parentNode: f,
        nextSibling: _,
        setScopeId: g = m,
        cloneNode: h,
        insertStaticContent: v
      } = e,
      y = (e, t, n, o = null, r = null, l = null, s = !1, a = !1) => {
        e && !Yn(e, t) && ((o = oe(e)), J(e, r, l, !0), (e = null)),
          -2 === t.patchFlag && ((a = !1), (t.dynamicChildren = null))
        const { type: i, ref: c, shapeFlag: u } = t
        switch (i) {
          case $n:
            k(e, t, n, o)
            break
          case Rn:
            w(e, t, n, o)
            break
          case Wn:
            null == e && O(t, n, o, s)
            break
          case jn:
            j(e, t, n, o, r, l, s, a)
            break
          default:
            1 & u
              ? I(e, t, n, o, r, l, s, a)
              : 6 & u
              ? R(e, t, n, o, r, l, s, a)
              : (64 & u || 128 & u) && i.process(e, t, n, o, r, l, s, a, ae)
        }
        null != c && r && In(c, e && e.ref, l, t)
      },
      k = (e, t, o, r) => {
        if (null == e) n((t.el = a(t.children)), o, r)
        else {
          const n = (t.el = e.el)
          t.children !== e.children && c(n, t.children)
        }
      },
      w = (e, t, o, r) => {
        null == e ? n((t.el = i(t.children || '')), o, r) : (t.el = e.el)
      },
      O = (e, t, n, o) => {
        ;[e.el, e.anchor] = v(e.children, t, n, o)
      },
      L = ({ el: e, anchor: t }, o, r) => {
        let l
        for (; e && e !== t; ) (l = _(e)), n(e, o, r), (e = l)
        n(t, o, r)
      },
      T = ({ el: e, anchor: t }) => {
        let n
        for (; e && e !== t; ) (n = _(e)), o(e), (e = n)
        o(t)
      },
      I = (e, t, n, o, r, l, s, a) => {
        ;(s = s || 'svg' === t.type),
          null == e ? x(t, n, o, r, l, s, a) : C(e, t, r, l, s, a)
      },
      x = (e, t, o, l, a, i, c) => {
        let f, p
        const {
          type: d,
          props: m,
          shapeFlag: _,
          transition: g,
          scopeId: v,
          patchFlag: b,
          dirs: y
        } = e
        if (e.el && void 0 !== h && -1 === b) f = e.el = h(e.el)
        else {
          if (
            ((f = e.el = s(e.type, i, m && m.is)),
            8 & _
              ? u(f, e.children)
              : 16 & _ &&
                S(
                  e.children,
                  f,
                  null,
                  l,
                  a,
                  i && 'foreignObject' !== d,
                  c || !!e.dynamicChildren
                ),
            y && kn(e, null, l, 'created'),
            m)
          ) {
            for (const t in m)
              $(t) || r(f, t, null, m[t], i, e.children, l, a, ne)
            ;(p = m.onVnodeBeforeMount) && En(p, l, e)
          }
          E(f, v, e, l)
        }
        y && kn(e, null, l, 'beforeMount')
        const k = (!a || (a && !a.pendingBranch)) && g && !g.persisted
        k && g.beforeEnter(f),
          n(f, t, o),
          ((p = m && m.onVnodeMounted) || k || y) &&
            Tn(() => {
              p && En(p, l, e), k && g.enter(f), y && kn(e, null, l, 'mounted')
            }, a)
      },
      E = (e, t, n, o) => {
        if ((t && g(e, t), o)) {
          const r = o.type.__scopeId
          r && r !== t && g(e, r + '-s'),
            n === o.subTree && E(e, o.vnode.scopeId, o.vnode, o.parent)
        }
      },
      S = (e, t, n, o, r, l, s, a = 0) => {
        for (let i = a; i < e.length; i++) {
          const a = (e[i] = s ? Xn(e[i]) : Qn(e[i]))
          y(null, a, t, n, o, r, l, s)
        }
      },
      C = (e, t, n, o, s, a) => {
        const i = (t.el = e.el)
        let { patchFlag: c, dynamicChildren: f, dirs: d } = t
        c |= 16 & e.patchFlag
        const m = e.props || p,
          _ = t.props || p
        let g
        if (
          ((g = _.onVnodeBeforeUpdate) && En(g, n, t, e),
          d && kn(t, e, n, 'beforeUpdate'),
          c > 0)
        ) {
          if (16 & c) M(i, t, m, _, n, o, s)
          else if (
            (2 & c && m.class !== _.class && r(i, 'class', null, _.class, s),
            4 & c && r(i, 'style', m.style, _.style, s),
            8 & c)
          ) {
            const a = t.dynamicProps
            for (let t = 0; t < a.length; t++) {
              const c = a[t],
                u = m[c],
                f = _[c]
              ;(f !== u || (l && l(i, c))) &&
                r(i, c, u, f, s, e.children, n, o, ne)
            }
          }
          1 & c && e.children !== t.children && u(i, t.children)
        } else a || null != f || M(i, t, m, _, n, o, s)
        const h = s && 'foreignObject' !== t.type
        f
          ? N(e.dynamicChildren, f, i, n, o, h)
          : a || B(e, t, i, null, n, o, h),
          ((g = _.onVnodeUpdated) || d) &&
            Tn(() => {
              g && En(g, n, t, e), d && kn(t, e, n, 'updated')
            }, o)
      },
      N = (e, t, n, o, r, l) => {
        for (let s = 0; s < t.length; s++) {
          const a = e[s],
            i = t[s],
            c =
              a.type === jn || !Yn(a, i) || 6 & a.shapeFlag || 64 & a.shapeFlag
                ? f(a.el)
                : n
          y(a, i, c, null, o, r, l, !0)
        }
      },
      M = (e, t, n, o, s, a, i) => {
        if (n !== o) {
          for (const c in o) {
            if ($(c)) continue
            const u = o[c],
              f = n[c]
            ;(u !== f || (l && l(e, c))) &&
              r(e, c, f, u, i, t.children, s, a, ne)
          }
          if (n !== p)
            for (const l in n)
              $(l) || l in o || r(e, l, n[l], null, i, t.children, s, a, ne)
        }
      },
      j = (e, t, o, r, l, s, i, c) => {
        const u = (t.el = e ? e.el : a('')),
          f = (t.anchor = e ? e.anchor : a(''))
        let { patchFlag: p, dynamicChildren: d } = t
        p > 0 && (c = !0),
          null == e
            ? (n(u, o, r), n(f, o, r), S(t.children, o, f, l, s, i, c))
            : p > 0 && 64 & p && d
            ? (N(e.dynamicChildren, d, o, l, s, i),
              (null != t.key || (l && t === l.subTree)) && Sn(e, t, !0))
            : B(e, t, o, f, l, s, i, c)
      },
      R = (e, t, n, o, r, l, s, a) => {
        null == e
          ? 512 & t.shapeFlag
            ? r.ctx.activate(t, n, o, s, a)
            : W(t, n, o, r, l, s, a)
          : D(e, t, a)
      },
      W = (e, t, n, o, r, l, s) => {
        const a = (e.component = (function (e, t, n) {
          const o = e.type,
            r = (t ? t.appContext : e.appContext) || go,
            l = {
              uid: ho++,
              vnode: e,
              type: o,
              parent: t,
              appContext: r,
              root: null,
              next: null,
              subTree: null,
              update: null,
              render: null,
              proxy: null,
              exposed: null,
              withProxy: null,
              effects: null,
              provides: t ? t.provides : Object.create(r.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: Yt(o, r),
              emitsOptions: St(o, r),
              emit: null,
              emitted: null,
              ctx: p,
              data: p,
              props: p,
              attrs: p,
              slots: p,
              refs: p,
              setupState: p,
              setupContext: null,
              suspense: n,
              suspenseId: n ? n.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null
            }
          return (
            (l.ctx = { _: l }),
            (l.root = t ? t.root : l),
            (l.emit = Et.bind(null, l)),
            l
          )
        })(e, o, r))
        if (
          (pn(e) && (a.ctx.renderer = ae),
          (function (e, t = !1) {
            ko = t
            const { props: n, children: o, shapeFlag: r } = e.vnode,
              l = 4 & r
            Ut(e, n, l, t),
              ((e, t) => {
                if (32 & e.vnode.shapeFlag) {
                  const n = t._
                  n ? ((e.slots = t), z(t, '_', n)) : vn(t, (e.slots = {}))
                } else (e.slots = {}), t && bn(e, t)
                z(e.slots, zn, 1)
              })(e, o)
            const s = l
              ? (function (e, t) {
                  const n = e.type
                  ;(e.accessCache = Object.create(null)),
                    (e.proxy = new Proxy(e.ctx, mo))
                  const { setup: o } = n
                  if (o) {
                    const n = (e.setupContext =
                      o.length > 1
                        ? (function (e) {
                            const t = t => {
                              e.exposed = nt(t)
                            }
                            return {
                              attrs: e.attrs,
                              slots: e.slots,
                              emit: e.emit,
                              expose: t
                            }
                          })(e)
                        : null)
                    ;(vo = e), le()
                    const r = lt(o, e, 0, [e.props, n])
                    if ((se(), (vo = null), P(r))) {
                      if (t)
                        return r.then(t => {
                          Fo(e, t)
                        })
                      e.asyncDep = r
                    } else Fo(e, r)
                  } else wo(e)
                })(e, t)
              : void 0
            ko = !1
          })(a),
          a.asyncDep)
        ) {
          if ((r && r.registerDep(a, U), !e.el)) {
            const e = (a.subTree = Kn(Rn))
            w(null, e, t, n)
          }
        } else U(a, e, t, n, r, l, s)
      },
      D = (e, t, n) => {
        const o = (t.component = e.component)
        if (
          (function (e, t, n) {
            const { props: o, children: r, component: l } = e,
              { props: s, children: a, patchFlag: i } = t,
              c = l.emitsOptions
            if (t.dirs || t.transition) return !0
            if (!(n && i >= 0))
              return (
                !((!r && !a) || (a && a.$stable)) ||
                (o !== s && (o ? !s || Wt(o, s, c) : !!s))
              )
            if (1024 & i) return !0
            if (16 & i) return o ? Wt(o, s, c) : !!s
            if (8 & i) {
              const e = t.dynamicProps
              for (let t = 0; t < e.length; t++) {
                const n = e[t]
                if (s[n] !== o[n] && !Pt(c, n)) return !0
              }
            }
            return !1
          })(e, t, n)
        ) {
          if (o.asyncDep && !o.asyncResolved) return void H(o, t, n)
          ;(o.next = t),
            (function (e) {
              const t = ut.indexOf(e)
              t > -1 && ut.splice(t, 1)
            })(o.update),
            o.update()
        } else (t.component = e.component), (t.el = e.el), (o.vnode = t)
      },
      U = (e, t, n, o, r, l, s) => {
        e.update = X(function () {
          if (e.isMounted) {
            let t,
              { next: n, bu: o, u: a, parent: i, vnode: c } = e,
              u = n
            n ? ((n.el = c.el), H(e, n, s)) : (n = c),
              o && Y(o),
              (t = n.props && n.props.onVnodeBeforeUpdate) && En(t, i, n, c)
            const p = Mt(e),
              d = e.subTree
            ;(e.subTree = p),
              y(d, p, f(d.el), oe(d), e, r, l),
              (n.el = p.el),
              null === u &&
                (function ({ vnode: e, parent: t }, n) {
                  for (; t && t.subTree === e; )
                    ((e = t.vnode).el = n), (t = t.parent)
                })(e, p.el),
              a && Tn(a, r),
              (t = n.props && n.props.onVnodeUpdated) &&
                Tn(() => {
                  En(t, i, n, c)
                }, r)
          } else {
            let s
            const { el: a, props: i } = t,
              { bm: c, m: u, parent: f } = e
            c && Y(c), (s = i && i.onVnodeBeforeMount) && En(s, f, t)
            const p = (e.subTree = Mt(e))
            a && ue
              ? ue(t.el, p, e, r)
              : (y(null, p, n, o, e, r, l), (t.el = p.el)),
              u && Tn(u, r),
              (s = i && i.onVnodeMounted) &&
                Tn(() => {
                  En(s, f, t)
                }, r)
            const { a: d } = e
            d && 256 & t.shapeFlag && Tn(d, r), (e.isMounted = !0)
          }
        }, Ln)
      },
      H = (e, t, n) => {
        t.component = e
        const o = e.vnode.props
        ;(e.vnode = t),
          (e.next = null),
          (function (e, t, n, o) {
            const {
                props: r,
                attrs: l,
                vnode: { patchFlag: s }
              } = e,
              a = Je(r),
              [i] = e.propsOptions
            if (!(o || s > 0) || 16 & s) {
              let o
              Ht(e, t, r, l)
              for (const l in a)
                (t && (F(t, l) || ((o = V(l)) !== l && F(t, o)))) ||
                  (i
                    ? !n ||
                      (void 0 === n[l] && void 0 === n[o]) ||
                      (r[l] = Bt(i, t || p, l, void 0, e))
                    : delete r[l])
              if (l !== a) for (const e in l) (t && F(t, e)) || delete l[e]
            } else if (8 & s) {
              const n = e.vnode.dynamicProps
              for (let o = 0; o < n.length; o++) {
                const s = n[o],
                  c = t[s]
                if (i)
                  if (F(l, s)) l[s] = c
                  else {
                    const t = A(s)
                    r[t] = Bt(i, a, t, c, e)
                  }
                else l[s] = c
              }
            }
            ie(e, 'set', '$attrs')
          })(e, t.props, o, n),
          ((e, t) => {
            const { vnode: n, slots: o } = e
            let r = !0,
              l = p
            if (32 & n.shapeFlag) {
              const e = t._
              e ? (1 === e ? (r = !1) : b(o, t)) : ((r = !t.$stable), vn(t, o)),
                (l = t)
            } else t && (bn(e, t), (l = { default: 1 }))
            if (r) for (const e in o) _n(e) || e in l || delete o[e]
          })(e, t.children),
          Lt(void 0, e.update)
      },
      B = (e, t, n, o, r, l, s, a = !1) => {
        const i = e && e.children,
          c = e ? e.shapeFlag : 0,
          f = t.children,
          { patchFlag: p, shapeFlag: d } = t
        if (p > 0) {
          if (128 & p) return void q(i, f, n, o, r, l, s, a)
          if (256 & p) return void G(i, f, n, o, r, l, s, a)
        }
        8 & d
          ? (16 & c && ne(i, r, l), f !== i && u(n, f))
          : 16 & c
          ? 16 & d
            ? q(i, f, n, o, r, l, s, a)
            : ne(i, r, l, !0)
          : (8 & c && u(n, ''), 16 & d && S(f, n, o, r, l, s, a))
      },
      G = (e, t, n, o, r, l, s, a) => {
        t = t || d
        const i = (e = e || d).length,
          c = t.length,
          u = Math.min(i, c)
        let f
        for (f = 0; f < u; f++) {
          const o = (t[f] = a ? Xn(t[f]) : Qn(t[f]))
          y(e[f], o, n, null, r, l, s, a)
        }
        i > c ? ne(e, r, l, !0, !1, u) : S(t, n, o, r, l, s, a, u)
      },
      q = (e, t, n, o, r, l, s, a) => {
        let i = 0
        const c = t.length
        let u = e.length - 1,
          f = c - 1
        for (; i <= u && i <= f; ) {
          const o = e[i],
            c = (t[i] = a ? Xn(t[i]) : Qn(t[i]))
          if (!Yn(o, c)) break
          y(o, c, n, null, r, l, s, a), i++
        }
        for (; i <= u && i <= f; ) {
          const o = e[u],
            i = (t[f] = a ? Xn(t[f]) : Qn(t[f]))
          if (!Yn(o, i)) break
          y(o, i, n, null, r, l, s, a), u--, f--
        }
        if (i > u) {
          if (i <= f) {
            const e = f + 1,
              u = e < c ? t[e].el : o
            for (; i <= f; )
              y(null, (t[i] = a ? Xn(t[i]) : Qn(t[i])), n, u, r, l, s), i++
          }
        } else if (i > f) for (; i <= u; ) J(e[i], r, l, !0), i++
        else {
          const p = i,
            m = i,
            _ = new Map()
          for (i = m; i <= f; i++) {
            const e = (t[i] = a ? Xn(t[i]) : Qn(t[i]))
            null != e.key && _.set(e.key, i)
          }
          let g,
            h = 0
          const v = f - m + 1
          let b = !1,
            k = 0
          const F = new Array(v)
          for (i = 0; i < v; i++) F[i] = 0
          for (i = p; i <= u; i++) {
            const o = e[i]
            if (h >= v) {
              J(o, r, l, !0)
              continue
            }
            let c
            if (null != o.key) c = _.get(o.key)
            else
              for (g = m; g <= f; g++)
                if (0 === F[g - m] && Yn(o, t[g])) {
                  c = g
                  break
                }
            void 0 === c
              ? J(o, r, l, !0)
              : ((F[c - m] = i + 1),
                c >= k ? (k = c) : (b = !0),
                y(o, t[c], n, null, r, l, s, a),
                h++)
          }
          const w = b
            ? (function (e) {
                const t = e.slice(),
                  n = [0]
                let o, r, l, s, a
                const i = e.length
                for (o = 0; o < i; o++) {
                  const i = e[o]
                  if (0 !== i) {
                    if (((r = n[n.length - 1]), e[r] < i)) {
                      ;(t[o] = r), n.push(o)
                      continue
                    }
                    for (l = 0, s = n.length - 1; l < s; )
                      (a = ((l + s) / 2) | 0),
                        e[n[a]] < i ? (l = a + 1) : (s = a)
                    i < e[n[l]] && (l > 0 && (t[o] = n[l - 1]), (n[l] = o))
                  }
                }
                ;(l = n.length), (s = n[l - 1])
                for (; l-- > 0; ) (n[l] = s), (s = t[s])
                return n
              })(F)
            : d
          for (g = w.length - 1, i = v - 1; i >= 0; i--) {
            const e = m + i,
              a = t[e],
              u = e + 1 < c ? t[e + 1].el : o
            0 === F[i]
              ? y(null, a, n, u, r, l, s)
              : b && (g < 0 || i !== w[g] ? K(a, n, u, 2) : g--)
          }
        }
      },
      K = (e, t, o, r, l = null) => {
        const { el: s, type: a, transition: i, children: c, shapeFlag: u } = e
        if (6 & u) return void K(e.component.subTree, t, o, r)
        if (128 & u) return void e.suspense.move(t, o, r)
        if (64 & u) return void a.move(e, t, o, ae)
        if (a === jn) {
          n(s, t, o)
          for (let e = 0; e < c.length; e++) K(c[e], t, o, r)
          return void n(e.anchor, t, o)
        }
        if (a === Wn) return void L(e, t, o)
        if (2 !== r && 1 & u && i)
          if (0 === r) i.beforeEnter(s), n(s, t, o), Tn(() => i.enter(s), l)
          else {
            const { leave: e, delayLeave: r, afterLeave: l } = i,
              a = () => n(s, t, o),
              c = () => {
                e(s, () => {
                  a(), l && l()
                })
              }
            r ? r(s, a, c) : c()
          }
        else n(s, t, o)
      },
      J = (e, t, n, o = !1, r = !1) => {
        const {
          type: l,
          props: s,
          ref: a,
          children: i,
          dynamicChildren: c,
          shapeFlag: u,
          patchFlag: f,
          dirs: p
        } = e
        if ((null != a && In(a, null, n, null), 256 & u))
          return void t.ctx.deactivate(e)
        const d = 1 & u && p
        let m
        if (((m = s && s.onVnodeBeforeUnmount) && En(m, t, e), 6 & u))
          te(e.component, n, o)
        else {
          if (128 & u) return void e.suspense.unmount(n, o)
          d && kn(e, null, t, 'beforeUnmount'),
            c && (l !== jn || (f > 0 && 64 & f))
              ? ne(c, t, n, !1, !0)
              : ((l === jn && (128 & f || 256 & f)) || (!r && 16 & u)) &&
                ne(i, t, n),
            64 & u && (o || !Pn(e.props)) && e.type.remove(e, ae),
            o && Z(e)
        }
        ;((m = s && s.onVnodeUnmounted) || d) &&
          Tn(() => {
            m && En(m, t, e), d && kn(e, null, t, 'unmounted')
          }, n)
      },
      Z = e => {
        const { type: t, el: n, anchor: r, transition: l } = e
        if (t === jn) return void Q(n, r)
        if (t === Wn) return void T(e)
        const s = () => {
          o(n), l && !l.persisted && l.afterLeave && l.afterLeave()
        }
        if (1 & e.shapeFlag && l && !l.persisted) {
          const { leave: t, delayLeave: o } = l,
            r = () => t(n, s)
          o ? o(e.el, s, r) : r()
        } else s()
      },
      Q = (e, t) => {
        let n
        for (; e !== t; ) (n = _(e)), o(e), (e = n)
        o(t)
      },
      te = (e, t, n) => {
        const { bum: o, effects: r, update: l, subTree: s, um: a } = e
        if ((o && Y(o), r)) for (let e = 0; e < r.length; e++) ee(r[e])
        l && (ee(l), J(s, e, t, n)),
          a && Tn(a, t),
          Tn(() => {
            e.isUnmounted = !0
          }, t),
          t &&
            t.pendingBranch &&
            !t.isUnmounted &&
            e.asyncDep &&
            !e.asyncResolved &&
            e.suspenseId === t.pendingId &&
            (t.deps--, 0 === t.deps && t.resolve())
      },
      ne = (e, t, n, o = !1, r = !1, l = 0) => {
        for (let s = l; s < e.length; s++) J(e[s], t, n, o, r)
      },
      oe = e =>
        6 & e.shapeFlag
          ? oe(e.component.subTree)
          : 128 & e.shapeFlag
          ? e.suspense.next()
          : _(e.anchor || e.el),
      re = (e, t) => {
        null == e
          ? t._vnode && J(t._vnode, null, null, !0)
          : y(t._vnode || null, e, t),
          Tt(),
          (t._vnode = e)
      },
      ae = { p: y, um: J, m: K, r: Z, mt: W, mc: S, pc: B, pbc: N, n: oe, o: e }
    let ce, ue
    t && ([ce, ue] = t(ae))
    return { render: re, hydrate: ce, createApp: On(re, ce) }
  })(e)
}
function En(e, t, n, o = null) {
  st(e, t, 7, [n, o])
}
function Sn(e, t, n = !1) {
  const o = e.children,
    r = t.children
  if (w(o) && w(r))
    for (let e = 0; e < o.length; e++) {
      const t = o[e]
      let l = r[e]
      1 & l.shapeFlag &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || 32 === l.patchFlag) &&
          ((l = r[e] = Xn(r[e])), (l.el = t.el)),
        n || Sn(t, l))
    }
}
const Pn = e => e && (e.disabled || '' === e.disabled)
function Cn(e) {
  return (
    (function (e, t, n = !0) {
      const o = Ct || vo
      if (o) {
        const n = o.type
        if ('components' === e) {
          if ('_self' === t) return n
          const e = n.displayName || n.name
          if (e && (e === t || e === A(t) || e === U(A(t)))) return n
        }
        return Mn(o[e] || n[e], t) || Mn(o.appContext[e], t)
      }
    })('components', e) || e
  )
}
const Nn = Symbol()
function Mn(e, t) {
  return e && (e[t] || e[A(t)] || e[U(A(t))])
}
const jn = Symbol(void 0),
  $n = Symbol(void 0),
  Rn = Symbol(void 0),
  Wn = Symbol(void 0),
  An = []
let Dn = null
function Vn(e = !1) {
  An.push((Dn = e ? null : []))
}
function Un() {
  An.pop(), (Dn = An[An.length - 1] || null)
}
function Hn(e, t, n, o, r) {
  const l = Kn(e, t, n, o, r, !0)
  return (l.dynamicChildren = Dn || d), Un(), Dn && Dn.push(l), l
}
function Bn(e) {
  return !!e && !0 === e.__v_isVNode
}
function Yn(e, t) {
  return e.type === t.type && e.key === t.key
}
const zn = '__vInternal',
  Gn = ({ key: e }) => (null != e ? e : null),
  qn = ({ ref: e }) =>
    null != e ? (x(e) || Qe(e) || I(e) ? { i: Ct, r: e } : e) : null,
  Kn = function (e, t = null, n = null, r = 0, l = null, s = !1) {
    ;(e && e !== Nn) || (e = Rn)
    if (Bn(e)) {
      const o = Jn(e, t, !0)
      return n && eo(o, n), o
    }
    ;(i = e), I(i) && '__vccOpts' in i && (e = e.__vccOpts)
    var i
    if (t) {
      ;(Ke(t) || zn in t) && (t = b({}, t))
      let { class: e, style: n } = t
      e && !x(e) && (t.class = a(e)),
        S(n) && (Ke(n) && !w(n) && (n = b({}, n)), (t.style = o(n)))
    }
    const c = x(e)
        ? 1
        : (e => e.__isSuspense)(e)
        ? 128
        : (e => e.__isTeleport)(e)
        ? 64
        : S(e)
        ? 4
        : I(e)
        ? 2
        : 0,
      u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Gn(t),
        ref: t && qn(t),
        scopeId: null,
        children: null,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: c,
        patchFlag: r,
        dynamicProps: l,
        dynamicChildren: null,
        appContext: null
      }
    if ((eo(u, n), 128 & c)) {
      const { content: e, fallback: t } = (function (e) {
        const { shapeFlag: t, children: n } = e
        let o, r
        return (
          32 & t
            ? ((o = At(n.default)), (r = At(n.fallback)))
            : ((o = At(n)), (r = Qn(null))),
          { content: o, fallback: r }
        )
      })(u)
      ;(u.ssContent = e), (u.ssFallback = t)
    }
    !s && Dn && (r > 0 || 6 & c) && 32 !== r && Dn.push(u)
    return u
  }
function Jn(e, t, n = !1) {
  const { props: r, ref: l, patchFlag: s } = e,
    i = t
      ? (function (...e) {
          const t = b({}, e[0])
          for (let n = 1; n < e.length; n++) {
            const r = e[n]
            for (const e in r)
              if ('class' === e)
                t.class !== r.class && (t.class = a([t.class, r.class]))
              else if ('style' === e) t.style = o([t.style, r.style])
              else if (h(e)) {
                const n = t[e],
                  o = r[e]
                n !== o && (t[e] = n ? [].concat(n, r[e]) : o)
              } else '' !== e && (t[e] = r[e])
          }
          return t
        })(r || {}, t)
      : r
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: i,
    key: i && Gn(i),
    ref:
      t && t.ref ? (n && l ? (w(l) ? l.concat(qn(t)) : [l, qn(t)]) : qn(t)) : l,
    scopeId: e.scopeId,
    children: e.children,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== jn ? (-1 === s ? 16 : 16 | s) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Jn(e.ssContent),
    ssFallback: e.ssFallback && Jn(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  }
}
function Zn(e = ' ', t = 0) {
  return Kn($n, null, e, t)
}
function Qn(e) {
  return null == e || 'boolean' == typeof e
    ? Kn(Rn)
    : w(e)
    ? Kn(jn, null, e)
    : 'object' == typeof e
    ? null === e.el
      ? e
      : Jn(e)
    : Kn($n, null, String(e))
}
function Xn(e) {
  return null === e.el ? e : Jn(e)
}
function eo(e, t) {
  let n = 0
  const { shapeFlag: o } = e
  if (null == t) t = null
  else if (w(t)) n = 16
  else if ('object' == typeof t) {
    if (1 & o || 64 & o) {
      const n = t.default
      return void (n && (n._c && Vt(1), eo(e, n()), n._c && Vt(-1)))
    }
    {
      n = 32
      const o = t._
      o || zn in t
        ? 3 === o &&
          Ct &&
          (1024 & Ct.vnode.patchFlag
            ? ((t._ = 2), (e.patchFlag |= 1024))
            : (t._ = 1))
        : (t._ctx = Ct)
    }
  } else
    I(t)
      ? ((t = { default: t, _ctx: Ct }), (n = 32))
      : ((t = String(t)), 64 & o ? ((n = 16), (t = [Zn(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function to(e, t, n = !1) {
  const o = vo || Ct
  if (o) {
    const r =
      null == o.parent
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
    if (r && e in r) return r[e]
    if (arguments.length > 1) return n && I(t) ? t() : t
  }
}
let no = !1
function oo(e, t, n = [], o = [], r = [], l = !1) {
  const {
      mixins: s,
      extends: a,
      data: i,
      computed: c,
      methods: u,
      watch: f,
      provide: d,
      inject: _,
      components: g,
      directives: h,
      beforeMount: v,
      mounted: y,
      beforeUpdate: k,
      updated: F,
      activated: O,
      deactivated: L,
      beforeDestroy: T,
      beforeUnmount: x,
      destroyed: E,
      unmounted: P,
      render: C,
      renderTracked: N,
      renderTriggered: M,
      errorCaptured: j,
      expose: $
    } = t,
    R = e.proxy,
    W = e.ctx,
    A = e.appContext.mixins
  if (
    (l && C && e.render === m && (e.render = C),
    l ||
      ((no = !0),
      ro('beforeCreate', 'bc', t, e, A),
      (no = !1),
      ao(e, A, n, o, r)),
    a && oo(e, a, n, o, r, !0),
    s && ao(e, s, n, o, r),
    _)
  )
    if (w(_))
      for (let e = 0; e < _.length; e++) {
        const t = _[e]
        W[t] = to(t)
      }
    else
      for (const e in _) {
        const t = _[e]
        S(t) ? (W[e] = to(t.from || e, t.default, !0)) : (W[e] = to(t))
      }
  if (u)
    for (const e in u) {
      const t = u[e]
      I(t) && (W[e] = t.bind(R))
    }
  if (
    (l
      ? i && n.push(i)
      : (n.length && n.forEach(t => io(e, t, R)), i && io(e, i, R)),
    c)
  )
    for (const e in c) {
      const t = c[e],
        n = Lo({
          get: I(t) ? t.bind(R, R) : I(t.get) ? t.get.bind(R, R) : m,
          set: !I(t) && I(t.set) ? t.set.bind(R) : m
        })
      Object.defineProperty(W, e, {
        enumerable: !0,
        configurable: !0,
        get: () => n.value,
        set: e => (n.value = e)
      })
    }
  var D
  if (
    (f && o.push(f),
    !l &&
      o.length &&
      o.forEach(e => {
        for (const t in e) co(e[t], W, R, t)
      }),
    d && r.push(d),
    !l &&
      r.length &&
      r.forEach(e => {
        const t = I(e) ? e.call(R) : e
        Reflect.ownKeys(t).forEach(e => {
          !(function (e, t) {
            if (vo) {
              let n = vo.provides
              const o = vo.parent && vo.parent.provides
              o === n && (n = vo.provides = Object.create(o)), (n[e] = t)
            }
          })(e, t[e])
        })
      }),
    l &&
      (g && b(e.components || (e.components = b({}, e.type.components)), g),
      h && b(e.directives || (e.directives = b({}, e.type.directives)), h)),
    l || ro('created', 'c', t, e, A),
    v && Qt(v.bind(R)),
    y && Xt(y.bind(R)),
    k && en(k.bind(R)),
    F && tn(F.bind(R)),
    O && dn(O.bind(R), 'a', D),
    L &&
      (function (e, t) {
        dn(e, 'da', t)
      })(L.bind(R)),
    j &&
      ((e, t = vo) => {
        Jt('ec', e, t)
      })(j.bind(R)),
    N && ln(N.bind(R)),
    M && rn(M.bind(R)),
    x && nn(x.bind(R)),
    P && on(P.bind(R)),
    w($) && !l)
  )
    if ($.length) {
      const t = e.exposed || (e.exposed = nt({}))
      $.forEach(e => {
        t[e] = (function (e, t) {
          return Qe(e[t]) ? e[t] : new ot(e, t)
        })(R, e)
      })
    } else e.exposed || (e.exposed = p)
}
function ro(e, t, n, o, r) {
  so(e, t, r, o)
  const { extends: l, mixins: s } = n
  l && lo(e, t, l, o), s && so(e, t, s, o)
  const a = n[e]
  a && st(a.bind(o.proxy), o, t)
}
function lo(e, t, n, o) {
  n.extends && lo(e, t, n.extends, o)
  const r = n[e]
  r && st(r.bind(o.proxy), o, t)
}
function so(e, t, n, o) {
  for (let r = 0; r < n.length; r++) {
    const l = n[r].mixins
    l && so(e, t, l, o)
    const s = n[r][e]
    s && st(s.bind(o.proxy), o, t)
  }
}
function ao(e, t, n, o, r) {
  for (let l = 0; l < t.length; l++) oo(e, t[l], n, o, r, !0)
}
function io(e, t, n) {
  const o = t.call(n, n)
  S(o) && (e.data === p ? (e.data = Be(o)) : b(e.data, o))
}
function co(e, t, n, o) {
  const r = o.includes('.')
    ? (function (e, t) {
        const n = t.split('.')
        return () => {
          let t = e
          for (let e = 0; e < n.length && t; e++) t = t[n[e]]
          return t
        }
      })(n, o)
    : () => n[o]
  if (x(e)) {
    const n = t[e]
    I(n) && an(r, n)
  } else if (I(e)) an(r, e.bind(n))
  else if (S(e))
    if (w(e)) e.forEach(e => co(e, t, n, o))
    else {
      const o = I(e.handler) ? e.handler.bind(n) : t[e.handler]
      I(o) && an(r, o, e)
    }
}
function uo(e, t, n) {
  const o = n.appContext.config.optionMergeStrategies,
    { mixins: r, extends: l } = t
  l && uo(e, l, n), r && r.forEach(t => uo(e, t, n))
  for (const r in t)
    o && F(o, r) ? (e[r] = o[r](e[r], t[r], n.proxy, r)) : (e[r] = t[r])
}
const fo = e => e && (e.proxy ? e.proxy : fo(e.parent)),
  po = b(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => fo(e.parent),
    $root: e => e.root && e.root.proxy,
    $emit: e => e.emit,
    $options: e =>
      (function (e) {
        const t = e.type,
          { __merged: n, mixins: o, extends: r } = t
        if (n) return n
        const l = e.appContext.mixins
        if (!l.length && !o && !r) return t
        const s = {}
        return l.forEach(t => uo(s, t, e)), uo(s, t, e), (t.__merged = s)
      })(e),
    $forceUpdate: e => () => Ft(e.update),
    $nextTick: e => kt.bind(e.proxy),
    $watch: e => un.bind(e)
  }),
  mo = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: o,
        data: r,
        props: l,
        accessCache: s,
        type: a,
        appContext: i
      } = e
      if ('__v_skip' === t) return !0
      let c
      if ('$' !== t[0]) {
        const a = s[t]
        if (void 0 !== a)
          switch (a) {
            case 0:
              return o[t]
            case 1:
              return r[t]
            case 3:
              return n[t]
            case 2:
              return l[t]
          }
        else {
          if (o !== p && F(o, t)) return (s[t] = 0), o[t]
          if (r !== p && F(r, t)) return (s[t] = 1), r[t]
          if ((c = e.propsOptions[0]) && F(c, t)) return (s[t] = 2), l[t]
          if (n !== p && F(n, t)) return (s[t] = 3), n[t]
          no || (s[t] = 4)
        }
      }
      const u = po[t]
      let f, d
      return u
        ? ('$attrs' === t && ae(e, 0, t), u(e))
        : (f = a.__cssModules) && (f = f[t])
        ? f
        : n !== p && F(n, t)
        ? ((s[t] = 3), n[t])
        : ((d = i.config.globalProperties), F(d, t) ? d[t] : void 0)
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: r, ctx: l } = e
      if (r !== p && F(r, t)) r[t] = n
      else if (o !== p && F(o, t)) o[t] = n
      else if (t in e.props) return !1
      return ('$' !== t[0] || !(t.slice(1) in e)) && ((l[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: o,
          appContext: r,
          propsOptions: l
        }
      },
      s
    ) {
      let a
      return (
        void 0 !== n[s] ||
        (e !== p && F(e, s)) ||
        (t !== p && F(t, s)) ||
        ((a = l[0]) && F(a, s)) ||
        F(o, s) ||
        F(po, s) ||
        F(r.config.globalProperties, s)
      )
    }
  },
  _o = b({}, mo, {
    get(e, t) {
      if (t !== Symbol.unscopables) return mo.get(e, t, e)
    },
    has: (e, n) => '_' !== n[0] && !t(n)
  }),
  go = Fn()
let ho = 0
let vo = null
const bo = () => vo || Ct,
  yo = e => {
    vo = e
  }
let ko = !1
function Fo(e, t, n) {
  I(t) ? (e.render = t) : S(t) && (e.setupState = nt(t)), wo(e)
}
function wo(e, t) {
  const n = e.type
  e.render ||
    ((e.render = n.render || m),
    e.render._rc && (e.withProxy = new Proxy(e.ctx, _o))),
    (vo = e),
    le(),
    oo(e, n),
    se(),
    (vo = null)
}
function Oo(e, t = vo) {
  t && (t.effects || (t.effects = [])).push(e)
}
function Lo(e) {
  const t = (function (e) {
    let t, n
    return (
      I(e) ? ((t = e), (n = m)) : ((t = e.get), (n = e.set)),
      new rt(t, n, I(e) || !e.set)
    )
  })(e)
  return Oo(t.effect), t
}
function To(e, t, n) {
  const o = arguments.length
  return 2 === o
    ? S(t) && !w(t)
      ? Bn(t)
        ? Kn(e, null, [t])
        : Kn(e, t)
      : Kn(e, null, t)
    : (o > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : 3 === o && Bn(n) && (n = [n]),
      Kn(e, t, n))
}
const Io = '3.0.4',
  xo = 'http://www.w3.org/2000/svg',
  Eo = 'undefined' != typeof document ? document : null
let So, Po
const Co = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null)
  },
  remove: e => {
    const t = e.parentNode
    t && t.removeChild(e)
  },
  createElement: (e, t, n) =>
    t ? Eo.createElementNS(xo, e) : Eo.createElement(e, n ? { is: n } : void 0),
  createText: e => Eo.createTextNode(e),
  createComment: e => Eo.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t
  },
  setElementText: (e, t) => {
    e.textContent = t
  },
  parentNode: e => e.parentNode,
  nextSibling: e => e.nextSibling,
  querySelector: e => Eo.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, '')
  },
  cloneNode: e => e.cloneNode(!0),
  insertStaticContent(e, t, n, o) {
    const r = o
      ? Po || (Po = Eo.createElementNS(xo, 'svg'))
      : So || (So = Eo.createElement('div'))
    r.innerHTML = e
    const l = r.firstChild
    let s = l,
      a = s
    for (; s; ) (a = s), Co.insert(s, t, n), (s = r.firstChild)
    return [l, a]
  }
}
const No = /\s*!important$/
function Mo(e, t, n) {
  if (w(n)) n.forEach(n => Mo(e, t, n))
  else if (t.startsWith('--')) e.setProperty(t, n)
  else {
    const o = (function (e, t) {
      const n = $o[t]
      if (n) return n
      let o = A(t)
      if ('filter' !== o && o in e) return ($o[t] = o)
      o = U(o)
      for (let n = 0; n < jo.length; n++) {
        const r = jo[n] + o
        if (r in e) return ($o[t] = r)
      }
      return t
    })(e, t)
    No.test(n)
      ? e.setProperty(V(o), n.replace(No, ''), 'important')
      : (e[o] = n)
  }
}
const jo = ['Webkit', 'Moz', 'ms'],
  $o = {}
const Ro = 'http://www.w3.org/1999/xlink'
let Wo = Date.now
'undefined' != typeof document &&
  Wo() > document.createEvent('Event').timeStamp &&
  (Wo = () => performance.now())
let Ao = 0
const Do = Promise.resolve(),
  Vo = () => {
    Ao = 0
  }
function Uo(e, t, n, o) {
  e.addEventListener(t, n, o)
}
function Ho(e, t, n, o, r = null) {
  const l = e._vei || (e._vei = {}),
    s = l[t]
  if (o && s) s.value = o
  else {
    const [n, a] = (function (e) {
      let t
      if (Bo.test(e)) {
        let n
        for (t = {}; (n = e.match(Bo)); )
          (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0)
      }
      return [e.slice(2).toLowerCase(), t]
    })(t)
    if (o) {
      Uo(
        e,
        n,
        (l[t] = (function (e, t) {
          const n = e => {
            ;(e.timeStamp || Wo()) >= n.attached - 1 &&
              st(
                (function (e, t) {
                  if (w(t)) {
                    const n = e.stopImmediatePropagation
                    return (
                      (e.stopImmediatePropagation = () => {
                        n.call(e), (e._stopped = !0)
                      }),
                      t.map(e => t => !t._stopped && e(t))
                    )
                  }
                  return t
                })(e, n.value),
                t,
                5,
                [e]
              )
          }
          return (
            (n.value = e),
            (n.attached = (() => Ao || (Do.then(Vo), (Ao = Wo())))()),
            n
          )
        })(o, r)),
        a
      )
    } else
      s &&
        (!(function (e, t, n, o) {
          e.removeEventListener(t, n, o)
        })(e, n, s, a),
        (l[t] = void 0))
  }
}
const Bo = /(?:Once|Passive|Capture)$/
const Yo = /^on[a-z]/
const zo = e => {
    const t = e.props['onUpdate:modelValue']
    return w(t) ? e => Y(t, e) : t
  },
  Go = {
    created(e, { value: t, modifiers: { number: n } }, o) {
      const r = L(t)
      Uo(e, 'change', () => {
        const t = Array.prototype.filter
          .call(e.options, e => e.selected)
          .map(e => (n ? G(Ko(e)) : Ko(e)))
        e._assign(e.multiple ? (r ? new Set(t) : t) : t[0])
      }),
        (e._assign = zo(o))
    },
    mounted(e, { value: t }) {
      qo(e, t)
    },
    beforeUpdate(e, t, n) {
      e._assign = zo(n)
    },
    updated(e, { value: t }) {
      qo(e, t)
    }
  }
function qo(e, t) {
  const n = e.multiple
  if (!n || w(t) || L(t)) {
    for (let o = 0, r = e.options.length; o < r; o++) {
      const r = e.options[o],
        l = Ko(r)
      if (n) w(t) ? (r.selected = c(t, l) > -1) : (r.selected = t.has(l))
      else if (i(Ko(r), t)) return void (e.selectedIndex = o)
    }
    n || (e.selectedIndex = -1)
  }
}
function Ko(e) {
  return '_value' in e ? e._value : e.value
}
const Jo = b(
  {
    patchProp: (e, t, o, r, l = !1, s, a, i, c) => {
      switch (t) {
        case 'class':
          !(function (e, t, n) {
            if ((null == t && (t = ''), n)) e.setAttribute('class', t)
            else {
              const n = e._vtc
              n && (t = (t ? [t, ...n] : [...n]).join(' ')), (e.className = t)
            }
          })(e, r, l)
          break
        case 'style':
          !(function (e, t, n) {
            const o = e.style
            if (n)
              if (x(n)) t !== n && (o.cssText = n)
              else {
                for (const e in n) Mo(o, e, n[e])
                if (t && !x(t)) for (const e in t) null == n[e] && Mo(o, e, '')
              }
            else e.removeAttribute('style')
          })(e, o, r)
          break
        default:
          h(t)
            ? v(t) || Ho(e, t, 0, r, a)
            : (function (e, t, n, o) {
                if (o)
                  return 'innerHTML' === t || !!(t in e && Yo.test(t) && I(n))
                if ('spellcheck' === t || 'draggable' === t) return !1
                if ('form' === t && 'string' == typeof n) return !1
                if ('list' === t && 'INPUT' === e.tagName) return !1
                if (Yo.test(t) && x(n)) return !1
                return t in e
              })(e, t, r, l)
            ? (function (e, t, n, o, r, l, s) {
                if ('innerHTML' === t || 'textContent' === t)
                  return o && s(o, r, l), void (e[t] = null == n ? '' : n)
                if ('value' !== t || 'PROGRESS' === e.tagName) {
                  if ('' === n || null == n) {
                    const o = typeof e[t]
                    if ('' === n && 'boolean' === o) return void (e[t] = !0)
                    if (null == n && 'string' === o)
                      return (e[t] = ''), void e.removeAttribute(t)
                    if ('number' === o)
                      return (e[t] = 0), void e.removeAttribute(t)
                  }
                  try {
                    e[t] = n
                  } catch (e) {}
                } else {
                  e._value = n
                  const t = null == n ? '' : n
                  e.value !== t && (e.value = t)
                }
              })(e, t, r, s, a, i, c)
            : ('true-value' === t
                ? (e._trueValue = r)
                : 'false-value' === t && (e._falseValue = r),
              (function (e, t, o, r) {
                if (r && t.startsWith('xlink:'))
                  null == o
                    ? e.removeAttributeNS(Ro, t.slice(6, t.length))
                    : e.setAttributeNS(Ro, t, o)
                else {
                  const r = n(t)
                  null == o || (r && !1 === o)
                    ? e.removeAttribute(t)
                    : e.setAttribute(t, r ? '' : o)
                }
              })(e, t, r, l))
      }
    },
    forcePatchProp: (e, t) => 'value' === t
  },
  Co
)
let Zo
/*!
 * @intlify/shared v9.0.0-beta.15
 * (c) 2020 kazuya kawaguchi
 * Released under the MIT License.
 */
const Qo = 'function' == typeof Symbol && 'symbol' == typeof Symbol.toStringTag,
  Xo = e => (Qo ? Symbol(e) : e),
  er = e =>
    JSON.stringify(e)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/\u0027/g, '\\u0027'),
  tr = e => 'number' == typeof e && isFinite(e),
  nr = e => '[object RegExp]' === mr(e),
  or = e => _r(e) && 0 === Object.keys(e).length
function rr(e, t) {
  'undefined' != typeof console &&
    (console.warn('[intlify] ' + e), t && console.warn(t.stack))
}
let lr
const sr = () =>
  lr ||
  (lr =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof self
      ? self
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : {})
function ar(e) {
  return e
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
const ir = Array.isArray,
  cr = e => 'function' == typeof e,
  ur = e => 'string' == typeof e,
  fr = e => 'boolean' == typeof e,
  pr = e => null !== e && 'object' == typeof e,
  dr = Object.prototype.toString,
  mr = e => dr.call(e),
  _r = e => '[object Object]' === mr(e)
var gr =
  'undefined' != typeof globalThis
    ? globalThis
    : 'undefined' != typeof window
    ? window
    : 'undefined' != typeof global
    ? global
    : 'undefined' != typeof self
    ? self
    : {}
function hr(e, t, n) {
  return (
    e(
      (n = {
        path: t,
        exports: {},
        require: function (e, t) {
          return (function () {
            throw new Error(
              'Dynamic requires are not currently supported by @rollup/plugin-commonjs'
            )
          })(null == t && n.path)
        }
      }),
      n.exports
    ),
    n.exports
  )
}
var vr = hr(function (e, t) {
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.hook = t.target = t.isBrowser = void 0),
      (t.isBrowser = 'undefined' != typeof navigator),
      (t.target = t.isBrowser ? window : void 0 !== gr ? gr : {}),
      (t.hook = t.target.__VUE_DEVTOOLS_GLOBAL_HOOK__)
  }),
  br = hr(function (e, t) {
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.ApiHookEvents = void 0),
      ((t.ApiHookEvents || (t.ApiHookEvents = {})).SETUP_DEVTOOLS_PLUGIN =
        'devtools-plugin:setup')
  }),
  yr = hr(function (e, t) {
    Object.defineProperty(t, '__esModule', { value: !0 })
  }),
  kr = hr(function (e, t) {
    Object.defineProperty(t, '__esModule', { value: !0 })
  }),
  Fr = hr(function (e, t) {
    Object.defineProperty(t, '__esModule', { value: !0 })
  }),
  wr = hr(function (e, t) {
    Object.defineProperty(t, '__esModule', { value: !0 })
  }),
  Or = hr(function (e, t) {
    var n
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.Hooks = void 0),
      ((n = t.Hooks || (t.Hooks = {})).TRANSFORM_CALL = 'transformCall'),
      (n.GET_APP_RECORD_NAME = 'getAppRecordName'),
      (n.GET_APP_ROOT_INSTANCE = 'getAppRootInstance'),
      (n.REGISTER_APPLICATION = 'registerApplication'),
      (n.WALK_COMPONENT_TREE = 'walkComponentTree'),
      (n.WALK_COMPONENT_PARENTS = 'walkComponentParents'),
      (n.INSPECT_COMPONENT = 'inspectComponent'),
      (n.GET_COMPONENT_BOUNDS = 'getComponentBounds'),
      (n.GET_COMPONENT_NAME = 'getComponentName'),
      (n.GET_ELEMENT_COMPONENT = 'getElementComponent'),
      (n.GET_INSPECTOR_TREE = 'getInspectorTree'),
      (n.GET_INSPECTOR_STATE = 'getInspectorState')
  }),
  Lr = hr(function (e, t) {
    var n =
        (gr && gr.__createBinding) ||
        (Object.create
          ? function (e, t, n, o) {
              void 0 === o && (o = n),
                Object.defineProperty(e, o, {
                  enumerable: !0,
                  get: function () {
                    return t[n]
                  }
                })
            }
          : function (e, t, n, o) {
              void 0 === o && (o = n), (e[o] = t[n])
            }),
      o =
        (gr && gr.__exportStar) ||
        function (e, t) {
          for (var o in e) 'default' === o || t.hasOwnProperty(o) || n(t, e, o)
        }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      o(yr, t),
      o(kr, t),
      o(Fr, t),
      o(wr, t),
      o(Or, t)
  }),
  Tr = hr(function (e, t) {
    var n =
        (gr && gr.__createBinding) ||
        (Object.create
          ? function (e, t, n, o) {
              void 0 === o && (o = n),
                Object.defineProperty(e, o, {
                  enumerable: !0,
                  get: function () {
                    return t[n]
                  }
                })
            }
          : function (e, t, n, o) {
              void 0 === o && (o = n), (e[o] = t[n])
            }),
      o =
        (gr && gr.__exportStar) ||
        function (e, t) {
          for (var o in e) 'default' === o || t.hasOwnProperty(o) || n(t, e, o)
        }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.setupDevtoolsPlugin = void 0),
      o(Lr, t),
      (t.setupDevtoolsPlugin = function (e, t) {
        if (vr.hook) vr.hook.emit(br.ApiHookEvents.SETUP_DEVTOOLS_PLUGIN, e, t)
        else {
          ;(vr.target.__VUE_DEVTOOLS_PLUGINS__ =
            vr.target.__VUE_DEVTOOLS_PLUGINS__ || []).push({
            pluginDescriptor: e,
            setupFn: t
          })
        }
      })
  })
/*!
 * @intlify/message-resolver v9.0.0-beta.15
 * (c) 2020 kazuya kawaguchi
 * Released under the MIT License.
 */
const Ir = []
;(Ir[0] = { w: [0], i: [3, 0], '[': [4], o: [7] }),
  (Ir[1] = { w: [1], '.': [2], '[': [4], o: [7] }),
  (Ir[2] = { w: [2], i: [3, 0], 0: [3, 0] }),
  (Ir[3] = {
    i: [3, 0],
    0: [3, 0],
    w: [1, 1],
    '.': [2, 1],
    '[': [4, 1],
    o: [7, 1]
  }),
  (Ir[4] = {
    "'": [5, 0],
    '"': [6, 0],
    '[': [4, 2],
    ']': [1, 3],
    o: 8,
    l: [4, 0]
  }),
  (Ir[5] = { "'": [4, 0], o: 8, l: [5, 0] }),
  (Ir[6] = { '"': [4, 0], o: 8, l: [6, 0] })
const xr = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/
function Er(e) {
  if (null == e) return 'o'
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e
    case 95:
    case 36:
    case 45:
      return 'i'
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return 'w'
  }
  return 'i'
}
function Sr(e) {
  const t = e.trim()
  return (
    ('0' !== e.charAt(0) || !isNaN(parseInt(e))) &&
    ((n = t),
    xr.test(n)
      ? (function (e) {
          const t = e.charCodeAt(0)
          return t !== e.charCodeAt(e.length - 1) || (34 !== t && 39 !== t)
            ? e
            : e.slice(1, -1)
        })(t)
      : '*' + t)
  )
  var n
}
const Pr = new Map()
function Cr(e, t) {
  if (null === (n = e) || 'object' != typeof n) return null
  var n
  let o = Pr.get(t)
  if (
    (o ||
      ((o = (function (e) {
        const t = []
        let n,
          o,
          r,
          l,
          s,
          a,
          i,
          c = -1,
          u = 0,
          f = 0
        const p = []
        function d() {
          const t = e[c + 1]
          if ((5 === u && "'" === t) || (6 === u && '"' === t))
            return c++, (r = '\\' + t), p[0](), !0
        }
        for (
          p[0] = () => {
            void 0 === o ? (o = r) : (o += r)
          },
            p[1] = () => {
              void 0 !== o && (t.push(o), (o = void 0))
            },
            p[2] = () => {
              p[0](), f++
            },
            p[3] = () => {
              if (f > 0) f--, (u = 4), p[0]()
              else {
                if (((f = 0), void 0 === o)) return !1
                if (((o = Sr(o)), !1 === o)) return !1
                p[1]()
              }
            };
          null !== u;

        )
          if ((c++, (n = e[c]), '\\' !== n || !d())) {
            if (((l = Er(n)), (i = Ir[u]), (s = i[l] || i.l || 8), 8 === s))
              return
            if (
              ((u = s[0]),
              void 0 !== s[1] && ((a = p[s[1]]), a && ((r = n), !1 === a())))
            )
              return
            if (7 === u) return t
          }
      })(t)),
      o && Pr.set(t, o)),
    !o)
  )
    return null
  const r = o.length
  let l = e,
    s = 0
  for (; s < r; ) {
    const e = l[o[s]]
    if (void 0 === e) return null
    ;(l = e), s++
  }
  return l
}
/*!
 * @intlify/runtime v9.0.0-beta.15
 * (c) 2020 kazuya kawaguchi
 * Released under the MIT License.
 */ const Nr = e => e,
  Mr = e => '',
  jr = e => (0 === e.length ? '' : e.join('')),
  $r = e =>
    null == e
      ? ''
      : ir(e) || (_r(e) && e.toString === dr)
      ? JSON.stringify(e, null, 2)
      : String(e)
function Rr(e, t) {
  return (
    (e = Math.abs(e)),
    2 === t ? (e ? (e > 1 ? 1 : 0) : 1) : e ? Math.min(e, 2) : 0
  )
}
function Wr(e = {}) {
  const t = e.locale,
    n = (function (e) {
      const t = tr(e.pluralIndex) ? e.pluralIndex : -1
      return e.named && (tr(e.named.count) || tr(e.named.n))
        ? tr(e.named.count)
          ? e.named.count
          : tr(e.named.n)
          ? e.named.n
          : t
        : t
    })(e),
    o =
      pr(e.pluralRules) && ur(t) && cr(e.pluralRules[t])
        ? e.pluralRules[t]
        : Rr,
    r = pr(e.pluralRules) && ur(t) && cr(e.pluralRules[t]) ? Rr : void 0,
    l = e.list || [],
    s = e.named || {}
  tr(e.pluralIndex) &&
    (function (e, t) {
      t.count || (t.count = e), t.n || (t.n = e)
    })(n, s)
  function a(t) {
    const n = cr(e.messages) ? e.messages(t) : !!pr(e.messages) && e.messages[t]
    return n || (e.parent ? e.parent.message(t) : Mr)
  }
  const i =
      _r(e.processor) && cr(e.processor.normalize) ? e.processor.normalize : jr,
    c =
      _r(e.processor) && cr(e.processor.interpolate)
        ? e.processor.interpolate
        : $r,
    u = {
      list: e => l[e],
      named: e => s[e],
      plural: e => e[o(n, e.length, r)],
      linked: (t, n) => {
        const o = a(t)(u)
        return ur(n) ? ((r = n), e.modifiers ? e.modifiers[r] : Nr)(o) : o
        var r
      },
      message: a,
      type: _r(e.processor) && ur(e.processor.type) ? e.processor.type : 'text',
      interpolate: c,
      normalize: i
    }
  return u
}
/*!
 * @intlify/message-compiler v9.0.0-beta.15
 * (c) 2020 kazuya kawaguchi
 * Released under the MIT License.
 */ function Ar(e, t, n = {}) {
  const { domain: o, messages: r, args: l } = n,
    s = new SyntaxError(String(e))
  return (s.code = e), t && (s.location = t), (s.domain = o), s
}
/*!
 * @intlify/core-base v9.0.0-beta.15
 * (c) 2020 kazuya kawaguchi
 * Released under the MIT License.
 */ function Dr(e = {}) {
  const t = ur(e.locale) ? e.locale : 'en-US',
    n = e
  return {
    locale: t,
    fallbackLocale:
      ir(e.fallbackLocale) ||
      _r(e.fallbackLocale) ||
      ur(e.fallbackLocale) ||
      !1 === e.fallbackLocale
        ? e.fallbackLocale
        : t,
    messages: _r(e.messages) ? e.messages : { [t]: {} },
    datetimeFormats: _r(e.datetimeFormats) ? e.datetimeFormats : { [t]: {} },
    numberFormats: _r(e.numberFormats) ? e.numberFormats : { [t]: {} },
    modifiers: Object.assign({}, e.modifiers || {}, {
      upper: e => (ur(e) ? e.toUpperCase() : e),
      lower: e => (ur(e) ? e.toLowerCase() : e),
      capitalize: e =>
        ur(e) ? `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}` : e
    }),
    pluralRules: e.pluralRules || {},
    missing: cr(e.missing) ? e.missing : null,
    missingWarn: (!fr(e.missingWarn) && !nr(e.missingWarn)) || e.missingWarn,
    fallbackWarn:
      (!fr(e.fallbackWarn) && !nr(e.fallbackWarn)) || e.fallbackWarn,
    fallbackFormat: !!e.fallbackFormat,
    unresolving: !!e.unresolving,
    postTranslation: cr(e.postTranslation) ? e.postTranslation : null,
    processor: _r(e.processor) ? e.processor : null,
    warnHtmlMessage: !fr(e.warnHtmlMessage) || e.warnHtmlMessage,
    escapeParameter: !!e.escapeParameter,
    messageCompiler: cr(e.messageCompiler) ? e.messageCompiler : undefined,
    onWarn: cr(e.onWarn) ? e.onWarn : rr,
    __datetimeFormatters: pr(n.__datetimeFormatters)
      ? n.__datetimeFormatters
      : new Map(),
    __numberFormatters: pr(n.__numberFormatters)
      ? n.__numberFormatters
      : new Map()
  }
}
function Vr(e, t, n, o, r) {
  const { missing: l, onWarn: s } = e
  if (null !== l) {
    const o = l(e, n, t, r)
    return ur(o) ? o : t
  }
  return t
}
function Ur(e, t, n = '') {
  const o = e
  if ('' === n) return []
  o.__localeChainCache || (o.__localeChainCache = new Map())
  let r = o.__localeChainCache.get(n)
  if (!r) {
    r = []
    let e = [n]
    for (; ir(e); ) e = Hr(r, e, t)
    const l = ir(t) ? t : _r(t) ? (t.default ? t.default : null) : t
    ;(e = ur(l) ? [l] : l),
      ir(e) && Hr(r, e, !1),
      o.__localeChainCache.set(n, r)
  }
  return r
}
function Hr(e, t, n) {
  let o = !0
  for (let r = 0; r < t.length && fr(o); r++) {
    const l = t[r]
    ur(l) && (o = Br(e, t[r], n))
  }
  return o
}
function Br(e, t, n) {
  let o
  const r = t.split('-')
  do {
    ;(o = Yr(e, r.join('-'), n)), r.splice(-1, 1)
  } while (r.length && !0 === o)
  return o
}
function Yr(e, t, n) {
  let o = !1
  if (!e.includes(t) && ((o = !0), t)) {
    o = '!' !== t[t.length - 1]
    const r = t.replace(/!/g, '')
    e.push(r), (ir(n) || _r(n)) && n[r] && (o = n[r])
  }
  return o
}
function zr(e, t, n) {
  ;(e.__localeChainCache = new Map()), Ur(e, n, t)
}
function Gr(e) {
  return Ar(e, null, void 0)
}
const qr = () => '',
  Kr = e => cr(e)
function Jr(e, ...t) {
  const {
      fallbackFormat: n,
      postTranslation: o,
      unresolving: r,
      fallbackLocale: l
    } = e,
    [s, a] = Qr(...t),
    i =
      (fr(a.missingWarn) ? a.missingWarn : e.missingWarn,
      fr(a.fallbackWarn) ? a.fallbackWarn : e.fallbackWarn,
      fr(a.escapeParameter) ? a.escapeParameter : e.escapeParameter),
    c =
      ur(a.default) || fr(a.default)
        ? fr(a.default)
          ? s
          : a.default
        : n
        ? s
        : '',
    u = n || '' !== c,
    f = ur(a.locale) ? a.locale : e.locale
  i &&
    (function (e) {
      ir(e.list)
        ? (e.list = e.list.map(e => (ur(e) ? ar(e) : e)))
        : pr(e.named) &&
          Object.keys(e.named).forEach(t => {
            ur(e.named[t]) && (e.named[t] = ar(e.named[t]))
          })
    })(a)
  let [p, d, m] = (function (e, t, n, o, r, l) {
      const { messages: s, onWarn: a } = e,
        i = Ur(e, o, n)
      let c,
        u = {},
        f = null,
        p = null
      const d = 'translate'
      for (
        let n = 0;
        n < i.length &&
        ((c = p = i[n]),
        (u = s[c] || {}),
        null === (f = Cr(u, t)) && (f = u[t]),
        !ur(f) && !cr(f));
        n++
      ) {
        const n = Vr(e, t, c, 0, d)
        n !== t && (f = n)
      }
      return [f, c, u]
    })(e, s, f, l),
    _ = s
  if (
    (ur(p) || Kr(p) || (u && ((p = c), (_ = p))), (!ur(p) && !Kr(p)) || !ur(d))
  )
    return r ? -1 : s
  let g = !1
  const h = Zr(e, s, d, p, _, () => {
    g = !0
  })
  if (g) return p
  const v = (function (e, t, n) {
    return t(n)
  })(
    0,
    h,
    Wr(
      (function (e, t, n, o) {
        const { modifiers: r, pluralRules: l } = e,
          s = {
            locale: t,
            modifiers: r,
            pluralRules: l,
            messages: o => {
              const r = Cr(n, o)
              if (ur(r)) {
                let n = !1
                const l = Zr(e, o, t, r, o, () => {
                  n = !0
                })
                return n ? qr : l
              }
              return Kr(r) ? r : qr
            }
          }
        e.processor && (s.processor = e.processor)
        o.list && (s.list = o.list)
        o.named && (s.named = o.named)
        tr(o.plural) && (s.pluralIndex = o.plural)
        return s
      })(e, d, m, a)
    )
  )
  return o ? o(v) : v
}
function Zr(e, t, n, o, r, l) {
  const { messageCompiler: s, warnHtmlMessage: a } = e
  if (Kr(o)) {
    const e = o
    return (e.locale = e.locale || n), (e.key = e.key || t), e
  }
  const i = s(
    o,
    (function (e, t, n, o, r, l) {
      return {
        warnHtmlMessage: r,
        onError: e => {
          throw (l && l(e), e)
        },
        onCacheKey: e => ((e, t, n) => er({ l: e, k: t, s: n }))(t, n, e)
      }
    })(0, n, r, 0, a, l)
  )
  return (i.locale = n), (i.key = t), (i.source = o), i
}
function Qr(...e) {
  const [t, n, o] = e,
    r = {}
  if (!ur(t)) throw Gr(12)
  const l = t
  return (
    tr(n)
      ? (r.plural = n)
      : ur(n)
      ? (r.default = n)
      : _r(n) && !or(n)
      ? (r.named = n)
      : ir(n) && (r.list = n),
    tr(o)
      ? (r.plural = o)
      : ur(o)
      ? (r.default = o)
      : _r(o) && Object.assign(r, o),
    [l, r]
  )
}
function Xr(e, ...t) {
  const {
      datetimeFormats: n,
      unresolving: o,
      fallbackLocale: r,
      onWarn: l
    } = e,
    { __datetimeFormatters: s } = e,
    [a, i, c, u] = el(...t),
    f =
      (fr(c.missingWarn) ? c.missingWarn : e.missingWarn,
      fr(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn,
      !!c.part),
    p = ur(c.locale) ? c.locale : e.locale,
    d = Ur(e, r, p)
  if (!ur(a) || '' === a) return new Intl.DateTimeFormat(p).format(i)
  let m,
    _ = {},
    g = null,
    h = null
  for (
    let t = 0;
    t < d.length && ((m = h = d[t]), (_ = n[m] || {}), (g = _[a]), !_r(g));
    t++
  )
    Vr(e, a, m, 0, 'datetime format')
  if (!_r(g) || !ur(m)) return o ? -1 : a
  let v = `${m}__${a}`
  or(u) || (v = `${v}__${JSON.stringify(u)}`)
  let b = s.get(v)
  return (
    b ||
      ((b = new Intl.DateTimeFormat(m, Object.assign({}, g, u))), s.set(v, b)),
    f ? b.formatToParts(i) : b.format(i)
  )
}
function el(...e) {
  const [t, n, o, r] = e
  let l,
    s = {},
    a = {}
  if (ur(t)) {
    if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(t)) throw Gr(14)
    l = new Date(t)
    try {
      l.toISOString()
    } catch (e) {
      throw Gr(14)
    }
  } else if ('[object Date]' === mr(t)) {
    if (isNaN(t.getTime())) throw Gr(13)
    l = t
  } else {
    if (!tr(t)) throw Gr(12)
    l = t
  }
  return (
    ur(n) ? (s.key = n) : _r(n) && (s = n),
    ur(o) ? (s.locale = o) : _r(o) && (a = o),
    _r(r) && (a = r),
    [s.key || '', l, s, a]
  )
}
function tl(e, t, n) {
  const o = e
  for (const e in n) {
    const n = `${t}__${e}`
    o.__datetimeFormatters.has(n) && o.__datetimeFormatters.delete(n)
  }
}
function nl(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: l } = e,
    { __numberFormatters: s } = e,
    [a, i, c, u] = ol(...t),
    f =
      (fr(c.missingWarn) ? c.missingWarn : e.missingWarn,
      fr(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn,
      !!c.part),
    p = ur(c.locale) ? c.locale : e.locale,
    d = Ur(e, r, p)
  if (!ur(a) || '' === a) return new Intl.NumberFormat(p).format(i)
  let m,
    _ = {},
    g = null,
    h = null
  for (
    let t = 0;
    t < d.length && ((m = h = d[t]), (_ = n[m] || {}), (g = _[a]), !_r(g));
    t++
  )
    Vr(e, a, m, 0, 'number format')
  if (!_r(g) || !ur(m)) return o ? -1 : a
  let v = `${m}__${a}`
  or(u) || (v = `${v}__${JSON.stringify(u)}`)
  let b = s.get(v)
  return (
    b || ((b = new Intl.NumberFormat(m, Object.assign({}, g, u))), s.set(v, b)),
    f ? b.formatToParts(i) : b.format(i)
  )
}
function ol(...e) {
  const [t, n, o, r] = e
  let l = {},
    s = {}
  if (!tr(t)) throw Gr(12)
  const a = t
  return (
    ur(n) ? (l.key = n) : _r(n) && (l = n),
    ur(o) ? (l.locale = o) : _r(o) && (s = o),
    _r(r) && (s = r),
    [l.key || '', a, l, s]
  )
}
function rl(e, t, n) {
  const o = e
  for (const e in n) {
    const n = `${t}__${e}`
    o.__numberFormatters.has(n) && o.__numberFormatters.delete(n)
  }
}
const ll = {
    'vue-devtools-plugin-vue-i18n': 'Vue I18n devtools',
    'vue-i18n-resource-inspector': 'I18n Resources',
    'vue-i18n-compile-error': 'Vue I18n: Compile Errors',
    'vue-i18n-missing': 'Vue I18n: Missing',
    'vue-i18n-fallback': 'Vue I18n: Fallback',
    'vue-i18n-performance': 'Vue I18n: Performance'
  },
  sl = { 'vue-i18n-resource-inspector': 'Search for scopes ...' },
  al = {
    'vue-i18n-compile-error': 16711680,
    'vue-i18n-missing': 16764185,
    'vue-i18n-fallback': 16764185,
    'vue-i18n-performance': 16764185
  },
  il = {
    'compile-error': 'vue-i18n-compile-error',
    missing: 'vue-i18n-missing',
    fallback: 'vue-i18n-fallback',
    'message-resolve': 'vue-i18n-performance',
    'message-compilation': 'vue-i18n-performance',
    'message-evaluation': 'vue-i18n-performance'
  }
function cl() {
  const e = new Map()
  return {
    events: e,
    on(t, n) {
      const o = e.get(t)
      ;(o && o.push(n)) || e.set(t, [n])
    },
    off(t, n) {
      const o = e.get(t)
      o && o.splice(o.indexOf(n) >>> 0, 1)
    },
    emit(t, n) {
      ;(e.get(t) || []).slice().map(e => e(n)),
        (e.get('*') || []).slice().map(e => e(t, n))
    }
  }
}
/*!
 * vue-i18n v9.0.0-beta.15
 * (c) 2020 kazuya kawaguchi
 * Released under the MIT License.
 */ let ul
async function fl(e, t) {
  return new Promise((n, o) => {
    try {
      Tr.setupDevtoolsPlugin(
        {
          id: 'vue-devtools-plugin-vue-i18n',
          label: ll['vue-devtools-plugin-vue-i18n'],
          app: e
        },
        o => {
          ;(ul = o),
            o.on.inspectComponent(e => {
              const t = e.componentInstance
              t.vnode.el.__INTLIFY__ &&
                e.instanceData &&
                (function (e, t) {
                  const n = 'vue-i18n: composer properties'
                  e.state.push({
                    type: n,
                    key: 'locale',
                    editable: !1,
                    value: t.locale.value
                  }),
                    e.state.push({
                      type: n,
                      key: 'availableLocales',
                      editable: !1,
                      value: t.availableLocales
                    }),
                    e.state.push({
                      type: n,
                      key: 'fallbackLocale',
                      editable: !1,
                      value: t.fallbackLocale.value
                    }),
                    e.state.push({
                      type: n,
                      key: 'inheritLocale',
                      editable: !1,
                      value: t.inheritLocale
                    }),
                    e.state.push({
                      type: n,
                      key: 'messages',
                      editable: !1,
                      value: t.messages.value
                    }),
                    e.state.push({
                      type: n,
                      key: 'datetimeFormats',
                      editable: !1,
                      value: t.datetimeFormats.value
                    }),
                    e.state.push({
                      type: n,
                      key: 'numberFormats',
                      editable: !1,
                      value: t.numberFormats.value
                    })
                })(e.instanceData, t.vnode.el.__INTLIFY__)
            }),
            o.addInspector({
              id: 'vue-i18n-resource-inspector',
              label: ll['vue-i18n-resource-inspector'],
              icon: 'language',
              treeFilterPlaceholder: sl['vue-i18n-resource-inspector']
            }),
            o.on.getInspectorTree(n => {
              n.app === e &&
                'vue-i18n-resource-inspector' === n.inspectorId &&
                (function (e, t) {
                  const n = []
                  for (const [e, o] of t.__instances) {
                    const r = 'composition' === t.mode ? o : o.__composer,
                      l = e.type.name || e.type.displayName || e.type.__file
                    n.push({ id: r.id.toString(), label: `${l} Scope` })
                  }
                  e.rootNodes.push({
                    id: 'global',
                    label: 'Global Scope',
                    children: n
                  })
                })(n, t)
            }),
            o.on.getInspectorState(n => {
              n.app === e &&
                'vue-i18n-resource-inspector' === n.inspectorId &&
                (function (e, t) {
                  if ('global' === e.nodeId)
                    e.state = pl(
                      'composition' === t.mode ? t.global : t.global.__composer
                    )
                  else {
                    const n = Array.from(t.__instances.values()).find(
                      t => t.id.toString() === e.nodeId
                    )
                    if (n) {
                      const o = 'composition' === t.mode ? n : n.__composer
                      e.state = pl(o)
                    }
                  }
                })(n, t)
            }),
            o.addTimelineLayer({
              id: 'vue-i18n-compile-error',
              label: ll['vue-i18n-compile-error'],
              color: al['vue-i18n-compile-error']
            }),
            o.addTimelineLayer({
              id: 'vue-i18n-performance',
              label: ll['vue-i18n-performance'],
              color: al['vue-i18n-performance']
            }),
            o.addTimelineLayer({
              id: 'vue-i18n-missing',
              label: ll['vue-i18n-missing'],
              color: al['vue-i18n-missing']
            }),
            o.addTimelineLayer({
              id: 'vue-i18n-fallback',
              label: ll['vue-i18n-fallback'],
              color: al['vue-i18n-fallback']
            }),
            n(!0)
        }
      )
    } catch (e) {
      console.error(e), o(!1)
    }
  })
}
function pl(e) {
  const t = {},
    n = 'Locale related info',
    o = [
      { type: n, key: 'locale', editable: !1, value: e.locale.value },
      {
        type: n,
        key: 'fallbackLocale',
        editable: !1,
        value: e.fallbackLocale.value
      },
      {
        type: n,
        key: 'availableLocales',
        editable: !1,
        value: e.availableLocales
      },
      { type: n, key: 'inheritLocale', editable: !1, value: e.inheritLocale }
    ]
  t[n] = o
  const r = 'Locale messages info',
    l = [{ type: r, key: 'messages', editable: !1, value: e.messages.value }]
  t[r] = l
  const s = 'Datetime formats info',
    a = [
      {
        type: s,
        key: 'datetimeFormats',
        editable: !1,
        value: e.datetimeFormats.value
      }
    ]
  t[s] = a
  const i = 'Datetime formats info',
    c = [
      {
        type: i,
        key: 'numberFormats',
        editable: !1,
        value: e.numberFormats.value
      }
    ]
  return (t[i] = c), t
}
function dl(e, t) {
  ul &&
    ul.addTimelineEvent({
      layerId: il[e],
      event: { time: Date.now(), meta: {}, data: t || {} }
    })
}
function ml(e, ...t) {
  return Ar(e, null, void 0)
}
const _l = Xo('__transrateVNode'),
  gl = Xo('__datetimeParts'),
  hl = Xo('__numberParts'),
  vl = Xo('__enableEmitter'),
  bl = Xo('__disableEmitter')
let yl = 0
function kl(e) {
  return (t, n, o, r) => e(n, o, bo() || void 0, r)
}
function Fl(e, t) {
  const { messages: n, __i18n: o } = t,
    r = _r(n) ? n : ir(o) ? {} : { [e]: {} }
  return (
    ir(o) &&
      o.forEach(({ locale: e, resource: t }) => {
        e ? ((r[e] = r[e] || {}), Ll(t, r[e])) : Ll(t, r)
      }),
    r
  )
}
const wl = Object.prototype.hasOwnProperty
function Ol(e, t) {
  return wl.call(e, t)
}
function Ll(e, t) {
  for (const n in e)
    Ol(e, n) &&
      (pr(e[n])
        ? ((t[n] = null != t[n] ? t[n] : {}), Ll(e[n], t[n]))
        : ((t[n] = null != t[n] ? t[n] : {}), (t[n] = e[n])))
}
function Tl(e = {}) {
  const { __root: t } = e,
    n = void 0 === t
  let o = !fr(e.inheritLocale) || e.inheritLocale
  const r = Xe(t && o ? t.locale.value : ur(e.locale) ? e.locale : 'en-US'),
    l = Xe(
      t && o
        ? t.fallbackLocale.value
        : ur(e.fallbackLocale) ||
          ir(e.fallbackLocale) ||
          _r(e.fallbackLocale) ||
          !1 === e.fallbackLocale
        ? e.fallbackLocale
        : r.value
    ),
    s = Xe(Fl(r.value, e)),
    a = Xe(_r(e.datetimeFormats) ? e.datetimeFormats : { [r.value]: {} }),
    i = Xe(_r(e.numberFormats) ? e.numberFormats : { [r.value]: {} })
  let c = t
      ? t.missingWarn
      : (!fr(e.missingWarn) && !nr(e.missingWarn)) || e.missingWarn,
    u = t
      ? t.fallbackWarn
      : (!fr(e.fallbackWarn) && !nr(e.fallbackWarn)) || e.fallbackWarn,
    f = !fr(e.fallbackRoot) || e.fallbackRoot,
    p = !!e.fallbackFormat,
    d = cr(e.missing) ? e.missing : null,
    m = cr(e.missing) ? kl(e.missing) : null,
    _ = cr(e.postTranslation) ? e.postTranslation : null,
    g = !fr(e.warnHtmlMessage) || e.warnHtmlMessage,
    h = !!e.escapeParameter
  const v = t ? t.modifiers : _r(e.modifiers) ? e.modifiers : {},
    b = e.pluralRules
  let y
  function k() {
    return Dr({
      locale: r.value,
      fallbackLocale: l.value,
      messages: s.value,
      datetimeFormats: a.value,
      numberFormats: i.value,
      modifiers: v,
      pluralRules: b,
      missing: null === m ? void 0 : m,
      missingWarn: c,
      fallbackWarn: u,
      fallbackFormat: p,
      unresolving: !0,
      postTranslation: null === _ ? void 0 : _,
      warnHtmlMessage: g,
      escapeParameter: h,
      __datetimeFormatters: _r(y) ? y.__datetimeFormatters : void 0,
      __numberFormatters: _r(y) ? y.__numberFormatters : void 0,
      __emitter: _r(y) ? y.__emitter : void 0
    })
  }
  ;(y = k()), zr(y, r.value, l.value)
  /*!
   * define properties
   */
  const F = Lo({
      get: () => r.value,
      set: e => {
        ;(r.value = e), (y.locale = r.value)
      }
    }),
    w = Lo({
      get: () => l.value,
      set: e => {
        ;(l.value = e), (y.fallbackLocale = l.value), zr(y, r.value, e)
      }
    }),
    O = Lo(() => s.value),
    L = Lo(() => a.value),
    T = Lo(() => i.value)
  function I(e, n, o, r, l, s) {
    const a = e(k())
    if (tr(a) && -1 === a) {
      const e = n()
      return f && t ? r(t) : l(e)
    }
    if (s(a)) return a
    throw ml(12)
  }
  const x = {
    normalize: function (e) {
      return e.map(e => (ur(e) ? Kn($n, null, e, 0) : e))
    },
    interpolate: e => e,
    type: 'vnode'
  }
  function E(e) {
    return s.value[e] || {}
  }
  yl++,
    t &&
      (an(t.locale, e => {
        o && ((r.value = e), (y.locale = e), zr(y, r.value, l.value))
      }),
      an(t.fallbackLocale, e => {
        o && ((l.value = e), (y.fallbackLocale = e), zr(y, r.value, l.value))
      }))
  return {
    id: yl,
    locale: F,
    fallbackLocale: w,
    get inheritLocale() {
      return o
    },
    set inheritLocale(e) {
      ;(o = e),
        e &&
          t &&
          ((r.value = t.locale.value),
          (l.value = t.fallbackLocale.value),
          zr(y, r.value, l.value))
    },
    get availableLocales() {
      return Object.keys(s.value).sort()
    },
    messages: O,
    datetimeFormats: L,
    numberFormats: T,
    get modifiers() {
      return v
    },
    get pluralRules() {
      return b || {}
    },
    get isGlobal() {
      return n
    },
    get missingWarn() {
      return c
    },
    set missingWarn(e) {
      ;(c = e), (y.missingWarn = c)
    },
    get fallbackWarn() {
      return u
    },
    set fallbackWarn(e) {
      ;(u = e), (y.fallbackWarn = u)
    },
    get fallbackRoot() {
      return f
    },
    set fallbackRoot(e) {
      f = e
    },
    get fallbackFormat() {
      return p
    },
    set fallbackFormat(e) {
      ;(p = e), (y.fallbackFormat = p)
    },
    get warnHtmlMessage() {
      return g
    },
    set warnHtmlMessage(e) {
      ;(g = e), (y.warnHtmlMessage = e)
    },
    get escapeParameter() {
      return h
    },
    set escapeParameter(e) {
      ;(h = e), (y.escapeParameter = e)
    },
    t: function (...e) {
      return I(
        t => Jr(t, ...e),
        () => Qr(...e)[0],
        0,
        t => t.t(...e),
        e => e,
        e => ur(e)
      )
    },
    d: function (...e) {
      return I(
        t => Xr(t, ...e),
        () => el(...e)[0],
        0,
        t => t.d(...e),
        () => '',
        e => ur(e)
      )
    },
    n: function (...e) {
      return I(
        t => nl(t, ...e),
        () => ol(...e)[0],
        0,
        t => t.n(...e),
        () => '',
        e => ur(e)
      )
    },
    te: function (e, t) {
      return null !== Cr(E(ur(t) ? t : r.value), e)
    },
    tm: function (e) {
      const n = Cr(s.value[r.value] || {}, e)
      return null != n ? n : (t && t.tm(e)) || {}
    },
    getLocaleMessage: E,
    setLocaleMessage: function (e, t) {
      ;(s.value[e] = t), (y.messages = s.value)
    },
    mergeLocaleMessage: function (e, t) {
      ;(s.value[e] = Object.assign(s.value[e] || {}, t)), (y.messages = s.value)
    },
    getDateTimeFormat: function (e) {
      return a.value[e] || {}
    },
    setDateTimeFormat: function (e, t) {
      ;(a.value[e] = t), (y.datetimeFormats = a.value), tl(y, e, t)
    },
    mergeDateTimeFormat: function (e, t) {
      ;(a.value[e] = Object.assign(a.value[e] || {}, t)),
        (y.datetimeFormats = a.value),
        tl(y, e, t)
    },
    getNumberFormat: function (e) {
      return i.value[e] || {}
    },
    setNumberFormat: function (e, t) {
      ;(i.value[e] = t), (y.numberFormats = i.value), rl(y, e, t)
    },
    mergeNumberFormat: function (e, t) {
      ;(i.value[e] = Object.assign(i.value[e] || {}, t)),
        (y.numberFormats = i.value),
        rl(y, e, t)
    },
    getPostTranslationHandler: function () {
      return cr(_) ? _ : null
    },
    setPostTranslationHandler: function (e) {
      ;(_ = e), (y.postTranslation = e)
    },
    getMissingHandler: function () {
      return d
    },
    setMissingHandler: function (e) {
      null !== e && (m = kl(e)), (d = e), (y.missing = m)
    },
    [_l]: function (...e) {
      return I(
        t => {
          let n
          const o = t
          try {
            ;(o.processor = x), (n = Jr(o, ...e))
          } finally {
            o.processor = null
          }
          return n
        },
        () => Qr(...e)[0],
        0,
        t => t[_l](...e),
        e => [Kn($n, null, e, 0)],
        e => ir(e)
      )
    },
    [hl]: function (...e) {
      return I(
        t => nl(t, ...e),
        () => ol(...e)[0],
        0,
        t => t[hl](...e),
        () => [],
        e => ur(e) || ir(e)
      )
    },
    [gl]: function (...e) {
      return I(
        t => Xr(t, ...e),
        () => el(...e)[0],
        0,
        t => t[gl](...e),
        () => [],
        e => ur(e) || ir(e)
      )
    }
  }
}
function Il(e = {}) {
  const t = Tl(
      (function (e) {
        const t = ur(e.locale) ? e.locale : 'en-US',
          n =
            ur(e.fallbackLocale) ||
            ir(e.fallbackLocale) ||
            _r(e.fallbackLocale) ||
            !1 === e.fallbackLocale
              ? e.fallbackLocale
              : t,
          o = cr(e.missing) ? e.missing : void 0,
          r =
            (!fr(e.silentTranslationWarn) && !nr(e.silentTranslationWarn)) ||
            !e.silentTranslationWarn,
          l =
            (!fr(e.silentFallbackWarn) && !nr(e.silentFallbackWarn)) ||
            !e.silentFallbackWarn,
          s = !fr(e.fallbackRoot) || e.fallbackRoot,
          a = !!e.formatFallbackMessages,
          i = _r(e.modifiers) ? e.modifiers : {},
          c = e.pluralizationRules,
          u = cr(e.postTranslation) ? e.postTranslation : void 0,
          f = !ur(e.warnHtmlInMessage) || 'off' !== e.warnHtmlInMessage,
          p = !!e.escapeParameterHtml,
          d = !fr(e.sync) || e.sync
        let m = e.messages
        if (_r(e.sharedMessages)) {
          const t = e.sharedMessages
          m = Object.keys(t).reduce((e, n) => {
            const o = e[n] || (e[n] = {})
            return Object.assign(o, t[n]), e
          }, m || {})
        }
        const { __i18n: _, __root: g } = e
        return {
          locale: t,
          fallbackLocale: n,
          messages: m,
          datetimeFormats: e.datetimeFormats,
          numberFormats: e.numberFormats,
          missing: o,
          missingWarn: r,
          fallbackWarn: l,
          fallbackRoot: s,
          fallbackFormat: a,
          modifiers: i,
          pluralRules: c,
          postTranslation: u,
          warnHtmlMessage: f,
          escapeParameter: p,
          inheritLocale: d,
          __i18n: _,
          __root: g
        }
      })(e)
    ),
    n = {
      id: t.id,
      get locale() {
        return t.locale.value
      },
      set locale(e) {
        t.locale.value = e
      },
      get fallbackLocale() {
        return t.fallbackLocale.value
      },
      set fallbackLocale(e) {
        t.fallbackLocale.value = e
      },
      get messages() {
        return t.messages.value
      },
      get datetimeFormats() {
        return t.datetimeFormats.value
      },
      get numberFormats() {
        return t.numberFormats.value
      },
      get availableLocales() {
        return t.availableLocales
      },
      get formatter() {
        return { interpolate: () => [] }
      },
      set formatter(e) {},
      get missing() {
        return t.getMissingHandler()
      },
      set missing(e) {
        t.setMissingHandler(e)
      },
      get silentTranslationWarn() {
        return fr(t.missingWarn) ? !t.missingWarn : t.missingWarn
      },
      set silentTranslationWarn(e) {
        t.missingWarn = fr(e) ? !e : e
      },
      get silentFallbackWarn() {
        return fr(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn
      },
      set silentFallbackWarn(e) {
        t.fallbackWarn = fr(e) ? !e : e
      },
      get modifiers() {
        return t.modifiers
      },
      get formatFallbackMessages() {
        return t.fallbackFormat
      },
      set formatFallbackMessages(e) {
        t.fallbackFormat = e
      },
      get postTranslation() {
        return t.getPostTranslationHandler()
      },
      set postTranslation(e) {
        t.setPostTranslationHandler(e)
      },
      get sync() {
        return t.inheritLocale
      },
      set sync(e) {
        t.inheritLocale = e
      },
      get warnHtmlInMessage() {
        return t.warnHtmlMessage ? 'warn' : 'off'
      },
      set warnHtmlInMessage(e) {
        t.warnHtmlMessage = 'off' !== e
      },
      get escapeParameterHtml() {
        return t.escapeParameter
      },
      set escapeParameterHtml(e) {
        t.escapeParameter = e
      },
      get preserveDirectiveContent() {
        return !0
      },
      set preserveDirectiveContent(e) {},
      get pluralizationRules() {
        return t.pluralRules || {}
      },
      __composer: t,
      t(...e) {
        const [n, o, r] = e,
          l = {}
        let s = null,
          a = null
        if (!ur(n)) throw ml(13)
        const i = n
        return (
          ur(o) ? (l.locale = o) : ir(o) ? (s = o) : _r(o) && (a = o),
          ir(r) ? (s = r) : _r(r) && (a = r),
          t.t(i, s || a || {}, l)
        )
      },
      tc(...e) {
        const [n, o, r] = e,
          l = { plural: 1 }
        let s = null,
          a = null
        if (!ur(n)) throw ml(13)
        const i = n
        return (
          ur(o)
            ? (l.locale = o)
            : tr(o)
            ? (l.plural = o)
            : ir(o)
            ? (s = o)
            : _r(o) && (a = o),
          ur(r) ? (l.locale = r) : ir(r) ? (s = r) : _r(r) && (a = r),
          t.t(i, s || a || {}, l)
        )
      },
      te: (e, n) => t.te(e, n),
      tm: e => t.tm(e),
      getLocaleMessage: e => t.getLocaleMessage(e),
      setLocaleMessage(e, n) {
        t.setLocaleMessage(e, n)
      },
      mergeLocaleMessage(e, n) {
        t.mergeLocaleMessage(e, n)
      },
      d: (...e) => t.d(...e),
      getDateTimeFormat: e => t.getDateTimeFormat(e),
      setDateTimeFormat(e, n) {
        t.setDateTimeFormat(e, n)
      },
      mergeDateTimeFormat(e, n) {
        t.mergeDateTimeFormat(e, n)
      },
      n: (...e) => t.n(...e),
      getNumberFormat: e => t.getNumberFormat(e),
      setNumberFormat(e, n) {
        t.setNumberFormat(e, n)
      },
      mergeNumberFormat(e, n) {
        t.mergeNumberFormat(e, n)
      },
      getChoiceIndex: (e, t) => -1,
      __onComponentInstanceCreated(t) {
        const { componentInstanceCreatedListener: o } = e
        o && o(t, n)
      }
    }
  return n
}
const xl = {
    tag: { type: [String, Object] },
    locale: { type: String },
    scope: {
      type: String,
      validator: e => 'parent' === e || 'global' === e,
      default: 'parent'
    }
  },
  El = {
    name: 'i18n-t',
    props: {
      ...xl,
      keypath: { type: String, required: !0 },
      plural: { type: [Number, String], validator: e => tr(e) || !isNaN(e) }
    },
    setup(e, t) {
      const { slots: n, attrs: o } = t,
        r = Rl({ useScope: e.scope }),
        l = Object.keys(n).filter(e => '_' !== e)
      return () => {
        const n = {}
        e.locale && (n.locale = e.locale),
          void 0 !== e.plural &&
            (n.plural = ur(e.plural) ? +e.plural : e.plural)
        const s = (function ({ slots: e }, t) {
            return 1 === t.length && 'default' === t[0]
              ? e.default
                ? e.default()
                : []
              : t.reduce((t, n) => {
                  const o = e[n]
                  return o && (t[n] = o()), t
                }, {})
          })(t, l),
          a = r[_l](e.keypath, s, n)
        return ur(e.tag) || pr(e.tag)
          ? To(e.tag, { ...o }, a)
          : To(jn, { ...o }, a)
      }
    }
  }
function Sl(e, t, n, o) {
  const { slots: r, attrs: l } = t
  return () => {
    const t = { part: !0 }
    let s = {}
    e.locale && (t.locale = e.locale),
      ur(e.format)
        ? (t.key = e.format)
        : pr(e.format) &&
          (ur(e.format.key) && (t.key = e.format.key),
          (s = Object.keys(e.format).reduce(
            (t, o) =>
              n.includes(o) ? Object.assign({}, t, { [o]: e.format[o] }) : t,
            {}
          )))
    const a = o(e.value, t, s)
    let i = [t.key]
    return (
      ir(a)
        ? (i = a.map((e, t) => {
            const n = r[e.type]
            return n ? n({ [e.type]: e.value, index: t, parts: a }) : [e.value]
          }))
        : ur(a) && (i = [a]),
      ur(e.tag) || pr(e.tag) ? To(e.tag, { ...l }, i) : To(jn, { ...l }, i)
    )
  }
}
const Pl = [
    'localeMatcher',
    'style',
    'unit',
    'unitDisplay',
    'currency',
    'currencyDisplay',
    'useGrouping',
    'numberingSystem',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    'notation',
    'formatMatcher'
  ],
  Cl = {
    name: 'i18n-n',
    props: {
      ...xl,
      value: { type: Number, required: !0 },
      format: { type: [String, Object] }
    },
    setup(e, t) {
      const n = Rl({ useScope: 'parent' })
      return Sl(e, t, Pl, (...e) => n[hl](...e))
    }
  },
  Nl = [
    'dateStyle',
    'timeStyle',
    'fractionalSecondDigits',
    'calendar',
    'dayPeriod',
    'numberingSystem',
    'localeMatcher',
    'timeZone',
    'hour12',
    'hourCycle',
    'formatMatcher',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName'
  ],
  Ml = {
    name: 'i18n-d',
    props: {
      ...xl,
      value: { type: [Number, Date], required: !0 },
      format: { type: [String, Object] }
    },
    setup(e, t) {
      const n = Rl({ useScope: 'parent' })
      return Sl(e, t, Nl, (...e) => n[gl](...e))
    }
  }
function jl(e) {
  const t = (t, { instance: n, value: o, modifiers: r }) => {
    if (!n || !n.$) throw ml(20)
    const l = (function (e, t) {
        const n = e
        if ('composition' === e.mode) return n.__getInstance(t) || e.global
        {
          const o = n.__getInstance(t)
          return null != o ? o.__composer : e.global.__composer
        }
      })(e, n.$),
      s = (function (e) {
        if (ur(e)) return { path: e }
        if (_r(e)) {
          if (!('path' in e)) throw ml(17)
          return e
        }
        throw ml(18)
      })(o)
    t.textContent = l.t(
      ...(function (e) {
        const { path: t, locale: n, args: o, choice: r, plural: l } = e,
          s = {},
          a = o || {}
        ur(n) && (s.locale = n)
        tr(r) && (s.plural = r)
        tr(l) && (s.plural = l)
        return [t, a, s]
      })(s)
    )
  }
  return { beforeMount: t, beforeUpdate: t }
}
function $l(e, t) {
  ;(e.locale = t.locale || e.locale),
    (e.fallbackLocale = t.fallbackLocale || e.fallbackLocale),
    (e.missing = t.missing || e.missing),
    (e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn),
    (e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn),
    (e.formatFallbackMessages =
      t.formatFallbackMessages || e.formatFallbackMessages),
    (e.postTranslation = t.postTranslation || e.postTranslation),
    (e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage),
    (e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml),
    (e.sync = t.sync || e.sync)
  const n = Fl(e.locale, { messages: t.messages, __i18n: t.__i18n })
  return (
    Object.keys(n).forEach(t => e.mergeLocaleMessage(t, n[t])),
    t.datetimeFormats &&
      Object.keys(t.datetimeFormats).forEach(n =>
        e.mergeDateTimeFormat(n, t.datetimeFormats[n])
      ),
    t.numberFormats &&
      Object.keys(t.numberFormats).forEach(n =>
        e.mergeNumberFormat(n, t.numberFormats[n])
      ),
    e
  )
}
function Rl(e = {}) {
  const t = bo()
  if (null == t) throw ml(14)
  if (!t.appContext.app.__VUE_I18N_SYMBOL__) throw ml(15)
  const n = to(t.appContext.app.__VUE_I18N_SYMBOL__)
  if (!n) throw ml(20)
  const o = 'composition' === n.mode ? n.global : n.global.__composer,
    r = or(e)
      ? '__i18n' in t.type
        ? 'local'
        : 'global'
      : e.useScope
      ? e.useScope
      : 'local'
  if ('global' === r) {
    let n = pr(e.messages) ? e.messages : {}
    '__i18nGlobal' in t.type &&
      (n = Fl(o.locale.value, { messages: n, __i18n: t.type.__i18nGlobal }))
    const r = Object.keys(n)
    if (
      (r.length &&
        r.forEach(e => {
          o.mergeLocaleMessage(e, n[e])
        }),
      pr(e.datetimeFormats))
    ) {
      const t = Object.keys(e.datetimeFormats)
      t.length &&
        t.forEach(t => {
          o.mergeDateTimeFormat(t, e.datetimeFormats[t])
        })
    }
    if (pr(e.numberFormats)) {
      const t = Object.keys(e.numberFormats)
      t.length &&
        t.forEach(t => {
          o.mergeNumberFormat(t, e.numberFormats[t])
        })
    }
    return o
  }
  if ('parent' === r) {
    let e = (function (e, t) {
      let n = null
      const o = t.root
      let r = t.parent
      for (; null != r; ) {
        const t = e
        if ('composition' === e.mode) n = t.__getInstance(r)
        else {
          const e = t.__getInstance(r)
          null != e && (n = e.__composer)
        }
        if (null != n) break
        if (o === r) break
        r = r.parent
      }
      return n
    })(n, t)
    return null == e && (e = o), e
  }
  if ('legacy' === n.mode) throw ml(16)
  const l = n
  let s = l.__getInstance(t)
  if (null == s) {
    const n = t.type,
      r = { ...e }
    n.__i18n && (r.__i18n = n.__i18n),
      o && (r.__root = o),
      (s = Tl(r)),
      (function (e, t, n) {
        let o = null
        Xt(() => {
          if (__INTLIFY_PROD_DEVTOOLS__ && t.vnode.el) {
            ;(t.vnode.el.__INTLIFY__ = n), (o = cl())
            const e = n
            e[vl] && e[vl](o), o.on('*', dl)
          }
        }, t),
          on(() => {
            if (
              __INTLIFY_PROD_DEVTOOLS__ &&
              t.vnode.el &&
              t.vnode.el.__INTLIFY__
            ) {
              o && o.off('*', dl)
              const e = n
              e[bl] && e[bl](), delete t.vnode.el.__INTLIFY__
            }
            e.__deleteInstance(t)
          }, t)
      })(l, t, s),
      l.__setInstance(t, s)
  }
  return s
}
const Wl = ['locale', 'fallbackLocale', 'availableLocales'],
  Al = ['t', 'd', 'n', 'tm']
'boolean' != typeof __VUE_I18N_FULL_INSTALL__ &&
  (sr().__VUE_I18N_FULL_INSTALL__ = !0),
  'boolean' != typeof __VUE_I18N_LEGACY_API__ &&
    (sr().__VUE_I18N_LEGACY_API__ = !0),
  'boolean' != typeof __INTLIFY_PROD_DEVTOOLS__ &&
    (sr().__INTLIFY_PROD_DEVTOOLS__ = !1)
var Dl = { name: 'Banana', data: () => ({ select: 0 }) }
const Vl = { id: 'fruits' },
  Ul = Kn('option', { value: '0' }, '0', -1),
  Hl = Kn('option', { value: '1' }, '1', -1),
  Bl = Kn('option', { value: '2' }, '2', -1),
  Yl = Kn('option', { value: '3' }, '3', -1)
Dl.render = function (e, t, n, o, r, l) {
  return (
    Vn(),
    Hn(
      jn,
      null,
      [
        Kn('form', Vl, [
          Kn('label', null, u(e.$t('select')), 1),
          yn(
            Kn(
              'select',
              { 'onUpdate:modelValue': t[1] || (t[1] = t => (e.select = t)) },
              [Ul, Hl, Bl, Yl],
              512
            ),
            [[Go, e.select, void 0, { number: !0 }]]
          )
        ]),
        Kn('p', null, u(e.$tc('fruits.banana', e.select, { n: e.select })), 1)
      ],
      64
    )
  )
}
var zl = { name: 'App', components: { Banana: Dl } }
const Gl = Kn('option', { value: 'en' }, 'en', -1),
  ql = Kn('option', { value: 'ja' }, 'ja', -1)
function Kl(e) {
  ;(e.__i18n = e.__i18n || []),
    e.__i18n.push({
      locale: '',
      resource: {
        en: {
          language: e => {
            const { normalize: t } = e
            return t(['Language'])
          },
          hello: e => {
            const { normalize: t } = e
            return t(['hello, world!'])
          }
        },
        ja: {
          language: e => {
            const { normalize: t } = e
            return t(['言語'])
          },
          hello: e => {
            const { normalize: t } = e
            return t(['こんにちは、世界！'])
          }
        }
      }
    })
}
Kl(zl),
  (zl.render = function (e, t, n, o, r, l) {
    const s = Cn('Banana')
    return (
      Vn(),
      Hn(
        jn,
        null,
        [
          Kn('form', null, [
            Kn('label', null, u(e.$t('language')), 1),
            yn(
              Kn(
                'select',
                {
                  'onUpdate:modelValue':
                    t[1] || (t[1] = t => (e.$i18n.locale = t))
                },
                [Gl, ql],
                512
              ),
              [[Go, e.$i18n.locale]]
            )
          ]),
          Kn('p', null, u(e.$t('hello')), 1),
          Kn(s)
        ],
        64
      )
    )
  })
const Jl = (function (e = {}) {
    const t = !__VUE_I18N_LEGACY_API__ || !fr(e.legacy) || e.legacy,
      n = __VUE_I18N_LEGACY_API__ && !!e.globalInjection,
      o = new Map(),
      r = __VUE_I18N_LEGACY_API__ && t ? Il(e) : Tl(e),
      l = Xo(''),
      s = {
        get mode() {
          return __VUE_I18N_LEGACY_API__ && t ? 'legacy' : 'composition'
        },
        async install(e, ...o) {
          if (
            (__INTLIFY_PROD_DEVTOOLS__ && (e.__VUE_I18N__ = s),
            (e.__VUE_I18N_SYMBOL__ = l),
            e.provide(e.__VUE_I18N_SYMBOL__, s),
            !t &&
              n &&
              (function (e, t) {
                const n = Object.create(null)
                Wl.forEach(e => {
                  const o = Object.getOwnPropertyDescriptor(t, e)
                  if (!o) throw ml(20)
                  const r = Qe(o.value)
                    ? {
                        get: () => o.value.value,
                        set(e) {
                          o.value.value = e
                        }
                      }
                    : { get: () => o.get && o.get() }
                  Object.defineProperty(n, e, r)
                }),
                  (e.config.globalProperties.$i18n = n),
                  Al.forEach(n => {
                    const o = Object.getOwnPropertyDescriptor(t, n)
                    if (!o) throw ml(20)
                    Object.defineProperty(e.config.globalProperties, `$${n}`, o)
                  })
              })(e, s.global),
            __VUE_I18N_FULL_INSTALL__ &&
              (function (e, t, ...n) {
                const o = _r(n[0]) ? n[0] : {},
                  r = !!o.useI18nComponentName
                ;(!fr(o.globalInstall) || o.globalInstall) &&
                  (e.component(r ? 'i18n' : El.name, El),
                  e.component(Cl.name, Cl),
                  e.component(Ml.name, Ml)),
                  e.directive('t', jl(t))
              })(e, s, ...o),
            __VUE_I18N_LEGACY_API__ &&
              t &&
              e.mixin(
                (function (e, t, n) {
                  return {
                    beforeCreate() {
                      const o = bo()
                      if (!o) throw ml(20)
                      const r = this.$options
                      if (r.i18n) {
                        const n = r.i18n
                        r.__i18n && (n.__i18n = r.__i18n),
                          (n.__root = t),
                          this === this.$root
                            ? (this.$i18n = $l(e, n))
                            : (this.$i18n = Il(n))
                      } else
                        r.__i18n
                          ? this === this.$root
                            ? (this.$i18n = $l(e, r))
                            : (this.$i18n = Il({ __i18n: r.__i18n, __root: t }))
                          : (this.$i18n = e)
                      e.__onComponentInstanceCreated(this.$i18n),
                        n.__setInstance(o, this.$i18n),
                        (this.$t = (...e) => this.$i18n.t(...e)),
                        (this.$tc = (...e) => this.$i18n.tc(...e)),
                        (this.$te = (e, t) => this.$i18n.te(e, t)),
                        (this.$d = (...e) => this.$i18n.d(...e)),
                        (this.$n = (...e) => this.$i18n.n(...e)),
                        (this.$tm = e => this.$i18n.tm(e))
                    },
                    mounted() {
                      if (__INTLIFY_PROD_DEVTOOLS__) {
                        this.$el.__INTLIFY__ = this.$i18n.__composer
                        const e = (this.__emitter = cl()),
                          t = this.$i18n
                        t.__enableEmitter && t.__enableEmitter(e), e.on('*', dl)
                      }
                    },
                    beforeUnmount() {
                      const e = bo()
                      if (!e) throw ml(20)
                      if (__INTLIFY_PROD_DEVTOOLS__) {
                        this.__emitter &&
                          (this.__emitter.off('*', dl), delete this.__emitter)
                        const e = this.$i18n
                        e.__disableEmitter && e.__disableEmitter(),
                          delete this.$el.__INTLIFY__
                      }
                      delete this.$t,
                        delete this.$tc,
                        delete this.$te,
                        delete this.$d,
                        delete this.$n,
                        delete this.$tm,
                        n.__deleteInstance(e),
                        delete this.$i18n
                    }
                  }
                })(r, r.__composer, s)
              ),
            __INTLIFY_PROD_DEVTOOLS__)
          ) {
            if (!(await fl(e, s))) throw ml(19)
            const n = cl()
            if (t) {
              const e = r
              e.__enableEmitter && e.__enableEmitter(n)
            } else {
              const e = r
              e[vl] && e[vl](n)
            }
            n.on('*', dl)
          }
        },
        get global() {
          return r
        },
        __instances: o,
        __getInstance: e => o.get(e) || null,
        __setInstance(e, t) {
          o.set(e, t)
        },
        __deleteInstance(e) {
          o.delete(e)
        }
      }
    return __INTLIFY_PROD_DEVTOOLS__, s
  })({
    legacy: !0,
    locale: 'ja',
    messages: {
      en: {
        select: e => {
          const { normalize: t } = e
          return t(['Do you want banana?'])
        },
        fruits: {
          banana: e => {
            const { normalize: t, interpolate: n, named: o, plural: r } = e
            return r([
              t(['no bananas']),
              t([n(o('n')), ' banana']),
              t([n(o('n')), ' bananas'])
            ])
          }
        }
      },
      ja: {
        select: 'バナナが欲しい？',
        fruits: { banana: 'バナナがない | バナナ {n} 個' }
      }
    }
  }),
  Zl = ((...e) => {
    const t = (Zo || (Zo = xn(Jo))).createApp(...e),
      { mount: n } = t
    return (
      (t.mount = e => {
        const o = (function (e) {
          if (x(e)) {
            return document.querySelector(e)
          }
          return e
        })(e)
        if (!o) return
        const r = t._component
        I(r) || r.render || r.template || (r.template = o.innerHTML),
          (o.innerHTML = '')
        const l = n(o)
        return o.removeAttribute('v-cloak'), o.setAttribute('data-v-app', ''), l
      }),
      t
    )
  })(zl)
Zl.use(Jl), Zl.mount('#app')
