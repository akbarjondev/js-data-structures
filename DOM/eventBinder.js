export function bind(target, { type, listerner, options }) {
  target.addEventListener(type, listerner, options);

  return function unbind() {
    target.removeEventListener(type, listerner, options);
  };
}
