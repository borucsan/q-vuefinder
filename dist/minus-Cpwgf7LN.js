import { openBlock as n, createElementBlock as t, createElementVNode as o } from "vue";
const r = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function l(s, e) {
  return n(), t("svg", r, e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const i = { render: l };
export {
  i as default,
  l as render
};
