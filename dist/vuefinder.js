var Bo = Object.defineProperty;
var Po = (t, e, n) => e in t ? Bo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var fs = (t, e, n) => Po(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as wt, watch as Ae, ref as D, shallowRef as qo, onMounted as Ee, onUnmounted as Wn, onUpdated as Rs, nextTick as dt, computed as ze, inject as re, openBlock as f, createElementBlock as b, withKeys as St, unref as r, createElementVNode as a, withModifiers as et, renderSlot as Tt, normalizeClass as ie, toDisplayString as g, createBlock as Y, resolveDynamicComponent as Kn, withCtx as te, createVNode as z, Fragment as ye, renderList as ke, createCommentVNode as G, withDirectives as ve, vModelCheckbox as jt, createTextVNode as J, vModelSelect as Tn, vModelText as kt, onBeforeUnmount as Is, resolveComponent as ee, customRef as zo, defineAsyncComponent as jo, normalizeProps as Wo, guardReactiveProps as Ko, vShow as Be, isRef as Yo, TransitionGroup as Xo, normalizeStyle as cn, mergeModels as Zo, useModel as Us, provide as Jo, Transition as Qo } from "vue";
import er from "mitt";
import tr from "dragselect";
import nr from "@uppy/core";
import sr from "@uppy/xhr-upload";
import or from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import rr from "cropperjs";
var Ms;
const Sn = (Ms = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Ms.getAttribute("content");
class ar {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    fs(this, "config");
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
    Sn != null && Sn !== "" && (o[n.xsrfHeaderName] = Sn);
    const s = Object.assign({}, n.headers, o, e.headers), c = Object.assign({}, n.params, e.params), i = e.body, d = n.baseUrl + e.url, l = e.method;
    let v;
    l !== "get" && (i instanceof FormData ? (v = i, n.body != null && Object.entries(this.config.body).forEach(([u, m]) => {
      v.append(u, m);
    })) : (v = { ...i }, n.body != null && Object.assign(v, this.config.body)));
    const p = {
      url: d,
      method: l,
      headers: s,
      params: c,
      body: v
    };
    if (n.transformRequest != null) {
      const u = n.transformRequest({
        url: d,
        method: l,
        headers: s,
        params: c,
        body: v
      });
      u.url != null && (p.url = u.url), u.method != null && (p.method = u.method), u.params != null && (p.params = u.params ?? {}), u.headers != null && (p.headers = u.headers ?? {}), u.body != null && (p.body = u.body);
    }
    return p;
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
    }, c = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    const i = await fetch(c, s);
    if (i.ok)
      return await i[o]();
    throw await i.json();
  }
}
function lr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new ar(e);
}
function ir(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = wt(JSON.parse(e ?? "{}"));
  Ae(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(l, v) {
    n[l] = v;
  }
  function c(l) {
    delete n[l];
  }
  function i() {
    Object.keys(n).map((l) => c(l));
  }
  return { getStore: (l, v = null) => n.hasOwnProperty(l) ? n[l] : v, setStore: s, removeStore: c, clearStore: i };
}
async function cr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function dr(t, e, n, o) {
  const { getStore: s, setStore: c } = t, i = D({}), d = D(s("locale", e)), l = (u, m = e) => {
    cr(u, o).then((_) => {
      i.value = _, c("locale", u), d.value = u, c("translations", _), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + u }), n.emit("vf-language-saved"));
    }).catch((_) => {
      m ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(m, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Ae(d, (u) => {
    l(u);
  }), !s("locale") && !o.length ? l(e) : i.value = s("translations");
  const v = (u, ...m) => m.length ? v(u = u.replace("%s", m.shift()), ...m) : u;
  function p(u, ...m) {
    return i.value && i.value.hasOwnProperty(u) ? v(i.value[u], ...m) : v(u, ...m);
  }
  return wt({ t: p, locale: d });
}
const _e = {
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
}, ur = Object.values(_e), _r = "vuefinder", vr = "2.6.3-test1", fr = "Vuefinder is a file manager component for vuejs.", mr = "module", pr = [
  "dist"
], hr = "./dist/vuefinder.js", gr = "./dist/vuefinder.js", br = {
  dev: "vite",
  build: "vite build",
  preview: "vite preview"
}, yr = "https://github.com/n1crack/vuefinder#readme", wr = [
  "vue",
  "file manager",
  "file plugin",
  "file explorer",
  "finder"
], Sr = {
  type: "git",
  url: "git+https://github.com/borucsan/q-vuefinder"
}, kr = [
  {
    name: "Dawid Karwot",
    email: "dawidkarwot@gmail.com"
  },
  {
    name: "Yusuf Özdemir",
    mail: "yusuf@ozdemir.be"
  }
], xr = "MIT", $r = {
  "@types/node": "^18.7.1",
  "@vitejs/plugin-vue": "^4.0.0",
  autoprefixer: "^10.4.8",
  postcss: "^8.4.16",
  "rollup-plugin-copy": "^3.5.0",
  sass: "^1.75.0",
  tailwindcss: "^3.1.8",
  vite: "^5.0.12",
  "vite-svg-loader": "^5.1.0",
  cssnano: "^4.1.10",
  rtlcss: "^2.6.1",
  quasar: "^2.16.0",
  "@quasar/extras": "^1.16.4",
  "core-js": "^3.0.0",
  "@quasar/app-webpack": "^3.13.0",
  open: "^7.3.0",
  "fs-extra": "^8.1.0",
  chalk: "^4.1.0",
  rimraf: "^3.0.0",
  rollup: "^2.45.0",
  "@rollup/plugin-buble": "^0.21.3",
  "@rollup/plugin-json": "^4.0.0",
  "@rollup/plugin-node-resolve": "^11.2.1",
  "@rollup/plugin-replace": "^2.4.2",
  "uglify-js": "^3.13.3",
  vue: "^3.0.0",
  "vue-router": "^4.0.0",
  zlib: "^1.0.5"
}, Cr = {
  "@uppy/core": "^3.12.0",
  "@uppy/locales": "^3.5.3",
  "@uppy/xhr-upload": "^3.6.7",
  cropperjs: "^1.5.12",
  dragselect: "^3.0.5",
  mitt: "^3.0.0",
  overlayscrollbars: "^2.10.0",
  "vanilla-lazyload": "^17.8.3",
  vue: "^3.0.0"
}, Er = "yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e", kn = {
  name: _r,
  version: vr,
  description: fr,
  type: mr,
  files: pr,
  main: hr,
  module: gr,
  scripts: br,
  homepage: yr,
  keywords: wr,
  repository: Sr,
  authors: kr,
  license: xr,
  devDependencies: $r,
  dependencies: Cr,
  packageManager: Er
};
function Hs(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1024, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Ns(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1e3, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function Vr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return o[1] * Math.pow(1024, e[o[2].toLowerCase()]);
}
const ot = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Tr(t, e) {
  const n = D(ot.SYSTEM), o = D(ot.LIGHT);
  n.value = t.getStore("theme", e ?? ot.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    n.value === ot.DARK || n.value === ot.SYSTEM && i.matches ? o.value = ot.DARK : o.value = ot.LIGHT;
  };
  return c(s), s.addEventListener("change", c), {
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
    set(i) {
      n.value = i, i !== ot.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(s);
    }
  };
}
function Dr() {
  const t = qo(null), e = D(!1), n = D();
  return { visible: e, type: t, data: n, open: (c, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, n.value = i;
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
  let c = n, i;
  const d = (p, u) => {
    const m = c, _ = p, h = u || (o ? !o(m, _) : m !== _);
    return (h || s) && (c = _, i = m), [c, h, i];
  };
  return [e ? (p) => d(e(c, i), p) : d, (p) => [c, !!p, i]];
}, Ar = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Oe = Ar ? window : {}, Gs = Math.max, Or = Math.min, Dn = Math.round, en = Math.abs, ms = Math.sign, Bs = Oe.cancelAnimationFrame, Yn = Oe.requestAnimationFrame, tn = Oe.setTimeout, An = Oe.clearTimeout, dn = (t) => typeof Oe[t] < "u" ? Oe[t] : void 0, Lr = dn("MutationObserver"), ps = dn("IntersectionObserver"), nn = dn("ResizeObserver"), Xt = dn("ScrollTimeline"), Xn = (t) => t === void 0, un = (t) => t === null, qe = (t) => typeof t == "number", Lt = (t) => typeof t == "string", Zn = (t) => typeof t == "boolean", Ue = (t) => typeof t == "function", je = (t) => Array.isArray(t), sn = (t) => typeof t == "object" && !je(t) && !un(t), Jn = (t) => {
  const e = !!t && t.length, n = qe(e) && e > -1 && e % 1 == 0;
  return je(t) || !Ue(t) && n ? e > 0 && sn(t) ? e - 1 in t : !0 : !1;
}, on = (t) => !!t && t.constructor === Object, rn = (t) => t instanceof HTMLElement, _n = (t) => t instanceof Element;
function ce(t, e) {
  if (Jn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && ce(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const Ps = (t, e) => t.indexOf(e) >= 0, Dt = (t, e) => t.concat(e), pe = (t, e, n) => (!Lt(e) && Jn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), lt = (t) => Array.from(t || []), Qn = (t) => je(t) ? t : !Lt(t) && Jn(t) ? lt(t) : [t], On = (t) => !!t && !t.length, Ln = (t) => lt(new Set(t)), Re = (t, e, n) => {
  ce(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, qs = "paddingTop", zs = "paddingRight", js = "paddingLeft", Ws = "paddingBottom", Ks = "marginLeft", Ys = "marginRight", Xs = "marginBottom", Zs = "overflowX", Js = "overflowY", vn = "width", fn = "height", rt = "visible", ct = "hidden", gt = "scroll", Fr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, mn = (t, e, n, o) => {
  if (t && e) {
    let s = !0;
    return ce(n, (c) => {
      const i = t[c], d = e[c];
      i !== d && (s = !1);
    }), s;
  }
  return !1;
}, Qs = (t, e) => mn(t, e, ["w", "h"]), Zt = (t, e) => mn(t, e, ["x", "y"]), Mr = (t, e) => mn(t, e, ["t", "r", "b", "l"]), ut = () => {
}, Z = (t, ...e) => t.bind(0, ...e), ft = (t) => {
  let e;
  const n = t ? tn : Yn, o = t ? An : Bs;
  return [(s) => {
    o(e), e = n(() => s(), Ue(t) ? t() : t);
  }, () => o(e)];
}, Fn = (t, e) => {
  const { _: n, p: o, v: s, S: c } = e || {};
  let i, d, l, v, p = ut;
  const u = function(y) {
    p(), An(i), v = i = d = void 0, p = ut, t.apply(this, y);
  }, m = (x) => c && d ? c(d, x) : x, _ = () => {
    p !== ut && u(m(l) || l);
  }, h = function() {
    const y = lt(arguments), $ = Ue(n) ? n() : n;
    if (qe($) && $ >= 0) {
      const V = Ue(o) ? o() : o, k = qe(V) && V >= 0, O = $ > 0 ? tn : Yn, A = $ > 0 ? An : Bs, F = m(y) || y, w = u.bind(0, F);
      let L;
      p(), s && !v ? (w(), v = !0, L = O(() => v = void 0, $)) : (L = O(w, $), k && !i && (i = tn(_, V))), p = () => A(L), d = l = F;
    } else
      u(y);
  };
  return h.m = _, h;
}, eo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), He = (t) => t ? Object.keys(t) : [], le = (t, e, n, o, s, c, i) => {
  const d = [e, n, o, s, c, i];
  return (typeof t != "object" || un(t)) && !Ue(t) && (t = {}), ce(d, (l) => {
    ce(l, (v, p) => {
      const u = l[p];
      if (t === u)
        return !0;
      const m = je(u);
      if (u && on(u)) {
        const _ = t[p];
        let h = _;
        m && !je(_) ? h = [] : !m && !on(_) && (h = {}), t[p] = le(h, u);
      } else
        t[p] = m ? u.slice() : u;
    });
  }), t;
}, to = (t, e) => ce(le({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && on(n) && (s[o] = to(n));
}), es = (t) => !He(t).length, no = (t, e, n) => Gs(t, Or(e, n)), _t = (t) => Ln((je(t) ? t : (t || "").split(" ")).filter((e) => e)), ts = (t, e) => t && t.getAttribute(e), hs = (t, e) => t && t.hasAttribute(e), Je = (t, e, n) => {
  ce(_t(e), (o) => {
    t && t.setAttribute(o, String(n || ""));
  });
}, Ge = (t, e) => {
  ce(_t(e), (n) => t && t.removeAttribute(n));
}, pn = (t, e) => {
  const n = _t(ts(t, e)), o = Z(Je, t, e), s = (c, i) => {
    const d = new Set(n);
    return ce(_t(c), (l) => {
      d[i](l);
    }), lt(d).join(" ");
  };
  return {
    O: (c) => o(s(c, "delete")),
    $: (c) => o(s(c, "add")),
    C: (c) => {
      const i = _t(c);
      return i.reduce((d, l) => d && n.includes(l), i.length > 0);
    }
  };
}, so = (t, e, n) => (pn(t, e).O(n), Z(ns, t, e, n)), ns = (t, e, n) => (pn(t, e).$(n), Z(so, t, e, n)), an = (t, e, n, o) => (o ? ns : so)(t, e, n), ss = (t, e, n) => pn(t, e).C(n), oo = (t) => pn(t, "class"), ro = (t, e) => {
  oo(t).O(e);
}, os = (t, e) => (oo(t).$(e), Z(ro, t, e)), ao = (t, e) => {
  const n = e ? _n(e) && e : document;
  return n ? lt(n.querySelectorAll(t)) : [];
}, Rr = (t, e) => {
  const n = e ? _n(e) && e : document;
  return n && n.querySelector(t);
}, Mn = (t, e) => _n(t) && t.matches(e), lo = (t) => Mn(t, "body"), Rn = (t) => t ? lt(t.childNodes) : [], At = (t) => t && t.parentElement, mt = (t, e) => _n(t) && t.closest(e), In = (t) => document.activeElement, Ir = (t, e, n) => {
  const o = mt(t, e), s = t && Rr(n, o), c = mt(s, e) === o;
  return o && s ? o === t || s === t || c && mt(mt(t, n), e) !== o : !1;
}, bt = (t) => {
  ce(Qn(t), (e) => {
    const n = At(e);
    e && n && n.removeChild(e);
  });
}, Fe = (t, e) => Z(bt, t && e && ce(Qn(e), (n) => {
  n && t.appendChild(n);
})), pt = (t) => {
  const e = document.createElement("div");
  return Je(e, "class", t), e;
}, io = (t) => {
  const e = pt();
  return e.innerHTML = t.trim(), ce(Rn(e), (n) => bt(n));
}, gs = (t, e) => t.getPropertyValue(e) || t[e] || "", co = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Wt = (t) => co(parseFloat(t || "")), Un = (t) => Math.round(t * 1e4) / 1e4, uo = (t) => `${Un(co(t))}px`;
function Ot(t, e) {
  t && e && ce(e, (n, o) => {
    try {
      const s = t.style, c = un(n) || Zn(n) ? "" : qe(n) ? uo(n) : n;
      o.indexOf("--") === 0 ? s.setProperty(o, c) : s[o] = c;
    } catch {
    }
  });
}
function tt(t, e, n) {
  const o = Lt(e);
  let s = o ? "" : {};
  if (t) {
    const c = Oe.getComputedStyle(t, n) || t.style;
    s = o ? gs(c, e) : lt(e).reduce((i, d) => (i[d] = gs(c, d), i), s);
  }
  return s;
}
const bs = (t, e, n) => {
  const o = e ? `${e}-` : "", s = n ? `-${n}` : "", c = `${o}top${s}`, i = `${o}right${s}`, d = `${o}bottom${s}`, l = `${o}left${s}`, v = tt(t, [c, i, d, l]);
  return {
    t: Wt(v[c]),
    r: Wt(v[i]),
    b: Wt(v[d]),
    l: Wt(v[l])
  };
}, Ur = (t, e) => `translate${sn(t) ? `(${t.x},${t.y})` : `Y(${t})`}`, Hr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Nr = {
  w: 0,
  h: 0
}, hn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Nr, Gr = (t) => hn("inner", t || Oe), ht = Z(hn, "offset"), _o = Z(hn, "client"), ln = Z(hn, "scroll"), rs = (t) => {
  const e = parseFloat(tt(t, vn)) || 0, n = parseFloat(tt(t, fn)) || 0;
  return {
    w: e - Dn(e),
    h: n - Dn(n)
  };
}, xn = (t) => t.getBoundingClientRect(), Br = (t) => !!t && Hr(t), Hn = (t) => !!(t && (t[fn] || t[vn])), vo = (t, e) => {
  const n = Hn(t);
  return !Hn(e) && n;
}, ys = (t, e, n, o) => {
  ce(_t(e), (s) => {
    t && t.removeEventListener(s, n, o);
  });
}, fe = (t, e, n, o) => {
  var s;
  const c = (s = o && o.H) != null ? s : !0, i = o && o.I || !1, d = o && o.A || !1, l = {
    passive: c,
    capture: i
  };
  return Z(Re, _t(e).map((v) => {
    const p = d ? (u) => {
      ys(t, v, p, i), n && n(u);
    } : n;
    return t && t.addEventListener(v, p, l), Z(ys, t, v, p, i);
  }));
}, fo = (t) => t.stopPropagation(), Nn = (t) => t.preventDefault(), mo = (t) => fo(t) || Nn(t), Pe = (t, e) => {
  const { x: n, y: o } = qe(e) ? {
    x: e,
    y: e
  } : e || {};
  qe(n) && (t.scrollLeft = n), qe(o) && (t.scrollTop = o);
}, Me = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), po = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), Pr = (t, e) => {
  const { D: n, M: o } = t, { w: s, h: c } = e, i = (u, m, _) => {
    let h = ms(u) * _, x = ms(m) * _;
    if (h === x) {
      const y = en(u), $ = en(m);
      x = y > $ ? 0 : x, h = y < $ ? 0 : h;
    }
    return h = h === x ? 0 : h, [h + 0, x + 0];
  }, [d, l] = i(n.x, o.x, s), [v, p] = i(n.y, o.y, c);
  return {
    D: {
      x: d,
      y: v
    },
    M: {
      x: l,
      y: p
    }
  };
}, ws = ({ D: t, M: e }) => {
  const n = (o, s) => o === 0 && o <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, Ss = ({ D: t, M: e }, n) => {
  const o = (s, c, i) => no(0, 1, (s - i) / (s - c) || 0);
  return {
    x: o(t.x, e.x, n.x),
    y: o(t.y, e.y, n.y)
  };
}, Gn = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, ks = (t, e) => {
  ce(Qn(e), t);
}, Bn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (c, i) => {
    if (c) {
      const d = e.get(c);
      ks((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, o = (c, i) => {
    if (Lt(c)) {
      const v = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, v), ks((p) => {
        Ue(p) && v.add(p);
      }, i), Z(n, c, i);
    }
    Zn(i) && i && n();
    const d = He(c), l = [];
    return ce(d, (v) => {
      const p = c[v];
      p && pe(l, o(v, p));
    }), Z(Re, l);
  }, s = (c, i) => {
    ce(lt(e.get(c)), (d) => {
      i && !On(i) ? d.apply(0, i) : d();
    });
  };
  return o(t || {}), [o, n, s];
}, ho = {}, go = {}, qr = (t) => {
  ce(t, (e) => ce(e, (n, o) => {
    ho[o] = e[o];
  }));
}, bo = (t, e, n) => He(t).map((o) => {
  const { static: s, instance: c } = t[o], [i, d, l] = n || [], v = n ? c : s;
  if (v) {
    const p = n ? v(i, d, e) : v(e);
    return (l || go)[o] = p;
  }
}), Ft = (t) => go[t], zr = "__osOptionsValidationPlugin", xt = "data-overlayscrollbars", Jt = "os-environment", Kt = `${Jt}-scrollbar-hidden`, $n = `${xt}-initialize`, Qt = "noClipping", xs = `${xt}-body`, at = xt, jr = "host", Qe = `${xt}-viewport`, Wr = Zs, Kr = Js, Yr = "arrange", yo = "measuring", Xr = "scrolling", wo = "scrollbarHidden", Zr = "noContent", Pn = `${xt}-padding`, $s = `${xt}-content`, as = "os-size-observer", Jr = `${as}-appear`, Qr = `${as}-listener`, ea = "os-trinsic-observer", ta = "os-theme-none", Ie = "os-scrollbar", na = `${Ie}-rtl`, sa = `${Ie}-horizontal`, oa = `${Ie}-vertical`, So = `${Ie}-track`, ls = `${Ie}-handle`, ra = `${Ie}-visible`, aa = `${Ie}-cornerless`, Cs = `${Ie}-interaction`, Es = `${Ie}-unusable`, qn = `${Ie}-auto-hide`, Vs = `${qn}-hidden`, Ts = `${Ie}-wheel`, la = `${So}-interactive`, ia = `${ls}-interactive`, ca = "__osSizeObserverPlugin", da = (t, e) => {
  const { T: n } = e, [o, s] = t("showNativeOverlaidScrollbars");
  return [o && n.x && n.y, s];
}, yt = (t) => t.indexOf(rt) === 0, ua = (t, e) => {
  const n = (s, c, i, d) => {
    const l = s === rt ? ct : s.replace(`${rt}-`, ""), v = yt(s), p = yt(i);
    return !c && !d ? ct : v && p ? rt : v ? c && d ? l : c ? rt : ct : c ? l : p && d ? rt : ct;
  }, o = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    k: o,
    R: {
      x: o.x === gt,
      y: o.y === gt
    }
  };
}, ko = "__osScrollbarsHidingPlugin", _a = "__osClickScrollPlugin", Ds = (t) => JSON.stringify(t, (e, n) => {
  if (Ue(n))
    throw 0;
  return n;
}), As = (t, e) => t ? `${e}`.split(".").reduce((n, o) => n && eo(n, o) ? n[o] : void 0, t) : void 0, va = {
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
}, xo = (t, e) => {
  const n = {}, o = Dt(He(e), He(t));
  return ce(o, (s) => {
    const c = t[s], i = e[s];
    if (sn(c) && sn(i))
      le(n[s] = {}, xo(c, i)), es(n[s]) && delete n[s];
    else if (eo(e, s) && i !== c) {
      let d = !0;
      if (je(c) || je(i))
        try {
          Ds(c) === Ds(i) && (d = !1);
        } catch {
        }
      d && (n[s] = i);
    }
  }), n;
}, Os = (t, e, n) => (o) => [As(t, o), n || As(e, o) !== void 0];
let $o;
const fa = () => $o, ma = (t) => {
  $o = t;
};
let Cn;
const pa = () => {
  const t = (k, O, A) => {
    Fe(document.body, k), Fe(document.body, k);
    const j = _o(k), F = ht(k), w = rs(O);
    return A && bt(k), {
      x: F.h - j.h + w.h,
      y: F.w - j.w + w.w
    };
  }, e = (k) => {
    let O = !1;
    const A = os(k, Kt);
    try {
      O = tt(k, "scrollbar-width") === "none" || tt(k, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return A(), O;
  }, n = `.${Jt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Jt} div{width:200%;height:200%;margin:10px 0}.${Kt}{scrollbar-width:none!important}.${Kt}::-webkit-scrollbar,.${Kt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = io(`<div class="${Jt}"><div></div><style>${n}</style></div>`)[0], c = s.firstChild, i = s.lastChild, d = fa();
  d && (i.nonce = d);
  const [l, , v] = Bn(), [p, u] = Le({
    o: t(s, c),
    i: Zt
  }, Z(t, s, c, !0)), [m] = u(), _ = e(s), h = {
    x: m.x === 0,
    y: m.y === 0
  }, x = {
    elements: {
      host: null,
      padding: !_,
      viewport: (k) => _ && lo(k) && k,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, y = le({}, va), $ = Z(le, {}, y), R = Z(le, {}, x), V = {
    N: m,
    T: h,
    P: _,
    G: !!Xt,
    K: Z(l, "r"),
    Z: R,
    tt: (k) => le(x, k) && R(),
    nt: $,
    ot: (k) => le(y, k) && $(),
    st: le({}, x),
    et: le({}, y)
  };
  if (Ge(s, "style"), bt(s), fe(Oe, "resize", () => {
    v("r", []);
  }), Ue(Oe.matchMedia) && !_ && (!h.x || !h.y)) {
    const k = (O) => {
      const A = Oe.matchMedia(`(resolution: ${Oe.devicePixelRatio}dppx)`);
      fe(A, "change", () => {
        O(), k(O);
      }, {
        A: !0
      });
    };
    k(() => {
      const [O, A] = p();
      le(V.N, O), v("r", [A]);
    });
  }
  return V;
}, Ke = () => (Cn || (Cn = pa()), Cn), ha = (t, e, n) => {
  let o = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    o = !0;
  }, i = (d) => {
    if (s && n) {
      const l = n.map((v) => {
        const [p, u] = v || [];
        return [u && p ? (d || ao)(p, t) : [], u];
      });
      ce(l, (v) => ce(v[0], (p) => {
        const u = v[1], m = s.get(p) || [];
        if (t.contains(p) && u) {
          const h = fe(p, u, (x) => {
            o ? (h(), s.delete(p)) : e(x);
          });
          s.set(p, pe(m, h));
        } else
          Re(m), s.delete(p);
      }));
    }
  };
  return i(), [c, i];
}, Ls = (t, e, n, o) => {
  let s = !1;
  const { ct: c, rt: i, lt: d, it: l, ut: v, _t: p } = o || {}, u = Fn(() => s && n(!0), {
    _: 33,
    p: 99
  }), [m, _] = ha(t, u, d), h = c || [], x = i || [], y = Dt(h, x), $ = (V, k) => {
    if (!On(k)) {
      const O = v || ut, A = p || ut, j = [], F = [];
      let w = !1, L = !1;
      if (ce(k, (M) => {
        const { attributeName: C, target: I, type: S, oldValue: H, addedNodes: B, removedNodes: Q } = M, oe = S === "attributes", P = S === "childList", ae = t === I, N = oe && C, E = N && ts(I, C || ""), U = Lt(E) ? E : null, q = N && H !== U, T = Ps(x, C) && q;
        if (e && (P || !ae)) {
          const K = oe && q, W = K && l && Mn(I, l), se = (W ? !O(I, C, H, U) : !oe || K) && !A(M, !!W, t, o);
          ce(B, (de) => pe(j, de)), ce(Q, (de) => pe(j, de)), L = L || se;
        }
        !e && ae && q && !O(I, C, H, U) && (pe(F, C), w = w || T);
      }), _((M) => Ln(j).reduce((C, I) => (pe(C, ao(M, I)), Mn(I, M) ? pe(C, I) : C), [])), e)
        return !V && L && n(!1), [!1];
      if (!On(F) || w) {
        const M = [Ln(F), w];
        return !V && n.apply(0, M), M;
      }
    }
  }, R = new Lr(Z($, !1));
  return [() => (R.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: y,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (m(), R.disconnect(), s = !1);
  }), () => {
    if (s)
      return u.m(), $(!0, R.takeRecords());
  }];
}, Co = (t, e, n) => {
  const { dt: o } = n || {}, s = Ft(ca), [c] = Le({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = io(`<div class="${as}"><div class="${Qr}"></div></div>`)[0], v = l.firstChild, p = (u) => {
      const m = u instanceof ResizeObserverEntry;
      let _ = !1, h = !1;
      if (m) {
        const [x, , y] = c(u.contentRect), $ = Hn(x);
        h = vo(x, y), _ = !h && !$;
      } else
        h = u === !0;
      _ || e({
        ft: !0,
        dt: h
      });
    };
    if (nn) {
      const u = new nn((m) => p(m.pop()));
      u.observe(v), pe(i, () => {
        u.disconnect();
      });
    } else if (s) {
      const [u, m] = s(v, p, o);
      pe(i, Dt([os(l, Jr), fe(l, "animationstart", u)], m));
    } else
      return ut;
    return Z(Re, pe(i, Fe(t, l)));
  };
}, ga = (t, e) => {
  let n;
  const o = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, s = pt(ea), [c] = Le({
    o: !1
  }), i = (l, v) => {
    if (l) {
      const p = c(o(l)), [, u] = p;
      return u && !v && e(p) && [p];
    }
  }, d = (l, v) => i(v.pop(), l);
  return [() => {
    const l = [];
    if (ps)
      n = new ps(Z(d, !1), {
        root: t
      }), n.observe(s), pe(l, () => {
        n.disconnect();
      });
    else {
      const v = () => {
        const p = ht(s);
        i(p);
      };
      pe(l, Co(s, v)()), v();
    }
    return Z(Re, pe(l, Fe(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, ba = (t, e, n, o) => {
  let s, c, i, d, l, v;
  const p = `[${at}]`, u = `[${Qe}]`, m = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: _, ht: h, U: x, gt: y, bt: $, L: R, wt: V, yt: k, St: O, Ot: A } = t, j = (T) => tt(T, "direction") === "rtl", F = {
    $t: !1,
    F: j(_)
  }, w = Ke(), L = Ft(ko), [M] = Le({
    i: Qs,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const T = L && L.V(t, e, F, w, n).X, W = !(V && R) && ss(h, at, Qt), X = !R && k(Yr), se = X && Me(y), de = se && A(), we = O(yo, W), he = X && T && T()[0], Ve = ln(x), ne = rs(x);
    return he && he(), Pe(y, se), de && de(), W && we(), {
      w: Ve.w + ne.w,
      h: Ve.h + ne.h
    };
  }), C = Fn(o, {
    _: () => s,
    p: () => c,
    S(T, K) {
      const [W] = T, [X] = K;
      return [Dt(He(W), He(X)).reduce((se, de) => (se[de] = W[de] || X[de], se), {})];
    }
  }), I = (T) => {
    const K = j(_);
    le(T, {
      Ct: v !== K
    }), le(F, {
      F: K
    }), v = K;
  }, S = (T, K) => {
    const [W, X] = T, se = {
      xt: X
    };
    return le(F, {
      $t: W
    }), !K && o(se), se;
  }, H = ({ ft: T, dt: K }) => {
    const X = !(T && !K) && w.P ? C : o, se = {
      ft: T || K,
      dt: K
    };
    I(se), X(se);
  }, B = (T, K) => {
    const [, W] = M(), X = {
      Ht: W
    };
    return I(X), W && !K && (T ? o : C)(X), X;
  }, Q = (T, K, W) => {
    const X = {
      Et: K
    };
    return I(X), K && !W && C(X), X;
  }, [oe, P] = $ ? ga(h, S) : [], ae = !R && Co(h, H, {
    dt: !0
  }), [N, E] = Ls(h, !1, Q, {
    rt: m,
    ct: m
  }), U = R && nn && new nn((T) => {
    const K = T[T.length - 1].contentRect;
    H({
      ft: !0,
      dt: vo(K, l)
    }), l = K;
  }), q = Fn(() => {
    const [, T] = M();
    o({
      Ht: T
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    U && U.observe(h);
    const T = ae && ae(), K = oe && oe(), W = N(), X = w.K((se) => {
      se ? C({
        zt: se
      }) : q();
    });
    return () => {
      U && U.disconnect(), T && T(), K && K(), d && d(), W(), X();
    };
  }, ({ It: T, At: K, Dt: W }) => {
    const X = {}, [se] = T("update.ignoreMutation"), [de, we] = T("update.attributes"), [he, Ve] = T("update.elementEvents"), [ne, Se] = T("update.debounce"), De = Ve || we, xe = K || W, $e = (ge) => Ue(se) && se(ge);
    if (De) {
      i && i(), d && d();
      const [ge, be] = Ls($ || x, !0, B, {
        ct: Dt(m, de || []),
        lt: he,
        it: p,
        _t: (me, ue) => {
          const { target: Ce, attributeName: Te } = me;
          return (!ue && Te && !R ? Ir(Ce, p, u) : !1) || !!mt(Ce, `.${Ie}`) || !!$e(me);
        }
      });
      d = ge(), i = be;
    }
    if (Se)
      if (C.m(), je(ne)) {
        const ge = ne[0], be = ne[1];
        s = qe(ge) && ge, c = qe(be) && be;
      } else qe(ne) ? (s = ne, c = !1) : (s = !1, c = !1);
    if (xe) {
      const ge = E(), be = P && P(), me = i && i();
      ge && le(X, Q(ge[0], ge[1], xe)), be && le(X, S(be[0], xe)), me && le(X, B(me[0], xe));
    }
    return I(X), X;
  }, F];
}, Eo = (t, e) => Ue(e) ? e.apply(0, t) : e, ya = (t, e, n, o) => {
  const s = Xn(o) ? n : o;
  return Eo(t, s) || e.apply(0, t);
}, Vo = (t, e, n, o) => {
  const s = Xn(o) ? n : o, c = Eo(t, s);
  return !!c && (rn(c) ? c : e.apply(0, t));
}, wa = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, P: c, Z: i } = Ke(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, v = n ?? d, p = Xn(o) ? l : o, u = (s.x || s.y) && v, m = t && (un(p) ? !c : p);
  return !!u || !!m;
}, Sa = (t, e, n, o) => {
  const s = "--os-viewport-percent", c = "--os-scroll-percent", i = "--os-scroll-direction", { Z: d } = Ke(), { scrollbars: l } = d(), { slot: v } = l, { vt: p, ht: u, U: m, Mt: _, gt: h, wt: x, L: y } = e, { scrollbars: $ } = _ ? {} : t, { slot: R } = $ || {}, V = [], k = [], O = [], A = Vo([p, u, m], () => y && x ? p : u, v, R), j = (N) => {
    if (Xt) {
      const E = new Xt({
        source: h,
        axis: N
      });
      return {
        kt: (q) => {
          const T = q.Tt.animate({
            clear: ["left"],
            [c]: [0, 1]
          }, {
            timeline: E
          });
          return () => T.cancel();
        }
      };
    }
  }, F = {
    x: j("x"),
    y: j("y")
  }, w = () => {
    const { Rt: N, Vt: E } = n, U = (q, T) => no(0, 1, q / (q + T) || 0);
    return {
      x: U(E.x, N.x),
      y: U(E.y, N.y)
    };
  }, L = (N, E, U) => {
    const q = U ? os : ro;
    ce(N, (T) => {
      q(T.Tt, E);
    });
  }, M = (N, E) => {
    ce(N, (U) => {
      const [q, T] = E(U);
      Ot(q, T);
    });
  }, C = (N, E, U) => {
    const q = Zn(U), T = q ? U : !0, K = q ? !U : !0;
    T && L(k, N, E), K && L(O, N, E);
  }, I = () => {
    const N = w(), E = (U) => (q) => [q.Tt, {
      [s]: Un(U) + ""
    }];
    M(k, E(N.x)), M(O, E(N.y));
  }, S = () => {
    if (!Xt) {
      const { Lt: N } = n, E = Ss(N, Me(h)), U = (q) => (T) => [T.Tt, {
        [c]: Un(q) + ""
      }];
      M(k, U(E.x)), M(O, U(E.y));
    }
  }, H = () => {
    const { Lt: N } = n, E = ws(N), U = (q) => (T) => [T.Tt, {
      [i]: q ? "0" : "1"
    }];
    M(k, U(E.x)), M(O, U(E.y));
  }, B = () => {
    if (y && !x) {
      const { Rt: N, Lt: E } = n, U = ws(E), q = Ss(E, Me(h)), T = (K) => {
        const { Tt: W } = K, X = At(W) === m && W, se = (de, we, he) => {
          const Ve = we * de;
          return uo(he ? Ve : -Ve);
        };
        return [X, X && {
          transform: Ur({
            x: se(q.x, N.x, U.x),
            y: se(q.y, N.y, U.y)
          })
        }];
      };
      M(k, T), M(O, T);
    }
  }, Q = (N) => {
    const E = N ? "x" : "y", q = pt(`${Ie} ${N ? sa : oa}`), T = pt(So), K = pt(ls), W = {
      Tt: q,
      Ut: T,
      Pt: K
    }, X = F[E];
    return pe(N ? k : O, W), pe(V, [Fe(q, T), Fe(T, K), Z(bt, q), X && X.kt(W), o(W, C, N)]), W;
  }, oe = Z(Q, !0), P = Z(Q, !1), ae = () => (Fe(A, k[0].Tt), Fe(A, O[0].Tt), Z(Re, V));
  return oe(), P(), [{
    Nt: I,
    qt: S,
    Bt: H,
    Ft: B,
    jt: C,
    Yt: {
      Wt: k,
      Xt: oe,
      Jt: Z(M, k)
    },
    Gt: {
      Wt: O,
      Xt: P,
      Jt: Z(M, O)
    }
  }, ae];
}, ka = (t, e, n, o) => (s, c, i) => {
  const { ht: d, U: l, L: v, gt: p, Kt: u, Ot: m } = e, { Tt: _, Ut: h, Pt: x } = s, [y, $] = ft(333), [R, V] = ft(444), k = (j) => {
    Ue(p.scrollBy) && p.scrollBy({
      behavior: "smooth",
      left: j.x,
      top: j.y
    });
  }, O = () => {
    const j = "pointerup pointercancel lostpointercapture", F = `client${i ? "X" : "Y"}`, w = i ? vn : fn, L = i ? "left" : "top", M = i ? "w" : "h", C = i ? "x" : "y", I = (H, B) => (Q) => {
      const { Rt: oe } = n, P = ht(h)[M] - ht(x)[M], N = B * Q / P * oe[C];
      Pe(p, {
        [C]: H + N
      });
    }, S = [];
    return fe(h, "pointerdown", (H) => {
      const B = mt(H.target, `.${ls}`) === x, Q = B ? x : h, oe = t.scrollbars, P = oe[B ? "dragScroll" : "clickScroll"], { button: ae, isPrimary: N, pointerType: E } = H, { pointers: U } = oe;
      if (ae === 0 && N && P && (U || []).includes(E)) {
        Re(S), V();
        const T = !B && (H.shiftKey || P === "instant"), K = Z(xn, x), W = Z(xn, h), X = (ue, Ce) => (ue || K())[L] - (Ce || W())[L], se = Dn(xn(p)[w]) / ht(p)[M] || 1, de = I(Me(p)[C], 1 / se), we = H[F], he = K(), Ve = W(), ne = he[w], Se = X(he, Ve) + ne / 2, De = we - Ve[L], xe = B ? 0 : De - Se, $e = (ue) => {
          Re(me), Q.releasePointerCapture(ue.pointerId);
        }, ge = B || T, be = m(), me = [fe(u, j, $e), fe(u, "selectstart", (ue) => Nn(ue), {
          H: !1
        }), fe(h, j, $e), ge && fe(h, "pointermove", (ue) => de(xe + (ue[F] - we))), ge && (() => {
          const ue = Me(p);
          be();
          const Ce = Me(p), Te = {
            x: Ce.x - ue.x,
            y: Ce.y - ue.y
          };
          (en(Te.x) > 3 || en(Te.y) > 3) && (m(), Pe(p, ue), k(Te), R(be));
        })];
        if (Q.setPointerCapture(H.pointerId), T)
          de(xe);
        else if (!B) {
          const ue = Ft(_a);
          if (ue) {
            const Ce = ue(de, xe, ne, (Te) => {
              Te ? be() : pe(me, be);
            });
            pe(me, Ce), pe(S, Z(Ce, !0));
          }
        }
      }
    });
  };
  let A = !0;
  return Z(Re, [fe(x, "pointermove pointerleave", o), fe(_, "pointerenter", () => {
    c(Cs, !0);
  }), fe(_, "pointerleave pointercancel", () => {
    c(Cs, !1);
  }), !v && fe(_, "mousedown", () => {
    const j = In();
    (hs(j, Qe) || hs(j, at) || j === document.body) && tn(Z(Gn, l), 25);
  }), fe(_, "wheel", (j) => {
    const { deltaX: F, deltaY: w, deltaMode: L } = j;
    A && L === 0 && At(_) === d && k({
      x: F,
      y: w
    }), A = !1, c(Ts, !0), y(() => {
      A = !0, c(Ts);
    }), Nn(j);
  }, {
    H: !1,
    I: !0
  }), fe(_, "pointerdown", Z(fe, u, "click", mo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), O(), $, V]);
}, xa = (t, e, n, o, s, c) => {
  let i, d, l, v, p, u = ut, m = 0;
  const _ = ["mouse", "pen"], h = (E) => _.includes(E.pointerType), [x, y] = ft(), [$, R] = ft(100), [V, k] = ft(100), [O, A] = ft(() => m), [j, F] = Sa(t, s, o, ka(e, s, o, (E) => h(E) && oe())), { ht: w, Qt: L, wt: M } = s, { jt: C, Nt: I, qt: S, Bt: H, Ft: B } = j, Q = (E, U) => {
    if (A(), E)
      C(Vs);
    else {
      const q = Z(C, Vs, !0);
      m > 0 && !U ? O(q) : q();
    }
  }, oe = () => {
    (l ? !i : !v) && (Q(!0), $(() => {
      Q(!1);
    }));
  }, P = (E) => {
    C(qn, E, !0), C(qn, E, !1);
  }, ae = (E) => {
    h(E) && (i = l, l && Q(!0));
  }, N = [A, R, k, y, () => u(), fe(w, "pointerover", ae, {
    A: !0
  }), fe(w, "pointerenter", ae), fe(w, "pointerleave", (E) => {
    h(E) && (i = !1, l && Q(!1));
  }), fe(w, "pointermove", (E) => {
    h(E) && d && oe();
  }), fe(L, "scroll", (E) => {
    x(() => {
      S(), oe();
    }), c(E), B();
  })];
  return [() => Z(Re, pe(N, F())), ({ It: E, Dt: U, Zt: q, tn: T }) => {
    const { nn: K, sn: W, en: X, cn: se } = T || {}, { Ct: de, dt: we } = q || {}, { F: he } = n, { T: Ve } = Ke(), { k: ne, rn: Se } = o, [De, xe] = E("showNativeOverlaidScrollbars"), [$e, ge] = E("scrollbars.theme"), [be, me] = E("scrollbars.visibility"), [ue, Ce] = E("scrollbars.autoHide"), [Te, $t] = E("scrollbars.autoHideSuspend"), [Mt] = E("scrollbars.autoHideDelay"), [Rt, It] = E("scrollbars.dragScroll"), [it, Ct] = E("scrollbars.clickScroll"), [Ut, gn] = E("overflow"), bn = we && !U, yn = Se.x || Se.y, Ne = K || W || se || de || U, wn = X || me || gn, Ht = De && Ve.x && Ve.y, Nt = (st, Et, Vt) => {
      const Gt = st.includes(gt) && (be === rt || be === "auto" && Et === gt);
      return C(ra, Gt, Vt), Gt;
    };
    if (m = Mt, bn && (Te && yn ? (P(!1), u(), V(() => {
      u = fe(L, "scroll", Z(P, !0), {
        A: !0
      });
    })) : P(!0)), xe && C(ta, Ht), ge && (C(p), C($e, !0), p = $e), $t && !Te && P(!0), Ce && (d = ue === "move", l = ue === "leave", v = ue === "never", Q(v, !0)), It && C(ia, Rt), Ct && C(la, !!it), wn) {
      const st = Nt(Ut.x, ne.x, !0), Et = Nt(Ut.y, ne.y, !1);
      C(aa, !(st && Et));
    }
    Ne && (S(), I(), B(), se && H(), C(Es, !Se.x, !0), C(Es, !Se.y, !1), C(na, he && !M));
  }, {}, j];
}, $a = (t) => {
  const e = Ke(), { Z: n, P: o } = e, { elements: s } = n(), { padding: c, viewport: i, content: d } = s, l = rn(t), v = l ? {} : t, { elements: p } = v, { padding: u, viewport: m, content: _ } = p || {}, h = l ? t : v.target, x = lo(h), y = h.ownerDocument, $ = y.documentElement, R = () => y.defaultView || Oe, V = Z(ya, [h]), k = Z(Vo, [h]), O = Z(pt, ""), A = Z(V, O, i), j = Z(k, O, d), F = (ne) => {
    const Se = ht(ne), De = ln(ne), xe = tt(ne, Zs), $e = tt(ne, Js);
    return De.w - Se.w > 0 && !yt(xe) || De.h - Se.h > 0 && !yt($e);
  }, w = A(m), L = w === h, M = L && x, C = !L && j(_), I = !L && w === C, S = M ? $ : w, H = M ? S : h, B = !L && k(O, c, u), Q = !I && C, oe = [Q, S, B, H].map((ne) => rn(ne) && !At(ne) && ne), P = (ne) => ne && Ps(oe, ne), ae = !P(S) && F(S) ? S : h, N = M ? $ : S, U = {
    vt: h,
    ht: H,
    U: S,
    ln: B,
    bt: Q,
    gt: N,
    Qt: M ? y : S,
    an: x ? $ : ae,
    Kt: y,
    wt: x,
    Mt: l,
    L,
    un: R,
    yt: (ne) => ss(S, Qe, ne),
    St: (ne, Se) => an(S, Qe, ne, Se),
    Ot: () => an(N, Qe, Xr, !0)
  }, { vt: q, ht: T, ln: K, U: W, bt: X } = U, se = [() => {
    Ge(T, [at, $n]), Ge(q, $n), x && Ge($, [$n, at]);
  }];
  let de = Rn([X, W, K, T, q].find((ne) => ne && !P(ne)));
  const we = M ? q : X || W, he = Z(Re, se);
  return [U, () => {
    const ne = R(), Se = In(), De = (me) => {
      Fe(At(me), Rn(me)), bt(me);
    }, xe = (me) => fe(me, "focusin focusout focus blur", mo, {
      I: !0,
      H: !1
    }), $e = "tabindex", ge = ts(W, $e), be = xe(Se);
    return Je(T, at, L ? "" : jr), Je(K, Pn, ""), Je(W, Qe, ""), Je(X, $s, ""), L || (Je(W, $e, ge || "-1"), x && Je($, xs, "")), Fe(we, de), Fe(T, K), Fe(K || T, !L && W), Fe(W, X), pe(se, [be, () => {
      const me = In(), ue = P(W), Ce = ue && me === W ? q : me, Te = xe(Ce);
      Ge(K, Pn), Ge(X, $s), Ge(W, Qe), x && Ge($, xs), ge ? Je(W, $e, ge) : Ge(W, $e), P(X) && De(X), ue && De(W), P(K) && De(K), Gn(Ce), Te();
    }]), o && !L && (ns(W, Qe, wo), pe(se, Z(Ge, W, Qe))), Gn(!L && x && Se === q && ne.top === ne ? W : Se), be(), de = 0, he;
  }, he];
}, Ca = ({ bt: t }) => ({ Zt: e, _n: n, Dt: o }) => {
  const { xt: s } = e || {}, { $t: c } = n;
  t && (s || o) && Ot(t, {
    [fn]: c && "100%"
  });
}, Ea = ({ ht: t, ln: e, U: n, L: o }, s) => {
  const [c, i] = Le({
    i: Mr,
    o: bs()
  }, Z(bs, t, "padding", ""));
  return ({ It: d, Zt: l, _n: v, Dt: p }) => {
    let [u, m] = i(p);
    const { P: _ } = Ke(), { ft: h, Ht: x, Ct: y } = l || {}, { F: $ } = v, [R, V] = d("paddingAbsolute");
    (h || m || (p || x)) && ([u, m] = c(p));
    const O = !o && (V || y || m);
    if (O) {
      const A = !R || !e && !_, j = u.r + u.l, F = u.t + u.b, w = {
        [Ys]: A && !$ ? -j : 0,
        [Xs]: A ? -F : 0,
        [Ks]: A && $ ? -j : 0,
        top: A ? -u.t : 0,
        right: A ? $ ? -u.r : "auto" : 0,
        left: A ? $ ? "auto" : -u.l : 0,
        [vn]: A && `calc(100% + ${j}px)`
      }, L = {
        [qs]: A ? u.t : 0,
        [zs]: A ? u.r : 0,
        [Ws]: A ? u.b : 0,
        [js]: A ? u.l : 0
      };
      Ot(e || n, w), Ot(n, L), le(s, {
        ln: u,
        dn: !A,
        j: e ? L : le({}, w, L)
      });
    }
    return {
      fn: O
    };
  };
}, Va = (t, e) => {
  const n = Ke(), { ht: o, ln: s, U: c, L: i, Qt: d, gt: l, wt: v, St: p, un: u } = t, { P: m } = n, _ = v && i, h = Z(Gs, 0), x = {
    display: () => !1,
    direction: (E) => E !== "ltr",
    flexDirection: (E) => E.endsWith("-reverse"),
    writingMode: (E) => E !== "horizontal-tb"
  }, y = He(x), $ = {
    i: Qs,
    o: {
      w: 0,
      h: 0
    }
  }, R = {
    i: Zt,
    o: {}
  }, V = (E) => {
    p(yo, !_ && E);
  }, k = (E) => {
    if (!y.some((we) => {
      const he = E[we];
      return he && x[we](he);
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
    V(!0);
    const q = Me(l), T = p(Zr, !0), K = fe(d, gt, (we) => {
      const he = Me(l);
      we.isTrusted && he.x === q.x && he.y === q.y && fo(we);
    }, {
      I: !0,
      A: !0
    });
    Pe(l, {
      x: 0,
      y: 0
    }), T();
    const W = Me(l), X = ln(l);
    Pe(l, {
      x: X.w,
      y: X.h
    });
    const se = Me(l);
    Pe(l, {
      x: se.x - W.x < 1 && -X.w,
      y: se.y - W.y < 1 && -X.h
    });
    const de = Me(l);
    return Pe(l, q), Yn(() => K()), {
      D: W,
      M: de
    };
  }, O = (E, U) => {
    const q = Oe.devicePixelRatio % 1 !== 0 ? 1 : 0, T = {
      w: h(E.w - U.w),
      h: h(E.h - U.h)
    };
    return {
      w: T.w > q ? T.w : 0,
      h: T.h > q ? T.h : 0
    };
  }, [A, j] = Le($, Z(rs, c)), [F, w] = Le($, Z(ln, c)), [L, M] = Le($), [C] = Le(R), [I, S] = Le($), [H] = Le(R), [B] = Le({
    i: (E, U) => mn(E, U, y),
    o: {}
  }, () => Br(c) ? tt(c, y) : {}), [Q, oe] = Le({
    i: (E, U) => Zt(E.D, U.D) && Zt(E.M, U.M),
    o: po()
  }), P = Ft(ko), ae = (E, U) => `${U ? Wr : Kr}${Fr(E)}`, N = (E) => {
    const U = (T) => [rt, ct, gt].map((K) => ae(K, T)), q = U(!0).concat(U()).join(" ");
    p(q), p(He(E).map((T) => ae(E[T], T === "x")).join(" "), !0);
  };
  return ({ It: E, Zt: U, _n: q, Dt: T }, { fn: K }) => {
    const { ft: W, Ht: X, Ct: se, dt: de, zt: we } = U || {}, he = P && P.V(t, e, q, n, E), { W: Ve, X: ne, J: Se } = he || {}, [De, xe] = da(E, n), [$e, ge] = E("overflow"), be = yt($e.x), me = yt($e.y), ue = !0;
    let Ce = j(T), Te = w(T), $t = M(T), Mt = S(T);
    xe && m && p(wo, !De);
    {
      ss(o, at, Qt) && V(!0);
      const [_s] = ne ? ne() : [], [Bt] = Ce = A(T), [Pt] = Te = F(T), qt = _o(c), zt = _ && Gr(u()), Go = {
        w: h(Pt.w + Bt.w),
        h: h(Pt.h + Bt.h)
      }, vs = {
        w: h((zt ? zt.w : qt.w + h(qt.w - Pt.w)) + Bt.w),
        h: h((zt ? zt.h : qt.h + h(qt.h - Pt.h)) + Bt.h)
      };
      _s && _s(), Mt = I(vs), $t = L(O(Go, vs), T);
    }
    const [Rt, It] = Mt, [it, Ct] = $t, [Ut, gn] = Te, [bn, yn] = Ce, [Ne, wn] = C({
      x: it.w > 0,
      y: it.h > 0
    }), Ht = be && me && (Ne.x || Ne.y) || be && Ne.x && !Ne.y || me && Ne.y && !Ne.x, Nt = K || se || we || yn || gn || It || Ct || ge || xe || ue, st = ua(Ne, $e), [Et, Vt] = H(st.k), [Gt, Uo] = B(T), us = se || de || Uo || wn || T, [Ho, No] = us ? Q(k(Gt), T) : oe();
    return Nt && (Vt && N(st.k), Se && Ve && Ot(c, Se(st, q, Ve(st, Ut, bn)))), V(!1), an(o, at, Qt, Ht), an(s, Pn, Qt, Ht), le(e, {
      k: Et,
      Vt: {
        x: Rt.w,
        y: Rt.h
      },
      Rt: {
        x: it.w,
        y: it.h
      },
      rn: Ne,
      Lt: Pr(Ho, it)
    }), {
      en: Vt,
      nn: It,
      sn: Ct,
      cn: No || Ct,
      pn: us
    };
  };
}, Ta = (t) => {
  const [e, n, o] = $a(t), s = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    j: {
      [Ys]: 0,
      [Xs]: 0,
      [Ks]: 0,
      [qs]: 0,
      [zs]: 0,
      [Ws]: 0,
      [js]: 0
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
      x: ct,
      y: ct
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: po()
  }, { vt: c, gt: i, L: d, Ot: l } = e, { P: v, T: p } = Ke(), u = !v && (p.x || p.y), m = [Ca(e), Ea(e, s), Va(e, s)];
  return [n, (_) => {
    const h = {}, y = u && Me(i), $ = y && l();
    return ce(m, (R) => {
      le(h, R(_, h) || {});
    }), Pe(i, y), $ && $(), !d && Pe(c, 0), h;
  }, s, e, o];
}, Da = (t, e, n, o, s) => {
  let c = !1;
  const i = Os(e, {}), [d, l, v, p, u] = Ta(t), [m, _, h] = ba(p, v, i, (k) => {
    V({}, k);
  }), [x, y, , $] = xa(t, e, h, v, p, s), R = (k) => He(k).some((O) => !!k[O]), V = (k, O) => {
    if (n())
      return !1;
    const { vn: A, Dt: j, At: F, hn: w } = k, L = A || {}, M = !!j || !c, C = {
      It: Os(e, L, M),
      vn: L,
      Dt: M
    };
    if (w)
      return y(C), !1;
    const I = O || _(le({}, C, {
      At: F
    })), S = l(le({}, C, {
      _n: h,
      Zt: I
    }));
    y(le({}, C, {
      Zt: I,
      tn: S
    }));
    const H = R(I), B = R(S), Q = H || B || !es(L) || M;
    return c = !0, Q && o(k, {
      Zt: I,
      tn: S
    }), Q;
  };
  return [() => {
    const { an: k, gt: O, Ot: A } = p, j = Me(k), F = [m(), d(), x()], w = A();
    return Pe(O, j), w(), Z(Re, F);
  }, V, () => ({
    gn: h,
    bn: v
  }), {
    wn: p,
    yn: $
  }, u];
}, is = /* @__PURE__ */ new WeakMap(), Aa = (t, e) => {
  is.set(t, e);
}, Oa = (t) => {
  is.delete(t);
}, To = (t) => is.get(t), We = (t, e, n) => {
  const { nt: o } = Ke(), s = rn(t), c = s ? t : t.target, i = To(c);
  if (e && !i) {
    let d = !1;
    const l = [], v = {}, p = (L) => {
      const M = to(L), C = Ft(zr);
      return C ? C(M, !0) : M;
    }, u = le({}, o(), p(e)), [m, _, h] = Bn(), [x, y, $] = Bn(n), R = (L, M) => {
      $(L, M), h(L, M);
    }, [V, k, O, A, j] = Da(t, u, () => d, ({ vn: L, Dt: M }, { Zt: C, tn: I }) => {
      const { ft: S, Ct: H, xt: B, Ht: Q, Et: oe, dt: P } = C, { nn: ae, sn: N, en: E, cn: U } = I;
      R("updated", [w, {
        updateHints: {
          sizeChanged: !!S,
          directionChanged: !!H,
          heightIntrinsicChanged: !!B,
          overflowEdgeChanged: !!ae,
          overflowAmountChanged: !!N,
          overflowStyleChanged: !!E,
          scrollCoordinatesChanged: !!U,
          contentMutation: !!Q,
          hostMutation: !!oe,
          appear: !!P
        },
        changedOptions: L || {},
        force: !!M
      }]);
    }, (L) => R("scroll", [w, L])), F = (L) => {
      Oa(c), Re(l), d = !0, R("destroyed", [w, L]), _(), y();
    }, w = {
      options(L, M) {
        if (L) {
          const C = M ? o() : {}, I = xo(u, le(C, p(L)));
          es(I) || (le(u, I), k({
            vn: I
          }));
        }
        return le({}, u);
      },
      on: x,
      off: (L, M) => {
        L && M && y(L, M);
      },
      state() {
        const { gn: L, bn: M } = O(), { F: C } = L, { Vt: I, Rt: S, k: H, rn: B, ln: Q, dn: oe, Lt: P } = M;
        return le({}, {
          overflowEdge: I,
          overflowAmount: S,
          overflowStyle: H,
          hasOverflow: B,
          scrollCoordinates: {
            start: P.D,
            end: P.M
          },
          padding: Q,
          paddingAbsolute: oe,
          directionRTL: C,
          destroyed: d
        });
      },
      elements() {
        const { vt: L, ht: M, ln: C, U: I, bt: S, gt: H, Qt: B } = A.wn, { Yt: Q, Gt: oe } = A.yn, P = (N) => {
          const { Pt: E, Ut: U, Tt: q } = N;
          return {
            scrollbar: q,
            track: U,
            handle: E
          };
        }, ae = (N) => {
          const { Wt: E, Xt: U } = N, q = P(E[0]);
          return le({}, q, {
            clone: () => {
              const T = P(U());
              return k({
                hn: !0
              }), T;
            }
          });
        };
        return le({}, {
          target: L,
          host: M,
          padding: C || I,
          viewport: I,
          content: S || I,
          scrollOffsetElement: H,
          scrollEventElement: B,
          scrollbarHorizontal: ae(Q),
          scrollbarVertical: ae(oe)
        });
      },
      update: (L) => k({
        Dt: L,
        At: !0
      }),
      destroy: Z(F, !1),
      plugin: (L) => v[He(L)[0]]
    };
    return pe(l, [j]), Aa(c, w), bo(ho, We, [w, m, v]), wa(A.wn.wt, !s && t.cancel) ? (F(!0), w) : (pe(l, V()), R("initialized", [w]), w.update(), w);
  }
  return i;
};
We.plugin = (t) => {
  const e = je(t), n = e ? t : [t], o = n.map((s) => bo(s, We)[0]);
  return qr(n), e ? o : o[0];
};
We.valid = (t) => {
  const e = t && t.elements, n = Ue(e) && e();
  return on(n) && !!To(n.target);
};
We.env = () => {
  const { N: t, T: e, P: n, G: o, st: s, et: c, Z: i, tt: d, nt: l, ot: v } = Ke();
  return le({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: o,
    staticDefaultInitialization: s,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: v
  });
};
We.nonce = ma;
function La() {
  let t;
  const e = D(null), n = Math.floor(Math.random() * 2 ** 32), o = D(!1), s = D([]), c = () => s.value, i = () => t.getSelection(), d = () => s.value.length, l = () => t.clearSelection(!0), v = D(), p = D(null), u = D(null), m = D(null), _ = D(null);
  function h() {
    t = new tr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: O, event: A, isDragging: j }) => {
      if (j)
        t.Interaction._reset(A);
      else {
        o.value = !1;
        const F = e.value.offsetWidth - A.offsetX, w = e.value.offsetHeight - A.offsetY;
        F < 15 && w < 15 && t.Interaction._reset(A), A.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(A);
      }
    }), document.addEventListener("dragleave", (O) => {
      !O.buttons && o.value && (o.value = !1);
    });
  }
  const x = () => dt(() => {
    t.addSelection(
      t.getSelectables()
    ), y();
  }), y = () => {
    s.value = t.getSelection().map((O) => JSON.parse(O.dataset.item)), v.value(s.value);
  }, $ = () => dt(() => {
    const O = c().map((A) => A.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((A) => O.includes(JSON.parse(A.dataset.item).path))
    ), y(), V();
  }), R = (O) => {
    v.value = O, t.subscribe("DS:end", ({ items: A, event: j, isDragging: F }) => {
      s.value = A.map((w) => JSON.parse(w.dataset.item)), O(A.map((w) => JSON.parse(w.dataset.item)));
    });
  }, V = () => {
    p.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (u.value.style.height = e.value.scrollHeight + "px", u.value.style.display = "block") : (u.value.style.height = "100%", u.value.style.display = "none"));
  }, k = (O) => {
    if (!p.value)
      return;
    const { scrollOffsetElement: A } = p.value.elements();
    A.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ee(() => {
    We(m.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: We
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (O) => {
        p.value = O;
      },
      scroll: (O, A) => {
        const { scrollOffsetElement: j } = O.elements();
        e.value.scrollTo({
          top: j.scrollTop,
          left: 0
        });
      }
    }), h(), V(), _.value = new ResizeObserver(V), _.value.observe(e.value), e.value.addEventListener("scroll", k), t.subscribe("DS:scroll", ({ isDragging: O }) => O || k());
  }), Wn(() => {
    t && t.stop(), _.value && _.value.disconnect();
  }), Rs(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: o,
    scrollBar: u,
    scrollBarContainer: m,
    getSelected: c,
    getSelection: i,
    selectAll: x,
    clearSelection: l,
    refreshSelection: $,
    getCount: d,
    onSelect: R
  };
}
function Fa(t, e) {
  const n = D(t), o = D(e), s = D([]), c = D([]), i = D([]), d = D(!1), l = D(5);
  let v = !1, p = !1;
  const u = wt({
    adapter: n,
    storages: [],
    dirname: o,
    files: []
  });
  function m() {
    let R = [], V = [], k = o.value ?? n.value + "://";
    k.length === 0 && (s.value = []), k.replace(n.value + "://", "").split("/").forEach(function(j) {
      R.push(j), R.join("/") !== "" && V.push({
        basename: j,
        name: j,
        path: n.value + "://" + R.join("/"),
        type: "dir"
      });
    }), c.value = V;
    const [O, A] = h(V, l.value);
    i.value = A, s.value = O;
  }
  function _(R) {
    l.value = R, m();
  }
  function h(R, V) {
    return R.length > V ? [R.slice(-V), R.slice(0, -V)] : [R, []];
  }
  function x(R = null) {
    d.value = R ?? !d.value;
  }
  function y() {
    return s.value && s.value.length && !p;
  }
  const $ = ze(() => {
    var R;
    return ((R = s.value[s.value.length - 2]) == null ? void 0 : R.path) ?? n.value + "://";
  });
  return Ee(() => {
  }), Ae(o, m), Ee(m), {
    adapter: n,
    path: o,
    loading: v,
    searchMode: p,
    data: u,
    breadcrumbs: s,
    breadcrumbItems: c,
    limitBreadcrumbItems: _,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: x,
    isGoUpAvailable: y,
    parentFolderPath: $
  };
}
const Ma = (t, e) => {
  const n = ir(t.id), o = er(), s = n.getStore("metricUnits", !1), c = Tr(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = e.icons, v = (h) => Array.isArray(h) ? h : ur, p = n.getStore("persist-path", t.persist), u = p ? n.getStore("path", t.path) : t.path, m = p ? n.getStore("adapter") : null, _ = La();
  return wt({
    /** 
    * Core properties
    * */
    // app version
    version: kn == null ? void 0 : kn.version,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: dr(n, d, o, i),
    // modal state
    modal: Dr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: ze(() => _),
    // http object
    requester: lr(t.request),
    // active features
    features: v(t.features),
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
    theme: c,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Ns : Hs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: p,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // type of progress indicator
    loadingIndicator: t.loadingIndicator,
    // file system
    fs: Fa(m, u)
  });
}, Ra = { class: "vuefinder__modal-layout__container" }, Ia = { class: "vuefinder__modal-layout__content" }, Ua = { class: "vuefinder__modal-layout__footer" }, Ye = {
  __name: "ModalLayout",
  setup(t) {
    const e = D(null), n = re("ServiceContainer");
    return Ee(() => {
      const o = document.querySelector(".v-f-modal input");
      o && o.focus(), dt(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (o, s) => (f(), b("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = St((c) => r(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      a("div", Ra, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = et((c) => r(n).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", Ia, [
              Tt(o.$slots, "default")
            ]),
            a("div", Ua, [
              Tt(o.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ha = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, s] of e)
    n[o] = s;
  return n;
}, Na = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = re("ServiceContainer"), s = D(!1), { t: c } = o.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), s.value = !0, i = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return Ee(() => {
      o.emitter.on(t.on, d);
    }), Wn(() => {
      clearTimeout(i);
    }), {
      shown: s,
      t: c
    };
  }
}, Ga = { key: 1 };
function Ba(t, e, n, o, s, c) {
  return f(), b("div", {
    class: ie(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Tt(t.$slots, "default", { key: 0 }) : (f(), b("span", Ga, g(o.t("Saved.")), 1))
  ], 2);
}
const vt = /* @__PURE__ */ Ha(Na, [["render", Ba]]), Pa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function qa(t, e) {
  return f(), b("svg", Pa, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ]));
}
const za = { render: qa }, ja = { class: "vuefinder__modal-header" }, Wa = { class: "vuefinder__modal-header__icon-container" }, Ka = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, nt = {
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
    return (e, n) => (f(), b("div", ja, [
      a("div", Wa, [
        (f(), Y(Kn(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      a("h3", Ka, g(t.title), 1)
    ]));
  }
}, Ya = { class: "vuefinder__about-modal__content" }, Xa = { class: "vuefinder__about-modal__main" }, Za = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Ja = ["onClick", "aria-current"], Qa = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, el = { class: "vuefinder__about-modal__description" }, tl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, nl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, sl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, ol = { class: "vuefinder__about-modal__description" }, rl = { class: "vuefinder__about-modal__settings" }, al = { class: "vuefinder__about-modal__setting flex" }, ll = { class: "vuefinder__about-modal__setting-input" }, il = { class: "vuefinder__about-modal__setting-label" }, cl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, dl = { class: "vuefinder__about-modal__setting flex" }, ul = { class: "vuefinder__about-modal__setting-input" }, _l = { class: "vuefinder__about-modal__setting-label" }, vl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, fl = { class: "vuefinder__about-modal__setting flex" }, ml = { class: "vuefinder__about-modal__setting-input" }, pl = { class: "vuefinder__about-modal__setting-label" }, hl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, gl = { class: "vuefinder__about-modal__setting flex" }, bl = { class: "vuefinder__about-modal__setting-input" }, yl = { class: "vuefinder__about-modal__setting-label" }, wl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, Sl = { class: "vuefinder__about-modal__setting" }, kl = { class: "vuefinder__about-modal__setting-input" }, xl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, $l = { class: "vuefinder__about-modal__setting-label" }, Cl = ["label"], El = ["value"], Vl = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Tl = { class: "vuefinder__about-modal__setting-input" }, Dl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Al = { class: "vuefinder__about-modal__setting-label" }, Ol = ["label"], Ll = ["value"], Fl = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Ml = { class: "vuefinder__about-modal__shortcuts" }, Rl = { class: "vuefinder__about-modal__shortcut" }, Il = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Hl = { class: "vuefinder__about-modal__shortcut" }, Nl = { class: "vuefinder__about-modal__shortcut" }, Gl = { class: "vuefinder__about-modal__shortcut" }, Bl = { class: "vuefinder__about-modal__shortcut" }, Pl = { class: "vuefinder__about-modal__shortcut" }, ql = { class: "vuefinder__about-modal__shortcut" }, zl = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, jl = { class: "vuefinder__about-modal__description" }, Do = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: o } = e.storage, { t: s } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = ze(() => [
      { name: s("About"), key: c.ABOUT },
      { name: s("Settings"), key: c.SETTINGS },
      { name: s("Shortcuts"), key: c.SHORTCUTS },
      { name: s("Reset"), key: c.RESET }
    ]), d = D("about"), l = async () => {
      o(), location.reload();
    }, v = (R) => {
      e.theme.set(R), e.emitter.emit("vf-theme-saved");
    }, p = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ns : Hs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, u = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, m = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, _ = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), y = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([R]) => Object.keys(h).includes(R))
    ), $ = ze(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (R, V) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: V[7] || (V[7] = (k) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(s)("Close")), 1)
      ]),
      default: te(() => [
        a("div", Ya, [
          z(nt, {
            icon: r(za),
            title: "Vuefinder " + r(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Xa, [
            a("div", null, [
              a("div", null, [
                a("nav", Za, [
                  (f(!0), b(ye, null, ke(i.value, (k) => (f(), b("button", {
                    key: k.name,
                    onClick: (O) => d.value = k.key,
                    class: ie([k.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": k.current ? "page" : void 0
                  }, g(k.name), 11, Ja))), 128))
                ])
              ])
            ]),
            d.value === c.ABOUT ? (f(), b("div", Qa, [
              a("div", el, g(r(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", tl, g(r(s)("Project home")), 1),
              a("a", nl, g(r(s)("Follow on GitHub")), 1)
            ])) : G("", !0),
            d.value === c.SETTINGS ? (f(), b("div", sl, [
              a("div", ol, g(r(s)("Customize your experience with the following settings")), 1),
              a("div", rl, [
                a("fieldset", null, [
                  a("div", al, [
                    a("div", ll, [
                      ve(a("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": V[0] || (V[0] = (k) => r(e).metricUnits = k),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [jt, r(e).metricUnits]
                      ])
                    ]),
                    a("div", il, [
                      a("label", cl, [
                        J(g(r(s)("Use Metric Units")) + " ", 1),
                        z(vt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: te(() => [
                            J(g(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", dl, [
                    a("div", ul, [
                      ve(a("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": V[1] || (V[1] = (k) => r(e).compactListView = k),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [jt, r(e).compactListView]
                      ])
                    ]),
                    a("div", _l, [
                      a("label", vl, [
                        J(g(r(s)("Compact list view")) + " ", 1),
                        z(vt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: te(() => [
                            J(g(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", fl, [
                    a("div", ml, [
                      ve(a("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": V[2] || (V[2] = (k) => r(e).persist = k),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [jt, r(e).persist]
                      ])
                    ]),
                    a("div", pl, [
                      a("label", hl, [
                        J(g(r(s)("Persist path on reload")) + " ", 1),
                        z(vt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: te(() => [
                            J(g(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", gl, [
                    a("div", bl, [
                      ve(a("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": V[3] || (V[3] = (k) => r(e).showThumbnails = k),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [jt, r(e).showThumbnails]
                      ])
                    ]),
                    a("div", yl, [
                      a("label", wl, [
                        J(g(r(s)("Show thumbnails")) + " ", 1),
                        z(vt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: te(() => [
                            J(g(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", Sl, [
                    a("div", kl, [
                      a("label", xl, g(r(s)("Theme")), 1)
                    ]),
                    a("div", $l, [
                      ve(a("select", {
                        id: "theme",
                        "onUpdate:modelValue": V[4] || (V[4] = (k) => r(e).theme.value = k),
                        onChange: V[5] || (V[5] = (k) => v(k.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Theme")
                        }, [
                          (f(!0), b(ye, null, ke($.value, (k, O) => (f(), b("option", { value: O }, g(k), 9, El))), 256))
                        ], 8, Cl)
                      ], 544), [
                        [Tn, r(e).theme.value]
                      ]),
                      z(vt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: te(() => [
                          J(g(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  r(e).features.includes(r(_e).LANGUAGE) && Object.keys(r(y)).length > 1 ? (f(), b("div", Vl, [
                    a("div", Tl, [
                      a("label", Dl, g(r(s)("Language")), 1)
                    ]),
                    a("div", Al, [
                      ve(a("select", {
                        id: "language",
                        "onUpdate:modelValue": V[6] || (V[6] = (k) => r(e).i18n.locale = k),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Language")
                        }, [
                          (f(!0), b(ye, null, ke(r(y), (k, O) => (f(), b("option", { value: O }, g(k), 9, Ll))), 256))
                        ], 8, Ol)
                      ], 512), [
                        [Tn, r(e).i18n.locale]
                      ]),
                      z(vt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: te(() => [
                          J(g(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : G("", !0)
                ])
              ])
            ])) : G("", !0),
            d.value === c.SHORTCUTS ? (f(), b("div", Fl, [
              a("div", Ml, [
                a("div", Rl, [
                  a("div", null, g(r(s)("Rename")), 1),
                  V[8] || (V[8] = a("kbd", null, "F2", -1))
                ]),
                a("div", Il, [
                  a("div", null, g(r(s)("Refresh")), 1),
                  V[9] || (V[9] = a("kbd", null, "F5", -1))
                ]),
                a("div", Ul, [
                  J(g(r(s)("Delete")) + " ", 1),
                  V[10] || (V[10] = a("kbd", null, "Del", -1))
                ]),
                a("div", Hl, [
                  J(g(r(s)("Escape")) + " ", 1),
                  V[11] || (V[11] = a("div", null, [
                    a("kbd", null, "Esc")
                  ], -1))
                ]),
                a("div", Nl, [
                  J(g(r(s)("Select All")) + " ", 1),
                  V[12] || (V[12] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, "A")
                  ], -1))
                ]),
                a("div", Gl, [
                  J(g(r(s)("Search")) + " ", 1),
                  V[13] || (V[13] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, "F")
                  ], -1))
                ]),
                a("div", Bl, [
                  J(g(r(s)("Toggle Sidebar")) + " ", 1),
                  V[14] || (V[14] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, "E")
                  ], -1))
                ]),
                a("div", Pl, [
                  J(g(r(s)("Open Settings")) + " ", 1),
                  V[15] || (V[15] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, ",")
                  ], -1))
                ]),
                a("div", ql, [
                  J(g(r(s)("Toggle Full Screen")) + " ", 1),
                  V[16] || (V[16] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : G("", !0),
            d.value === c.RESET ? (f(), b("div", zl, [
              a("div", jl, g(r(s)("Reset all settings to default")), 1),
              a("button", {
                onClick: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(r(s)("Reset Settings")), 1)
            ])) : G("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Wl = ["title"], Xe = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var v;
    const n = e, o = re("ServiceContainer"), { t: s } = o.i18n, c = D(!1), i = D(null), d = D((v = i.value) == null ? void 0 : v.strMessage);
    Ae(d, () => c.value = !1);
    const l = () => {
      n("hidden"), c.value = !0;
    };
    return (p, u) => (f(), b("div", null, [
      c.value ? G("", !0) : (f(), b("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ie(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Tt(p.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          onClick: l,
          title: r(s)("Close")
        }, u[0] || (u[0] = [
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
        ]), 8, Wl)
      ], 2))
    ]));
  }
}, Kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Yl(t, e) {
  return f(), b("svg", Kl, e[0] || (e[0] = [
    a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const Xl = { render: Yl }, Zl = { class: "vuefinder__delete-modal__content" }, Jl = { class: "vuefinder__delete-modal__form" }, Ql = { class: "vuefinder__delete-modal__description" }, ei = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ti = { class: "vuefinder__delete-modal__file" }, ni = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, si = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oi = { class: "vuefinder__delete-modal__file-name" }, ri = { class: "vuefinder__delete-modal__warning" }, cs = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = D(e.modal.data.items), s = D(""), c = () => {
      o.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: o.value.map(({ path: i, type: d }) => ({ path: i, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, g(r(n)("Yes, Delete!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1),
        a("div", ri, g(r(n)("This action cannot be undone.")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          z(nt, {
            icon: r(Xl),
            title: r(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", Zl, [
            a("div", Jl, [
              a("p", Ql, g(r(n)("Are you sure you want to delete these files?")), 1),
              a("div", ei, [
                (f(!0), b(ye, null, ke(o.value, (l) => (f(), b("p", ti, [
                  l.type === "dir" ? (f(), b("svg", ni, d[2] || (d[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), b("svg", si, d[3] || (d[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", oi, g(l.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (f(), Y(Xe, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => s.value = ""),
                error: ""
              }, {
                default: te(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function li(t, e) {
  return f(), b("svg", ai, e[0] || (e[0] = [
    a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const ii = { render: li }, ci = { class: "vuefinder__rename-modal__content" }, di = { class: "vuefinder__rename-modal__item" }, ui = { class: "vuefinder__rename-modal__item-info" }, _i = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vi = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fi = { class: "vuefinder__rename-modal__item-name" }, ds = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = D(e.modal.data.items[0]), s = D(e.modal.data.items[0].basename), c = D(""), i = () => {
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
          c.value = n(d.message);
        }
      });
    };
    return (d, l) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          z(nt, {
            icon: r(ii),
            title: r(n)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", ci, [
            a("div", di, [
              a("p", ui, [
                o.value.type === "dir" ? (f(), b("svg", _i, l[3] || (l[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), b("svg", vi, l[4] || (l[4] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", fi, g(o.value.basename), 1)
              ]),
              ve(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (v) => s.value = v),
                onKeyup: St(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [kt, s.value]
              ]),
              c.value.length ? (f(), Y(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (v) => c.value = ""),
                error: ""
              }, {
                default: te(() => [
                  J(g(c.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ze = {
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
function mi(t) {
  const e = (n) => {
    n.code === Ze.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ze.F2 && t.features.includes(_e.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ds, { items: t.dragSelect.getSelected() })), n.code === Ze.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ze.DELETE && (!t.dragSelect.getCount() || t.modal.open(cs, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ze.BACKSLASH && t.modal.open(Do), n.metaKey && n.code === Ze.KEY_F && t.features.includes(_e.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ze.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ze.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ze.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  Ee(() => {
    t.root.addEventListener("keydown", e);
  });
}
const pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function hi(t, e) {
  return f(), b("svg", pi, e[0] || (e[0] = [
    a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const gi = { render: hi }, bi = { class: "vuefinder__new-folder-modal__content" }, yi = { class: "vuefinder__new-folder-modal__form" }, wi = { class: "vuefinder__new-folder-modal__description" }, Si = ["placeholder"], Ao = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, o = D(""), s = D(""), c = () => {
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
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          z(nt, {
            icon: r(gi),
            title: r(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", bi, [
            a("div", yi, [
              a("p", wi, g(r(n)("Create a new folder")), 1),
              ve(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => o.value = l),
                onKeyup: St(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: r(n)("Folder Name"),
                type: "text"
              }, null, 40, Si), [
                [kt, o.value]
              ]),
              s.value.length ? (f(), Y(Xe, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: te(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function xi(t, e) {
  return f(), b("svg", ki, e[0] || (e[0] = [
    a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const $i = { render: xi }, Ci = { class: "vuefinder__new-file-modal__content" }, Ei = { class: "vuefinder__new-file-modal__form" }, Vi = { class: "vuefinder__new-file-modal__description" }, Ti = ["placeholder"], Di = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, o = D(""), s = D(""), c = () => {
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
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          z(nt, {
            icon: r($i),
            title: r(n)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", Ci, [
            a("div", Ei, [
              a("p", Vi, g(r(n)("Create a new file")), 1),
              ve(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => o.value = l),
                onKeyup: St(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: r(n)("File Name"),
                type: "text"
              }, null, 40, Ti), [
                [kt, o.value]
              ]),
              s.value.length ? (f(), Y(Xe, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: te(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function zn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Oi(t, e) {
  return f(), b("svg", Ai, e[0] || (e[0] = [
    a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const Li = { render: Oi }, Fi = { class: "vuefinder__upload-modal__content" }, Mi = {
  key: 0,
  class: "pointer-events-none"
}, Ri = {
  key: 1,
  class: "pointer-events-none"
}, Ii = ["disabled"], Ui = ["disabled"], Hi = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ni = ["textContent"], Gi = { class: "vuefinder__upload-modal__file-info" }, Bi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Pi = { class: "vuefinder__upload-modal__file-name md:hidden" }, qi = {
  key: 0,
  class: "ml-auto"
}, zi = ["title", "disabled", "onClick"], ji = {
  key: 0,
  class: "py-2"
}, Wi = ["disabled"], Ki = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = D({ QUEUE_ENTRY_STATUS: s }), i = D(null), d = D(null), l = D(null), v = D(null), p = D(null), u = D(null), m = D([]), _ = D(""), h = D(!1), x = D(!1);
    let y;
    function $(C) {
      return m.value.findIndex((I) => I.id === C);
    }
    function R(C, I = null) {
      I = I ?? (C.webkitRelativePath || C.name), y.addFile({
        name: I,
        type: C.type,
        data: C,
        source: "Local"
      });
    }
    function V(C) {
      switch (C.status) {
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
    const k = (C) => {
      switch (C.status) {
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
    function O() {
      v.value.click();
    }
    function A() {
      if (!h.value) {
        if (!m.value.filter((C) => C.status !== s.DONE).length) {
          _.value = n("Please select file to upload first.");
          return;
        }
        _.value = "", y.retryAll(), y.upload();
      }
    }
    function j() {
      y.cancelAll({ reason: "user" }), m.value.forEach((C) => {
        C.status !== s.DONE && (C.status = s.CANCELED, C.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function F(C) {
      h.value || (y.removeFile(C.id, "removed-by-user"), m.value.splice($(C.id), 1));
    }
    function w(C) {
      if (!h.value) {
        if (y.cancelAll({ reason: "user" }), C) {
          const I = [];
          m.value.forEach((S) => {
            S.status !== s.DONE && I.push(S);
          }), m.value = [], I.forEach((S) => {
            R(S.originalFile, S.name);
          });
          return;
        }
        m.value.splice(0);
      }
    }
    function L() {
      e.modal.close();
    }
    function M() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ee(async () => {
      y = new nr({
        debug: e.debug,
        restrictions: {
          maxFileSize: Vr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: o,
        onBeforeFileAdded(S, H) {
          if (H[S.id] != null) {
            const Q = $(S.id);
            m.value[Q].status === s.PENDING && (_.value = y.i18n("noDuplicates", { fileName: S.name })), m.value = m.value.filter((oe) => oe.id !== S.id);
          }
          return m.value.push({
            id: S.id,
            name: S.name,
            size: e.filesize(S.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: S.data
          }), !0;
        }
      }), y.use(sr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(S, H) {
          let B;
          try {
            B = JSON.parse(S).message;
          } catch {
            B = n("Cannot parse server response.");
          }
          return new Error(B);
        }
      }), y.on("restriction-failed", (S, H) => {
        const B = m.value[$(S.id)];
        F(B), _.value = H.message;
      }), y.on("upload", () => {
        const S = M();
        y.setMeta({ ...S.body });
        const H = y.getPlugin("XHRUpload");
        H.opts.method = S.method, H.opts.endpoint = S.url + "?" + new URLSearchParams(S.params), H.opts.headers = S.headers, delete S.headers["Content-Type"], h.value = !0, m.value.forEach((B) => {
          B.status !== s.DONE && (B.percent = null, B.status = s.UPLOADING, B.statusName = n("Pending upload"));
        });
      }), y.on("upload-progress", (S, H) => {
        const B = Math.floor(H.bytesUploaded / H.bytesTotal * 100);
        m.value[$(S.id)].percent = `${B}%`;
      }), y.on("upload-success", (S) => {
        const H = m.value[$(S.id)];
        H.status = s.DONE, H.statusName = n("Done");
      }), y.on("upload-error", (S, H) => {
        const B = m.value[$(S.id)];
        B.percent = null, B.status = s.ERROR, H.isNetworkError ? B.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : B.statusName = H ? H.message : n("Unknown Error");
      }), y.on("error", (S) => {
        _.value = S.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), y.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), v.value.addEventListener("click", () => {
        d.value.click();
      }), p.value.addEventListener("click", () => {
        l.value.click();
      }), u.value.addEventListener("dragover", (S) => {
        S.preventDefault(), x.value = !0;
      }), u.value.addEventListener("dragleave", (S) => {
        S.preventDefault(), x.value = !1;
      });
      function C(S, H) {
        H.isFile && H.file((B) => S(H, B)), H.isDirectory && H.createReader().readEntries((B) => {
          B.forEach((Q) => {
            C(S, Q);
          });
        });
      }
      u.value.addEventListener("drop", (S) => {
        S.preventDefault(), x.value = !1;
        const H = /^[/\\](.+)/;
        [...S.dataTransfer.items].forEach((B) => {
          B.kind === "file" && C((Q, oe) => {
            const P = H.exec(Q.fullPath);
            R(oe, P[1]);
          }, B.webkitGetAsEntry());
        });
      });
      const I = ({ target: S }) => {
        const H = S.files;
        for (const B of H)
          R(B);
        S.value = "";
      };
      d.value.addEventListener("change", I), l.value.addEventListener("change", I);
    }), Is(() => {
      y == null || y.close({ reason: "unmount" });
    }), (C, I) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: et(A, ["prevent"])
        }, g(r(n)("Upload")), 9, Wi),
        h.value ? (f(), b("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(j, ["prevent"])
        }, g(r(n)("Cancel")), 1)) : (f(), b("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(L, ["prevent"])
        }, g(r(n)("Close")), 1))
      ]),
      default: te(() => [
        a("div", null, [
          z(nt, {
            icon: r(Li),
            title: r(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", Fi, [
            a("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: u,
              onClick: O
            }, [
              x.value ? (f(), b("div", Mi, g(r(n)("Release to drop these files.")), 1)) : (f(), b("div", Ri, g(r(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            a("div", {
              ref_key: "container",
              ref: i,
              class: "vuefinder__upload-modal__buttons"
            }, [
              a("button", {
                ref_key: "pickFiles",
                ref: v,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(r(n)("Select Files")), 513),
              a("button", {
                ref_key: "pickFolders",
                ref: p,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(r(n)("Select Folders")), 513),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: I[0] || (I[0] = (S) => w(!1))
              }, g(r(n)("Clear all")), 9, Ii),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: I[1] || (I[1] = (S) => w(!0))
              }, g(r(n)("Clear only successful")), 9, Ui)
            ], 512),
            a("div", Hi, [
              (f(!0), b(ye, null, ke(m.value, (S) => (f(), b("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: S.id
              }, [
                a("span", {
                  class: ie(["vuefinder__upload-modal__file-icon", V(S)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: g(k(S))
                  }, null, 8, Ni)
                ], 2),
                a("div", Gi, [
                  a("div", Bi, g(r(zn)(S.name, 40)) + " (" + g(S.size) + ")", 1),
                  a("div", Pi, g(r(zn)(S.name, 16)) + " (" + g(S.size) + ")", 1),
                  a("div", {
                    class: ie(["vuefinder__upload-modal__file-status", V(S)])
                  }, [
                    J(g(S.statusName) + " ", 1),
                    S.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (f(), b("b", qi, g(S.percent), 1)) : G("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: ie(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: r(n)("Delete"),
                  disabled: h.value,
                  onClick: (H) => F(S)
                }, I[3] || (I[3] = [
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
                ]), 10, zi)
              ]))), 128)),
              m.value.length ? G("", !0) : (f(), b("div", ji, g(r(n)("No files selected!")), 1))
            ]),
            _.value.length ? (f(), Y(Xe, {
              key: 0,
              onHidden: I[2] || (I[2] = (S) => _.value = ""),
              error: ""
            }, {
              default: te(() => [
                J(g(_.value), 1)
              ]),
              _: 1
            })) : G("", !0)
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
          ref: l,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, Yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Xi(t, e) {
  return f(), b("svg", Yi, e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Zi = { render: Xi }, Ji = { class: "vuefinder__unarchive-modal__content" }, Qi = { class: "vuefinder__unarchive-modal__items" }, ec = { class: "vuefinder__unarchive-modal__item" }, tc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, nc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, sc = { class: "vuefinder__unarchive-modal__item-name" }, oc = { class: "vuefinder__unarchive-modal__info" }, Oo = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = D(e.modal.data.items[0]), s = D(""), c = D([]), i = () => {
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
    return (d, l) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: l[1] || (l[1] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          z(nt, {
            icon: r(Zi),
            title: r(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Ji, [
            a("div", Qi, [
              (f(!0), b(ye, null, ke(c.value, (v) => (f(), b("p", ec, [
                v.type === "dir" ? (f(), b("svg", tc, l[2] || (l[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), b("svg", nc, l[3] || (l[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", sc, g(v.basename), 1)
              ]))), 256)),
              a("p", oc, g(r(n)("The archive will be unarchived at")) + " (" + g(r(e).fs.data.dirname) + ")", 1),
              s.value.length ? (f(), Y(Xe, {
                key: 0,
                onHidden: l[0] || (l[0] = (v) => s.value = ""),
                error: ""
              }, {
                default: te(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, rc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ac(t, e) {
  return f(), b("svg", rc, e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const lc = { render: ac }, ic = { class: "vuefinder__archive-modal__content" }, cc = { class: "vuefinder__archive-modal__form" }, dc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, uc = { class: "vuefinder__archive-modal__file" }, _c = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fc = { class: "vuefinder__archive-modal__file-name" }, mc = ["placeholder"], Lo = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = D(""), s = D(""), c = D(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
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
    return (d, l) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          z(nt, {
            icon: r(lc),
            title: r(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", ic, [
            a("div", cc, [
              a("div", dc, [
                (f(!0), b(ye, null, ke(c.value, (v) => (f(), b("p", uc, [
                  v.type === "dir" ? (f(), b("svg", _c, l[3] || (l[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), b("svg", vc, l[4] || (l[4] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", fc, g(v.basename), 1)
                ]))), 256))
              ]),
              ve(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (v) => o.value = v),
                onKeyup: St(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: r(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, mc), [
                [kt, o.value]
              ]),
              s.value.length ? (f(), Y(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (v) => s.value = ""),
                error: ""
              }, {
                default: te(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, pc = { class: "vuefinder__toolbar" }, hc = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, gc = ["title"], bc = ["title"], yc = ["title"], wc = ["title"], Sc = ["title"], kc = ["title"], xc = ["title"], $c = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Cc = { class: "pl-2" }, Ec = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Vc = { class: "vuefinder__toolbar__controls" }, Tc = ["title"], Dc = ["title"], Ac = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, c = D("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Ae(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (l, v) => {
      const p = ee("NewFolderSVG"), u = ee("NewFileSVG"), m = ee("RenameSVG"), _ = ee("DeleteSVG"), h = ee("UploadSVG"), x = ee("UnarchiveSVG"), y = ee("ArchiveSVG"), $ = ee("LoadingSVG"), R = ee("MinimizeSVG"), V = ee("FullscreenSVG"), k = ee("GridViewSVG"), O = ee("ListViewSVG");
      return f(), b("div", pc, [
        c.value.length ? (f(), b("div", $c, [
          a("div", Cc, [
            J(g(r(o)("Search results for")) + " ", 1),
            a("span", Ec, g(c.value), 1)
          ]),
          r(e).loadingIndicator === "circular" && r(e).fs.loading ? (f(), Y($, { key: 0 })) : G("", !0)
        ])) : (f(), b("div", hc, [
          r(e).features.includes(r(_e).NEW_FOLDER) ? (f(), b("div", {
            key: 0,
            class: "mx-1.5",
            title: r(o)("New Folder"),
            onClick: v[0] || (v[0] = (A) => r(e).modal.open(Ao, { items: r(s).getSelected() }))
          }, [
            z(p)
          ], 8, gc)) : G("", !0),
          r(e).features.includes(r(_e).NEW_FILE) ? (f(), b("div", {
            key: 1,
            class: "mx-1.5",
            title: r(o)("New File"),
            onClick: v[1] || (v[1] = (A) => r(e).modal.open(Di, { items: r(s).getSelected() }))
          }, [
            z(u)
          ], 8, bc)) : G("", !0),
          r(e).features.includes(r(_e).RENAME) ? (f(), b("div", {
            key: 2,
            class: "mx-1.5",
            title: r(o)("Rename"),
            onClick: v[2] || (v[2] = (A) => r(s).getCount() !== 1 || r(e).modal.open(ds, { items: r(s).getSelected() }))
          }, [
            z(m, {
              class: ie(r(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, yc)) : G("", !0),
          r(e).features.includes(r(_e).DELETE) ? (f(), b("div", {
            key: 3,
            class: "mx-1.5",
            title: r(o)("Delete"),
            onClick: v[3] || (v[3] = (A) => !r(s).getCount() || r(e).modal.open(cs, { items: r(s).getSelected() }))
          }, [
            z(_, {
              class: ie(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, wc)) : G("", !0),
          r(e).features.includes(r(_e).UPLOAD) ? (f(), b("div", {
            key: 4,
            class: "mx-1.5",
            title: r(o)("Upload"),
            onClick: v[4] || (v[4] = (A) => r(e).modal.open(Ki, { items: r(s).getSelected() }))
          }, [
            z(h)
          ], 8, Sc)) : G("", !0),
          r(e).features.includes(r(_e).UNARCHIVE) && r(s).getCount() === 1 && r(s).getSelected()[0].mime_type === "application/zip" ? (f(), b("div", {
            key: 5,
            class: "mx-1.5",
            title: r(o)("Unarchive"),
            onClick: v[5] || (v[5] = (A) => !r(s).getCount() || r(e).modal.open(Oo, { items: r(s).getSelected() }))
          }, [
            z(x, {
              class: ie(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, kc)) : G("", !0),
          r(e).features.includes(r(_e).ARCHIVE) ? (f(), b("div", {
            key: 6,
            class: "mx-1.5",
            title: r(o)("Archive"),
            onClick: v[6] || (v[6] = (A) => !r(s).getCount() || r(e).modal.open(Lo, { items: r(s).getSelected() }))
          }, [
            z(y, {
              class: ie(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, xc)) : G("", !0)
        ])),
        a("div", Vc, [
          r(e).features.includes(r(_e).FULL_SCREEN) ? (f(), b("div", {
            key: 0,
            onClick: i,
            class: "mx-1.5",
            title: r(o)("Toggle Full Screen")
          }, [
            r(e).fullScreen ? (f(), Y(R, { key: 0 })) : (f(), Y(V, { key: 1 }))
          ], 8, Tc)) : G("", !0),
          a("div", {
            class: "mx-1.5",
            title: r(o)("Change View"),
            onClick: v[7] || (v[7] = (A) => c.value.length || d())
          }, [
            r(e).view === "grid" ? (f(), Y(k, {
              key: 0,
              class: ie(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
            }, null, 8, ["class"])) : G("", !0),
            r(e).view === "list" ? (f(), Y(O, {
              key: 1,
              class: ie(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
            }, null, 8, ["class"])) : G("", !0)
          ], 8, Dc)
        ])
      ]);
    };
  }
}, Oc = (t, e = 0, n = !1) => {
  let o;
  return (...s) => {
    n && !o && t(...s), clearTimeout(o), o = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Fs = (t, e, n) => {
  const o = D(t);
  return zo((s, c) => ({
    get() {
      return s(), o.value;
    },
    set: Oc(
      (i) => {
        o.value = i, c();
      },
      e,
      n
    )
  }));
}, Lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Fc(t, e) {
  return f(), b("svg", Lc, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Mc = { render: Fc }, Rc = { class: "vuefinder__move-modal__content" }, Ic = { class: "vuefinder__move-modal__description" }, Uc = { class: "vuefinder__move-modal__files vf-scrollbar" }, Hc = { class: "vuefinder__move-modal__file" }, Nc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bc = { class: "vuefinder__move-modal__file-name" }, Pc = { class: "vuefinder__move-modal__target-title" }, qc = { class: "vuefinder__move-modal__target-directory" }, zc = { class: "vuefinder__move-modal__target-path" }, jc = { class: "vuefinder__move-modal__selected-items" }, jn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = D(e.modal.data.items.from), s = D(""), c = () => {
      o.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: o.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(r(n)("Yes, Move!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Cancel")), 1),
        a("div", jc, g(r(n)("%s item(s) selected.", o.value.length)), 1)
      ]),
      default: te(() => [
        a("div", null, [
          z(nt, {
            icon: r(Mc),
            title: r(n)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", Rc, [
            a("p", Ic, g(r(n)("Are you sure you want to move these files?")), 1),
            a("div", Uc, [
              (f(!0), b(ye, null, ke(o.value, (l) => (f(), b("div", Hc, [
                a("div", null, [
                  l.type === "dir" ? (f(), b("svg", Nc, d[2] || (d[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), b("svg", Gc, d[3] || (d[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                a("div", Bc, g(l.path), 1)
              ]))), 256))
            ]),
            a("h4", Pc, g(r(n)("Target Directory")), 1),
            a("p", qc, [
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
              a("span", zc, g(r(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (f(), Y(Xe, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => s.value = ""),
              error: ""
            }, {
              default: te(() => [
                J(g(s.value), 1)
              ]),
              _: 1
            })) : G("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Wc = {
  __name: "Icon",
  props: {
    icon: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { icons: n, iconComponent: o } = e, s = ze(() => ({ ...o.props ?? {} })), c = ze(() => jo(() => n.refresh));
    return (i, d) => (f(), Y(Kn(c.value), Wo(Ko(s.value)), null, 16));
  }
}, Kc = { class: "vuefinder__breadcrumb__container" }, Yc = ["title"], Xc = ["title"], Zc = ["title"], Jc = ["title"], Qc = { class: "vuefinder__breadcrumb__list" }, ed = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, td = { class: "relative" }, nd = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], sd = { class: "vuefinder__breadcrumb__search-mode" }, od = ["placeholder"], rd = { class: "vuefinder__breadcrumb__hidden-dropdown" }, ad = ["onDrop", "onClick"], ld = { class: "vuefinder__breadcrumb__hidden-item-content" }, id = { class: "vuefinder__breadcrumb__hidden-item-text" }, cd = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, c = D(), i = Fs(0, 100);
    Ae(i, (F) => {
      const w = c.value.children;
      let L = 0, M = 0, C = 5, I = 1;
      e.fs.limitBreadcrumbItems(C), dt(() => {
        for (let S = w.length - 1; S >= 0 && !(L + w[S].offsetWidth > i.value - 40); S--)
          L += parseInt(w[S].offsetWidth, 10), M++;
        M < I && (M = I), M > C && (M = C), e.fs.limitBreadcrumbItems(M);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    let l = D(null);
    Ee(() => {
      console.debug("Breadcrumb mounted", c.value), l.value = new ResizeObserver(d), c.value && l.value.observe(c.value);
    }), Wn(() => {
      l.value.disconnect();
    });
    const v = (F, w = null) => {
      F.preventDefault(), o.isDraggingRef.value = !1, m(F), w ?? (w = e.fs.hiddenBreadcrumbs.length - 1);
      let L = JSON.parse(F.dataTransfer.getData("items"));
      if (L.find((M) => M.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(jn, {
        items: {
          from: L,
          to: e.fs.hiddenBreadcrumbs[w] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, p = (F, w = null) => {
      F.preventDefault(), o.isDraggingRef.value = !1, m(F), w ?? (w = e.fs.breadcrumbs.length - 2);
      let L = JSON.parse(F.dataTransfer.getData("items"));
      if (L.find((M) => M.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(jn, {
        items: {
          from: L,
          to: e.fs.breadcrumbs[w] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (F) => {
      F.preventDefault(), e.fs.isGoUpAvailable() ? (F.dataTransfer.dropEffect = "copy", F.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (F.dataTransfer.dropEffect = "none", F.dataTransfer.effectAllowed = "none");
    }, m = (F) => {
      F.preventDefault(), F.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && F.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, _ = () => {
      A(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      A(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, x = (F) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: F.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, y = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, $ = {
      mounted(F, w, L, M) {
        F.clickOutsideEvent = function(C) {
          F === C.target || F.contains(C.target) || w.value();
        }, document.body.addEventListener("click", F.clickOutsideEvent);
      },
      beforeUnmount(F, w, L, M) {
        document.body.removeEventListener("click", F.clickOutsideEvent);
      }
    }, R = () => {
      e.showTreeView = !e.showTreeView;
    };
    Ae(() => e.showTreeView, (F, w) => {
      F !== w && s("show-tree-view", F);
    });
    const V = D(null), k = () => {
      e.features.includes(_e.SEARCH) && (e.fs.searchMode = !0, dt(() => V.value.focus()));
    }, O = Fs("", 400);
    Ae(O, (F) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: F });
    }), Ae(() => e.fs.searchMode, (F) => {
      F && dt(() => V.value.focus());
    });
    const A = () => {
      e.fs.searchMode = !1, O.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      A();
    });
    const j = () => {
      O.value === "" && A();
    };
    return (F, w) => {
      const L = ee("ListTreeSVG"), M = ee("GoUpSVG"), C = ee("CloseSVG"), I = ee("HomeSVG"), S = ee("DotsSVG"), H = ee("LoadingSVG"), B = ee("SearchSVG"), Q = ee("ExitSVG"), oe = ee("FolderSVG");
      return f(), b("div", Kc, [
        a("span", {
          title: r(n)("Toggle Tree View")
        }, [
          z(L, {
            onClick: R,
            class: ie(["vuefinder__breadcrumb__toggle-tree", r(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
          }, null, 8, ["class"])
        ], 8, Yc),
        a("span", {
          title: r(n)("Go up a directory")
        }, [
          z(M, {
            onDragover: w[0] || (w[0] = (P) => u(P)),
            onDragleave: w[1] || (w[1] = (P) => m(P)),
            onDrop: w[2] || (w[2] = (P) => p(P)),
            onClick: h,
            class: ie(r(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
          }, null, 8, ["class"])
        ], 8, Xc),
        r(e).fs.loading ? (f(), b("span", {
          key: 1,
          title: r(n)("Cancel")
        }, [
          z(C, {
            onClick: w[3] || (w[3] = (P) => r(e).emitter.emit("vf-fetch-abort"))
          })
        ], 8, Jc)) : (f(), b("span", {
          key: 0,
          title: r(n)("Refresh")
        }, [
          z(Wc, {
            icon: "refresh",
            onClick: _
          })
        ], 8, Zc)),
        ve(a("div", {
          onClick: et(k, ["self"]),
          class: "group vuefinder__breadcrumb__search-container"
        }, [
          a("div", null, [
            z(I, {
              onDragover: w[4] || (w[4] = (P) => u(P)),
              onDragleave: w[5] || (w[5] = (P) => m(P)),
              onDrop: w[6] || (w[6] = (P) => p(P, -1)),
              onClick: w[7] || (w[7] = (P) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter } }))
            })
          ]),
          a("div", Qc, [
            r(e).fs.hiddenBreadcrumbs.length ? ve((f(), b("div", ed, [
              w[13] || (w[13] = a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
              a("div", td, [
                a("span", {
                  onDragenter: w[8] || (w[8] = (P) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                  onClick: w[9] || (w[9] = (P) => r(e).fs.toggleHiddenBreadcrumbs()),
                  class: "vuefinder__breadcrumb__hidden-toggle"
                }, [
                  z(S, { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
                ], 32)
              ])
            ])), [
              [$, y]
            ]) : G("", !0)
          ]),
          a("div", {
            ref_key: "breadcrumbContainer",
            ref: c,
            class: "vuefinder__breadcrumb__visible-list",
            onClick: et(k, ["self"])
          }, [
            (f(!0), b(ye, null, ke(r(e).fs.breadcrumbs, (P, ae) => (f(), b("div", { key: ae }, [
              w[14] || (w[14] = a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
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
        ve(a("div", sd, [
          a("div", null, [
            z(B)
          ]),
          ve(a("input", {
            ref_key: "searchInput",
            ref: V,
            onKeydown: St(A, ["esc"]),
            onBlur: j,
            "onUpdate:modelValue": w[10] || (w[10] = (P) => Yo(O) ? O.value = P : null),
            placeholder: r(n)("Search anything.."),
            class: "vuefinder__breadcrumb__search-input",
            type: "text"
          }, null, 40, od), [
            [kt, r(O)]
          ]),
          z(Q, { onClick: A })
        ], 512), [
          [Be, r(e).fs.searchMode]
        ]),
        ve(a("div", rd, [
          (f(!0), b(ye, null, ke(r(e).fs.hiddenBreadcrumbs, (P, ae) => (f(), b("div", {
            key: ae,
            onDragover: w[11] || (w[11] = (N) => u(N)),
            onDragleave: w[12] || (w[12] = (N) => m(N)),
            onDrop: (N) => v(N, ae),
            onClick: (N) => x(P),
            class: "vuefinder__breadcrumb__hidden-item"
          }, [
            a("div", ld, [
              a("span", null, [
                z(oe, { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              w[15] || (w[15] = J()),
              a("span", id, g(P.name), 1)
            ])
          ], 40, ad))), 128))
        ], 512), [
          [Be, r(e).fs.showHiddenBreadcrumbs]
        ])
      ]);
    };
  }
}, Fo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), dd = ["onClick"], ud = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, o = D(n("full-screen", !1)), s = D([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
      s.value.splice(l, 1);
    }, d = (l) => {
      let v = s.value.findIndex((p) => p.id === l);
      v !== -1 && i(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = v, s.value.push(l), setTimeout(() => {
        d(v);
      }, 5e3);
    }), (l, v) => (f(), b("div", {
      class: ie(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      z(Xo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: te(() => [
          (f(!0), b(ye, null, ke(s.value, (p, u) => (f(), b("div", {
            key: u,
            onClick: (m) => i(u),
            class: ie(["vuefinder__toast__message", c(p.type)])
          }, g(p.label), 11, dd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Yt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => {
      const o = ee("AscSVG"), s = ee("DescSVG");
      return f(), b("div", null, [
        t.direction === "asc" ? (f(), Y(o, { key: 0 })) : G("", !0),
        t.direction === "desc" ? (f(), Y(s, { key: 1 })) : G("", !0)
      ]);
    };
  }
}, _d = { class: "vuefinder__item-icon" }, En = {
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
    return (e, n) => {
      const o = ee("FolderSVG"), s = ee("FileSVG");
      return f(), b("span", _d, [
        t.type === "dir" ? (f(), Y(o, {
          key: 0,
          class: ie(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
        }, null, 8, ["class"])) : (f(), Y(s, {
          key: 1,
          class: ie(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
        }, null, 8, ["class"]))
      ]);
    };
  }
}, vd = { class: "vuefinder__drag-item__container" }, fd = { class: "vuefinder__drag-item__count" }, md = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => {
      const s = ee("DragSVG");
      return f(), b("div", vd, [
        z(s),
        a("div", fd, g(e.count), 1)
      ]);
    };
  }
}, pd = { class: "vuefinder__text-preview" }, hd = { class: "vuefinder__text-preview__header" }, gd = ["title"], bd = { class: "vuefinder__text-preview__actions" }, yd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, wd = { key: 1 }, Sd = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = D(""), s = D(""), c = D(null), i = D(!1), d = D(""), l = D(!1), v = re("ServiceContainer"), { t: p } = v.i18n;
    Ee(() => {
      v.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: v.modal.data.adapter, path: v.modal.data.item.path },
        responseType: "text"
      }).then((_) => {
        o.value = _, n("success");
      });
    });
    const u = () => {
      i.value = !i.value, s.value = o.value;
    }, m = () => {
      d.value = "", l.value = !1, v.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: v.modal.data.adapter,
          path: v.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((_) => {
        d.value = p("Updated."), o.value = _, n("success"), i.value = !i.value;
      }).catch((_) => {
        d.value = p(_.message), l.value = !0;
      });
    };
    return (_, h) => (f(), b("div", pd, [
      a("div", hd, [
        a("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: r(v).modal.data.item.path
        }, g(r(v).modal.data.item.basename), 9, gd),
        a("div", bd, [
          i.value ? (f(), b("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__text-preview__save-button"
          }, g(r(p)("Save")), 1)) : G("", !0),
          r(v).features.includes(r(_e).EDIT) ? (f(), b("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (x) => u())
          }, g(i.value ? r(p)("Cancel") : r(p)("Edit")), 1)) : G("", !0)
        ])
      ]),
      a("div", null, [
        i.value ? (f(), b("div", wd, [
          ve(a("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": h[1] || (h[1] = (x) => s.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [kt, s.value]
          ])
        ])) : (f(), b("pre", yd, g(o.value), 1)),
        d.value.length ? (f(), Y(Xe, {
          key: 2,
          onHidden: h[2] || (h[2] = (x) => d.value = ""),
          error: l.value
        }, {
          default: te(() => [
            J(g(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : G("", !0)
      ])
    ]));
  }
}, kd = { class: "vuefinder__image-preview" }, xd = { class: "vuefinder__image-preview__header" }, $d = ["title"], Cd = { class: "vuefinder__image-preview__actions" }, Ed = { class: "vuefinder__image-preview__image-container" }, Vd = ["src"], Td = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = re("ServiceContainer"), { t: s } = o.i18n, c = D(null), i = D(null), d = D(!1), l = D(""), v = D(!1), p = () => {
      d.value = !d.value, d.value ? i.value = new rr(c.value, {
        crop(m) {
        }
      }) : i.value.destroy();
    }, u = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (m) => {
          l.value = "", v.value = !1;
          const _ = new FormData();
          _.set("file", m), o.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: o.modal.data.adapter,
              path: o.modal.data.item.path
            },
            body: _
          }).then((h) => {
            l.value = s("Updated."), c.value.src = o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item), p(), n("success");
          }).catch((h) => {
            l.value = s(h.message), v.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      n("success");
    }), (m, _) => (f(), b("div", kd, [
      a("div", xd, [
        a("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: r(o).modal.data.item.path
        }, g(r(o).modal.data.item.basename), 9, $d),
        a("div", Cd, [
          d.value ? (f(), b("button", {
            key: 0,
            onClick: u,
            class: "vuefinder__image-preview__crop-button"
          }, g(r(s)("Crop")), 1)) : G("", !0),
          r(o).features.includes(r(_e).EDIT) ? (f(), b("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: _[0] || (_[0] = (h) => p())
          }, g(d.value ? r(s)("Cancel") : r(s)("Edit")), 1)) : G("", !0)
        ])
      ]),
      a("div", Ed, [
        a("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: r(o).requester.getPreviewUrl(r(o).modal.data.adapter, r(o).modal.data.item),
          alt: ""
        }, null, 8, Vd)
      ]),
      l.value.length ? (f(), Y(Xe, {
        key: 0,
        onHidden: _[1] || (_[1] = (h) => l.value = ""),
        error: v.value
      }, {
        default: te(() => [
          J(g(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : G("", !0)
    ]));
  }
}, Dd = { class: "vuefinder__default-preview" }, Ad = { class: "vuefinder__default-preview__header" }, Od = ["title"], Ld = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e;
    return Ee(() => {
      o("success");
    }), (s, c) => (f(), b("div", Dd, [
      a("div", Ad, [
        a("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: r(n).modal.data.item.path
        }, g(r(n).modal.data.item.basename), 9, Od)
      ]),
      c[0] || (c[0] = a("div", null, null, -1))
    ]));
  }
}, Fd = { class: "vuefinder__video-preview" }, Md = ["title"], Rd = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, Id = ["src"], Ud = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (c, i) => (f(), b("div", Fd, [
      a("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, g(r(n).modal.data.item.basename), 9, Md),
      a("div", null, [
        a("video", Rd, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Id),
          i[0] || (i[0] = J(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, Hd = { class: "vuefinder__audio-preview" }, Nd = ["title"], Gd = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Bd = ["src"], Pd = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = re("ServiceContainer"), s = () => o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item);
    return Ee(() => {
      n("success");
    }), (c, i) => (f(), b("div", Hd, [
      a("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: r(o).modal.data.item.path
      }, g(r(o).modal.data.item.basename), 9, Nd),
      a("div", null, [
        a("audio", Gd, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Bd),
          i[0] || (i[0] = J(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, qd = { class: "vuefinder__pdf-preview" }, zd = ["title"], jd = ["data"], Wd = ["src"], Kd = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (c, i) => (f(), b("div", qd, [
      a("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, g(r(n).modal.data.item.basename), 9, zd),
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
          }, " Your browser does not support PDFs ", 8, Wd)
        ], 8, jd)
      ])
    ]));
  }
}, Yd = { class: "vuefinder__preview-modal__content" }, Xd = { key: 0 }, Zd = { class: "vuefinder__preview-modal__loading" }, Jd = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Qd = { class: "vuefinder__preview-modal__details" }, eu = { class: "font-bold" }, tu = { class: "font-bold pl-2" }, nu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, su = ["download", "href"], Mo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = D(!1), s = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(_e.PREVIEW);
    return c || (o.value = !0), (i, d) => (f(), Y(Ye, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(r(n)("Close")), 1),
        r(e).features.includes(r(_e).DOWNLOAD) ? (f(), b("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item)
        }, g(r(n)("Download")), 9, su)) : G("", !0)
      ]),
      default: te(() => [
        a("div", null, [
          a("div", Yd, [
            r(c) ? (f(), b("div", Xd, [
              s("text") ? (f(), Y(Sd, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => o.value = !0)
              })) : s("image") ? (f(), Y(Td, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => o.value = !0)
              })) : s("video") ? (f(), Y(Ud, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => o.value = !0)
              })) : s("audio") ? (f(), Y(Pd, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => o.value = !0)
              })) : s("application/pdf") ? (f(), Y(Kd, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => o.value = !0)
              })) : (f(), Y(Ld, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => o.value = !0)
              }))
            ])) : G("", !0),
            a("div", Zd, [
              o.value === !1 ? (f(), b("div", Jd, [
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
              ])) : G("", !0)
            ])
          ])
        ]),
        a("div", Qd, [
          a("div", null, [
            a("span", eu, g(r(n)("File Size")) + ": ", 1),
            J(g(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", tu, g(r(n)("Last Modified")) + ": ", 1),
            J(" " + g(r(Fo)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(_e).DOWNLOAD) ? (f(), b("div", nu, [
          a("span", null, g(r(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : G("", !0)
      ]),
      _: 1
    }));
  }
}, ou = ["data-type", "data-item", "data-index"], Vn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, o = t, s = (_) => {
      _.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: _.path } })) : e.modal.open(Mo, { adapter: e.fs.adapter, item: _ });
    }, c = {
      mounted(_, h, x, y) {
        x.props.draggable && (_.addEventListener("dragstart", ($) => i($, h.value)), _.addEventListener("dragover", ($) => l($, h.value)), _.addEventListener("drop", ($) => d($, h.value)));
      },
      beforeUnmount(_, h, x, y) {
        x.props.draggable && (_.removeEventListener("dragstart", i), _.removeEventListener("dragover", l), _.removeEventListener("drop", d));
      }
    }, i = (_, h) => {
      if (_.altKey || _.ctrlKey || _.metaKey)
        return _.preventDefault(), !1;
      n.isDraggingRef.value = !0, _.dataTransfer.setDragImage(o.dragImage.$el, 0, 15), _.dataTransfer.effectAllowed = "all", _.dataTransfer.dropEffect = "copy", _.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (_, h) => {
      _.preventDefault(), n.isDraggingRef.value = !1;
      let x = JSON.parse(_.dataTransfer.getData("items"));
      if (x.find((y) => y.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(jn, { items: { from: x, to: h } });
    }, l = (_, h) => {
      _.preventDefault(), !h || h.type !== "dir" || n.getSelection().find((x) => x === _.currentTarget) ? (_.dataTransfer.dropEffect = "none", _.dataTransfer.effectAllowed = "none") : _.dataTransfer.dropEffect = "copy";
    };
    let v = null, p = !1;
    const u = () => {
      v && clearTimeout(v);
    }, m = (_) => {
      if (!p)
        p = !0, setTimeout(() => p = !1, 300);
      else
        return p = !1, s(o.item), clearTimeout(v), !1;
      v = setTimeout(() => {
        const h = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: _.target.getBoundingClientRect().x,
          clientY: _.target.getBoundingClientRect().y
        });
        _.target.dispatchEvent(h);
      }, 500);
    };
    return (_, h) => {
      const x = ee("PinSVG");
      return ve((f(), b("div", {
        style: cn({ opacity: r(n).isDraggingRef.value && r(n).getSelection().find((y) => _.$el === y) ? "0.5 !important" : "" }),
        class: ie(["vuefinder__item", "vf-item-" + r(n).explorerId]),
        "data-type": t.item.type,
        key: t.item.path,
        "data-item": JSON.stringify(t.item),
        "data-index": t.index,
        onDblclick: h[0] || (h[0] = (y) => s(t.item)),
        onTouchstart: h[1] || (h[1] = (y) => m(y)),
        onTouchend: h[2] || (h[2] = (y) => u()),
        onContextmenu: h[3] || (h[3] = et((y) => r(e).emitter.emit("vf-contextmenu-show", { event: y, items: r(n).getSelected(), target: t.item }), ["prevent"]))
      }, [
        Tt(_.$slots, "default"),
        r(e).pinnedFolders.find((y) => y.path === t.item.path) ? (f(), Y(x, {
          key: 0,
          class: "vuefinder__item--pinned"
        })) : G("", !0)
      ], 46, ou)), [
        [c, t.item]
      ]);
    };
  }
}, ru = { class: "vuefinder__explorer__container" }, au = {
  key: 0,
  class: "vuefinder__explorer__header"
}, lu = { class: "vuefinder__explorer__drag-item" }, iu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, cu = { class: "vuefinder__explorer__item-list-content" }, du = { class: "vuefinder__explorer__item-list-name" }, uu = { class: "vuefinder__explorer__item-name" }, _u = { class: "vuefinder__explorer__item-path" }, vu = { class: "vuefinder__explorer__item-list-content" }, fu = { class: "vuefinder__explorer__item-list-name" }, mu = { class: "vuefinder__explorer__item-name" }, pu = { class: "vuefinder__explorer__item-size" }, hu = { class: "vuefinder__explorer__item-date" }, gu = { class: "vuefinder__explorer__item-grid-content" }, bu = ["data-src", "alt"], yu = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, wu = { class: "vuefinder__explorer__item-title break-all" }, Su = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = (u) => u == null ? void 0 : u.substring(0, 3), s = D(null), c = D(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      c.value = u, u ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: u
        },
        onSuccess: (m) => {
          m.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = wt({ active: !1, column: "", order: "" }), v = (u = !0) => {
      let m = [...e.fs.data.files], _ = l.column, h = l.order === "asc" ? 1 : -1;
      if (!u)
        return m;
      const x = (y, $) => typeof y == "string" && typeof $ == "string" ? y.toLowerCase().localeCompare($.toLowerCase()) : y < $ ? -1 : y > $ ? 1 : 0;
      return l.active && (m = m.slice().sort((y, $) => x(y[_], $[_]) * h)), m;
    }, p = (u) => {
      l.active && l.column === u ? (l.active = l.order === "asc", l.column = u, l.order = "desc") : (l.active = !0, l.column = u, l.order = "asc");
    };
    return Ee(() => {
      d = new or(i.area.value);
    }), Rs(() => {
      d.update();
    }), Is(() => {
      d.destroy();
    }), (u, m) => (f(), b("div", ru, [
      r(e).view === "list" || c.value.length ? (f(), b("div", au, [
        a("div", {
          onClick: m[0] || (m[0] = (_) => p("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(g(r(n)("Name")) + " ", 1),
          ve(z(Yt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Be, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? G("", !0) : (f(), b("div", {
          key: 0,
          onClick: m[1] || (m[1] = (_) => p("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(g(r(n)("Size")) + " ", 1),
          ve(z(Yt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Be, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? G("", !0) : (f(), b("div", {
          key: 1,
          onClick: m[2] || (m[2] = (_) => p("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(g(r(n)("Date")) + " ", 1),
          ve(z(Yt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Be, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (f(), b("div", {
          key: 2,
          onClick: m[3] || (m[3] = (_) => p("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          J(g(r(n)("Filepath")) + " ", 1),
          ve(z(Yt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Be, l.active && l.column === "path"]
          ])
        ])) : G("", !0)
      ])) : G("", !0),
      a("div", lu, [
        z(md, {
          ref_key: "dragImage",
          ref: s,
          count: r(i).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: r(i).scrollBarContainer,
        class: ie(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": r(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        a("div", {
          ref: r(i).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      a("div", {
        ref: r(i).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: m[4] || (m[4] = et((_) => r(e).emitter.emit("vf-contextmenu-show", { event: _, items: r(i).getSelected() }), ["self", "prevent"]))
      }, [
        r(e).loadingIndicator === "linear" && r(e).fs.loading ? (f(), b("div", iu)) : G("", !0),
        c.value.length ? (f(!0), b(ye, { key: 1 }, ke(v(), (_, h) => (f(), Y(Vn, {
          item: _,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: te(() => [
            a("div", cu, [
              a("div", du, [
                z(En, {
                  type: _.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", uu, g(_.basename), 1)
              ]),
              a("div", _u, g(_.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : G("", !0),
        r(e).view === "list" && !c.value.length ? (f(!0), b(ye, { key: 2 }, ke(v(), (_, h) => (f(), Y(Vn, {
          item: _,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: _.path
        }, {
          default: te(() => [
            a("div", vu, [
              a("div", fu, [
                z(En, {
                  type: _.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", mu, g(_.basename), 1)
              ]),
              a("div", pu, g(_.file_size ? r(e).filesize(_.file_size) : ""), 1),
              a("div", hu, g(r(Fo)(_.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : G("", !0),
        r(e).view === "grid" && !c.value.length ? (f(!0), b(ye, { key: 3 }, ke(v(!1), (_, h) => (f(), Y(Vn, {
          item: _,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: te(() => [
            a("div", null, [
              a("div", gu, [
                (_.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (f(), b("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, _),
                  alt: _.basename,
                  key: _.path
                }, null, 8, bu)) : (f(), Y(En, {
                  key: 1,
                  type: _.type
                }, null, 8, ["type"])),
                !((_.mime_type ?? "").startsWith("image") && r(e).showThumbnails) && _.type !== "dir" ? (f(), b("div", yu, g(o(_.extension)), 1)) : G("", !0)
              ]),
              a("span", wu, g(r(zn)(_.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : G("", !0)
      ], 544),
      z(ud)
    ]));
  }
}, ku = ["href", "download"], xu = ["onClick"], $u = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = D(null), s = D([]), c = D(""), i = wt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = ze(() => i.items.filter((u) => u.key == null || e.features.includes(u.key)));
    e.emitter.on("vf-context-selected", (u) => {
      s.value = u;
    });
    const l = {
      newfolder: {
        key: _e.NEW_FOLDER,
        title: () => n("New Folder"),
        action: () => e.modal.open(Ao)
      },
      selectAll: {
        title: () => n("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      pinFolder: {
        title: () => n("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(s.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      unpinFolder: {
        title: () => n("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((u) => !s.value.find((m) => m.path === u.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: _e.DELETE,
        title: () => n("Delete"),
        action: () => {
          e.modal.open(cs, { items: s });
        }
      },
      refresh: {
        title: () => n("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: _e.PREVIEW,
        title: () => n("Preview"),
        action: () => e.modal.open(Mo, { adapter: e.fs.adapter, item: s.value[0] })
      },
      open: {
        title: () => n("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].path
            }
          });
        }
      },
      openDir: {
        title: () => n("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].dir
            }
          });
        }
      },
      download: {
        key: _e.DOWNLOAD,
        link: ze(() => e.requester.getDownloadUrl(e.fs.adapter, s.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: _e.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(Lo, { items: s })
      },
      unarchive: {
        key: _e.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Oo, { items: s })
      },
      rename: {
        key: _e.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(ds, { items: s })
      }
    }, v = (u) => {
      e.emitter.emit("vf-contextmenu-hide"), u.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      c.value = u;
    }), e.emitter.on("vf-contextmenu-show", ({ event: u, items: m, target: _ = null }) => {
      if (i.items = [], c.value)
        if (_)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [_]);
        else
          return;
      else !_ && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : m.length > 1 && m.some((h) => h.path === _.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", m)) : (_.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((h) => h.path === _.path) !== -1 ? i.items.push(l.unpinFolder) : i.items.push(l.pinFolder)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), _.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [_]));
      p(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const p = (u) => {
      const m = e.dragSelect.area.value, _ = e.root.getBoundingClientRect(), h = m.getBoundingClientRect();
      let x = u.clientX - _.left, y = u.clientY - _.top;
      i.active = !0, dt(() => {
        var k;
        const $ = (k = o.value) == null ? void 0 : k.getBoundingClientRect();
        let R = ($ == null ? void 0 : $.height) ?? 0, V = ($ == null ? void 0 : $.width) ?? 0;
        x = h.right - u.pageX + window.scrollX < V ? x - V : x, y = h.bottom - u.pageY + window.scrollY < R ? y - R : y, i.positions = {
          left: x + "px",
          top: y + "px"
        };
      });
    };
    return (u, m) => ve((f(), b("ul", {
      ref_key: "contextmenu",
      ref: o,
      style: cn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (f(!0), b(ye, null, ke(d.value, (_) => (f(), b("li", {
        class: "vuefinder__context-menu__item",
        key: _.title
      }, [
        _.link ? (f(), b("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: _.link,
          download: _.link,
          onClick: m[0] || (m[0] = (h) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, g(_.title()), 1)
        ], 8, ku)) : (f(), b("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => v(_)
        }, [
          a("span", null, g(_.title()), 1)
        ], 8, xu))
      ]))), 128))
    ], 4)), [
      [Be, i.active]
    ]);
  }
}, Cu = { class: "vuefinder__status-bar__wrapper" }, Eu = { class: "vuefinder__status-bar__storage" }, Vu = ["title"], Tu = { class: "vuefinder__status-bar__storage-icon" }, Du = ["value"], Au = { class: "vuefinder__status-bar__info" }, Ou = { key: 0 }, Lu = { class: "vuefinder__status-bar__selected-count" }, Fu = { class: "vuefinder__status-bar__actions" }, Mu = ["disabled"], Ru = ["title"], Iu = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: o } = e.storage, s = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), o("adapter", e.fs.adapter);
    }, i = D("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = ze(() => {
      const l = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, v) => {
      const p = ee("StorageSVG"), u = ee("AboutSVG");
      return f(), b("div", Cu, [
        a("div", Eu, [
          a("div", {
            class: "vuefinder__status-bar__storage-container",
            title: r(n)("Storage")
          }, [
            a("div", Tu, [
              z(p)
            ]),
            ve(a("select", {
              "onUpdate:modelValue": v[0] || (v[0] = (m) => r(e).fs.adapter = m),
              onChange: c,
              class: "vuefinder__status-bar__storage-select",
              tabindex: "-1"
            }, [
              (f(!0), b(ye, null, ke(r(e).fs.data.storages, (m) => (f(), b("option", { value: m }, g(m), 9, Du))), 256))
            ], 544), [
              [Tn, r(e).fs.adapter]
            ])
          ], 8, Vu),
          a("div", Au, [
            i.value.length ? (f(), b("span", Ou, g(r(e).fs.data.files.length) + " items found. ", 1)) : G("", !0),
            a("span", Lu, g(r(e).dragSelect.getCount() > 0 ? r(n)("%s item(s) selected.", r(e).dragSelect.getCount()) : ""), 1)
          ])
        ]),
        a("div", Fu, [
          r(e).selectButton.active ? (f(), b("button", {
            key: 0,
            class: ie(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
            disabled: !d.value,
            onClick: v[1] || (v[1] = (m) => r(e).selectButton.click(r(s).getSelected(), m))
          }, g(r(n)("Select")), 11, Mu)) : G("", !0),
          a("span", {
            class: "vuefinder__status-bar__about",
            title: r(n)("About"),
            onClick: v[2] || (v[2] = (m) => r(e).modal.open(Do))
          }, [
            z(u)
          ], 8, Ru)
        ])
      ]);
    };
  }
};
function Ro(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Uu = { class: "vuefinder__folder-loader-indicator" }, Hu = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Io = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Zo({
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
    const e = t, n = re("ServiceContainer");
    n.i18n;
    const o = Us(t, "modelValue"), s = D(!1);
    Ae(
      () => o.value,
      () => {
        var d;
        return ((d = c()) == null ? void 0 : d.folders.length) || i();
      }
    );
    function c() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const i = () => {
      s.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        Ro(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, l) => {
      var m;
      const v = ee("LoadingSVG"), p = ee("SquareMinusSVG"), u = ee("SquarePlusSVG");
      return f(), b("div", Uu, [
        s.value ? (f(), Y(v, {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (f(), b("div", Hu, [
          o.value && ((m = c()) != null && m.folders.length) ? (f(), Y(p, {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : G("", !0),
          o.value ? G("", !0) : (f(), Y(u, {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Nu = { class: "vuefinder__treesubfolderlist__item-content" }, Gu = ["onClick"], Bu = ["title", "onClick"], Pu = { class: "vuefinder__treesubfolderlist__item-icon" }, qu = { class: "vuefinder__treesubfolderlist__subfolder" }, zu = {
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
    const e = re("ServiceContainer"), n = D([]), o = t, s = D(null);
    Ee(() => {
      o.path === o.adapter + "://" && We(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = ze(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === o.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const l = ee("OpenFolderSVG"), v = ee("FolderSVG"), p = ee("TreeSubfolderList", !0);
      return f(), b("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (f(!0), b(ye, null, ke(c.value, (u, m) => (f(), b("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", Nu, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (_) => n.value[u.path] = !n.value[u.path]
            }, [
              z(Io, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (_) => n.value[u.path] = _
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Gu),
            a("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (_) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: u.path } })
            }, [
              a("div", Pu, [
                r(e).fs.path === u.path ? (f(), Y(l, { key: 0 })) : (f(), Y(v, { key: 1 }))
              ]),
              a("div", {
                class: ie(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": r(e).fs.path === u.path
                }])
              }, g(u.basename), 3)
            ], 8, Bu)
          ]),
          a("div", qu, [
            ve(z(p, {
              adapter: o.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Be, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, ju = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, o = D(!1);
    function s(c) {
      c === e.fs.adapter ? o.value = !o.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: c } }), n("adapter", c));
    }
    return (c, i) => {
      const d = ee("StorageSVG");
      return f(), b(ye, null, [
        a("div", {
          onClick: i[2] || (i[2] = (l) => s(t.storage)),
          class: "vuefinder__treestorageitem__header"
        }, [
          a("div", {
            class: ie(["vuefinder__treestorageitem__info", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
          }, [
            a("div", {
              class: ie(["vuefinder__treestorageitem__icon", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
            }, [
              z(d)
            ], 2),
            a("div", null, g(t.storage), 1)
          ], 2),
          a("div", {
            class: "vuefinder__treestorageitem__loader",
            onClick: i[1] || (i[1] = et((l) => o.value = !o.value, ["stop"]))
          }, [
            z(Io, {
              adapter: t.storage,
              path: t.storage + "://",
              modelValue: o.value,
              "onUpdate:modelValue": i[0] || (i[0] = (l) => o.value = l)
            }, null, 8, ["adapter", "path", "modelValue"])
          ])
        ]),
        ve(z(zu, {
          adapter: t.storage,
          path: t.storage + "://",
          class: "vuefinder__treestorageitem__subfolder"
        }, null, 8, ["adapter", "path"]), [
          [Be, o.value]
        ])
      ], 64);
    };
  }
}, Wu = { class: "vuefinder__folder-indicator" }, Ku = { class: "vuefinder__folder-indicator--icon" }, Yu = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Us(t, "modelValue");
    return (n, o) => {
      const s = ee("SquareMinusSVG"), c = ee("SquarePlusSVG");
      return f(), b("div", Wu, [
        a("div", Ku, [
          e.value ? (f(), Y(s, {
            key: 0,
            class: "vuefinder__folder-indicator--minus"
          })) : G("", !0),
          e.value ? G("", !0) : (f(), Y(c, {
            key: 1,
            class: "vuefinder__folder-indicator--plus"
          }))
        ])
      ]);
    };
  }
}, Xu = { class: "vuefinder__treeview__header" }, Zu = { class: "vuefinder__treeview__pinned-label" }, Ju = { class: "vuefinder__treeview__pin-text text-nowrap" }, Qu = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, e_ = { class: "vuefinder__treeview__pinned-item" }, t_ = ["onClick"], n_ = ["title"], s_ = ["onClick"], o_ = { key: 0 }, r_ = { class: "vuefinder__treeview__no-pinned" }, a_ = { class: "vuefinder__treeview__storage" }, l_ = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: s } = e.storage, c = D(190), i = D(o("pinned-folders-opened", !0));
    Ae(i, (p) => s("pinned-folders-opened", p));
    const d = (p) => {
      e.pinnedFolders = e.pinnedFolders.filter((u) => u.path !== p.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (p) => {
      const u = p.clientX, m = p.target.parentElement, _ = m.getBoundingClientRect().width;
      m.classList.remove("transition-[width]"), m.classList.add("transition-none");
      const h = (y) => {
        c.value = _ + y.clientX - u, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, x = () => {
        const y = m.getBoundingClientRect();
        c.value = y.width, m.classList.add("transition-[width]"), m.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", x);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", x);
    }, v = D(null);
    return Ee(() => {
      We(v.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Ae(e.fs.data, (p, u) => {
      const m = p.files.filter((_) => _.type === "dir");
      Ro(e.treeViewData, { path: e.fs.path, folders: m.map((_) => ({
        adapter: _.storage,
        path: _.path,
        basename: _.basename
      })) });
    }), (p, u) => {
      const m = ee("PinSVG"), _ = ee("FolderSVG"), h = ee("OpenFolderSVG"), x = ee("XBoxSVG");
      return f(), b(ye, null, [
        a("div", {
          onClick: u[0] || (u[0] = (y) => r(e).showTreeView = !r(e).showTreeView),
          class: ie(["vuefinder__treeview__overlay", r(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
        }, null, 2),
        a("div", {
          style: cn(r(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
          class: "vuefinder__treeview__container"
        }, [
          a("div", {
            ref_key: "treeViewScrollElement",
            ref: v,
            class: "vuefinder__treeview__scroll"
          }, [
            a("div", Xu, [
              a("div", {
                onClick: u[2] || (u[2] = (y) => i.value = !i.value),
                class: "vuefinder__treeview__pinned-toggle"
              }, [
                a("div", Zu, [
                  z(m, { class: "vuefinder__treeview__pin-icon" }),
                  a("div", Ju, g(r(n)("Pinned Folders")), 1)
                ]),
                z(Yu, {
                  modelValue: i.value,
                  "onUpdate:modelValue": u[1] || (u[1] = (y) => i.value = y)
                }, null, 8, ["modelValue"])
              ]),
              i.value ? (f(), b("ul", Qu, [
                (f(!0), b(ye, null, ke(r(e).pinnedFolders, (y) => (f(), b("li", e_, [
                  a("div", {
                    class: "vuefinder__treeview__pinned-folder",
                    onClick: ($) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: y.storage, path: y.path } })
                  }, [
                    r(e).fs.path !== y.path ? (f(), Y(_, {
                      key: 0,
                      class: "vuefinder__treeview__folder-icon"
                    })) : G("", !0),
                    r(e).fs.path === y.path ? (f(), Y(h, {
                      key: 1,
                      class: "vuefinder__treeview__open-folder-icon"
                    })) : G("", !0),
                    a("div", {
                      title: y.path,
                      class: ie(["vuefinder__treeview__folder-name text-nowrap", {
                        "vuefinder__treeview__folder-name--active": r(e).fs.path === y.path
                      }])
                    }, g(y.basename), 11, n_)
                  ], 8, t_),
                  a("div", {
                    class: "vuefinder__treeview__remove-favorite",
                    onClick: ($) => d(y)
                  }, [
                    z(x, { class: "vuefinder__treeview__remove-icon" })
                  ], 8, s_)
                ]))), 256)),
                r(e).pinnedFolders.length ? G("", !0) : (f(), b("li", o_, [
                  a("div", r_, g(r(n)("No folders pinned")), 1)
                ]))
              ])) : G("", !0)
            ]),
            (f(!0), b(ye, null, ke(r(e).fs.data.storages, (y) => (f(), b("div", a_, [
              z(ju, { storage: y }, null, 8, ["storage"])
            ]))), 256))
          ], 512),
          a("div", {
            onMousedown: l,
            class: ie([(r(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
          }, null, 34)
        ], 4)
      ], 64);
    };
  }
}, i_ = { class: "vuefinder__main__content" }, c_ = {
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
    }
  },
  emits: ["select", "update:path"],
  setup(t, { emit: e }) {
    const n = e, o = t, s = Ma(o, re("VueFinderOptions"));
    Jo("ServiceContainer", s);
    const { setStore: c } = s.storage, i = D(null);
    s.root = i;
    const d = s.dragSelect;
    mi(s);
    const l = (u) => {
      Object.assign(s.fs.data, u), d.clearSelection(), d.refreshSelection();
    };
    let v;
    s.emitter.on("vf-fetch-abort", () => {
      v.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: u, body: m = null, onSuccess: _ = null, onError: h = null, noCloseModal: x = !1 }) => {
      ["index", "search"].includes(u.q) && (v && v.abort(), s.fs.loading = !0), v = new AbortController();
      const y = v.signal;
      s.requester.send({
        url: "",
        method: u.m || "get",
        params: u,
        body: m,
        abortSignal: y
      }).then(($) => {
        s.fs.adapter = $.adapter, s.persist && (s.fs.path = $.dirname, c("path", s.fs.path)), x || s.modal.close(), l($), _ && _($);
      }).catch(($) => {
        console.error($), h && h($);
      }).finally(() => {
        ["index", "search"].includes(u.q) && (s.fs.loading = !1);
      });
    });
    function p(u) {
      let m = {};
      u && u.includes("://") && (m = {
        adapter: u.split("://")[0],
        path: u
      }), s.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: s.fs.adapter, ...m },
        onError: o.onError ?? ((_) => {
          _.message && s.emitter.emit("vf-toast-push", { label: _.message, type: "error" });
        })
      });
    }
    return Ee(() => {
      p(s.fs.path), Ae(() => o.path, (u) => {
        p(u);
      }), d.onSelect((u) => {
        n("select", u);
      }), Ae(() => s.fs.data.dirname, (u) => {
        n("update:path", u);
      });
    }), (u, m) => (f(), b("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      a("div", {
        class: ie(r(s).theme.actualValue)
      }, [
        a("div", {
          class: ie([r(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: cn(r(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: m[0] || (m[0] = (_) => r(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (_) => r(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          z(Ac),
          z(cd),
          a("div", i_, [
            z(l_),
            z(Su)
          ]),
          z(Iu)
        ], 38),
        z(Qo, { name: "fade" }, {
          default: te(() => [
            r(s).modal.visible ? (f(), Y(Kn(r(s).modal.type), { key: 0 })) : G("", !0)
          ]),
          _: 1
        }),
        z($u)
      ], 2)
    ], 512));
  }
}, b_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    var o;
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", e.iconComponent = e.iconComponent ?? {
      tag: "svg",
      props: {}
    }, e.icons = {
      refresh: ((o = e.icons) == null ? void 0 : o.refresh) ?? import("./refresh-DGlngbky.js")
    }, t.provide("VueFinderOptions", e), t.component("VueFinder", c_);
  }
};
export {
  b_ as default
};
