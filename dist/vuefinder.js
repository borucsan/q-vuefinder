var zo = Object.defineProperty;
var jo = (t, e, n) => e in t ? zo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var $n = (t, e, n) => jo(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as kt, watch as Ie, ref as I, shallowRef as Go, onMounted as Ee, onUnmounted as Yn, onUpdated as Vs, nextTick as _t, computed as it, inject as re, openBlock as p, createElementBlock as b, withKeys as $t, unref as r, createElementVNode as a, withModifiers as tt, renderSlot as Ot, normalizeClass as le, toDisplayString as g, createBlock as K, resolveDynamicComponent as Xn, withCtx as ee, createVNode as j, Fragment as ye, renderList as ke, createCommentVNode as B, withDirectives as _e, vModelCheckbox as Kt, createTextVNode as Q, vModelSelect as On, vModelText as xt, onBeforeUnmount as Us, defineAsyncComponent as Wo, normalizeProps as Ko, guardReactiveProps as Yo, customRef as Xo, vShow as ze, isRef as Zo, TransitionGroup as Jo, resolveComponent as Ns, normalizeStyle as un, mergeModels as Qo, useModel as Hs, provide as er, Transition as tr } from "vue";
import nr from "mitt";
import sr from "dragselect";
import { A as or, D as rr, R as ar, N as lr, a as ir, U as cr, b as dr, c as ur, M as _r } from "./icons-ByPS8m9L.js";
import fr from "@uppy/core";
import vr from "@uppy/xhr-upload";
import mr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import pr from "cropperjs";
var Rs;
const xn = (Rs = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Rs.getAttribute("content");
class hr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    $n(this, "config");
    $n(this, "customFetch", async (...e) => {
      let [n, o] = e;
      this.config.fetchRequestInterceptor && (o = this.config.fetchRequestInterceptor(o));
      let s = await fetch(n, o);
      return this.config.fetchResponseInterceptor && (s = await this.config.fetchResponseInterceptor(s)), s;
    });
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const n = this.config, o = {};
    xn != null && xn !== "" && (o[n.xsrfHeaderName] = xn);
    const s = Object.assign({}, n.headers, o, e.headers), l = Object.assign({}, n.params, e.params), c = e.body, d = n.baseUrl + e.url, i = e.method;
    let u;
    i !== "get" && (c instanceof FormData ? (u = c, n.body != null && Object.entries(this.config.body).forEach(([_, m]) => {
      u.append(_, m);
    })) : (u = { ...c }, n.body != null && Object.assign(u, this.config.body)));
    const f = {
      url: d,
      method: i,
      headers: s,
      params: l,
      body: u
    };
    if (n.transformRequest != null) {
      const _ = n.transformRequest({
        url: d,
        method: i,
        headers: s,
        params: l,
        body: u
      });
      _.url != null && (f.url = _.url), _.method != null && (f.method = _.method), _.params != null && (f.params = _.params ?? {}), _.headers != null && (f.headers = _.headers ?? {}), _.body != null && (f.body = _.body);
    }
    return f;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, n) {
    if (n.url != null)
      return n.url;
    const o = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return o.url + "?" + new URLSearchParams(o.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, n) {
    if (n.url != null)
      return n.url;
    const o = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: n.path }
    });
    return o.url + "?" + new URLSearchParams(o.params).toString();
  }
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const n = this.transformRequestParams(e), o = e.responseType || "json", s = {
      method: e.method,
      headers: n.headers,
      signal: e.abortSignal
    }, l = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    this.config.fetchParams && Object.assign(s, this.config.fetchParams);
    const c = await this.customFetch(l, s);
    if (c.ok)
      return await c[o]();
    throw await c.json();
  }
}
function gr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token",
    fetchParams: {}
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new hr(e);
}
function br(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = kt(JSON.parse(e ?? "{}"));
  Ie(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(i, u) {
    n[i] = u;
  }
  function l(i) {
    delete n[i];
  }
  function c() {
    Object.keys(n).map((i) => l(i));
  }
  return { getStore: (i, u = null) => n.hasOwnProperty(i) ? n[i] : u, setStore: s, removeStore: l, clearStore: c };
}
async function yr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function wr(t, e, n, o) {
  const { getStore: s, setStore: l } = t, c = I({}), d = I(s("locale", e)), i = (_, m = e) => {
    yr(_, o).then((v) => {
      c.value = v, l("locale", _), d.value = _, l("translations", v), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + _ }), n.emit("vf-language-saved"));
    }).catch((v) => {
      m ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(m, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Ie(d, (_) => {
    i(_);
  }), !s("locale") && !o.length ? i(e) : c.value = s("translations");
  const u = (_, ...m) => m.length ? u(_ = _.replace("%s", m.shift()), ...m) : _;
  function f(_, ...m) {
    return c.value && c.value.hasOwnProperty(_) ? u(c.value[_], ...m) : u(_, ...m);
  }
  return kt({ t: f, locale: d });
}
const ue = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, Sr = Object.values(ue), kr = "2.7.0";
function Ps(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1024, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Bs(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1e3, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function $r(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return o[1] * Math.pow(1024, e[o[2].toLowerCase()]);
}
const rt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function xr(t, e) {
  const n = I(rt.SYSTEM), o = I(rt.LIGHT);
  n.value = t.getStore("theme", e ?? rt.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), l = (c) => {
    n.value === rt.DARK || n.value === rt.SYSTEM && c.matches ? o.value = rt.DARK : o.value = rt.LIGHT;
  };
  return l(s), s.addEventListener("change", l), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: o,
    /**
     * @param {Theme} value
     */
    set(c) {
      n.value = c, c !== rt.SYSTEM ? t.setStore("theme", c) : t.removeStore("theme"), l(s);
    }
  };
}
function Cr() {
  const t = Go(null), e = I(!1), n = I();
  return { visible: e, type: t, data: n, open: (l, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = l, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.10.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Le = (t, e) => {
  const { o: n, i: o, u: s } = t;
  let l = n, c;
  const d = (f, _) => {
    const m = l, v = f, h = _ || (o ? !o(m, v) : m !== v);
    return (h || s) && (l = v, c = m), [l, h, c];
  };
  return [e ? (f) => d(e(l, c), f) : d, (f) => [l, !!f, c]];
}, Er = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Fe = Er ? window : {}, qs = Math.max, Tr = Math.min, In = Math.round, nn = Math.abs, ps = Math.sign, zs = Fe.cancelAnimationFrame, Zn = Fe.requestAnimationFrame, sn = Fe.setTimeout, Fn = Fe.clearTimeout, _n = (t) => typeof Fe[t] < "u" ? Fe[t] : void 0, Dr = _n("MutationObserver"), hs = _n("IntersectionObserver"), on = _n("ResizeObserver"), Jt = _n("ScrollTimeline"), Jn = (t) => t === void 0, fn = (t) => t === null, Ge = (t) => typeof t == "number", Mt = (t) => typeof t == "string", Qn = (t) => typeof t == "boolean", Ne = (t) => typeof t == "function", We = (t) => Array.isArray(t), rn = (t) => typeof t == "object" && !We(t) && !fn(t), es = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return We(t) || !Ne(t) && n ? e > 0 && rn(t) ? e - 1 in t : !0 : !1;
}, an = (t) => !!t && t.constructor === Object, ln = (t) => t instanceof HTMLElement, vn = (t) => t instanceof Element;
function ie(t, e) {
  if (es(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && ie(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const js = (t, e) => t.indexOf(e) >= 0, It = (t, e) => t.concat(e), pe = (t, e, n) => (!Mt(e) && es(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ct = (t) => Array.from(t || []), ts = (t) => We(t) ? t : !Mt(t) && es(t) ? ct(t) : [t], Ln = (t) => !!t && !t.length, Mn = (t) => ct(new Set(t)), Ve = (t, e, n) => {
  ie(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, Gs = "paddingTop", Ws = "paddingRight", Ks = "paddingLeft", Ys = "paddingBottom", Xs = "marginLeft", Zs = "marginRight", Js = "marginBottom", Qs = "overflowX", eo = "overflowY", mn = "width", pn = "height", at = "visible", ut = "hidden", yt = "scroll", Ar = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, hn = (t, e, n, o) => {
  if (t && e) {
    let s = !0;
    return ie(n, (l) => {
      const c = t[l], d = e[l];
      c !== d && (s = !1);
    }), s;
  }
  return !1;
}, to = (t, e) => hn(t, e, ["w", "h"]), Qt = (t, e) => hn(t, e, ["x", "y"]), Or = (t, e) => hn(t, e, ["t", "r", "b", "l"]), ft = () => {
}, Z = (t, ...e) => t.bind(0, ...e), pt = (t) => {
  let e;
  const n = t ? sn : Zn, o = t ? Fn : zs;
  return [(s) => {
    o(e), e = n(() => s(), Ne(t) ? t() : t);
  }, () => o(e)];
}, Rn = (t, e) => {
  const { _: n, p: o, v: s, S: l } = e || {};
  let c, d, i, u, f = ft;
  const _ = function(x) {
    f(), Fn(c), u = c = d = void 0, f = ft, t.apply(this, x);
  }, m = (k) => l && d ? l(d, k) : k, v = () => {
    f !== ft && _(m(i) || i);
  }, h = function() {
    const x = ct(arguments), D = Ne(n) ? n() : n;
    if (Ge(D) && D >= 0) {
      const A = Ne(o) ? o() : o, C = Ge(A) && A >= 0, F = D > 0 ? sn : Zn, R = D > 0 ? Fn : zs, M = m(x) || x, y = _.bind(0, M);
      let w;
      f(), s && !u ? (y(), u = !0, w = F(() => u = void 0, D)) : (w = F(y, D), C && !c && (c = sn(v, A))), f = () => R(w), d = i = M;
    } else
      _(x);
  };
  return h.m = v, h;
}, no = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Pe = (t) => t ? Object.keys(t) : [], ae = (t, e, n, o, s, l, c) => {
  const d = [e, n, o, s, l, c];
  return (typeof t != "object" || fn(t)) && !Ne(t) && (t = {}), ie(d, (i) => {
    ie(i, (u, f) => {
      const _ = i[f];
      if (t === _)
        return !0;
      const m = We(_);
      if (_ && an(_)) {
        const v = t[f];
        let h = v;
        m && !We(v) ? h = [] : !m && !an(v) && (h = {}), t[f] = ae(h, _);
      } else
        t[f] = m ? _.slice() : _;
    });
  }), t;
}, so = (t, e) => ie(ae({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && an(n) && (s[o] = so(n));
}), ns = (t) => !Pe(t).length, oo = (t, e, n) => qs(t, Tr(e, n)), vt = (t) => Mn((We(t) ? t : (t || "").split(" ")).filter((e) => e)), ss = (t, e) => t && t.getAttribute(e), gs = (t, e) => t && t.hasAttribute(e), Qe = (t, e, n) => {
  ie(vt(e), (o) => {
    t && t.setAttribute(o, String(n || ""));
  });
}, qe = (t, e) => {
  ie(vt(e), (n) => t && t.removeAttribute(n));
}, gn = (t, e) => {
  const n = vt(ss(t, e)), o = Z(Qe, t, e), s = (l, c) => {
    const d = new Set(n);
    return ie(vt(l), (i) => {
      d[c](i);
    }), ct(d).join(" ");
  };
  return {
    O: (l) => o(s(l, "delete")),
    $: (l) => o(s(l, "add")),
    C: (l) => {
      const c = vt(l);
      return c.reduce((d, i) => d && n.includes(i), c.length > 0);
    }
  };
}, ro = (t, e, n) => (gn(t, e).O(n), Z(os, t, e, n)), os = (t, e, n) => (gn(t, e).$(n), Z(ro, t, e, n)), cn = (t, e, n, o) => (o ? os : ro)(t, e, n), rs = (t, e, n) => gn(t, e).C(n), ao = (t) => gn(t, "class"), lo = (t, e) => {
  ao(t).O(e);
}, as = (t, e) => (ao(t).$(e), Z(lo, t, e)), io = (t, e) => {
  const n = e ? vn(e) && e : document;
  return n ? ct(n.querySelectorAll(t)) : [];
}, Ir = (t, e) => {
  const n = e ? vn(e) && e : document;
  return n && n.querySelector(t);
}, Vn = (t, e) => vn(t) && t.matches(e), co = (t) => Vn(t, "body"), Un = (t) => t ? ct(t.childNodes) : [], Ft = (t) => t && t.parentElement, ht = (t, e) => vn(t) && t.closest(e), Nn = (t) => document.activeElement, Fr = (t, e, n) => {
  const o = ht(t, e), s = t && Ir(n, o), l = ht(s, e) === o;
  return o && s ? o === t || s === t || l && ht(ht(t, n), e) !== o : !1;
}, wt = (t) => {
  ie(ts(t), (e) => {
    const n = Ft(e);
    e && n && n.removeChild(e);
  });
}, Me = (t, e) => Z(wt, t && e && ie(ts(e), (n) => {
  n && t.appendChild(n);
})), gt = (t) => {
  const e = document.createElement("div");
  return Qe(e, "class", t), e;
}, uo = (t) => {
  const e = gt();
  return e.innerHTML = t.trim(), ie(Un(e), (n) => wt(n));
}, bs = (t, e) => t.getPropertyValue(e) || t[e] || "", _o = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Yt = (t) => _o(parseFloat(t || "")), Hn = (t) => Math.round(t * 1e4) / 1e4, fo = (t) => `${Hn(_o(t))}px`;
function Lt(t, e) {
  t && e && ie(e, (n, o) => {
    try {
      const s = t.style, l = fn(n) || Qn(n) ? "" : Ge(n) ? fo(n) : n;
      o.indexOf("--") === 0 ? s.setProperty(o, l) : s[o] = l;
    } catch {
    }
  });
}
function nt(t, e, n) {
  const o = Mt(e);
  let s = o ? "" : {};
  if (t) {
    const l = Fe.getComputedStyle(t, n) || t.style;
    s = o ? bs(l, e) : ct(e).reduce((c, d) => (c[d] = bs(l, d), c), s);
  }
  return s;
}
const ys = (t, e, n) => {
  const o = e ? `${e}-` : "", s = n ? `-${n}` : "", l = `${o}top${s}`, c = `${o}right${s}`, d = `${o}bottom${s}`, i = `${o}left${s}`, u = nt(t, [l, c, d, i]);
  return {
    t: Yt(u[l]),
    r: Yt(u[c]),
    b: Yt(u[d]),
    l: Yt(u[i])
  };
}, Lr = (t, e) => `translate${rn(t) ? `(${t.x},${t.y})` : `Y(${t})`}`, Mr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Rr = {
  w: 0,
  h: 0
}, bn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Rr, Vr = (t) => bn("inner", t || Fe), bt = Z(bn, "offset"), vo = Z(bn, "client"), dn = Z(bn, "scroll"), ls = (t) => {
  const e = parseFloat(nt(t, mn)) || 0, n = parseFloat(nt(t, pn)) || 0;
  return {
    w: e - In(e),
    h: n - In(n)
  };
}, Cn = (t) => t.getBoundingClientRect(), Ur = (t) => !!t && Mr(t), Pn = (t) => !!(t && (t[pn] || t[mn])), mo = (t, e) => {
  const n = Pn(t);
  return !Pn(e) && n;
}, ws = (t, e, n, o) => {
  ie(vt(e), (s) => {
    t && t.removeEventListener(s, n, o);
  });
}, ve = (t, e, n, o) => {
  var s;
  const l = (s = o && o.H) != null ? s : !0, c = o && o.I || !1, d = o && o.A || !1, i = {
    passive: l,
    capture: c
  };
  return Z(Ve, vt(e).map((u) => {
    const f = d ? (_) => {
      ws(t, u, f, c), n && n(_);
    } : n;
    return t && t.addEventListener(u, f, i), Z(ws, t, u, f, c);
  }));
}, po = (t) => t.stopPropagation(), Bn = (t) => t.preventDefault(), ho = (t) => po(t) || Bn(t), je = (t, e) => {
  const { x: n, y: o } = Ge(e) ? {
    x: e,
    y: e
  } : e || {};
  Ge(n) && (t.scrollLeft = n), Ge(o) && (t.scrollTop = o);
}, Re = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), go = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), Nr = (t, e) => {
  const { D: n, M: o } = t, { w: s, h: l } = e, c = (_, m, v) => {
    let h = ps(_) * v, k = ps(m) * v;
    if (h === k) {
      const x = nn(_), D = nn(m);
      k = x > D ? 0 : k, h = x < D ? 0 : h;
    }
    return h = h === k ? 0 : h, [h + 0, k + 0];
  }, [d, i] = c(n.x, o.x, s), [u, f] = c(n.y, o.y, l);
  return {
    D: {
      x: d,
      y: _
    },
    M: {
      x: i,
      y: f
    }
  };
}, Ss = ({ D: t, M: e }) => {
  const n = (o, s) => o === 0 && o <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, ks = ({ D: t, M: e }, n) => {
  const o = (s, l, c) => oo(0, 1, (s - c) / (s - l) || 0);
  return {
    x: o(t.x, e.x, n.x),
    y: o(t.y, e.y, n.y)
  };
}, qn = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, $s = (t, e) => {
  ie(ts(e), t);
}, zn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (l, c) => {
    if (l) {
      const d = e.get(l);
      $s((i) => {
        d && d[i ? "delete" : "clear"](i);
      }, c);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, o = (l, c) => {
    if (Mt(l)) {
      const u = e.get(l) || /* @__PURE__ */ new Set();
      return e.set(l, u), $s((f) => {
        Ne(f) && u.add(f);
      }, c), Z(n, l, c);
    }
    Qn(c) && c && n();
    const d = Pe(l), i = [];
    return ie(d, (u) => {
      const f = l[u];
      f && pe(i, o(u, f));
    }), Z(Ve, i);
  }, s = (l, c) => {
    ie(ct(e.get(l)), (d) => {
      c && !Ln(c) ? d.apply(0, c) : d();
    });
  };
  return o(t || {}), [o, n, s];
}, bo = {}, yo = {}, Hr = (t) => {
  ie(t, (e) => ie(e, (n, o) => {
    bo[o] = e[o];
  }));
}, wo = (t, e, n) => Pe(t).map((o) => {
  const { static: s, instance: l } = t[o], [c, d, i] = n || [], u = n ? l : s;
  if (u) {
    const f = n ? u(c, d, e) : u(e);
    return (i || yo)[o] = f;
  }
}), Rt = (t) => yo[t], Pr = "__osOptionsValidationPlugin", Ct = "data-overlayscrollbars", en = "os-environment", Xt = `${en}-scrollbar-hidden`, En = `${Ct}-initialize`, tn = "noClipping", xs = `${Ct}-body`, lt = Ct, Br = "host", et = `${Ct}-viewport`, qr = Qs, zr = eo, jr = "arrange", So = "measuring", Gr = "scrolling", ko = "scrollbarHidden", Wr = "noContent", jn = `${Ct}-padding`, Cs = `${Ct}-content`, is = "os-size-observer", Kr = `${is}-appear`, Yr = `${is}-listener`, Xr = "os-trinsic-observer", Zr = "os-theme-none", Ue = "os-scrollbar", Jr = `${Ue}-rtl`, Qr = `${Ue}-horizontal`, ea = `${Ue}-vertical`, $o = `${Ue}-track`, cs = `${Ue}-handle`, ta = `${Ue}-visible`, na = `${Ue}-cornerless`, Es = `${Ue}-interaction`, Ts = `${Ue}-unusable`, Gn = `${Ue}-auto-hide`, Ds = `${Gn}-hidden`, As = `${Ue}-wheel`, sa = `${$o}-interactive`, oa = `${cs}-interactive`, ra = "__osSizeObserverPlugin", aa = (t, e) => {
  const { T: n } = e, [o, s] = t("showNativeOverlaidScrollbars");
  return [o && n.x && n.y, s];
}, St = (t) => t.indexOf(at) === 0, la = (t, e) => {
  const n = (s, l, c, d) => {
    const i = s === at ? ut : s.replace(`${at}-`, ""), u = St(s), f = St(c);
    return !l && !d ? ut : u && f ? at : u ? l && d ? i : l ? at : ut : l ? i : f && d ? at : ut;
  }, o = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    k: o,
    R: {
      x: o.x === yt,
      y: o.y === yt
    }
  };
}, xo = "__osScrollbarsHidingPlugin", ia = "__osClickScrollPlugin", Os = (t) => JSON.stringify(t, (e, n) => {
  if (Ne(n))
    throw 0;
  return n;
}), Is = (t, e) => t ? `${e}`.split(".").reduce((n, o) => n && no(n, o) ? n[o] : void 0, t) : void 0, ca = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, Co = (t, e) => {
  const n = {}, o = It(Pe(e), Pe(t));
  return ie(o, (s) => {
    const l = t[s], c = e[s];
    if (rn(l) && rn(c))
      ae(n[s] = {}, Co(l, c)), ns(n[s]) && delete n[s];
    else if (no(e, s) && c !== l) {
      let d = !0;
      if (We(l) || We(c))
        try {
          Os(l) === Os(c) && (d = !1);
        } catch {
        }
      d && (n[s] = c);
    }
  }), n;
}, Fs = (t, e, n) => (o) => [Is(t, o), n || Is(e, o) !== void 0];
let Eo;
const da = () => Eo, ua = (t) => {
  Eo = t;
};
let Tn;
const _a = () => {
  const t = (C, F, R) => {
    Me(document.body, C), Me(document.body, C);
    const q = vo(C), M = bt(C), y = ls(F);
    return R && wt(C), {
      x: M.h - q.h + y.h,
      y: M.w - q.w + y.w
    };
  }, e = (C) => {
    let F = !1;
    const R = as(C, Xt);
    try {
      F = nt(C, "scrollbar-width") === "none" || nt(C, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return R(), F;
  }, n = `.${en}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${en} div{width:200%;height:200%;margin:10px 0}.${Xt}{scrollbar-width:none!important}.${Xt}::-webkit-scrollbar,.${Xt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = uo(`<div class="${en}"><div></div><style>${n}</style></div>`)[0], l = s.firstChild, c = s.lastChild, d = da();
  d && (c.nonce = d);
  const [i, , u] = zn(), [f, _] = Le({
    o: t(s, l),
    i: Qt
  }, Z(t, s, l, !0)), [m] = _(), v = e(s), h = {
    x: m.x === 0,
    y: m.y === 0
  }, k = {
    elements: {
      host: null,
      padding: !v,
      viewport: (C) => v && co(C) && C,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, x = ae({}, ca), D = Z(ae, {}, x), V = Z(ae, {}, k), A = {
    N: m,
    T: h,
    P: v,
    G: !!Jt,
    K: Z(i, "r"),
    Z: V,
    tt: (C) => ae(k, C) && V(),
    nt: D,
    ot: (C) => ae(x, C) && D(),
    st: ae({}, k),
    et: ae({}, x)
  };
  if (qe(s, "style"), wt(s), fe(Fe, "resize", () => {
    u("r", []);
  }), Ne(Fe.matchMedia) && !v && (!h.x || !h.y)) {
    const C = (F) => {
      const R = Fe.matchMedia(`(resolution: ${Fe.devicePixelRatio}dppx)`);
      fe(R, "change", () => {
        F(), C(F);
      }, {
        A: !0
      });
    };
    C(() => {
      const [F, R] = f();
      ae(A.N, F), u("r", [R]);
    });
  }
  return A;
}, Ye = () => (Tn || (Tn = _a()), Tn), fa = (t, e, n) => {
  let o = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, l = () => {
    o = !0;
  }, c = (d) => {
    if (s && n) {
      const i = n.map((u) => {
        const [f, _] = u || [];
        return [_ && f ? (d || io)(f, t) : [], _];
      });
      ie(i, (u) => ie(u[0], (f) => {
        const _ = u[1], m = s.get(f) || [];
        if (t.contains(f) && _) {
          const h = fe(f, _, (k) => {
            o ? (h(), s.delete(f)) : e(k);
          });
          s.set(f, pe(m, h));
        } else
          Ve(m), s.delete(f);
      }));
    }
  };
  return c(), [l, c];
}, Ls = (t, e, n, o) => {
  let s = !1;
  const { ct: l, rt: c, lt: d, it: i, ut: u, _t: f } = o || {}, _ = Rn(() => s && n(!0), {
    _: 33,
    p: 99
  }), [m, v] = fa(t, _, d), h = l || [], k = c || [], x = It(h, k), D = (A, C) => {
    if (!Ln(C)) {
      const F = u || ft, R = f || ft, q = [], M = [];
      let y = !1, w = !1;
      if (ie(C, (L) => {
        const { attributeName: S, target: U, type: $, oldValue: N, addedNodes: P, removedNodes: J } = L, oe = $ === "attributes", E = $ === "childList", ve = t === U, X = oe && S, T = X && ss(U, S || ""), H = Mt(T) ? T : null, z = X && N !== H, O = js(k, S) && z;
        if (e && (E || !ve)) {
          const W = oe && z, G = W && i && Vn(U, i), se = (G ? !F(U, S, N, H) : !oe || W) && !R(L, !!G, t, o);
          ie(P, (ce) => pe(q, ce)), ie(J, (ce) => pe(q, ce)), w = w || se;
        }
        !e && ve && z && !F(U, S, N, H) && (pe(M, S), y = y || O);
      }), v((L) => Mn(q).reduce((S, U) => (pe(S, io(L, U)), Vn(U, L) ? pe(S, U) : S), [])), e)
        return !A && w && n(!1), [!1];
      if (!Ln(M) || y) {
        const L = [Mn(M), y];
        return !A && n.apply(0, L), L;
      }
    }
  }, V = new Dr(Z(D, !1));
  return [() => (V.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: x,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (m(), V.disconnect(), s = !1);
  }), () => {
    if (s)
      return _.m(), D(!0, V.takeRecords());
  }];
}, To = (t, e, n) => {
  const { dt: o } = n || {}, s = Rt(ra), [l] = Le({
    o: !1,
    u: !0
  });
  return () => {
    const c = [], i = uo(`<div class="${is}"><div class="${Yr}"></div></div>`)[0], u = i.firstChild, f = (_) => {
      const m = _ instanceof ResizeObserverEntry;
      let v = !1, h = !1;
      if (m) {
        const [k, , x] = l(_.contentRect), D = Pn(k);
        h = mo(k, x), v = !h && !D;
      } else
        h = _ === !0;
      v || e({
        ft: !0,
        dt: h
      });
    };
    if (on) {
      const _ = new on((m) => f(m.pop()));
      _.observe(u), pe(c, () => {
        _.disconnect();
      });
    } else if (s) {
      const [_, m] = s(u, f, o);
      pe(c, It([as(i, Kr), fe(i, "animationstart", _)], m));
    } else
      return ft;
    return Z(Ve, pe(c, Me(t, i)));
  };
}, va = (t, e) => {
  let n;
  const o = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, s = gt(Xr), [l] = Le({
    o: !1
  }), c = (i, u) => {
    if (i) {
      const f = l(o(i)), [, _] = f;
      return _ && !u && e(f) && [f];
    }
  }, d = (i, u) => c(u.pop(), i);
  return [() => {
    const i = [];
    if (hs)
      n = new hs(Z(d, !1), {
        root: t
      }), n.observe(s), pe(i, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const f = bt(s);
        c(f);
      };
      pe(i, To(s, u)()), u();
    }
    return Z(Ve, pe(i, Me(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, ma = (t, e, n, o) => {
  let s, l, c, d, i, u;
  const f = `[${lt}]`, _ = `[${et}]`, m = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: v, ht: h, U: k, gt: x, bt: D, L: V, wt: A, yt: C, St: F, Ot: R } = t, q = (O) => nt(O, "direction") === "rtl", M = {
    $t: !1,
    F: q(v)
  }, y = Ye(), w = Rt(xo), [L] = Le({
    i: to,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const O = w && w.V(t, e, M, y, n).X, G = !(A && V) && rs(h, lt, tn), Y = !V && C(jr), se = Y && Re(x), ce = se && R(), we = F(So, G), he = Y && O && O()[0], Te = dn(k), ne = ls(k);
    return he && he(), je(x, se), ce && ce(), G && we(), {
      w: Te.w + ne.w,
      h: Te.h + ne.h
    };
  }), S = Rn(o, {
    _: () => s,
    p: () => l,
    S(O, W) {
      const [G] = O, [Y] = W;
      return [It(Pe(G), Pe(Y)).reduce((se, ce) => (se[ce] = G[ce] || Y[ce], se), {})];
    }
  }), U = (O) => {
    const W = q(v);
    ae(O, {
      Ct: u !== W
    }), ae(M, {
      F: W
    }), u = W;
  }, $ = (O, W) => {
    const [G, Y] = O, se = {
      xt: Y
    };
    return ae(M, {
      $t: G
    }), !W && o(se), se;
  }, N = ({ ft: O, dt: W }) => {
    const Y = !(O && !W) && y.P ? S : o, se = {
      ft: O || W,
      dt: W
    };
    U(se), Y(se);
  }, P = (O, W) => {
    const [, G] = L(), Y = {
      Ht: G
    };
    return U(Y), G && !W && (O ? o : S)(Y), Y;
  }, J = (O, W, G) => {
    const Y = {
      Et: W
    };
    return U(Y), W && !G && S(Y), Y;
  }, [oe, E] = D ? va(h, $) : [], ve = !V && To(h, N, {
    dt: !0
  }), [X, T] = Ls(h, !1, J, {
    rt: m,
    ct: m
  }), H = V && on && new on((O) => {
    const W = O[O.length - 1].contentRect;
    N({
      ft: !0,
      dt: mo(W, i)
    }), i = W;
  }), z = Rn(() => {
    const [, O] = L();
    o({
      Ht: O
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    H && H.observe(h);
    const O = ve && ve(), W = oe && oe(), G = X(), Y = y.K((se) => {
      se ? S({
        zt: se
      }) : z();
    });
    return () => {
      H && H.disconnect(), O && O(), W && W(), d && d(), G(), Y();
    };
  }, ({ It: O, At: W, Dt: G }) => {
    const Y = {}, [se] = O("update.ignoreMutation"), [ce, we] = O("update.attributes"), [he, Te] = O("update.elementEvents"), [ne, Se] = O("update.debounce"), Oe = Te || we, $e = W || G, xe = (ge) => Ne(se) && se(ge);
    if (Oe) {
      c && c(), d && d();
      const [ge, be] = Ls(D || k, !0, P, {
        ct: It(m, ce || []),
        lt: he,
        it: f,
        _t: (me, de) => {
          const { target: Ce, attributeName: Ae } = me;
          return (!de && Ae && !V ? Fr(Ce, f, _) : !1) || !!ht(Ce, `.${Ue}`) || !!xe(me);
        }
      });
      d = ge(), c = be;
    }
    if (Se)
      if (S.m(), We(ne)) {
        const ge = ne[0], be = ne[1];
        s = Ge(ge) && ge, l = Ge(be) && be;
      } else Ge(ne) ? (s = ne, l = !1) : (s = !1, l = !1);
    if ($e) {
      const ge = T(), be = E && E(), me = c && c();
      ge && ae(Y, J(ge[0], ge[1], $e)), be && ae(Y, $(be[0], $e)), me && ae(Y, P(me[0], $e));
    }
    return U(Y), Y;
  }, M];
}, Do = (t, e) => Ne(e) ? e.apply(0, t) : e, pa = (t, e, n, o) => {
  const s = Jn(o) ? n : o;
  return Do(t, s) || e.apply(0, t);
}, Ao = (t, e, n, o) => {
  const s = Jn(o) ? n : o, l = Do(t, s);
  return !!l && (ln(l) ? l : e.apply(0, t));
}, ha = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, P: l, Z: c } = Ye(), { nativeScrollbarsOverlaid: d, body: i } = c().cancel, u = n ?? d, f = Jn(o) ? i : o, _ = (s.x || s.y) && u, m = t && (fn(f) ? !l : f);
  return !!_ || !!m;
}, ga = (t, e, n, o) => {
  const s = "--os-viewport-percent", l = "--os-scroll-percent", c = "--os-scroll-direction", { Z: d } = Ye(), { scrollbars: i } = d(), { slot: u } = i, { vt: f, ht: _, U: m, Mt: v, gt: h, wt: k, L: x } = e, { scrollbars: D } = v ? {} : t, { slot: V } = D || {}, A = [], C = [], F = [], R = Ao([f, _, m], () => x && k ? f : _, u, V), q = (X) => {
    if (Jt) {
      const T = new Jt({
        source: h,
        axis: X
      });
      return {
        kt: (z) => {
          const O = z.Tt.animate({
            clear: ["left"],
            [l]: [0, 1]
          }, {
            timeline: T
          });
          return () => O.cancel();
        }
      };
    }
  }, M = {
    x: q("x"),
    y: q("y")
  }, y = () => {
    const { Rt: X, Vt: T } = n, H = (z, O) => oo(0, 1, z / (z + O) || 0);
    return {
      x: H(T.x, X.x),
      y: H(T.y, X.y)
    };
  }, w = (X, T, H) => {
    const z = H ? as : lo;
    ie(X, (O) => {
      z(O.Tt, T);
    });
  }, L = (X, T) => {
    ie(X, (H) => {
      const [z, O] = T(H);
      Lt(z, O);
    });
  }, S = (X, T, H) => {
    const z = Qn(H), O = z ? H : !0, W = z ? !H : !0;
    O && w(C, X, T), W && w(F, X, T);
  }, U = () => {
    const X = y(), T = (H) => (z) => [z.Tt, {
      [s]: Hn(H) + ""
    }];
    L(C, T(X.x)), L(F, T(X.y));
  }, $ = () => {
    if (!Jt) {
      const { Lt: X } = n, T = ks(X, Re(h)), H = (z) => (O) => [O.Tt, {
        [l]: Hn(z) + ""
      }];
      L(C, H(T.x)), L(F, H(T.y));
    }
  }, N = () => {
    const { Lt: X } = n, T = Ss(X), H = (z) => (O) => [O.Tt, {
      [c]: z ? "0" : "1"
    }];
    L(C, H(T.x)), L(F, H(T.y));
  }, P = () => {
    if (x && !k) {
      const { Rt: X, Lt: T } = n, H = Ss(T), z = ks(T, Re(h)), O = (W) => {
        const { Tt: G } = W, Y = Ft(G) === m && G, se = (ce, we, he) => {
          const Te = we * ce;
          return fo(he ? Te : -Te);
        };
        return [Y, Y && {
          transform: Lr({
            x: se(z.x, X.x, H.x),
            y: se(z.y, X.y, H.y)
          })
        }];
      };
      L(C, O), L(F, O);
    }
  }, J = (X) => {
    const T = X ? "x" : "y", z = gt(`${Ue} ${X ? Qr : ea}`), O = gt($o), W = gt(cs), G = {
      Tt: z,
      Ut: O,
      Pt: W
    }, Y = M[T];
    return pe(X ? C : F, G), pe(A, [Me(z, O), Me(O, W), Z(wt, z), Y && Y.kt(G), o(G, S, X)]), G;
  }, oe = Z(J, !0), E = Z(J, !1), ve = () => (Me(R, C[0].Tt), Me(R, F[0].Tt), Z(Ve, A));
  return oe(), E(), [{
    Nt: U,
    qt: $,
    Bt: N,
    Ft: P,
    jt: S,
    Yt: {
      Wt: C,
      Xt: oe,
      Jt: Z(L, C)
    },
    Gt: {
      Wt: F,
      Xt: E,
      Jt: Z(L, F)
    }
  }, ve];
}, ba = (t, e, n, o) => (s, l, c) => {
  const { ht: d, U: i, L: u, gt: f, Kt: _, Ot: m } = e, { Tt: v, Ut: h, Pt: k } = s, [x, D] = pt(333), [V, A] = pt(444), C = (q) => {
    Ne(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: q.x,
      top: q.y
    });
  }, F = () => {
    const q = "pointerup pointercancel lostpointercapture", M = `client${c ? "X" : "Y"}`, y = c ? mn : pn, w = c ? "left" : "top", L = c ? "w" : "h", S = c ? "x" : "y", U = (N, P) => (J) => {
      const { Rt: oe } = n, E = bt(h)[L] - bt(k)[L], X = P * J / E * oe[S];
      je(f, {
        [S]: N + X
      });
    }, $ = [];
    return fe(h, "pointerdown", (N) => {
      const P = ht(N.target, `.${cs}`) === k, J = P ? k : h, oe = t.scrollbars, E = oe[P ? "dragScroll" : "clickScroll"], { button: ve, isPrimary: X, pointerType: T } = N, { pointers: H } = oe;
      if (ve === 0 && X && E && (H || []).includes(T)) {
        Ve($), A();
        const O = !P && (N.shiftKey || E === "instant"), W = Z(Cn, k), G = Z(Cn, h), Y = (de, Ce) => (de || W())[w] - (Ce || G())[w], se = In(Cn(f)[y]) / bt(f)[L] || 1, ce = U(Re(f)[S], 1 / se), we = N[M], he = W(), Te = G(), ne = he[y], Se = Y(he, Te) + ne / 2, Oe = we - Te[w], $e = P ? 0 : Oe - Se, xe = (de) => {
          Ve(me), J.releasePointerCapture(de.pointerId);
        }, ge = P || O, be = m(), me = [fe(_, q, xe), fe(_, "selectstart", (de) => Bn(de), {
          H: !1
        }), fe(h, q, xe), ge && fe(h, "pointermove", (de) => ce($e + (de[M] - we))), ge && (() => {
          const de = Re(f);
          be();
          const Ce = Re(f), Ae = {
            x: Ce.x - de.x,
            y: Ce.y - de.y
          };
          (nn(Ae.x) > 3 || nn(Ae.y) > 3) && (m(), je(f, de), C(Ae), V(be));
        })];
        if (J.setPointerCapture(N.pointerId), O)
          ce($e);
        else if (!P) {
          const de = Rt(ia);
          if (de) {
            const Ce = de(ce, $e, ne, (Ae) => {
              Ae ? be() : pe(me, be);
            });
            pe(me, Ce), pe($, Z(Ce, !0));
          }
        }
      }
    });
  };
  let R = !0;
  return Z(Ve, [fe(k, "pointermove pointerleave", o), fe(v, "pointerenter", () => {
    l(Es, !0);
  }), fe(v, "pointerleave pointercancel", () => {
    l(Es, !1);
  }), !u && fe(v, "mousedown", () => {
    const q = Nn();
    (gs(q, et) || gs(q, lt) || q === document.body) && sn(Z(qn, i), 25);
  }), fe(v, "wheel", (q) => {
    const { deltaX: M, deltaY: y, deltaMode: w } = q;
    R && w === 0 && Ft(v) === d && C({
      x: M,
      y
    }), R = !1, l(As, !0), x(() => {
      R = !0, l(As);
    }), Bn(q);
  }, {
    H: !1,
    I: !0
  }), fe(v, "pointerdown", Z(fe, _, "click", ho, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), F(), D, A]);
}, ya = (t, e, n, o, s, l) => {
  let c, d, i, u, f, _ = ft, m = 0;
  const v = ["mouse", "pen"], h = (T) => v.includes(T.pointerType), [k, x] = pt(), [D, V] = pt(100), [A, C] = pt(100), [F, R] = pt(() => m), [q, M] = ga(t, s, o, ba(e, s, o, (T) => h(T) && oe())), { ht: y, Qt: w, wt: L } = s, { jt: S, Nt: U, qt: $, Bt: N, Ft: P } = q, J = (T, H) => {
    if (R(), T)
      S(Ds);
    else {
      const z = Z(S, Ds, !0);
      m > 0 && !H ? F(z) : z();
    }
  }, oe = () => {
    (i ? !c : !u) && (J(!0), D(() => {
      J(!1);
    }));
  }, E = (T) => {
    S(Gn, T, !0), S(Gn, T, !1);
  }, ve = (T) => {
    h(T) && (c = i, i && J(!0));
  }, X = [R, V, C, x, () => _(), fe(y, "pointerover", ve, {
    A: !0
  }), fe(y, "pointerenter", ve), fe(y, "pointerleave", (T) => {
    h(T) && (c = !1, i && J(!1));
  }), fe(y, "pointermove", (T) => {
    h(T) && d && oe();
  }), fe(w, "scroll", (T) => {
    k(() => {
      $(), oe();
    }), l(T), P();
  })];
  return [() => Z(Ve, pe(X, M())), ({ It: T, Dt: H, Zt: z, tn: O }) => {
    const { nn: W, sn: G, en: Y, cn: se } = O || {}, { Ct: ce, dt: we } = z || {}, { F: he } = n, { T: Te } = Ye(), { k: ne, rn: Se } = o, [Oe, $e] = T("showNativeOverlaidScrollbars"), [xe, ge] = T("scrollbars.theme"), [be, me] = T("scrollbars.visibility"), [de, Ce] = T("scrollbars.autoHide"), [Ae, Et] = T("scrollbars.autoHideSuspend"), [Vt] = T("scrollbars.autoHideDelay"), [Ut, Nt] = T("scrollbars.dragScroll"), [dt, Tt] = T("scrollbars.clickScroll"), [Ht, yn] = T("overflow"), wn = we && !H, Sn = Se.x || Se.y, Be = W || G || se || ce || H, kn = Y || me || yn, Pt = Oe && Te.x && Te.y, Bt = (ot, Dt, At) => {
      const qt = ot.includes(yt) && (be === at || be === "auto" && Dt === yt);
      return S(ta, qt, At), qt;
    };
    if (m = Vt, wn && (Ae && Sn ? (E(!1), _(), A(() => {
      _ = fe(w, "scroll", Z(E, !0), {
        A: !0
      });
    })) : E(!0)), $e && S(Zr, Pt), ge && (S(f), S(xe, !0), f = xe), Et && !Ae && E(!0), Ce && (d = de === "move", i = de === "leave", u = de === "never", J(u, !0)), Nt && S(oa, Ut), Tt && S(sa, !!dt), kn) {
      const ot = Bt(Ht.x, ne.x, !0), Dt = Bt(Ht.y, ne.y, !1);
      S(na, !(ot && Dt));
    }
    Be && ($(), U(), P(), se && N(), S(Ts, !Se.x, !0), S(Ts, !Se.y, !1), S(Jr, he && !L));
  }, {}, q];
}, wa = (t) => {
  const e = Ye(), { Z: n, P: o } = e, { elements: s } = n(), { padding: l, viewport: c, content: d } = s, i = ln(t), u = i ? {} : t, { elements: f } = u, { padding: _, viewport: m, content: v } = f || {}, h = i ? t : u.target, k = co(h), x = h.ownerDocument, D = x.documentElement, V = () => x.defaultView || Fe, A = Z(pa, [h]), C = Z(Ao, [h]), F = Z(gt, ""), R = Z(A, F, c), q = Z(C, F, d), M = (ne) => {
    const Se = bt(ne), Oe = dn(ne), $e = nt(ne, Qs), xe = nt(ne, eo);
    return Oe.w - Se.w > 0 && !St($e) || Oe.h - Se.h > 0 && !St(xe);
  }, y = R(m), w = y === h, L = w && k, S = !w && q(v), U = !w && y === S, $ = L ? D : y, N = L ? $ : h, P = !w && C(F, l, _), J = !U && S, oe = [J, $, P, N].map((ne) => ln(ne) && !Ft(ne) && ne), E = (ne) => ne && js(oe, ne), ve = !E($) && M($) ? $ : h, X = L ? D : $, H = {
    vt: h,
    ht: N,
    U: $,
    ln: P,
    bt: J,
    gt: X,
    Qt: L ? x : $,
    an: k ? D : ve,
    Kt: x,
    wt: k,
    Mt: i,
    L: w,
    un: V,
    yt: (ne) => rs($, et, ne),
    St: (ne, Se) => cn($, et, ne, Se),
    Ot: () => cn(X, et, Gr, !0)
  }, { vt: z, ht: O, ln: W, U: G, bt: Y } = H, se = [() => {
    qe(O, [lt, En]), qe(z, En), k && qe(D, [En, lt]);
  }];
  let ce = Un([Y, G, W, O, z].find((ne) => ne && !E(ne)));
  const we = L ? z : Y || G, he = Z(Ve, se);
  return [H, () => {
    const ne = V(), Se = Nn(), Oe = (me) => {
      Me(Ft(me), Un(me)), wt(me);
    }, $e = (me) => fe(me, "focusin focusout focus blur", ho, {
      I: !0,
      H: !1
    }), xe = "tabindex", ge = ss(G, xe), be = $e(Se);
    return Qe(O, lt, w ? "" : Br), Qe(W, jn, ""), Qe(G, et, ""), Qe(Y, Cs, ""), w || (Qe(G, xe, ge || "-1"), k && Qe(D, xs, "")), Me(we, ce), Me(O, W), Me(W || O, !w && G), Me(G, Y), pe(se, [be, () => {
      const me = Nn(), de = E(G), Ce = de && me === G ? z : me, Ae = $e(Ce);
      qe(W, jn), qe(Y, Cs), qe(G, et), k && qe(D, xs), ge ? Qe(G, xe, ge) : qe(G, xe), E(Y) && Oe(Y), de && Oe(G), E(W) && Oe(W), qn(Ce), Ae();
    }]), o && !w && (os(G, et, ko), pe(se, Z(qe, G, et))), qn(!w && k && Se === z && ne.top === ne ? G : Se), be(), ce = 0, he;
  }, he];
}, Sa = ({ bt: t }) => ({ Zt: e, _n: n, Dt: o }) => {
  const { xt: s } = e || {}, { $t: l } = n;
  t && (s || o) && Lt(t, {
    [pn]: l && "100%"
  });
}, ka = ({ ht: t, ln: e, U: n, L: o }, s) => {
  const [l, c] = Le({
    i: Or,
    o: ys()
  }, Z(ys, t, "padding", ""));
  return ({ It: d, Zt: i, _n: u, Dt: f }) => {
    let [_, m] = c(f);
    const { P: v } = Ye(), { ft: h, Ht: k, Ct: x } = i || {}, { F: D } = u, [V, A] = d("paddingAbsolute");
    (h || m || (f || k)) && ([_, m] = l(f));
    const F = !o && (A || x || m);
    if (F) {
      const R = !V || !e && !v, q = _.r + _.l, M = _.t + _.b, y = {
        [Zs]: R && !D ? -q : 0,
        [Js]: R ? -M : 0,
        [Xs]: R && D ? -q : 0,
        top: R ? -_.t : 0,
        right: R ? D ? -_.r : "auto" : 0,
        left: R ? D ? "auto" : -_.l : 0,
        [mn]: R && `calc(100% + ${q}px)`
      }, w = {
        [Gs]: R ? _.t : 0,
        [Ws]: R ? _.r : 0,
        [Ys]: R ? _.b : 0,
        [Ks]: R ? _.l : 0
      };
      Lt(e || n, y), Lt(n, w), ae(s, {
        ln: _,
        dn: !R,
        j: e ? w : ae({}, y, w)
      });
    }
    return {
      fn: F
    };
  };
}, $a = (t, e) => {
  const n = Ye(), { ht: o, ln: s, U: l, L: c, Qt: d, gt: i, wt: u, St: f, un: _ } = t, { P: m } = n, v = u && c, h = Z(qs, 0), k = {
    display: () => !1,
    direction: (T) => T !== "ltr",
    flexDirection: (T) => T.endsWith("-reverse"),
    writingMode: (T) => T !== "horizontal-tb"
  }, x = Pe(k), D = {
    i: to,
    o: {
      w: 0,
      h: 0
    }
  }, V = {
    i: Qt,
    o: {}
  }, A = (T) => {
    f(So, !v && T);
  }, C = (T) => {
    if (!x.some((we) => {
      const he = T[we];
      return he && k[we](he);
    }))
      return {
        D: {
          x: 0,
          y: 0
        },
        M: {
          x: 1,
          y: 1
        }
      };
    A(!0);
    const z = Re(i), O = f(Wr, !0), W = fe(d, yt, (we) => {
      const he = Re(i);
      we.isTrusted && he.x === z.x && he.y === z.y && po(we);
    }, {
      I: !0,
      A: !0
    });
    je(i, {
      x: 0,
      y: 0
    }), O();
    const G = Re(i), Y = dn(i);
    je(i, {
      x: Y.w,
      y: Y.h
    });
    const se = Re(i);
    je(i, {
      x: se.x - G.x < 1 && -Y.w,
      y: se.y - G.y < 1 && -Y.h
    });
    const ce = Re(i);
    return je(i, z), Zn(() => W()), {
      D: G,
      M: ce
    };
  }, F = (T, H) => {
    const z = Fe.devicePixelRatio % 1 !== 0 ? 1 : 0, O = {
      w: h(T.w - H.w),
      h: h(T.h - H.h)
    };
    return {
      w: O.w > z ? O.w : 0,
      h: O.h > z ? O.h : 0
    };
  }, [R, q] = Le(D, Z(ls, l)), [M, y] = Le(D, Z(dn, l)), [w, L] = Le(D), [S] = Le(V), [U, $] = Le(D), [N] = Le(V), [P] = Le({
    i: (T, H) => hn(T, H, x),
    o: {}
  }, () => Ur(l) ? nt(l, x) : {}), [J, oe] = Le({
    i: (T, H) => Qt(T.D, H.D) && Qt(T.M, H.M),
    o: go()
  }), E = Rt(xo), ve = (T, H) => `${H ? qr : zr}${Ar(T)}`, X = (T) => {
    const H = (O) => [at, ut, yt].map((W) => ve(W, O)), z = H(!0).concat(H()).join(" ");
    f(z), f(Pe(T).map((O) => ve(T[O], O === "x")).join(" "), !0);
  };
  return ({ It: T, Zt: H, _n: z, Dt: O }, { fn: W }) => {
    const { ft: G, Ht: Y, Ct: se, dt: ce, zt: we } = H || {}, he = E && E.V(t, e, z, n, T), { W: Te, X: ne, J: Se } = he || {}, [Oe, $e] = aa(T, n), [xe, ge] = T("overflow"), be = St(xe.x), me = St(xe.y), de = !0;
    let Ce = q(O), Ae = y(O), Et = L(O), Vt = $(O);
    $e && m && f(ko, !Oe);
    {
      rs(o, lt, tn) && A(!0);
      const [vs] = ne ? ne() : [], [zt] = Ce = R(O), [jt] = Ae = M(O), Gt = vo(l), Wt = v && Vr(_()), qo = {
        w: h(jt.w + zt.w),
        h: h(jt.h + zt.h)
      }, ms = {
        w: h((Wt ? Wt.w : Gt.w + h(Gt.w - jt.w)) + zt.w),
        h: h((Wt ? Wt.h : Gt.h + h(Gt.h - jt.h)) + zt.h)
      };
      vs && vs(), Vt = U(ms), Et = w(F(qo, ms), O);
    }
    const [Ut, Nt] = Vt, [dt, Tt] = Et, [Ht, yn] = Ae, [wn, Sn] = Ce, [Be, kn] = S({
      x: dt.w > 0,
      y: dt.h > 0
    }), Pt = be && me && (Be.x || Be.y) || be && Be.x && !Be.y || me && Be.y && !Be.x, Bt = W || se || we || Sn || yn || Nt || Tt || ge || $e || de, ot = la(Be, xe), [Dt, At] = N(ot.k), [qt, Ho] = P(O), fs = se || ce || Ho || kn || O, [Po, Bo] = fs ? J(C(qt), O) : oe();
    return Bt && (At && X(ot.k), Se && Te && Lt(l, Se(ot, z, Te(ot, Ht, wn)))), A(!1), cn(o, lt, tn, Pt), cn(s, jn, tn, Pt), ae(e, {
      k: Dt,
      Vt: {
        x: Ut.w,
        y: Ut.h
      },
      Rt: {
        x: dt.w,
        y: dt.h
      },
      rn: Be,
      Lt: Nr(Po, dt)
    }), {
      en: At,
      nn: Nt,
      sn: Tt,
      cn: Bo || Tt,
      pn: fs
    };
  };
}, xa = (t) => {
  const [e, n, o] = wa(t), s = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    j: {
      [Zs]: 0,
      [Js]: 0,
      [Xs]: 0,
      [Gs]: 0,
      [Ws]: 0,
      [Ys]: 0,
      [Ks]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    k: {
      x: ut,
      y: ut
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: go()
  }, { vt: l, gt: c, L: d, Ot: i } = e, { P: u, T: f } = Ye(), _ = !u && (f.x || f.y), m = [Sa(e), ka(e, s), $a(e, s)];
  return [n, (v) => {
    const h = {}, x = _ && Re(c), D = x && i();
    return ie(m, (V) => {
      ae(h, V(v, h) || {});
    }), je(c, x), D && D(), !d && je(l, 0), h;
  }, s, e, o];
}, Ca = (t, e, n, o, s) => {
  let l = !1;
  const c = Fs(e, {}), [d, i, u, f, _] = xa(t), [m, v, h] = ma(f, u, c, (C) => {
    A({}, C);
  }), [k, x, , D] = ya(t, e, h, u, f, s), V = (C) => Pe(C).some((F) => !!C[F]), A = (C, F) => {
    if (n())
      return !1;
    const { vn: R, Dt: q, At: M, hn: y } = C, w = R || {}, L = !!q || !l, S = {
      It: Fs(e, w, L),
      vn: w,
      Dt: L
    };
    if (y)
      return x(S), !1;
    const U = F || v(ae({}, S, {
      At: M
    })), $ = i(ae({}, S, {
      _n: h,
      Zt: U
    }));
    x(ae({}, S, {
      Zt: U,
      tn: $
    }));
    const N = V(U), P = V($), J = N || P || !ns(w) || L;
    return l = !0, J && o(C, {
      Zt: U,
      tn: $
    }), J;
  };
  return [() => {
    const { an: C, gt: F, Ot: R } = f, q = Re(C), M = [m(), d(), k()], y = R();
    return je(F, q), y(), Z(Ve, M);
  }, A, () => ({
    gn: h,
    bn: _
  }), {
    wn: f,
    yn: D
  }, _];
}, ds = /* @__PURE__ */ new WeakMap(), Ea = (t, e) => {
  ds.set(t, e);
}, Ta = (t) => {
  ds.delete(t);
}, Oo = (t) => ds.get(t), Ke = (t, e, n) => {
  const { nt: o } = Ye(), s = ln(t), l = s ? t : t.target, c = Oo(l);
  if (e && !c) {
    let d = !1;
    const i = [], u = {}, f = (w) => {
      const L = so(w), S = Rt(Pr);
      return S ? S(L, !0) : L;
    }, _ = ae({}, o(), f(e)), [m, v, h] = zn(), [k, x, D] = zn(n), V = (w, L) => {
      D(w, L), h(w, L);
    }, [A, C, F, R, q] = Ca(t, _, () => d, ({ vn: w, Dt: L }, { Zt: S, tn: U }) => {
      const { ft: $, Ct: N, xt: P, Ht: J, Et: oe, dt: E } = S, { nn: ve, sn: X, en: T, cn: H } = U;
      V("updated", [y, {
        updateHints: {
          sizeChanged: !!$,
          directionChanged: !!N,
          heightIntrinsicChanged: !!P,
          overflowEdgeChanged: !!ve,
          overflowAmountChanged: !!X,
          overflowStyleChanged: !!T,
          scrollCoordinatesChanged: !!H,
          contentMutation: !!J,
          hostMutation: !!oe,
          appear: !!E
        },
        changedOptions: w || {},
        force: !!L
      }]);
    }, (w) => V("scroll", [y, w])), M = (w) => {
      Ta(l), Ve(i), d = !0, V("destroyed", [y, w]), v(), x();
    }, y = {
      options(w, L) {
        if (w) {
          const S = L ? o() : {}, U = Co(_, ae(S, f(w)));
          ns(U) || (ae(_, U), C({
            vn: U
          }));
        }
        return ae({}, _);
      },
      on: k,
      off: (w, L) => {
        w && L && x(w, L);
      },
      state() {
        const { gn: w, bn: L } = F(), { F: S } = w, { Vt: U, Rt: $, k: N, rn: P, ln: J, dn: oe, Lt: E } = L;
        return ae({}, {
          overflowEdge: U,
          overflowAmount: $,
          overflowStyle: N,
          hasOverflow: P,
          scrollCoordinates: {
            start: E.D,
            end: E.M
          },
          padding: J,
          paddingAbsolute: oe,
          directionRTL: S,
          destroyed: d
        });
      },
      elements() {
        const { vt: w, ht: L, ln: S, U, bt: $, gt: N, Qt: P } = R.wn, { Yt: J, Gt: oe } = R.yn, E = (X) => {
          const { Pt: T, Ut: H, Tt: z } = X;
          return {
            scrollbar: z,
            track: H,
            handle: T
          };
        }, ve = (X) => {
          const { Wt: T, Xt: H } = X, z = E(T[0]);
          return ae({}, z, {
            clone: () => {
              const O = E(H());
              return C({
                hn: !0
              }), O;
            }
          });
        };
        return ae({}, {
          target: w,
          host: L,
          padding: S || U,
          viewport: U,
          content: $ || U,
          scrollOffsetElement: N,
          scrollEventElement: P,
          scrollbarHorizontal: ve(J),
          scrollbarVertical: ve(oe)
        });
      },
      update: (w) => C({
        Dt: w,
        At: !0
      }),
      destroy: Z(M, !1),
      plugin: (w) => u[Pe(w)[0]]
    };
    return pe(i, [q]), Ea(l, y), wo(bo, Ke, [y, m, u]), ha(R.wn.wt, !s && t.cancel) ? (M(!0), y) : (pe(i, A()), V("initialized", [y]), y.update(), y);
  }
  return c;
};
Ke.plugin = (t) => {
  const e = We(t), n = e ? t : [t], o = n.map((s) => wo(s, Ke)[0]);
  return Hr(n), e ? o : o[0];
};
Ke.valid = (t) => {
  const e = t && t.elements, n = Ne(e) && e();
  return an(n) && !!Oo(n.target);
};
Ke.env = () => {
  const { N: t, T: e, P: n, G: o, st: s, et: l, Z: c, tt: d, nt: i, ot: u } = Ye();
  return ae({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: o,
    staticDefaultInitialization: s,
    staticDefaultOptions: l,
    getDefaultInitialization: c,
    setDefaultInitialization: d,
    getDefaultOptions: i,
    setDefaultOptions: u
  });
};
Ke.nonce = ua;
function Da() {
  let t;
  const e = I(null), n = Math.floor(Math.random() * 2 ** 32), o = I(!1), s = I([]), l = () => s.value, c = () => t.getSelection(), d = () => s.value.length, i = () => t.clearSelection(!0), u = I(), f = I(null), _ = I(null), m = I(null), v = I(null);
  function h() {
    t = new sr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: F, event: R, isDragging: q }) => {
      if (q)
        t.Interaction._reset(R);
      else {
        o.value = !1;
        const M = e.value.offsetWidth - R.offsetX, y = e.value.offsetHeight - R.offsetY;
        M < 15 && y < 15 && t.Interaction._reset(R), R.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(R);
      }
    }), document.addEventListener("dragleave", (F) => {
      !F.buttons && o.value && (o.value = !1);
    });
  }
  const k = () => _t(() => {
    t.addSelection(
      t.getSelectables()
    ), x();
  }), x = () => {
    s.value = t.getSelection().map((F) => JSON.parse(F.dataset.item)), u.value(s.value);
  }, D = () => _t(() => {
    const F = l().map((R) => R.path);
    i(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((R) => F.includes(JSON.parse(R.dataset.item).path))
    ), x(), A();
  }), V = (F) => {
    u.value = F, t.subscribe("DS:end", ({ items: R, event: q, isDragging: M }) => {
      s.value = R.map((y) => JSON.parse(y.dataset.item)), F(R.map((y) => JSON.parse(y.dataset.item)));
    });
  }, A = () => {
    f.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (_.value.style.height = e.value.scrollHeight + "px", _.value.style.display = "block") : (_.value.style.height = "100%", _.value.style.display = "none"));
  }, C = (F) => {
    if (!f.value)
      return;
    const { scrollOffsetElement: R } = f.value.elements();
    R.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ee(() => {
    Ke(m.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: Ke
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (F) => {
        f.value = F;
      },
      scroll: (F, R) => {
        const { scrollOffsetElement: q } = F.elements();
        e.value.scrollTo({
          top: q.scrollTop,
          left: 0
        });
      }
    }), h(), A(), v.value = new ResizeObserver(A), v.value.observe(e.value), e.value.addEventListener("scroll", C), t.subscribe("DS:scroll", ({ isDragging: F }) => F || C());
  }), Yn(() => {
    t && t.stop(), v.value && v.value.disconnect();
  }), Vs(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: o,
    scrollBar: _,
    scrollBarContainer: m,
    getSelected: l,
    getSelection: c,
    selectAll: k,
    clearSelection: i,
    refreshSelection: D,
    getCount: d,
    onSelect: V
  };
}
function Aa(t, e) {
  const n = I(t), o = I(e), s = I([]), l = I([]), c = I([]), d = I(!1), i = I(5);
  let u = !1, f = !1;
  const _ = kt({
    adapter: n,
    storages: [],
    dirname: o,
    files: []
  });
  function m() {
    let V = [], A = [], C = o.value ?? n.value + "://";
    C.length === 0 && (s.value = []), C.replace(n.value + "://", "").split("/").forEach(function(q) {
      V.push(q), V.join("/") !== "" && A.push({
        basename: q,
        name: q,
        path: n.value + "://" + V.join("/"),
        type: "dir"
      });
    }), l.value = A;
    const [F, R] = h(A, i.value);
    c.value = R, s.value = F;
  }
  function v(V) {
    i.value = V, m();
  }
  function h(V, A) {
    return V.length > A ? [V.slice(-A), V.slice(0, -A)] : [V, []];
  }
  function k(V = null) {
    d.value = V ?? !d.value;
  }
  function x() {
    return s.value && s.value.length && !f;
  }
  const D = it(() => {
    var V;
    return ((V = s.value[s.value.length - 2]) == null ? void 0 : V.path) ?? n.value + "://";
  });
  return Ee(() => {
  }), Ie(o, m), Ee(m), {
    adapter: n,
    path: o,
    loading: u,
    searchMode: f,
    data: _,
    breadcrumbs: s,
    breadcrumbItems: l,
    limitBreadcrumbItems: v,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: k,
    isGoUpAvailable: x,
    parentFolderPath: D
  };
}
const Oa = (t, e) => {
  const n = br(t.id), o = nr(), s = n.getStore("metricUnits", !1), l = xr(n, t.theme), c = e.i18n, d = t.locale ?? e.locale, i = (h) => Array.isArray(h) ? h : Sr, u = n.getStore("persist-path", t.persist), f = u ? n.getStore("path", t.path) : t.path, _ = u ? n.getStore("adapter") : null, m = Da(), v = e.icons;
  return kt({
    /** 
    * Core properties
    * */
    // app version
    version: kr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: wr(n, d, o, c),
    // modal state
    modal: Cr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: it(() => m),
    // http object
    requester: gr(t.request),
    // active features
    features: i(t.features),
    // view state
    view: n.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: n.getStore("full-screen", t.fullScreen),
    // show tree view
    showTreeView: n.getStore("show-tree-view", t.showTreeView),
    // pinnedFolders
    pinnedFolders: n.getStore("pinned-folders", t.pinnedFolders),
    // treeViewData
    treeViewData: [],
    // selectButton state
    selectButton: t.selectButton,
    // max file size
    maxFileSize: t.maxFileSize,
    //icon component
    iconComponent: e.iconComponent,
    // icons
    icons: l,
    /**
    * Settings
    * */
    // theme state
    theme: l,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Bs : Ps,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: f,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // type of progress indicator
    loadingIndicator: t.loadingIndicator,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // icon component
    iconComponent: e.iconComponent,
    // icons
    icons: v,
    // file system
    fs: Aa(_, f)
  });
}, Ia = { class: "vuefinder__modal-layout__container" }, Fa = { class: "vuefinder__modal-layout__content" }, La = { class: "vuefinder__modal-layout__footer" }, Xe = {
  __name: "ModalLayout",
  setup(t) {
    const e = I(null), n = re("ServiceContainer");
    return Ee(() => {
      const o = document.querySelector(".v-f-modal input");
      o && o.focus(), _t(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (o, s) => (p(), b("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = $t((l) => r(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      a("div", Ia, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = tt((l) => r(n).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", Fa, [
              Ot(o.$slots, "default")
            ]),
            a("div", La, [
              Ot(o.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ma = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, s] of e)
    n[o] = s;
  return n;
}, Ra = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = re("ServiceContainer"), s = I(!1), { t: l } = o.i18n;
    let c = null;
    const d = () => {
      clearTimeout(c), s.value = !0, c = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return Ee(() => {
      o.emitter.on(t.on, d);
    }), Yn(() => {
      clearTimeout(c);
    }), {
      shown: s,
      t: l
    };
  }
}, Va = { key: 1 };
function Ua(t, e, n, o, s, l) {
  return p(), b("div", {
    class: le(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Ot(t.$slots, "default", { key: 0 }) : (p(), b("span", Va, g(o.t("Saved.")), 1))
  ], 2);
}
const mt = /* @__PURE__ */ Ma(Ra, [["render", Ua]]), Na = { class: "vuefinder__modal-header" }, Ha = { class: "vuefinder__modal-header__icon-container" }, Pa = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, st = {
  __name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: !0
    },
    icon: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    return (e, n) => (p(), b("div", Na, [
      a("div", Ha, [
        (p(), K(Xn(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      a("h3", Pa, g(t.title), 1)
    ]));
  }
}, Ba = { class: "vuefinder__about-modal__content" }, qa = { class: "vuefinder__about-modal__main" }, za = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, ja = ["onClick", "aria-current"], Ga = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Wa = { class: "vuefinder__about-modal__description" }, Ka = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Ya = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Xa = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Za = { class: "vuefinder__about-modal__description" }, Ja = { class: "vuefinder__about-modal__settings" }, Qa = { class: "vuefinder__about-modal__setting flex" }, el = { class: "vuefinder__about-modal__setting-input" }, tl = { class: "vuefinder__about-modal__setting-label" }, nl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, sl = { class: "vuefinder__about-modal__setting flex" }, ol = { class: "vuefinder__about-modal__setting-input" }, rl = { class: "vuefinder__about-modal__setting-label" }, al = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, ll = { class: "vuefinder__about-modal__setting flex" }, il = { class: "vuefinder__about-modal__setting-input" }, cl = { class: "vuefinder__about-modal__setting-label" }, dl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, ul = { class: "vuefinder__about-modal__setting flex" }, _l = { class: "vuefinder__about-modal__setting-input" }, fl = { class: "vuefinder__about-modal__setting-label" }, vl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, ml = { class: "vuefinder__about-modal__setting" }, pl = { class: "vuefinder__about-modal__setting-input" }, hl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, gl = { class: "vuefinder__about-modal__setting-label" }, bl = ["label"], yl = ["value"], wl = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Sl = { class: "vuefinder__about-modal__setting-input" }, kl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, $l = { class: "vuefinder__about-modal__setting-label" }, xl = ["label"], Cl = ["value"], El = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Tl = { class: "vuefinder__about-modal__shortcuts" }, Dl = { class: "vuefinder__about-modal__shortcut" }, Al = { class: "vuefinder__about-modal__shortcut" }, Ol = { class: "vuefinder__about-modal__shortcut" }, Il = { class: "vuefinder__about-modal__shortcut" }, Fl = { class: "vuefinder__about-modal__shortcut" }, Ll = { class: "vuefinder__about-modal__shortcut" }, Ml = { class: "vuefinder__about-modal__shortcut" }, Rl = { class: "vuefinder__about-modal__shortcut" }, Vl = { class: "vuefinder__about-modal__shortcut" }, Ul = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Nl = { class: "vuefinder__about-modal__description" }, Io = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: o } = e.storage, { t: s } = e.i18n, l = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = it(() => [
      { name: s("About"), key: l.ABOUT },
      { name: s("Settings"), key: l.SETTINGS },
      { name: s("Shortcuts"), key: l.SHORTCUTS },
      { name: s("Reset"), key: l.RESET }
    ]), d = I("about"), i = async () => {
      o(), location.reload();
    }, u = (V) => {
      e.theme.set(V), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Bs : Ps, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, m = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, v = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), x = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        pl: "Polish (Polski)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([V]) => Object.keys(h).includes(V))
    ), D = it(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (V, A) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          onClick: A[7] || (A[7] = (C) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(s)("Close")), 1)
      ]),
      default: ee(() => [
        a("div", Ba, [
          j(st, {
            icon: r(or),
            title: "Vuefinder " + r(e).version
          }, null, 8, ["icon", "title"]),
          a("div", qa, [
            a("div", null, [
              a("div", null, [
                a("nav", za, [
                  (p(!0), b(ye, null, ke(c.value, (C) => (p(), b("button", {
                    key: C.name,
                    onClick: (F) => d.value = C.key,
                    class: le([C.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": C.current ? "page" : void 0
                  }, g(C.name), 11, ja))), 128))
                ])
              ])
            ]),
            d.value === l.ABOUT ? (p(), b("div", Ga, [
              a("div", Wa, g(r(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", Ka, g(r(s)("Project home")), 1),
              a("a", Ya, g(r(s)("Follow on GitHub")), 1)
            ])) : B("", !0),
            d.value === l.SETTINGS ? (p(), b("div", Xa, [
              a("div", Za, g(r(s)("Customize your experience with the following settings")), 1),
              a("div", Ja, [
                a("fieldset", null, [
                  a("div", Qa, [
                    a("div", el, [
                      _e(a("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": A[0] || (A[0] = (C) => r(e).metricUnits = C),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Kt, r(e).metricUnits]
                      ])
                    ]),
                    a("div", tl, [
                      a("label", nl, [
                        Q(g(r(s)("Use Metric Units")) + " ", 1),
                        j(mt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: ee(() => [
                            Q(g(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", sl, [
                    a("div", ol, [
                      _e(a("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": A[1] || (A[1] = (C) => r(e).compactListView = C),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Kt, r(e).compactListView]
                      ])
                    ]),
                    a("div", rl, [
                      a("label", al, [
                        Q(g(r(s)("Compact list view")) + " ", 1),
                        j(mt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: ee(() => [
                            Q(g(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", ll, [
                    a("div", il, [
                      _e(a("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": A[2] || (A[2] = (C) => r(e).persist = C),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Kt, r(e).persist]
                      ])
                    ]),
                    a("div", cl, [
                      a("label", dl, [
                        Q(g(r(s)("Persist path on reload")) + " ", 1),
                        j(mt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: ee(() => [
                            Q(g(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", ul, [
                    a("div", _l, [
                      _e(a("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": A[3] || (A[3] = (C) => r(e).showThumbnails = C),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Kt, r(e).showThumbnails]
                      ])
                    ]),
                    a("div", fl, [
                      a("label", vl, [
                        Q(g(r(s)("Show thumbnails")) + " ", 1),
                        j(mt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: ee(() => [
                            Q(g(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", ml, [
                    a("div", pl, [
                      a("label", hl, g(r(s)("Theme")), 1)
                    ]),
                    a("div", gl, [
                      _e(a("select", {
                        id: "theme",
                        "onUpdate:modelValue": A[4] || (A[4] = (C) => r(e).theme.value = C),
                        onChange: A[5] || (A[5] = (C) => u(C.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Theme")
                        }, [
                          (p(!0), b(ye, null, ke(D.value, (C, F) => (p(), b("option", { value: F }, g(C), 9, yl))), 256))
                        ], 8, bl)
                      ], 544), [
                        [On, r(e).theme.value]
                      ]),
                      j(mt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: ee(() => [
                          Q(g(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  r(e).features.includes(r(ue).LANGUAGE) && Object.keys(r(x)).length > 1 ? (p(), b("div", wl, [
                    a("div", Sl, [
                      a("label", kl, g(r(s)("Language")), 1)
                    ]),
                    a("div", $l, [
                      _e(a("select", {
                        id: "language",
                        "onUpdate:modelValue": A[6] || (A[6] = (C) => r(e).i18n.locale = C),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Language")
                        }, [
                          (p(!0), b(ye, null, ke(r(x), (C, F) => (p(), b("option", { value: F }, g(C), 9, Cl))), 256))
                        ], 8, xl)
                      ], 512), [
                        [On, r(e).i18n.locale]
                      ]),
                      j(mt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: ee(() => [
                          Q(g(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : B("", !0)
                ])
              ])
            ])) : B("", !0),
            d.value === l.SHORTCUTS ? (p(), b("div", El, [
              a("div", Tl, [
                a("div", Dl, [
                  a("div", null, g(r(s)("Rename")), 1),
                  A[8] || (A[8] = a("kbd", null, "F2", -1))
                ]),
                a("div", Al, [
                  a("div", null, g(r(s)("Refresh")), 1),
                  A[9] || (A[9] = a("kbd", null, "F5", -1))
                ]),
                a("div", Ol, [
                  Q(g(r(s)("Delete")) + " ", 1),
                  A[10] || (A[10] = a("kbd", null, "Del", -1))
                ]),
                a("div", Il, [
                  Q(g(r(s)("Escape")) + " ", 1),
                  A[11] || (A[11] = a("div", null, [
                    a("kbd", null, "Esc")
                  ], -1))
                ]),
                a("div", Fl, [
                  Q(g(r(s)("Select All")) + " ", 1),
                  A[12] || (A[12] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, "A")
                  ], -1))
                ]),
                a("div", Ll, [
                  Q(g(r(s)("Search")) + " ", 1),
                  A[13] || (A[13] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, "F")
                  ], -1))
                ]),
                a("div", Ml, [
                  Q(g(r(s)("Toggle Sidebar")) + " ", 1),
                  A[14] || (A[14] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, "E")
                  ], -1))
                ]),
                a("div", Rl, [
                  Q(g(r(s)("Open Settings")) + " ", 1),
                  A[15] || (A[15] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, ",")
                  ], -1))
                ]),
                a("div", Vl, [
                  Q(g(r(s)("Toggle Full Screen")) + " ", 1),
                  A[16] || (A[16] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : B("", !0),
            d.value === l.RESET ? (p(), b("div", Ul, [
              a("div", Nl, g(r(s)("Reset all settings to default")), 1),
              a("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(r(s)("Reset Settings")), 1)
            ])) : B("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Hl = ["title"], Ze = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var u;
    const n = e, o = re("ServiceContainer"), { t: s } = o.i18n, l = I(!1), c = I(null), d = I((u = c.value) == null ? void 0 : u.strMessage);
    Ie(d, () => l.value = !1);
    const i = () => {
      n("hidden"), l.value = !0;
    };
    return (f, _) => (p(), b("div", null, [
      l.value ? B("", !0) : (p(), b("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: le(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ot(f.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: r(s)("Close")
        }, _[0] || (_[0] = [
          a("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            a("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ]), 8, Hl)
      ], 2))
    ]));
  }
}, Pl = { class: "vuefinder__delete-modal__content" }, Bl = { class: "vuefinder__delete-modal__form" }, ql = { class: "vuefinder__delete-modal__description" }, zl = { class: "vuefinder__delete-modal__files vf-scrollbar" }, jl = { class: "vuefinder__delete-modal__file" }, Gl = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wl = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kl = { class: "vuefinder__delete-modal__file-name" }, Yl = { class: "vuefinder__delete-modal__warning" }, us = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = I(e.modal.data.items), s = I(""), l = () => {
      o.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: o.value.map(({ path: c, type: d }) => ({ path: c, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-danger"
        }, g(r(n)("Yes, Delete!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1),
        a("div", Yl, g(r(n)("This action cannot be undone.")), 1)
      ]),
      default: ee(() => [
        a("div", null, [
          j(st, {
            icon: r(rr),
            title: r(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", Pl, [
            a("div", Bl, [
              a("p", ql, g(r(n)("Are you sure you want to delete these files?")), 1),
              a("div", zl, [
                (p(!0), b(ye, null, ke(o.value, (i) => (p(), b("p", jl, [
                  i.type === "dir" ? (p(), b("svg", Gl, d[2] || (d[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (p(), b("svg", Wl, d[3] || (d[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", Kl, g(i.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (p(), K(Ze, {
                key: 0,
                onHidden: d[0] || (d[0] = (i) => s.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  Q(g(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Xl = { class: "vuefinder__rename-modal__content" }, Zl = { class: "vuefinder__rename-modal__item" }, Jl = { class: "vuefinder__rename-modal__item-info" }, Ql = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ei = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ti = { class: "vuefinder__rename-modal__item-name" }, _s = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = I(e.modal.data.items[0]), s = I(e.modal.data.items[0].basename), l = I(""), c = () => {
      s.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: o.value.path,
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", s.value) });
        },
        onError: (d) => {
          l.value = n(d.message);
        }
      });
    };
    return (d, i) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        a("div", null, [
          j(st, {
            icon: r(ar),
            title: r(n)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", Xl, [
            a("div", Zl, [
              a("p", Jl, [
                o.value.type === "dir" ? (p(), b("svg", Ql, i[3] || (i[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (p(), b("svg", ei, i[4] || (i[4] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", ti, g(o.value.basename), 1)
              ]),
              _e(a("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => s.value = u),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [xt, s.value]
              ]),
              l.value.length ? (p(), K(Ze, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => l.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  Q(g(l.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Je = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function ni(t) {
  const e = (n) => {
    n.code === Je.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Je.F2 && t.features.includes(ue.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(_s, { items: t.dragSelect.getSelected() })), n.code === Je.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Je.DELETE && (!t.dragSelect.getCount() || t.modal.open(us, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Je.BACKSLASH && t.modal.open(Io), n.metaKey && n.code === Je.KEY_F && t.features.includes(ue.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Je.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Je.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Je.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  Ee(() => {
    t.root.addEventListener("keydown", e);
  });
}
const si = { class: "vuefinder__new-folder-modal__content" }, oi = { class: "vuefinder__new-folder-modal__form" }, ri = { class: "vuefinder__new-folder-modal__description" }, ai = ["placeholder"], Fo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = oe("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, o = I(""), s = I(""), l = () => {
      o.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        a("div", null, [
          j(st, {
            icon: r(lr),
            title: r(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", si, [
            a("div", oi, [
              a("p", ri, g(r(n)("Create a new folder")), 1),
              _e(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: $t(l, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: r(n)("Folder Name"),
                type: "text"
              }, null, 40, ai), [
                [xt, o.value]
              ]),
              s.value.length ? (p(), K(Ze, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  Q(g(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, li = { class: "vuefinder__new-file-modal__content" }, ii = { class: "vuefinder__new-file-modal__form" }, ci = { class: "vuefinder__new-file-modal__description" }, di = ["placeholder"], ui = {
  __name: "ModalNewFile",
  setup(t) {
    const e = oe("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, o = I(""), s = I(""), l = () => {
      o.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        a("div", null, [
          j(st, {
            icon: r(ir),
            title: r(n)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", li, [
            a("div", ii, [
              a("p", ci, g(r(n)("Create a new file")), 1),
              _e(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: $t(l, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: r(n)("File Name"),
                type: "text"
              }, null, 40, di), [
                [xt, o.value]
              ]),
              s.value.length ? (p(), K(Ze, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  Q(g(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function Wn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const _i = { class: "vuefinder__upload-modal__content" }, fi = {
  key: 0,
  class: "pointer-events-none"
}, vi = {
  key: 1,
  class: "pointer-events-none"
}, mi = ["disabled"], pi = ["disabled"], hi = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, gi = ["textContent"], bi = { class: "vuefinder__upload-modal__file-info" }, yi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, wi = { class: "vuefinder__upload-modal__file-name md:hidden" }, Si = {
  key: 0,
  class: "ml-auto"
}, ki = ["title", "disabled", "onClick"], $i = {
  key: 0,
  class: "py-2"
}, xi = ["disabled"], Ci = {
  __name: "ModalUpload",
  setup(t) {
    const e = oe("ServiceContainer"), { t: n } = e.i18n, o = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, l = I({ QUEUE_ENTRY_STATUS: s }), c = I(null), d = I(null), i = I(null), u = I(null), f = I(null), _ = I(null), m = I([]), v = I(""), h = I(!1), k = I(!1);
    let x;
    function D(S) {
      return m.value.findIndex((U) => U.id === S);
    }
    function V(S, U = null) {
      U = U ?? (S.webkitRelativePath || S.name), x.addFile({
        name: U,
        type: S.type,
        data: S,
        source: "Local"
      });
    }
    function A(S) {
      switch (S.status) {
        case s.DONE:
          return "text-green-600";
        case s.ERROR:
          return "text-red-600";
        case s.CANCELED:
          return "text-red-600";
        case s.PENDING:
        default:
          return "";
      }
    }
    const C = (S) => {
      switch (S.status) {
        case s.DONE:
          return "✓";
        case s.ERROR:
        case s.CANCELED:
          return "!";
        case s.PENDING:
        default:
          return "...";
      }
    };
    function F() {
      u.value.click();
    }
    function R() {
      if (!h.value) {
        if (!m.value.filter((S) => S.status !== s.DONE).length) {
          v.value = n("Please select file to upload first.");
          return;
        }
        v.value = "", x.retryAll(), x.upload();
      }
    }
    function q() {
      x.cancelAll({ reason: "user" }), m.value.forEach((S) => {
        S.status !== s.DONE && (S.status = s.CANCELED, S.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function M(S) {
      h.value || (x.removeFile(S.id, "removed-by-user"), m.value.splice(D(S.id), 1));
    }
    function y(S) {
      if (!h.value) {
        if (x.cancelAll({ reason: "user" }), S) {
          const U = [];
          m.value.forEach(($) => {
            $.status !== s.DONE && U.push($);
          }), m.value = [], U.forEach(($) => {
            V($.originalFile, $.name);
          });
          return;
        }
        m.value.splice(0);
      }
    }
    function w() {
      e.modal.close();
    }
    function L() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ee(async () => {
      x = new fr({
        debug: e.debug,
        restrictions: {
          maxFileSize: $r(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: o,
        onBeforeFileAdded($, N) {
          if (N[$.id] != null) {
            const J = D($.id);
            m.value[J].status === s.PENDING && (v.value = x.i18n("noDuplicates", { fileName: $.name })), m.value = m.value.filter((oe) => oe.id !== $.id);
          }
          return m.value.push({
            id: $.id,
            name: $.name,
            size: e.filesize($.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: $.data
          }), !0;
        }
      }), x.use(vr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError($, N) {
          let P;
          try {
            P = JSON.parse($).message;
          } catch {
            P = n("Cannot parse server response.");
          }
          return new Error(P);
        }
      }), x.on("restriction-failed", ($, N) => {
        const P = m.value[D($.id)];
        M(P), v.value = N.message;
      }), x.on("upload", () => {
        const $ = L();
        x.setMeta({ ...$.body });
        const N = x.getPlugin("XHRUpload");
        N.opts.method = $.method, N.opts.endpoint = $.url + "?" + new URLSearchParams($.params), N.opts.headers = $.headers, delete $.headers["Content-Type"], h.value = !0, m.value.forEach((P) => {
          P.status !== s.DONE && (P.percent = null, P.status = s.UPLOADING, P.statusName = n("Pending upload"));
        });
      }), x.on("upload-progress", ($, N) => {
        const P = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        m.value[D($.id)].percent = `${P}%`;
      }), x.on("upload-success", ($) => {
        const N = m.value[D($.id)];
        N.status = s.DONE, N.statusName = n("Done");
      }), x.on("upload-error", ($, N) => {
        const P = m.value[D($.id)];
        P.percent = null, P.status = s.ERROR, N.isNetworkError ? P.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : P.statusName = N ? N.message : n("Unknown Error");
      }), x.on("error", ($) => {
        v.value = $.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), x.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), _.value.addEventListener("click", () => {
        d.value.click();
      }), f.value.addEventListener("click", () => {
        i.value.click();
      }), _.value.addEventListener("dragover", ($) => {
        $.preventDefault(), k.value = !0;
      }), _.value.addEventListener("dragleave", ($) => {
        $.preventDefault(), k.value = !1;
      });
      function S($, N) {
        N.isFile && N.file((P) => $(N, P)), N.isDirectory && N.createReader().readEntries((P) => {
          P.forEach((J) => {
            S($, J);
          });
        });
      }
      _.value.addEventListener("drop", ($) => {
        $.preventDefault(), k.value = !1;
        const N = /^[/\\](.+)/;
        [...$.dataTransfer.items].forEach((P) => {
          P.kind === "file" && S((J, oe) => {
            const E = N.exec(J.fullPath);
            V(oe, E[1]);
          }, P.webkitGetAsEntry());
        });
      });
      const U = ({ target: $ }) => {
        const N = $.files;
        for (const P of N)
          V(P);
        $.value = "";
      };
      d.value.addEventListener("change", U), i.value.addEventListener("change", U);
    }), Us(() => {
      x == null || x.close({ reason: "unmount" });
    }), (S, U) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: tt(R, ["prevent"])
        }, g(r(n)("Upload")), 9, xi),
        h.value ? (p(), b("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: tt(q, ["prevent"])
        }, g(r(n)("Cancel")), 1)) : (p(), b("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: tt(w, ["prevent"])
        }, g(r(n)("Close")), 1))
      ]),
      default: ee(() => [
        a("div", null, [
          j(st, {
            icon: r(cr),
            title: r(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", _i, [
            a("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: _,
              onClick: F
            }, [
              k.value ? (p(), b("div", fi, g(r(n)("Release to drop these files.")), 1)) : (p(), b("div", vi, g(r(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            a("div", {
              ref_key: "container",
              ref: c,
              class: "vuefinder__upload-modal__buttons"
            }, [
              a("button", {
                ref_key: "pickFiles",
                ref: _,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(r(n)("Select Files")), 513),
              a("button", {
                ref_key: "pickFolders",
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(r(n)("Select Folders")), 513),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: U[0] || (U[0] = ($) => y(!1))
              }, g(r(n)("Clear all")), 9, mi),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: U[1] || (U[1] = ($) => y(!0))
              }, g(r(n)("Clear only successful")), 9, pi)
            ], 512),
            a("div", hi, [
              (p(!0), b(ye, null, ke(m.value, ($) => (p(), b("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: $.id
              }, [
                a("span", {
                  class: le(["vuefinder__upload-modal__file-icon", A($)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: g(C($))
                  }, null, 8, gi)
                ], 2),
                a("div", bi, [
                  a("div", yi, g(r(Wn)($.name, 40)) + " (" + g($.size) + ")", 1),
                  a("div", wi, g(r(Wn)($.name, 16)) + " (" + g($.size) + ")", 1),
                  a("div", {
                    class: le(["vuefinder__upload-modal__file-status", A($)])
                  }, [
                    Q(g($.statusName) + " ", 1),
                    $.status === l.value.QUEUE_ENTRY_STATUS.UPLOADING ? (p(), b("b", Si, g($.percent), 1)) : B("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: le(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: r(n)("Delete"),
                  disabled: h.value,
                  onClick: (N) => M($)
                }, U[3] || (U[3] = [
                  a("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ]), 10, ki)
              ]))), 128)),
              m.value.length ? B("", !0) : (p(), b("div", $i, g(r(n)("No files selected!")), 1))
            ]),
            v.value.length ? (p(), K(Ze, {
              key: 0,
              onHidden: U[2] || (U[2] = ($) => v.value = ""),
              error: ""
            }, {
              default: ee(() => [
                Q(g(v.value), 1)
              ]),
              _: 1
            })) : B("", !0)
          ])
        ]),
        a("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        a("input", {
          ref_key: "internalFolderInput",
          ref: i,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, Ei = { class: "vuefinder__unarchive-modal__content" }, Ti = { class: "vuefinder__unarchive-modal__items" }, Di = { class: "vuefinder__unarchive-modal__item" }, Ai = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oi = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ii = { class: "vuefinder__unarchive-modal__item-name" }, Fi = { class: "vuefinder__unarchive-modal__info" }, Lo = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = I(e.modal.data.items[0]), s = I(""), l = I([]), c = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: o.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, i) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: i[1] || (i[1] = (u) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        a("div", null, [
          j(st, {
            icon: r(dr),
            title: r(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Ei, [
            a("div", Ti, [
              (p(!0), b(ye, null, ke(l.value, (u) => (p(), b("p", Di, [
                u.type === "dir" ? (p(), b("svg", Ai, i[2] || (i[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (p(), b("svg", Oi, i[3] || (i[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", Ii, g(u.basename), 1)
              ]))), 256)),
              a("p", Fi, g(r(n)("The archive will be unarchived at")) + " (" + g(r(e).fs.data.dirname) + ")", 1),
              s.value.length ? (p(), K(Ze, {
                key: 0,
                onHidden: i[0] || (i[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  Q(g(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Li = { class: "vuefinder__archive-modal__content" }, Mi = { class: "vuefinder__archive-modal__form" }, Ri = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Vi = { class: "vuefinder__archive-modal__file" }, Ui = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ni = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hi = { class: "vuefinder__archive-modal__file-name" }, Pi = ["placeholder"], Mo = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = I(""), s = I(""), l = I(e.modal.data.items), c = () => {
      l.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: l.value.map(({ path: d, type: i }) => ({ path: d, type: i })),
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, i) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        a("div", null, [
          j(st, {
            icon: r(ur),
            title: r(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Li, [
            a("div", Mi, [
              a("div", Ri, [
                (p(!0), b(ye, null, ke(l.value, (u) => (p(), b("p", Vi, [
                  u.type === "dir" ? (p(), b("svg", Ui, i[3] || (i[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (p(), b("svg", Ni, i[4] || (i[4] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", Hi, g(u.basename), 1)
                ]))), 256))
              ]),
              _e(a("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => o.value = u),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: r(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Pi), [
                [xt, o.value]
              ]),
              s.value.length ? (p(), K(Ze, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  Q(g(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, te = {
  __name: "Icon",
  props: {
    icon: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { icons: n, iconComponent: o } = e, s = t, l = it(() => ({ ...o.props ?? {} })), c = it(() => n[s.icon] ? Wo(() => n[s.icon]) : (console.error(`Icon ${s.icon} not found`), null));
    return (d, i) => (p(), K(Xn(c.value), Ko(Yo(l.value)), null, 16));
  }
}, Bi = { class: "vuefinder__toolbar" }, qi = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, zi = ["title"], ji = ["title"], Gi = ["title"], Wi = ["title"], Ki = ["title"], Yi = ["title"], Xi = ["title"], Zi = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ji = { class: "pl-2" }, Qi = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, ec = { class: "vuefinder__toolbar__controls" }, tc = ["title"], nc = ["title"], sc = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, l = I("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      l.value = i;
    });
    const c = () => {
      e.fullScreen = !e.fullScreen;
    };
    Ie(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (i, u) => (p(), b("div", Bi, [
      l.value.length ? (p(), b("div", Zi, [
        a("div", Ji, [
          Q(g(r(o)("Search results for")) + " ", 1),
          a("span", Qi, g(l.value), 1)
        ]),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (p(), K(te, {
          key: 0,
          icon: "loading"
        })) : B("", !0)
      ])) : (p(), b("div", qi, [
        r(e).features.includes(r(ue).NEW_FOLDER) ? (p(), b("div", {
          key: 0,
          class: "mx-1.5",
          title: r(o)("New Folder"),
          onClick: u[0] || (u[0] = (f) => r(e).modal.open(Fo, { items: r(s).getSelected() }))
        }, [
          j(te, { icon: "new_folder" })
        ], 8, zi)) : B("", !0),
        r(e).features.includes(r(ue).NEW_FILE) ? (p(), b("div", {
          key: 1,
          class: "mx-1.5",
          title: r(o)("New File"),
          onClick: u[1] || (u[1] = (f) => r(e).modal.open(ui, { items: r(s).getSelected() }))
        }, [
          j(te, { icon: "new_file" })
        ], 8, ji)) : B("", !0),
        r(e).features.includes(r(ue).RENAME) ? (p(), b("div", {
          key: 2,
          class: "mx-1.5",
          title: r(o)("Rename"),
          onClick: u[2] || (u[2] = (f) => r(s).getCount() !== 1 || r(e).modal.open(_s, { items: r(s).getSelected() }))
        }, [
          j(te, {
            icon: "rename",
            class: le(r(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Gi)) : B("", !0),
        r(e).features.includes(r(ue).DELETE) ? (p(), b("div", {
          key: 3,
          class: "mx-1.5",
          title: r(o)("Delete"),
          onClick: u[3] || (u[3] = (f) => !r(s).getCount() || r(e).modal.open(us, { items: r(s).getSelected() }))
        }, [
          j(te, {
            icon: "delete",
            class: le(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Wi)) : B("", !0),
        r(e).features.includes(r(ue).UPLOAD) ? (p(), b("div", {
          key: 4,
          class: "mx-1.5",
          title: r(o)("Upload"),
          onClick: u[4] || (u[4] = (f) => r(e).modal.open(Ci, { items: r(s).getSelected() }))
        }, [
          j(te, { icon: "upload" })
        ], 8, Ki)) : B("", !0),
        r(e).features.includes(r(ue).UNARCHIVE) && r(s).getCount() === 1 && r(s).getSelected()[0].mime_type === "application/zip" ? (p(), b("div", {
          key: 5,
          class: "mx-1.5",
          title: r(o)("Unarchive"),
          onClick: u[5] || (u[5] = (f) => !r(s).getCount() || r(e).modal.open(Lo, { items: r(s).getSelected() }))
        }, [
          j(te, {
            icon: "unarchive",
            class: le(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Yi)) : B("", !0),
        r(e).features.includes(r(ue).ARCHIVE) ? (p(), b("div", {
          key: 6,
          class: "mx-1.5",
          title: r(o)("Archive"),
          onClick: u[6] || (u[6] = (f) => !r(s).getCount() || r(e).modal.open(Mo, { items: r(s).getSelected() }))
        }, [
          j(te, {
            icon: "archive",
            class: le(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Xi)) : B("", !0)
      ])),
      a("div", ec, [
        r(e).features.includes(r(ue).FULL_SCREEN) ? (p(), b("div", {
          key: 0,
          onClick: c,
          class: "mx-1.5",
          title: r(o)("Toggle Full Screen")
        }, [
          r(e).fullScreen ? (p(), K(te, {
            key: 0,
            icon: "minimize"
          })) : (p(), K(te, {
            key: 1,
            icon: "full_screen"
          }))
        ], 8, tc)) : B("", !0),
        a("div", {
          class: "mx-1.5",
          title: r(o)("Change View"),
          onClick: u[7] || (u[7] = (f) => l.value.length || d())
        }, [
          r(e).view === "grid" ? (p(), K(te, {
            key: 0,
            icon: "grid_view",
            class: le(["vf-toolbar-icon", l.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : B("", !0),
          r(e).view === "list" ? (p(), K(te, {
            key: 1,
            icon: "list_view",
            class: le(["vf-toolbar-icon", l.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : B("", !0)
        ], 8, nc)
      ])
    ]));
  }
}, oc = (t, e = 0, n = !1) => {
  let o;
  return (...s) => {
    n && !o && t(...s), clearTimeout(o), o = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Ms = (t, e, n) => {
  const o = I(t);
  return Xo((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: oc(
      (c) => {
        o.value = c, l();
      },
      e,
      n
    )
  }));
}, rc = { class: "vuefinder__move-modal__content" }, ac = { class: "vuefinder__move-modal__description" }, lc = { class: "vuefinder__move-modal__files vf-scrollbar" }, ic = { class: "vuefinder__move-modal__file" }, cc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, dc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, uc = { class: "vuefinder__move-modal__file-name" }, _c = { class: "vuefinder__move-modal__target-title" }, fc = { class: "vuefinder__move-modal__target-directory" }, vc = { class: "vuefinder__move-modal__target-path" }, mc = { class: "vuefinder__move-modal__selected-items" }, Kn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = I(e.modal.data.items.from), s = I(""), l = () => {
      o.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: o.value.map(({ path: c, type: d }) => ({ path: c, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Yes, Move!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1),
        a("div", mc, g(r(n)("%s item(s) selected.", o.value.length)), 1)
      ]),
      default: ee(() => [
        a("div", null, [
          j(st, {
            icon: r(_r),
            title: r(n)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", rc, [
            a("p", ac, g(r(n)("Are you sure you want to move these files?")), 1),
            a("div", lc, [
              (p(!0), b(ye, null, ke(o.value, (i) => (p(), b("div", ic, [
                a("div", null, [
                  i.type === "dir" ? (p(), b("svg", cc, d[2] || (d[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (p(), b("svg", dc, d[3] || (d[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                a("div", uc, g(i.path), 1)
              ]))), 256))
            ]),
            a("h4", _c, g(r(n)("Target Directory")), 1),
            a("p", fc, [
              d[4] || (d[4] = a("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                a("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              a("span", vc, g(r(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (p(), K(Ze, {
              key: 0,
              onHidden: d[0] || (d[0] = (i) => s.value = ""),
              error: ""
            }, {
              default: ee(() => [
                Q(g(s.value), 1)
              ]),
              _: 1
            })) : B("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, pc = { class: "vuefinder__breadcrumb__container" }, hc = ["title"], gc = ["title"], bc = ["title"], yc = ["title"], wc = { class: "vuefinder__breadcrumb__list" }, Sc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, kc = { class: "relative" }, $c = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], xc = { class: "vuefinder__breadcrumb__search-mode" }, Cc = ["placeholder"], Ec = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Tc = ["onDrop", "onClick"], Dc = { class: "vuefinder__breadcrumb__hidden-item-content" }, Ac = { class: "vuefinder__breadcrumb__hidden-item-text" }, Oc = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, l = I(null), c = Ms(0, 100);
    Ie(c, (M) => {
      const y = l.value.children;
      let w = 0, L = 0, S = 5, U = 1;
      e.fs.limitBreadcrumbItems(S), _t(() => {
        for (let $ = y.length - 1; $ >= 0 && !(w + y[$].offsetWidth > c.value - 40); $--)
          w += parseInt(y[$].offsetWidth, 10), L++;
        L < U && (L = U), L > S && (L = S), e.fs.limitBreadcrumbItems(L);
      });
    });
    const d = () => {
      c.value = l.value.offsetWidth;
    };
    let i = I(null);
    Ee(() => {
      i.value = new ResizeObserver(d), i.value.observe(l.value);
    }), Yn(() => {
      i.value.disconnect();
    });
    const u = (M, y = null) => {
      M.preventDefault(), o.isDraggingRef.value = !1, m(M), y ?? (y = e.fs.hiddenBreadcrumbs.length - 1);
      let w = JSON.parse(M.dataTransfer.getData("items"));
      if (w.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, {
        items: {
          from: w,
          to: e.fs.hiddenBreadcrumbs[y] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (M, y = null) => {
      M.preventDefault(), o.isDraggingRef.value = !1, m(M), y ?? (y = e.fs.breadcrumbs.length - 2);
      let w = JSON.parse(M.dataTransfer.getData("items"));
      if (w.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, {
        items: {
          from: w,
          to: e.fs.breadcrumbs[y] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (M) => {
      M.preventDefault(), e.fs.isGoUpAvailable() ? (M.dataTransfer.dropEffect = "copy", M.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (M.dataTransfer.dropEffect = "none", M.dataTransfer.effectAllowed = "none");
    }, m = (M) => {
      M.preventDefault(), M.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && M.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, v = () => {
      R(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      R(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, k = (M) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: M.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, x = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, D = {
      mounted(M, y, w, L) {
        M.clickOutsideEvent = function(S) {
          M === S.target || M.contains(S.target) || y.value();
        }, document.body.addEventListener("click", M.clickOutsideEvent);
      },
      beforeUnmount(M, y, w, L) {
        document.body.removeEventListener("click", M.clickOutsideEvent);
      }
    }, V = () => {
      e.showTreeView = !e.showTreeView;
    };
    Ie(() => e.showTreeView, (M, y) => {
      M !== y && s("show-tree-view", M);
    });
    const A = I(null), C = () => {
      e.features.includes(ue.SEARCH) && (e.fs.searchMode = !0, _t(() => A.value.focus()));
    }, F = Ms("", 400);
    Ie(F, (M) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: M });
    }), Ie(() => e.fs.searchMode, (M) => {
      M && _t(() => A.value.focus());
    });
    const R = () => {
      e.fs.searchMode = !1, F.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      R();
    });
    const q = () => {
      F.value === "" && R();
    };
    return (M, y) => (p(), b("div", pc, [
      a("span", {
        title: r(n)("Toggle Tree View")
      }, [
        j(te, {
          icon: "list_tree",
          onClick: V,
          class: le(["vuefinder__breadcrumb__toggle-tree", r(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, hc),
      a("span", {
        title: r(n)("Go up a directory")
      }, [
        j(te, {
          icon: "go_up",
          onDragover: y[0] || (y[0] = (w) => _(w)),
          onDragleave: y[1] || (y[1] = (w) => m(w)),
          onDrop: y[2] || (y[2] = (w) => f(w)),
          onClick: h,
          class: le(r(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, gc),
      r(e).fs.loading ? (p(), b("span", {
        key: 1,
        title: r(n)("Cancel")
      }, [
        j(te, {
          icon: "close",
          onClick: y[3] || (y[3] = (w) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, yc)) : (p(), b("span", {
        key: 0,
        title: r(n)("Refresh")
      }, [
        j(te, {
          icon: "refresh",
          onClick: v
        })
      ], 8, bc)),
      _e(a("div", {
        onClick: tt(C, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        a("div", null, [
          j(te, {
            icon: "home",
            onDragover: y[4] || (y[4] = (w) => _(w)),
            onDragleave: y[5] || (y[5] = (w) => m(w)),
            onDrop: y[6] || (y[6] = (w) => f(w, -1)),
            onClick: y[7] || (y[7] = (w) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter } }))
          })
        ]),
        a("div", ad, [
          r(e).fs.hiddenBreadcrumbs.length ? _e((p(), b("div", ld, [
            y[13] || (y[13] = a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("div", id, [
              a("span", {
                onDragover: (N) => ae === r(e).fs.breadcrumbs.length - 1 || u(N),
                onDragleave: (N) => ae === r(e).fs.breadcrumbs.length - 1 || m(N),
                onDrop: (N) => ae === r(e).fs.breadcrumbs.length - 1 || p(N, ae),
                class: "vuefinder__breadcrumb__item",
                title: P.basename,
                onClick: (N) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter, path: P.path } })
              }, g(P.name), 41, nd)
            ]))), 128))
          ], 512),
          r(e).loadingIndicator === "circular" && r(e).fs.loading ? (f(), Y(H, { key: 0 })) : G("", !0)
        ], 512), [
          [Be, !r(e).fs.searchMode]
        ]),
        a("div", wc, [
          r(e).fs.hiddenBreadcrumbs.length ? _e((p(), b("div", Sc, [
            y[13] || (y[13] = a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("div", kc, [
              a("span", {
                onDragenter: y[8] || (y[8] = (w) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: y[9] || (y[9] = (w) => r(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                j(te, {
                  icon: "dots",
                  class: "vuefinder__breadcrumb__hidden-toggle-icon"
                })
              ], 32)
            ])
          ])), [
            [D, x]
          ]) : B("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: l,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: tt(C, ["self"])
        }, [
          (p(!0), b(ye, null, ke(r(e).fs.breadcrumbs, (w, L) => (p(), b("div", { key: L }, [
            y[14] || (y[14] = a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("span", {
              onDragover: (S) => L === r(e).fs.breadcrumbs.length - 1 || _(S),
              onDragleave: (S) => L === r(e).fs.breadcrumbs.length - 1 || m(S),
              onDrop: (S) => L === r(e).fs.breadcrumbs.length - 1 || f(S, L),
              class: "vuefinder__breadcrumb__item",
              title: w.basename,
              onClick: (S) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter, path: w.path } })
            }, g(w.name), 41, $c)
          ]))), 128))
        ], 512),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (p(), K(te, {
          key: 0,
          icon: "loading"
        })) : B("", !0)
      ], 512), [
        [ze, !r(e).fs.searchMode]
      ]),
      _e(a("div", xc, [
        a("div", null, [
          j(te, { icon: "search" })
        ]),
        _e(a("input", {
          ref_key: "searchInput",
          ref: A,
          onKeydown: $t(R, ["esc"]),
          onBlur: q,
          "onUpdate:modelValue": y[10] || (y[10] = (w) => Zo(F) ? F.value = w : null),
          placeholder: r(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Cc), [
          [xt, r(F)]
        ]),
        j(te, {
          icon: "exit",
          onClick: R
        })
      ], 512), [
        [ze, r(e).fs.searchMode]
      ]),
      _e(a("div", Ec, [
        (p(!0), b(ye, null, ke(r(e).fs.hiddenBreadcrumbs, (w, L) => (p(), b("div", {
          key: L,
          onDragover: y[11] || (y[11] = (S) => _(S)),
          onDragleave: y[12] || (y[12] = (S) => m(S)),
          onDrop: (S) => u(S, L),
          onClick: (S) => k(w),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          a("div", Dc, [
            a("span", null, [
              j(te, {
                icon: "folder",
                class: "vuefinder__breadcrumb__hidden-item-icon"
              })
            ]),
            y[15] || (y[15] = Q()),
            a("span", Ac, g(w.name), 1)
          ])
        ], 40, Tc))), 128))
      ], 512), [
        [ze, r(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Ro = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Ic = ["onClick"], Fc = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, o = I(n("full-screen", !1)), s = I([]), l = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
      s.value.splice(i, 1);
    }, d = (i) => {
      let u = s.value.findIndex((f) => f.id === i);
      u !== -1 && c(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = u, s.value.push(i), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (i, u) => (p(), b("div", {
      class: le(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      j(Jo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: ee(() => [
          (p(!0), b(ye, null, ke(s.value, (f, _) => (p(), b("div", {
            key: _,
            onClick: (m) => c(_),
            class: le(["vuefinder__toast__message", l(f.type)])
          }, g(f.label), 11, Ic))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Zt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => {
      const o = Ns("Icon");
      return p(), b("div", null, [
        t.direction === "asc" ? (p(), K(o, {
          key: 0,
          icon: "asc"
        })) : B("", !0),
        t.direction === "desc" ? (p(), K(o, {
          key: 1,
          icon: "desc"
        })) : B("", !0)
      ]);
    };
  }
}, Lc = { class: "vuefinder__item-icon" }, Dn = {
  __name: "ItemIcon",
  props: {
    type: {
      type: String,
      required: !0
    },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    return (e, n) => (p(), b("span", Lc, [
      t.type === "dir" ? (p(), K(te, {
        key: 0,
        icon: "folder",
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (p(), K(te, {
        key: 1,
        icon: "file",
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, Mc = { class: "vuefinder__drag-item__container" }, Rc = { class: "vuefinder__drag-item__count" }, Vc = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => (p(), b("div", Mc, [
      j(te, { icon: "drag" }),
      a("div", Rc, g(e.count), 1)
    ]));
  }
}, Uc = { class: "vuefinder__text-preview" }, Nc = { class: "vuefinder__text-preview__header" }, Hc = ["title"], Pc = { class: "vuefinder__text-preview__actions" }, Bc = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, qc = { key: 1 }, zc = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = I(""), s = I(""), l = I(null), c = I(!1), d = I(""), i = I(!1), u = re("ServiceContainer"), { t: f } = u.i18n;
    Ee(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: _.modal.data.adapter, path: _.modal.data.item.path },
        responseType: "text"
      }).then((v) => {
        o.value = v, n("success");
      });
    });
    const _ = () => {
      c.value = !c.value, s.value = o.value;
    }, m = () => {
      d.value = "", i.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: _.modal.data.adapter,
          path: _.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((v) => {
        d.value = f("Updated."), o.value = v, n("success"), c.value = !c.value;
      }).catch((v) => {
        d.value = f(v.message), i.value = !0;
      });
    };
    return (v, h) => (p(), b("div", Uc, [
      a("div", Nc, [
        a("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: r(u).modal.data.item.path
        }, g(r(u).modal.data.item.basename), 9, Hc),
        a("div", Pc, [
          c.value ? (p(), b("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__text-preview__save-button"
          }, g(r(f)("Save")), 1)) : B("", !0),
          r(u).features.includes(r(ue).EDIT) ? (p(), b("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (k) => _())
          }, g(c.value ? r(f)("Cancel") : r(f)("Edit")), 1)) : B("", !0)
        ])
      ]),
      a("div", null, [
        c.value ? (p(), b("div", qc, [
          _e(a("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": h[1] || (h[1] = (k) => s.value = k),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [xt, s.value]
          ])
        ])) : (p(), b("pre", Bc, g(o.value), 1)),
        d.value.length ? (p(), K(Ze, {
          key: 2,
          onHidden: h[2] || (h[2] = (k) => d.value = ""),
          error: i.value
        }, {
          default: ee(() => [
            Q(g(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : B("", !0)
      ])
    ]));
  }
}, jc = { class: "vuefinder__image-preview" }, Gc = { class: "vuefinder__image-preview__header" }, Wc = ["title"], Kc = { class: "vuefinder__image-preview__actions" }, Yc = { class: "vuefinder__image-preview__image-container" }, Xc = ["src"], Zc = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = re("ServiceContainer"), { t: s } = o.i18n, l = I(null), c = I(null), d = I(!1), i = I(""), u = I(!1), f = () => {
      d.value = !d.value, d.value ? c.value = new pr(l.value, {
        crop(m) {
        }
      }) : c.value.destroy();
    }, _ = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (m) => {
          i.value = "", u.value = !1;
          const v = new FormData();
          v.set("file", m), o.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: o.modal.data.adapter,
              path: o.modal.data.item.path
            },
            body: v
          }).then((h) => {
            i.value = s("Updated."), l.value.src = o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item), f(), n("success");
          }).catch((h) => {
            i.value = s(h.message), u.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      n("success");
    }), (m, v) => (p(), b("div", jc, [
      a("div", Gc, [
        a("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: r(o).modal.data.item.path
        }, g(r(o).modal.data.item.basename), 9, Wc),
        a("div", Kc, [
          d.value ? (p(), b("button", {
            key: 0,
            onClick: _,
            class: "vuefinder__image-preview__crop-button"
          }, g(r(s)("Crop")), 1)) : B("", !0),
          r(o).features.includes(r(ue).EDIT) ? (p(), b("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: v[0] || (v[0] = (h) => f())
          }, g(d.value ? r(s)("Cancel") : r(s)("Edit")), 1)) : B("", !0)
        ])
      ]),
      a("div", Yc, [
        a("img", {
          ref_key: "image",
          ref: l,
          class: "vuefinder__image-preview__image",
          src: r(o).requester.getPreviewUrl(r(o).modal.data.adapter, r(o).modal.data.item),
          alt: ""
        }, null, 8, Xc)
      ]),
      i.value.length ? (p(), K(Ze, {
        key: 0,
        onHidden: v[1] || (v[1] = (h) => i.value = ""),
        error: u.value
      }, {
        default: ee(() => [
          Q(g(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : B("", !0)
    ]));
  }
}, Jc = { class: "vuefinder__default-preview" }, Qc = { class: "vuefinder__default-preview__header" }, ed = ["title"], td = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e;
    return Ee(() => {
      o("success");
    }), (s, l) => (p(), b("div", Jc, [
      a("div", Qc, [
        a("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: r(n).modal.data.item.path
        }, g(r(n).modal.data.item.basename), 9, ed)
      ]),
      l[0] || (l[0] = a("div", null, null, -1))
    ]));
  }
}, nd = { class: "vuefinder__video-preview" }, sd = ["title"], od = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, rd = ["src"], ad = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (l, c) => (p(), b("div", nd, [
      a("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, g(r(n).modal.data.item.basename), 9, sd),
      a("div", null, [
        a("video", od, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, rd),
          c[0] || (c[0] = Q(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, ld = { class: "vuefinder__audio-preview" }, id = ["title"], cd = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, dd = ["src"], ud = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = re("ServiceContainer"), s = () => o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item);
    return Ee(() => {
      n("success");
    }), (l, c) => (p(), b("div", ld, [
      a("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: r(o).modal.data.item.path
      }, g(r(o).modal.data.item.basename), 9, id),
      a("div", null, [
        a("audio", cd, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, dd),
          c[0] || (c[0] = Q(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, _d = { class: "vuefinder__pdf-preview" }, fd = ["title"], vd = ["data"], md = ["src"], pd = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (l, c) => (p(), b("div", _d, [
      a("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, g(r(n).modal.data.item.basename), 9, fd),
      a("div", null, [
        a("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          a("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, md)
        ], 8, vd)
      ])
    ]));
  }
}, hd = { class: "vuefinder__preview-modal__content" }, gd = { key: 0 }, bd = { class: "vuefinder__preview-modal__loading" }, yd = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, wd = { class: "vuefinder__preview-modal__details" }, Sd = { class: "font-bold" }, kd = { class: "font-bold pl-2" }, $d = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, xd = ["download", "href"], Vo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = I(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), l = e.features.includes(ue.PREVIEW);
    return l || (o.value = !0), (c, d) => (p(), K(Xe, null, {
      buttons: ee(() => [
        a("button", {
          type: "button",
          onClick: d[6] || (d[6] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Close")), 1),
        r(e).features.includes(r(ue).DOWNLOAD) ? (p(), b("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item)
        }, g(r(n)("Download")), 9, xd)) : B("", !0)
      ]),
      default: ee(() => [
        a("div", null, [
          a("div", hd, [
            r(l) ? (p(), b("div", gd, [
              s("text") ? (p(), K(zc, {
                key: 0,
                onSuccess: d[0] || (d[0] = (i) => o.value = !0)
              })) : s("image") ? (p(), K(Zc, {
                key: 1,
                onSuccess: d[1] || (d[1] = (i) => o.value = !0)
              })) : s("video") ? (p(), K(ad, {
                key: 2,
                onSuccess: d[2] || (d[2] = (i) => o.value = !0)
              })) : s("audio") ? (p(), K(ud, {
                key: 3,
                onSuccess: d[3] || (d[3] = (i) => o.value = !0)
              })) : s("application/pdf") ? (p(), K(pd, {
                key: 4,
                onSuccess: d[4] || (d[4] = (i) => o.value = !0)
              })) : (p(), K(td, {
                key: 5,
                onSuccess: d[5] || (d[5] = (i) => o.value = !0)
              }))
            ])) : B("", !0),
            a("div", bd, [
              o.value === !1 ? (p(), b("div", yd, [
                d[7] || (d[7] = a("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  a("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  a("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                a("span", null, g(r(n)("Loading")), 1)
              ])) : B("", !0)
            ])
          ])
        ]),
        a("div", wd, [
          a("div", null, [
            a("span", Sd, g(r(n)("File Size")) + ": ", 1),
            Q(g(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", kd, g(r(n)("Last Modified")) + ": ", 1),
            Q(" " + g(r(Ro)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(ue).DOWNLOAD) ? (p(), b("div", $d, [
          a("span", null, g(r(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}, Cd = ["data-type", "data-item", "data-index"], An = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, o = t, s = (v) => {
      v.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: v.path } })) : e.modal.open(Vo, { adapter: e.fs.adapter, item: v });
    }, l = {
      mounted(v, h, k, x) {
        k.props.draggable && (v.addEventListener("dragstart", (D) => c(D, h.value)), v.addEventListener("dragover", (D) => i(D, h.value)), v.addEventListener("drop", (D) => d(D, h.value)));
      },
      beforeUnmount(v, h, k, x) {
        k.props.draggable && (v.removeEventListener("dragstart", c), v.removeEventListener("dragover", i), v.removeEventListener("drop", d));
      }
    }, c = (v, h) => {
      if (v.altKey || v.ctrlKey || v.metaKey)
        return v.preventDefault(), !1;
      n.isDraggingRef.value = !0, v.dataTransfer.setDragImage(o.dragImage.$el, 0, 15), v.dataTransfer.effectAllowed = "all", v.dataTransfer.dropEffect = "copy", v.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (v, h) => {
      v.preventDefault(), n.isDraggingRef.value = !1;
      let k = JSON.parse(v.dataTransfer.getData("items"));
      if (k.find((x) => x.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, { items: { from: k, to: h } });
    }, i = (v, h) => {
      v.preventDefault(), !h || h.type !== "dir" || n.getSelection().find((k) => k === v.currentTarget) ? (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none") : v.dataTransfer.dropEffect = "copy";
    };
    let u = null, f = !1;
    const _ = () => {
      u && clearTimeout(u);
    }, m = (v) => {
      if (!f)
        f = !0, setTimeout(() => f = !1, 300);
      else
        return f = !1, s(o.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const h = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: v.target.getBoundingClientRect().x,
          clientY: v.target.getBoundingClientRect().y
        });
        v.target.dispatchEvent(h);
      }, 500);
    };
    return (v, h) => _e((p(), b("div", {
      style: un({ opacity: r(n).isDraggingRef.value && r(n).getSelection().find((k) => v.$el === k) ? "0.5 !important" : "" }),
      class: le(["vuefinder__item", "vf-item-" + r(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = (k) => s(t.item)),
      onTouchstart: h[1] || (h[1] = (k) => m(k)),
      onTouchend: h[2] || (h[2] = (k) => _()),
      onContextmenu: h[3] || (h[3] = tt((k) => r(e).emitter.emit("vf-contextmenu-show", { event: k, items: r(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Ot(v.$slots, "default"),
      r(e).pinnedFolders.find((k) => k.path === t.item.path) ? (p(), K(te, {
        key: 0,
        icon: "pin",
        class: "vuefinder__item--pinned"
      })) : B("", !0)
    ], 46, Cd)), [
      [l, t.item]
    ]);
  }
}, Ed = { class: "vuefinder__explorer__container" }, Td = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Dd = { class: "vuefinder__explorer__drag-item" }, Ad = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, Od = { class: "vuefinder__explorer__item-list-content" }, Id = { class: "vuefinder__explorer__item-list-name" }, Fd = { class: "vuefinder__explorer__item-name" }, Ld = { class: "vuefinder__explorer__item-path" }, Md = { class: "vuefinder__explorer__item-list-content" }, Rd = { class: "vuefinder__explorer__item-list-name" }, Vd = { class: "vuefinder__explorer__item-name" }, Ud = { class: "vuefinder__explorer__item-size" }, Nd = { class: "vuefinder__explorer__item-date" }, Hd = { class: "vuefinder__explorer__item-grid-content" }, Pd = ["data-src", "alt"], Bd = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, qd = { class: "vuefinder__explorer__item-title break-all" }, zd = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = (_) => _ == null ? void 0 : _.substring(0, 3), s = I(null), l = I(""), c = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      l.value = _, _ ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: _
        },
        onSuccess: (m) => {
          m.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = kt({ active: !1, column: "", order: "" }), u = (_ = !0) => {
      let m = [...e.fs.data.files], v = i.column, h = i.order === "asc" ? 1 : -1;
      if (!_)
        return m;
      const k = (x, D) => typeof x == "string" && typeof D == "string" ? x.toLowerCase().localeCompare(D.toLowerCase()) : x < D ? -1 : x > D ? 1 : 0;
      return i.active && (m = m.slice().sort((x, D) => k(x[v], D[v]) * h)), m;
    }, f = (_) => {
      i.active && i.column === _ ? (i.active = i.order === "asc", i.column = _, i.order = "desc") : (i.active = !0, i.column = _, i.order = "asc");
    };
    return Ee(() => {
      d = new mr(c.area.value);
    }), Vs(() => {
      d.update();
    }), Us(() => {
      d.destroy();
    }), (_, m) => (p(), b("div", Ed, [
      r(e).view === "list" || l.value.length ? (p(), b("div", Td, [
        a("div", {
          onClick: m[0] || (m[0] = (v) => f("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Q(g(r(n)("Name")) + " ", 1),
          _e(j(Zt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "basename"]
          ])
        ]),
        l.value.length ? B("", !0) : (p(), b("div", {
          key: 0,
          onClick: m[1] || (m[1] = (v) => f("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Q(g(r(n)("Size")) + " ", 1),
          _e(j(Zt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "file_size"]
          ])
        ])),
        l.value.length ? B("", !0) : (p(), b("div", {
          key: 1,
          onClick: m[2] || (m[2] = (v) => f("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Q(g(r(n)("Date")) + " ", 1),
          _e(j(Zt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "last_modified"]
          ])
        ])),
        l.value.length ? (p(), b("div", {
          key: 2,
          onClick: m[3] || (m[3] = (v) => f("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Q(g(r(n)("Filepath")) + " ", 1),
          _e(j(Zt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "path"]
          ])
        ])) : B("", !0)
      ])) : B("", !0),
      a("div", Dd, [
        j(Vc, {
          ref_key: "dragImage",
          ref: s,
          count: r(c).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: r(c).scrollBarContainer,
        class: le(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": r(e).view === "grid" }, { "search-active": l.value.length }]])
      }, [
        a("div", {
          ref: r(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      a("div", {
        ref: r(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: m[4] || (m[4] = tt((v) => r(e).emitter.emit("vf-contextmenu-show", { event: v, items: r(c).getSelected() }), ["self", "prevent"]))
      }, [
        r(e).loadingIndicator === "linear" && r(e).fs.loading ? (p(), b("div", Ad)) : B("", !0),
        l.value.length ? (p(!0), b(ye, { key: 1 }, ke(u(), (v, h) => (p(), K(An, {
          item: v,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: ee(() => [
            a("div", Od, [
              a("div", Id, [
                j(Dn, {
                  type: v.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Fd, g(v.basename), 1)
              ]),
              a("div", Ld, g(v.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : B("", !0),
        r(e).view === "list" && !l.value.length ? (p(!0), b(ye, { key: 2 }, ke(u(), (v, h) => (p(), K(An, {
          item: v,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: v.path
        }, {
          default: ee(() => [
            a("div", Md, [
              a("div", Rd, [
                j(Dn, {
                  type: v.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Vd, g(v.basename), 1)
              ]),
              a("div", Ud, g(v.file_size ? r(e).filesize(v.file_size) : ""), 1),
              a("div", Nd, g(r(Ro)(v.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : B("", !0),
        r(e).view === "grid" && !l.value.length ? (p(!0), b(ye, { key: 3 }, ke(u(!1), (v, h) => (p(), K(An, {
          item: v,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: ee(() => [
            a("div", null, [
              a("div", Hd, [
                (v.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (p(), b("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, v),
                  alt: v.basename,
                  key: v.path
                }, null, 8, Pd)) : (p(), K(Dn, {
                  key: 1,
                  type: v.type
                }, null, 8, ["type"])),
                !((v.mime_type ?? "").startsWith("image") && r(e).showThumbnails) && v.type !== "dir" ? (p(), b("div", Bd, g(o(v.extension)), 1)) : B("", !0)
              ]),
              a("span", qd, g(r(Wn)(v.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : B("", !0)
      ], 544),
      j(Fc)
    ]));
  }
}, jd = ["href", "download"], Gd = ["onClick"], Wd = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), n = I(null), o = I([]), s = I(""), l = kt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    });
    e.emitter.on("vf-context-selected", (u) => {
      o.value = u;
    });
    const c = (u) => u.link(e, o), d = (u) => {
      e.emitter.emit("vf-contextmenu-hide"), u.action(e, o);
    };
    e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      s.value = u;
    }), e.emitter.on("vf-contextmenu-show", ({ event: u, items: f, target: _ = null }) => {
      if (l.items = e.contextMenuItems.filter((m) => m.show(e, {
        searchQuery: s.value,
        items: f,
        target: _
      })), s.value)
        if (_)
          e.emitter.emit("vf-context-selected", [_]);
        else
          return;
      else !_ && !s.value ? e.emitter.emit("vf-context-selected", []) : f.length > 1 && f.some((m) => m.path === _.path) ? e.emitter.emit("vf-context-selected", f) : e.emitter.emit("vf-context-selected", [_]);
      i(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1;
    });
    const i = (u) => {
      const f = e.dragSelect.area.value, _ = e.root.getBoundingClientRect(), m = f.getBoundingClientRect();
      let v = u.clientX - _.left, h = u.clientY - _.top;
      l.active = !0, _t(() => {
        var V;
        const k = (V = n.value) == null ? void 0 : V.getBoundingClientRect();
        let x = (k == null ? void 0 : k.height) ?? 0, D = (k == null ? void 0 : k.width) ?? 0;
        v = m.right - u.pageX + window.scrollX < D ? v - D : v, h = m.bottom - u.pageY + window.scrollY < x ? h - x : h, l.positions = {
          left: v + "px",
          top: h + "px"
        };
      });
    };
    return (u, f) => _e((p(), b("ul", {
      ref_key: "contextmenu",
      ref: n,
      style: un(l.positions),
      class: "vuefinder__context-menu"
    }, [
      (p(!0), b(ye, null, ke(l.items, (_) => (p(), b("li", {
        class: "vuefinder__context-menu__item",
        key: _.title
      }, [
        _.link ? (p(), b("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: c(_),
          download: c(_),
          onClick: f[0] || (f[0] = (m) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, g(_.title(r(e).i18n)), 1)
        ], 8, jd)) : (p(), b("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (m) => d(_)
        }, [
          a("span", null, g(_.title(r(e).i18n)), 1)
        ], 8, Gd))
      ]))), 128))
    ], 4)), [
      [ze, l.active]
    ]);
  }
}, Kd = { class: "vuefinder__status-bar__wrapper" }, Yd = { class: "vuefinder__status-bar__storage" }, Xd = ["title"], Zd = { class: "vuefinder__status-bar__storage-icon" }, Jd = ["value"], Qd = { class: "vuefinder__status-bar__info" }, eu = { key: 0 }, tu = { class: "vuefinder__status-bar__selected-count" }, nu = { class: "vuefinder__status-bar__actions" }, su = ["disabled"], ou = ["title"], ru = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: o } = e.storage, s = e.dragSelect, l = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), o("adapter", e.fs.adapter);
    }, c = I("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const d = it(() => {
      const i = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && i;
    });
    return (i, u) => (p(), b("div", Kd, [
      a("div", Yd, [
        a("div", {
          class: "vuefinder__status-bar__storage-container",
          title: r(n)("Storage")
        }, [
          a("div", Zd, [
            j(te, { icon: "storage" })
          ]),
          _e(a("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (f) => r(e).fs.adapter = f),
            onChange: l,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (p(!0), b(ye, null, ke(r(e).fs.data.storages, (f) => (p(), b("option", { value: f }, g(f), 9, Jd))), 256))
          ], 544), [
            [On, r(e).fs.adapter]
          ])
        ], 8, Xd),
        a("div", Qd, [
          c.value.length ? (p(), b("span", eu, g(r(e).fs.data.files.length) + " items found. ", 1)) : B("", !0),
          a("span", tu, g(r(e).dragSelect.getCount() > 0 ? r(n)("%s item(s) selected.", r(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      a("div", nu, [
        r(e).selectButton.active ? (p(), b("button", {
          key: 0,
          class: le(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (f) => r(e).selectButton.click(r(s).getSelected(), f))
        }, g(r(n)("Select")), 11, su)) : B("", !0),
        a("span", {
          class: "vuefinder__status-bar__about",
          title: r(n)("About"),
          onClick: u[2] || (u[2] = (f) => r(e).modal.open(Io))
        }, [
          j(te, { icon: "about" })
        ], 8, ou)
      ])
    ]));
  }
};
function Uo(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const au = { class: "vuefinder__folder-loader-indicator" }, lu = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, No = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Qo({
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = oe("ServiceContainer");
    n.i18n;
    const o = Hs(t, "modelValue"), s = I(!1);
    Ie(
      () => o.value,
      () => {
        var d;
        return ((d = l()) == null ? void 0 : d.folders.length) || c();
      }
    );
    function l() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const c = () => {
      s.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        Uo(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, i) => {
      var u;
      return p(), b("div", au, [
        s.value ? (p(), K(te, {
          key: 0,
          icon: "loading",
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (p(), b("div", lu, [
          o.value && ((u = l()) != null && u.folders.length) ? (p(), K(te, {
            key: 0,
            icon: "minus",
            class: "vuefinder__folder-loader-indicator--minus"
          })) : B("", !0),
          o.value ? B("", !0) : (p(), K(te, {
            key: 1,
            icon: "plus",
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, iu = { class: "vuefinder__treesubfolderlist__item-content" }, cu = ["onClick"], du = ["title", "onClick"], uu = { class: "vuefinder__treesubfolderlist__item-icon" }, _u = { class: "vuefinder__treesubfolderlist__subfolder" }, fu = {
  __name: "TreeSubfolderList",
  props: {
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = I([]), o = t, s = I(null);
    Ee(() => {
      o.path === o.adapter + "://" && Ke(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const l = it(() => {
      var c;
      return ((c = e.treeViewData.find((d) => d.path === o.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, d) => {
      const i = Ns("TreeSubfolderList", !0);
      return p(), b("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (p(!0), b(ye, null, ke(l.value, (u, f) => (p(), b("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", iu, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (u) => n.value[_.path] = !n.value[_.path]
            }, [
              j(No, {
                adapter: t.adapter,
                path: _.path,
                modelValue: n.value[_.path],
                "onUpdate:modelValue": (u) => n.value[_.path] = u
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, cu),
            a("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: _.path,
              onClick: (u) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: _.path } })
            }, [
              a("div", uu, [
                r(e).fs.path === u.path ? (p(), K(te, {
                  key: 0,
                  icon: "open_folder"
                })) : (p(), K(te, {
                  key: 1,
                  icon: "folder"
                }))
              ]),
              a("div", {
                class: le(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": r(e).fs.path === u.path
                }])
              }, g(u.basename), 3)
            ], 8, du)
          ]),
          a("div", _u, [
            _e(j(i, {
              adapter: o.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [ze, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, vu = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, o = I(!1);
    function s(l) {
      l === e.fs.adapter ? o.value = !o.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: l } }), n("adapter", l));
    }
    return (l, c) => (p(), b(ye, null, [
      a("div", {
        onClick: c[2] || (c[2] = (d) => s(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        a("div", {
          class: le(["vuefinder__treestorageitem__info", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          a("div", {
            class: le(["vuefinder__treestorageitem__icon", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            j(te, { icon: "storage" })
          ], 2),
          a("div", null, g(t.storage), 1)
        ], 2),
        a("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: c[1] || (c[1] = tt((d) => o.value = !o.value, ["stop"]))
        }, [
          j(No, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: o.value,
            "onUpdate:modelValue": c[0] || (c[0] = (d) => o.value = d)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      _e(j(fu, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [ze, o.value]
      ])
    ], 64));
  }
}, mu = { class: "vuefinder__folder-indicator" }, pu = { class: "vuefinder__folder-indicator--icon" }, hu = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Hs(t, "modelValue");
    return (n, o) => (p(), b("div", mu, [
      a("div", pu, [
        e.value ? (p(), K(te, {
          key: 0,
          icon: "minus",
          class: "vuefinder__folder-indicator--minus"
        })) : B("", !0),
        e.value ? B("", !0) : (p(), K(te, {
          key: 1,
          icon: "plus",
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, gu = { class: "vuefinder__treeview__header" }, bu = { class: "vuefinder__treeview__pinned-label" }, yu = { class: "vuefinder__treeview__pin-text text-nowrap" }, wu = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Su = { class: "vuefinder__treeview__pinned-item" }, ku = ["onClick"], $u = ["title"], xu = ["onClick"], Cu = { key: 0 }, Eu = { class: "vuefinder__treeview__no-pinned" }, Tu = { class: "vuefinder__treeview__storage" }, Du = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: s } = e.storage, l = I(190), c = I(o("pinned-folders-opened", !0));
    Ie(c, (f) => s("pinned-folders-opened", f));
    const d = (f) => {
      e.pinnedFolders = e.pinnedFolders.filter((_) => _.path !== f.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (f) => {
      const _ = f.clientX, m = f.target.parentElement, v = m.getBoundingClientRect().width;
      m.classList.remove("transition-[width]"), m.classList.add("transition-none");
      const h = (x) => {
        l.value = v + x.clientX - _, l.value < 50 && (l.value = 0, e.showTreeView = !1), l.value > 50 && (e.showTreeView = !0);
      }, k = () => {
        const x = m.getBoundingClientRect();
        l.value = x.width, m.classList.add("transition-[width]"), m.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", k);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", k);
    }, u = I(null);
    return Ee(() => {
      Ke(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Ie(e.fs.data, (f, _) => {
      const m = f.files.filter((v) => v.type === "dir");
      Uo(e.treeViewData, { path: e.fs.path, folders: m.map((v) => ({
        adapter: v.storage,
        path: v.path,
        basename: v.basename
      })) });
    }), (f, _) => (p(), b(ye, null, [
      a("div", {
        onClick: _[0] || (_[0] = (m) => r(e).showTreeView = !r(e).showTreeView),
        class: le(["vuefinder__treeview__overlay", r(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      a("div", {
        style: un(r(e).showTreeView ? "min-width:100px;max-width:75%; width: " + l.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          a("div", gu, [
            a("div", {
              onClick: _[2] || (_[2] = (m) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              a("div", bu, [
                j(te, {
                  icon: "pin",
                  class: "vuefinder__treeview__pin-icon"
                }),
                a("div", yu, g(r(n)("Pinned Folders")), 1)
              ]),
              j(hu, {
                modelValue: c.value,
                "onUpdate:modelValue": _[1] || (_[1] = (m) => c.value = m)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (p(), b("ul", wu, [
              (p(!0), b(ye, null, ke(r(e).pinnedFolders, (m) => (p(), b("li", Su, [
                a("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (v) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: m.storage, path: m.path } })
                }, [
                  r(e).fs.path !== m.path ? (p(), K(te, {
                    key: 0,
                    icon: "folder",
                    class: "vuefinder__treeview__folder-icon"
                  })) : B("", !0),
                  r(e).fs.path === m.path ? (p(), K(te, {
                    key: 1,
                    icon: "open_folder",
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : B("", !0),
                  a("div", {
                    title: m.path,
                    class: le(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": r(e).fs.path === m.path
                    }])
                  }, g(m.basename), 11, $u)
                ], 8, ku),
                a("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (v) => d(m)
                }, [
                  j(te, {
                    icon: "x_box",
                    class: "vuefinder__treeview__remove-icon"
                  })
                ], 8, xu)
              ]))), 256)),
              r(e).pinnedFolders.length ? B("", !0) : (p(), b("li", Cu, [
                a("div", Eu, g(r(n)("No folders pinned")), 1)
              ]))
            ])) : B("", !0)
          ]),
          (p(!0), b(ye, null, ke(r(e).fs.data.storages, (m) => (p(), b("div", Tu, [
            j(vu, { storage: m }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        a("div", {
          onMousedown: i,
          class: le([(r(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
};
class Au {
  /**
   * 
   * @param {Item['title']} title 
   * @param {Item['action']} action 
   * @param {Item['link']} link
   * @param {Partial<SimpleItemOptions>} options 
   */
  constructor(e, n, o, s) {
    this.title = e, this.action = n, this.link = o, this.options = Object.assign(
      {
        needsSearchQuery: !1,
        target: "one"
      },
      s
    );
  }
  /**
   * @type {Item['show']}
   */
  show(e, n) {
    var s, l;
    const o = (c) => c.items.length > 1 && c.items.some((d) => {
      var i;
      return d.path === ((i = c.target) == null ? void 0 : i.path);
    }) ? "many" : c.target ? "one" : null;
    return !(this.options.needsSearchQuery !== !!n.searchQuery || this.options.target !== void 0 && this.options.target !== o(n) || this.options.targetType !== void 0 && this.options.targetType !== ((s = n.target) == null ? void 0 : s.type) || this.options.mimeType !== void 0 && this.options.mimeType !== ((l = n.target) == null ? void 0 : l.mime_type) || this.options.feature !== void 0 && !e.features.includes(this.options.feature) || this.options.show !== void 0 && !this.options.show(e, n));
  }
}
function He(t, e) {
  return t.map((n) => new Au(n.title, n.action, n.link, {
    ...e,
    feature: n.key
  }));
}
const De = {
  newfolder: {
    key: ue.NEW_FOLDER,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(Fo)
  },
  selectAll: {
    title: ({ t }) => t("Select All"),
    action: (t) => t.dragSelect.selectAll()
  },
  pinFolder: {
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      t.pinnedFolders = t.pinnedFolders.concat(e.value), t.storage.setStore("pinned-folders", t.pinnedFolders);
    }
  },
  unpinFolder: {
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      t.pinnedFolders = t.pinnedFolders.filter((n) => !e.value.find((o) => o.path === n.path)), t.storage.setStore("pinned-folders", t.pinnedFolders);
    }
  },
  delete: {
    key: ue.DELETE,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(us, { items: e });
    }
  },
  refresh: {
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } });
    }
  },
  preview: {
    key: ue.PREVIEW,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(Vo, { adapter: t.fs.adapter, item: e.value[0] })
  },
  open: {
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: t.fs.adapter,
          path: e.value[0].path
        }
      });
    }
  },
  openDir: {
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: t.fs.adapter,
          path: e.value[0].dir
        }
      });
    }
  },
  download: {
    key: ue.DOWNLOAD,
    link: (t, e) => t.requester.getDownloadUrl(t.fs.adapter, e.value[0]),
    title: ({ t }) => t("Download"),
    action: () => {
    }
  },
  archive: {
    key: ue.ARCHIVE,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(Mo, { items: e })
  },
  unarchive: {
    key: ue.UNARCHIVE,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(Lo, { items: e })
  },
  rename: {
    key: ue.RENAME,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(_s, { items: e })
  }
}, Ou = [
  ...He([De.openDir], {
    needsSearchQuery: !0
  }),
  ...He([De.refresh, De.selectAll, De.newfolder], {
    target: null
  }),
  ...He([De.refresh, De.archive, De.delete], {
    target: "many"
  }),
  ...He([De.open], {
    targetType: "dir"
  }),
  ...He([De.unpinFolder], {
    targetType: "dir",
    show: (t, e) => t.pinnedFolders.findIndex((n) => {
      var o;
      return n.path === ((o = e.target) == null ? void 0 : o.path);
    }) !== -1
  }),
  ...He([De.pinFolder], {
    targetType: "dir",
    show: (t, e) => t.pinnedFolders.findIndex((n) => {
      var o;
      return n.path === ((o = e.target) == null ? void 0 : o.path);
    }) === -1
  }),
  ...He([De.preview, De.download], {
    show: (t, e) => {
      var n;
      return ((n = e.target) == null ? void 0 : n.type) !== "dir";
    }
  }),
  ...He([De.rename], { numItems: "one" }),
  ...He([De.unarchive], {
    mimeType: "application/zip"
  }),
  ...He([De.archive], {
    show: (t, e) => {
      var n;
      return ((n = e.target) == null ? void 0 : n.mime_type) !== "application/zip";
    }
  }),
  ...He([De.delete], {})
], Iu = { class: "vuefinder__main__content" }, Fu = {
  __name: "VueFinder",
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: ""
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    showTreeView: {
      type: Boolean,
      default: !1
    },
    pinnedFolders: {
      type: Array,
      default: []
    },
    showThumbnails: {
      type: Boolean,
      default: !0
    },
    selectButton: {
      type: Object,
      default(t) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...t
        };
      }
    },
    onError: {
      type: Function,
      default: null
    },
    loadingIndicator: {
      type: String,
      default: "circular"
    },
    contextMenuItems: {
      type: Array,
      default: () => Ou
    }
  },
  emits: ["select", "update:path"],
  setup(t, { emit: e }) {
    const n = e, o = t, s = Oa(o, re("VueFinderOptions"));
    er("ServiceContainer", s);
    const { setStore: l } = s.storage, c = I(null);
    s.root = c;
    const d = s.dragSelect;
    ni(s);
    const i = (_) => {
      Object.assign(s.fs.data, _), d.clearSelection(), d.refreshSelection();
    };
    let _;
    s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: _, body: m = null, onSuccess: v = null, onError: h = null, noCloseModal: k = !1 }) => {
      ["index", "search"].includes(_.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const x = u.signal;
      s.requester.send({
        url: "",
        method: _.m || "get",
        params: _,
        body: m,
        abortSignal: x
      }).then((D) => {
        s.fs.adapter = D.adapter, s.persist && (s.fs.path = D.dirname, l("path", s.fs.path)), k || s.modal.close(), i(D), v && v(D);
      }).catch((D) => {
        console.error(D), h && h(D);
      }).finally(() => {
        ["index", "search"].includes(_.q) && (s.fs.loading = !1);
      });
    });
    function f(_) {
      let m = {};
      _ && _.includes("://") && (m = {
        adapter: _.split("://")[0],
        path: _
      }), s.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: s.fs.adapter, ...m },
        onError: o.onError ?? ((v) => {
          v.message && s.emitter.emit("vf-toast-push", { label: v.message, type: "error" });
        })
      });
    }
    return Ee(() => {
      f(s.fs.path), Ie(() => o.path, (_) => {
        f(_);
      }), d.onSelect((_) => {
        n("select", _);
      }), Ie(() => s.fs.data.dirname, (_) => {
        n("update:path", _);
      });
    }), (_, m) => (p(), b("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c,
      tabindex: "0"
    }, [
      a("div", {
        class: le(r(s).theme.actualValue)
      }, [
        a("div", {
          class: le([r(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: un(r(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: m[0] || (m[0] = (v) => r(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (v) => r(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          j(sc),
          j(Oc),
          a("div", Iu, [
            j(Du),
            j(zd)
          ]),
          j(ru)
        ], 38),
        j(tr, { name: "fade" }, {
          default: ee(() => [
            r(s).modal.visible ? (p(), K(Xn(r(s).modal.type), { key: 0 })) : B("", !0)
          ]),
          _: 1
        }),
        j(Wd)
      ], 2)
    ], 512));
  }
}, zu = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    var o, s, l, c, d, i, u, f, _, m, v, h, k, x, D, V, A, C, F, R, q, M, y, w, L, S, U, $, N, P, J, oe;
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", e.iconComponent = e.iconComponent ?? {
      tag: "svg",
      props: {}
    }, e.icons = {
      about: ((o = e.icons) == null ? void 0 : o.about) ?? import("./icons-ByPS8m9L.js").then((E) => E.i),
      archive: ((s = e.icons) == null ? void 0 : s.archive) ?? import("./icons-ByPS8m9L.js").then((E) => E.f),
      asc: ((l = e.icons) == null ? void 0 : l.asc) ?? import("./icons-ByPS8m9L.js").then((E) => E.g),
      close: ((c = e.icons) == null ? void 0 : c.close) ?? import("./icons-ByPS8m9L.js").then((E) => E.j),
      delete: ((d = e.icons) == null ? void 0 : d.delete) ?? import("./icons-ByPS8m9L.js").then((E) => E._),
      desc: ((i = e.icons) == null ? void 0 : i.desc) ?? import("./icons-ByPS8m9L.js").then((E) => E.h),
      dots: ((u = e.icons) == null ? void 0 : u.dots) ?? import("./icons-ByPS8m9L.js").then((E) => E.k),
      drag: ((f = e.icons) == null ? void 0 : f.drag) ?? import("./icons-ByPS8m9L.js").then((E) => E.l),
      exit: ((_ = e.icons) == null ? void 0 : _.exit) ?? import("./icons-ByPS8m9L.js").then((E) => E.m),
      file: ((m = e.icons) == null ? void 0 : m.file) ?? import("./icons-ByPS8m9L.js").then((E) => E.o),
      folder: ((v = e.icons) == null ? void 0 : v.folder) ?? import("./icons-ByPS8m9L.js").then((E) => E.p),
      full_screen: ((h = e.icons) == null ? void 0 : h.full_screen) ?? import("./icons-ByPS8m9L.js").then((E) => E.q),
      go_up: ((k = e.icons) == null ? void 0 : k.go_up) ?? import("./icons-ByPS8m9L.js").then((E) => E.s),
      grid_view: ((x = e.icons) == null ? void 0 : x.grid_view) ?? import("./icons-ByPS8m9L.js").then((E) => E.t),
      home: ((D = e.icons) == null ? void 0 : D.home) ?? import("./icons-ByPS8m9L.js").then((E) => E.v),
      loading: ((V = e.icons) == null ? void 0 : V.loading) ?? import("./icons-ByPS8m9L.js").then((E) => E.w),
      list_tree: ((A = e.icons) == null ? void 0 : A.list_tree) ?? import("./icons-ByPS8m9L.js").then((E) => E.x),
      list_view: ((C = e.icons) == null ? void 0 : C.list_view) ?? import("./icons-ByPS8m9L.js").then((E) => E.y),
      minimize: ((F = e.icons) == null ? void 0 : F.minimize) ?? import("./icons-ByPS8m9L.js").then((E) => E.z),
      minus: ((R = e.icons) == null ? void 0 : R.square_minus) ?? import("./icons-ByPS8m9L.js").then((E) => E.B),
      new_file: ((q = e.icons) == null ? void 0 : q.new_file) ?? import("./icons-ByPS8m9L.js").then((E) => E.d),
      new_folder: ((M = e.icons) == null ? void 0 : M.new_folder) ?? import("./icons-ByPS8m9L.js").then((E) => E.n),
      open_folder: ((y = e.icons) == null ? void 0 : y.open_folder) ?? import("./icons-ByPS8m9L.js").then((E) => E.C),
      pin: ((w = e.icons) == null ? void 0 : w.pin) ?? import("./icons-ByPS8m9L.js").then((E) => E.E),
      plus: ((L = e.icons) == null ? void 0 : L.square_plus) ?? import("./icons-ByPS8m9L.js").then((E) => E.F),
      refresh: ((S = e.icons) == null ? void 0 : S.refresh) ?? import("./icons-ByPS8m9L.js").then((E) => E.G),
      rename: ((U = e.icons) == null ? void 0 : U.rename) ?? import("./icons-ByPS8m9L.js").then((E) => E.r),
      search: (($ = e.icons) == null ? void 0 : $.search) ?? import("./icons-ByPS8m9L.js").then((E) => E.H),
      storage: ((N = e.icons) == null ? void 0 : N.storage) ?? import("./icons-ByPS8m9L.js").then((E) => E.I),
      unarchive: ((P = e.icons) == null ? void 0 : P.unarchive) ?? import("./icons-ByPS8m9L.js").then((E) => E.e),
      upload: ((J = e.icons) == null ? void 0 : J.upload) ?? import("./icons-ByPS8m9L.js").then((E) => E.u),
      x_box: ((oe = e.icons) == null ? void 0 : oe.xbox) ?? import("./icons-ByPS8m9L.js").then((E) => E.J)
    }, t.provide("VueFinderOptions", e), t.component("VueFinder", Fu);
  }
};
export {
  Au as SimpleContextMenuItem,
  Ou as contextMenuItems,
  zu as default
};
