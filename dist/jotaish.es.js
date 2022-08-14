import { useAtom as s } from "jotai";
const c = (t) => (e) => ({
  atom: t[e],
  key: e
});
function r(t) {
  const e = `${t.key[0].toUpperCase()}${t.key.slice(1)}`, [a, o] = s(t.atom);
  return {
    [`${e}`]: a,
    [`set${e}`]: o,
    [`atomOf${e}`]: t.atom
  };
}
export {
  c as getStore,
  r as useStore
};
