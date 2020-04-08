

const runtime = {};

export function getRuntimeVM() {
  if (runtime.vm) return runtime.vm;
  throw new ReferenceError('[vue-hooks] Not found vue instance.');
}

export function setRuntimeVM(_this, vue) {
  const vm = _this || vue;

  if (typeof vm.$options.setup === 'function') {
    runtime.vm = vm;
  }

}