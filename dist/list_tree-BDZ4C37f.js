import { openBlock as r, createElementBlock as o, createElementVNode as t } from "vue";
const n = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function l(s, e) {
  return r(), o("svg", n, e[0] || (e[0] = [
    t("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    t("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ]));
}
const i = { render: l };
export {
  i as default,
  l as render
};
