(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global['left-vue-hooks'] = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var toString = function (x) { return Object.prototype.toString.call(x); };
  function isNative(Ctor) {
      return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
  }
  var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) &&
      typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
  var noopFn = function (_) { return _; };
  var sharedPropertyDefinition = {
      enumerable: true,
      configurable: true,
      get: noopFn,
      set: noopFn,
  };
  function proxy(target, key, _a) {
      var get = _a.get, set = _a.set;
      sharedPropertyDefinition.get = get || noopFn;
      sharedPropertyDefinition.set = set || noopFn;
      Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function def(obj, key, val, enumerable) {
      Object.defineProperty(obj, key, {
          value: val,
          enumerable: !!enumerable,
          writable: true,
          configurable: true,
      });
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
  }
  function assert(condition, msg) {
      if (!condition)
          throw new Error("[vue-composition-api] " + msg);
  }
  function isPlainObject(x) {
      return toString(x) === '[object Object]';
  }
  function isFunction(x) {
      return typeof x === 'function';
  }
  function warn(msg, vm) {
      Vue.util.warn(msg, vm);
  }

  var currentVue = null;
  function getCurrentVue() {
      {
          assert(currentVue, "must call Vue.use(plugin) before using any function.");
      }
      return currentVue;
  }
  function setCurrentVue(vue) {
      currentVue = vue;
  }
  function defineComponentInstance(Ctor, options) {
      if (options === void 0) { options = {}; }
      var silent = Ctor.config.silent;
      Ctor.config.silent = true;
      var vm = new Ctor(options);
      Ctor.config.silent = silent;
      return vm;
  }
  function isComponentInstance(obj) {
      return currentVue && obj instanceof currentVue;
  }
  function createSlotProxy(vm, slotName) {
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (!vm.$scopedSlots[slotName]) {
              return warn("slots." + slotName + "() got called outside of the \"render()\" scope", vm);
          }
          return vm.$scopedSlots[slotName].apply(vm, args);
      };
  }
  function resolveSlots(slots, normalSlots) {
      var res;
      if (!slots) {
          res = {};
      }
      else if (slots._normalized) {
          // fast path 1: child component re-render only, parent did not change
          return slots._normalized;
      }
      else {
          res = {};
          for (var key in slots) {
              if (slots[key] && key[0] !== '$') {
                  res[key] = true;
              }
          }
      }
      // expose normal slots on scopedSlots
      for (var key in normalSlots) {
          if (!(key in res)) {
              res[key] = true;
          }
      }
      return res;
  }

  function createSymbol(name) {
      return hasSymbol ? Symbol.for(name) : name;
  }
  var AccessControlIdentifierKey = createSymbol('vfa.key.accessControlIdentifier');
  var ReactiveIdentifierKey = createSymbol('vfa.key.reactiveIdentifier');
  var NonReactiveIdentifierKey = createSymbol('vfa.key.nonReactiveIdentifier');
  // must be a string, symbol key is ignored in reactive
  var RefKey = 'vfa.key.refKey';

  var RefImpl = /** @class */ (function () {
      function RefImpl(_a) {
          var get = _a.get, set = _a.set;
          proxy(this, 'value', {
              get: get,
              set: set,
          });
      }
      return RefImpl;
  }());
  function createRef(options) {
      // seal the ref, this could prevent ref from being observed
      // It's safe to seal the ref, since we really shoulnd't extend it.
      // related issues: #79
      return Object.seal(new RefImpl(options));
  }
  // implementation
  function ref(raw) {
      // if (isRef(raw)) {
      //   return {} as any;
      // }
      var _a;
      var value = reactive((_a = {}, _a[RefKey] = raw, _a));
      return createRef({
          get: function () { return value[RefKey]; },
          set: function (v) { return (value[RefKey] = v); },
      });
  }
  function isRef(value) {
      return value instanceof RefImpl;
  }

  var AccessControlIdentifier = {};
  var ReactiveIdentifier = {};
  var NonReactiveIdentifier = {};
  function isNonReactive(obj) {
      return (hasOwn(obj, NonReactiveIdentifierKey) && obj[NonReactiveIdentifierKey] === NonReactiveIdentifier);
  }
  function isReactive(obj) {
      return hasOwn(obj, ReactiveIdentifierKey) && obj[ReactiveIdentifierKey] === ReactiveIdentifier;
  }
  /**
   * Proxing property access of target.
   * We can do unwrapping and other things here.
   */
  function setupAccessControl(target) {
      if (!isPlainObject(target) ||
          isNonReactive(target) ||
          Array.isArray(target) ||
          isRef(target) ||
          isComponentInstance(target)) {
          return;
      }
      if (hasOwn(target, AccessControlIdentifierKey) &&
          target[AccessControlIdentifierKey] === AccessControlIdentifier) {
          return;
      }
      if (Object.isExtensible(target)) {
          def(target, AccessControlIdentifierKey, AccessControlIdentifier);
      }
      var keys = Object.keys(target);
      for (var i = 0; i < keys.length; i++) {
          defineAccessControl(target, keys[i]);
      }
  }
  /**
   * Auto unwrapping when access property
   */
  function defineAccessControl(target, key, val) {
      if (key === '__ob__')
          return;
      var getter;
      var setter;
      var property = Object.getOwnPropertyDescriptor(target, key);
      if (property) {
          if (property.configurable === false) {
              return;
          }
          getter = property.get;
          setter = property.set;
          if ((!getter || setter) /* not only have getter */ && arguments.length === 2) {
              val = target[key];
          }
      }
      setupAccessControl(val);
      Object.defineProperty(target, key, {
          enumerable: true,
          configurable: true,
          get: function getterHandler() {
              var value = getter ? getter.call(target) : val;
              // if the key is equal to RefKey, skip the unwrap logic
              if (key !== RefKey && isRef(value)) {
                  return value.value;
              }
              else {
                  return value;
              }
          },
          set: function setterHandler(newVal) {
              if (getter && !setter)
                  return;
              var value = getter ? getter.call(target) : val;
              // If the key is equal to RefKey, skip the unwrap logic
              // If and only if "value" is ref and "newVal" is not a ref,
              // the assignment should be proxied to "value" ref.
              if (key !== RefKey && isRef(value) && !isRef(newVal)) {
                  value.value = newVal;
              }
              else if (setter) {
                  setter.call(target, newVal);
              }
              else {
                  val = newVal;
              }
              setupAccessControl(newVal);
          },
      });
  }
  function observe(obj) {
      var Vue = getCurrentVue();
      var observed;
      if (Vue.observable) {
          observed = Vue.observable(obj);
      }
      else {
          var vm = defineComponentInstance(Vue, {
              data: {
                  $$state: obj,
              },
          });
          observed = vm._data.$$state;
      }
      return observed;
  }
  /**
   * Make obj reactivity
   */
  function reactive(obj) {
      if (!obj) {
          warn('"reactive()" is called without provide an "object".');
          // @ts-ignore
          return;
      }
      if (!isPlainObject(obj) || isReactive(obj) || isNonReactive(obj) || !Object.isExtensible(obj)) {
          return obj;
      }
      var observed = observe(obj);
      def(observed, ReactiveIdentifierKey, ReactiveIdentifier);
      setupAccessControl(observed);
      return observed;
  }
  /**
   * Make sure obj can't be a reactive
   */
  function nonReactive(obj) {
      if (!isPlainObject(obj)) {
          return obj;
      }
      // set the vue observable flag at obj
      def(obj, '__ob__', observe({}).__ob__);
      // mark as nonReactive
      def(obj, NonReactiveIdentifierKey, NonReactiveIdentifier);
      return obj;
  }

  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData(from, to) {
      if (!from)
          return to;
      var key;
      var toVal;
      var fromVal;
      var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
      for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          // in case the object is already observed...
          if (key === '__ob__')
              continue;
          toVal = to[key];
          fromVal = from[key];
          if (!hasOwn(to, key)) {
              to[key] = fromVal;
          }
          else if (toVal !== fromVal &&
              (isPlainObject(toVal) && !isRef(toVal)) &&
              (isPlainObject(fromVal) && !isRef(fromVal))) {
              mergeData(fromVal, toVal);
          }
      }
      return to;
  }
  function install(Vue, _install) {
      if (currentVue && currentVue === Vue) {
          {
              assert(false, 'already installed. Vue.use(plugin) should be called only once');
          }
          return;
      }
      Vue.config.optionMergeStrategies.setup = function (parent, child) {
          return function mergedSetupFn(props, context) {
              return mergeData(typeof parent === 'function' ? parent(props, context) || {} : {}, typeof child === 'function' ? child(props, context) || {} : {});
          };
      };
      setCurrentVue(Vue);
      _install(Vue);
  }

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  function set$1(vm, key, value) {
      var state = (vm.__secret_vfa_state__ = vm.__secret_vfa_state__ || {});
      state[key] = value;
  }
  function get(vm, key) {
      return (vm.__secret_vfa_state__ || {})[key];
  }
  var vmStateManager = {
      set: set$1,
      get: get,
  };

  function asVmProperty(vm, propName, propValue) {
      var props = vm.$options.props;
      if (!(propName in vm) && !(props && hasOwn(props, propName))) {
          proxy(vm, propName, {
              get: function () { return propValue.value; },
              set: function (val) {
                  propValue.value = val;
              },
          });
          {
              // expose binding to Vue Devtool as a data property
              // delay this until state has been resolved to prevent repeated works
              vm.$nextTick(function () {
                  proxy(vm._data, propName, {
                      get: function () { return propValue.value; },
                      set: function (val) {
                          propValue.value = val;
                      },
                  });
              });
          }
      }
      else {
          if (props && hasOwn(props, propName)) {
              warn("The setup binding property \"" + propName + "\" is already declared as a prop.", vm);
          }
          else {
              warn("The setup binding property \"" + propName + "\" is already declared.", vm);
          }
      }
  }
  function updateTemplateRef(vm) {
      var rawBindings = vmStateManager.get(vm, 'rawBindings') || {};
      if (!rawBindings || !Object.keys(rawBindings).length)
          return;
      var refs = vm.$refs;
      var oldRefKeys = vmStateManager.get(vm, 'refs') || [];
      for (var index = 0; index < oldRefKeys.length; index++) {
          var key = oldRefKeys[index];
          var setupValue = rawBindings[key];
          if (!refs[key] && setupValue && isRef(setupValue)) {
              setupValue.value = null;
          }
      }
      var newKeys = Object.keys(refs);
      var validNewKeys = [];
      for (var index = 0; index < newKeys.length; index++) {
          var key = newKeys[index];
          var setupValue = rawBindings[key];
          if (refs[key] && setupValue && isRef(setupValue)) {
              setupValue.value = refs[key];
              validNewKeys.push(key);
          }
      }
      vmStateManager.set(vm, 'refs', validNewKeys);
  }
  function resolveScopedSlots(vm, slotsProxy) {
      var parentVode = vm.$options._parentVnode;
      if (!parentVode)
          return;
      var prevSlots = vmStateManager.get(vm, 'slots') || [];
      var curSlots = resolveSlots(parentVode.data.scopedSlots, vm.$slots);
      // remove staled slots
      for (var index = 0; index < prevSlots.length; index++) {
          var key = prevSlots[index];
          if (!curSlots[key]) {
              delete slotsProxy[key];
          }
      }
      // proxy fresh slots
      var slotNames = Object.keys(curSlots);
      for (var index = 0; index < slotNames.length; index++) {
          var key = slotNames[index];
          if (!slotsProxy[key]) {
              slotsProxy[key] = createSlotProxy(vm, key);
          }
      }
      vmStateManager.set(vm, 'slots', slotNames);
  }
  function activateCurrentInstance(vm, fn, onError) {
      try {
          return fn(vm);
      }
      catch (err) {
          if (onError) {
              onError(err);
          }
          else {
              throw err;
          }
      }
      finally {
      }
  }
  function mixin(Vue) {
      Vue.mixin({
          beforeCreate: functionApiInit,
          mounted: function () {
              updateTemplateRef(this);
          },
          updated: function () {
              updateTemplateRef(this);
          },
      });
      /**
       * Vuex init hook, injected into each instances init hooks list.
       */
      function functionApiInit() {
          var vm = this;
          var $options = vm.$options;
          var setup = $options.setup, render = $options.render;
          if (render) {
              // keep currentInstance accessible for createElement
              $options.render = function () {
                  var _this = this;
                  var args = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                  }
                  return activateCurrentInstance(vm, function () { return render.apply(_this, args); });
              };
          }
          if (!setup) {
              return;
          }
          if (typeof setup !== 'function') {
              {
                  warn('The "setup" option should be a function that returns a object in component definitions.', vm);
              }
              return;
          }
          var data = $options.data;
          // wrapper the data option, so we can invoke setup before data get resolved
          $options.data = function wrappedData() {
              initSetup(vm, vm.$props);
              return typeof data === 'function'
                  ? data.call(vm, vm)
                  : data || {};
          };
      }
      function initSetup(vm, props) {
          if (props === void 0) { props = {}; }
          var setup = vm.$options.setup;
          var ctx = createSetupContext(vm);
          // resolve scopedSlots and slots to functions
          resolveScopedSlots(vm, ctx.slots);
          var binding;
          activateCurrentInstance(vm, function () {
              binding = setup(props, ctx);
          });
          if (!binding)
              return;
          if (isFunction(binding)) {
              // keep typescript happy with the binding type.
              var bindingFunc_1 = binding;
              // keep currentInstance accessible for createElement
              vm.$options.render = function () {
                  resolveScopedSlots(vm, ctx.slots);
                  return activateCurrentInstance(vm, function () { return bindingFunc_1(); });
              };
              return;
          }
          if (isPlainObject(binding)) {
              var bindingObj_1 = binding;
              vmStateManager.set(vm, 'rawBindings', binding);
              Object.keys(binding).forEach(function (name) {
                  var bindingValue = bindingObj_1[name];
                  // only make primitive value reactive
                  if (!isRef(bindingValue)) {
                      if (isReactive(bindingValue)) {
                          bindingValue = ref(bindingValue);
                      }
                      else {
                          // a non-reactive should not don't get reactivity
                          bindingValue = ref(nonReactive(bindingValue));
                      }
                  }
                  asVmProperty(vm, name, bindingValue);
              });
              return;
          }
          {
              assert(false, "\"setup\" must return a \"Object\" or a \"Function\", got \"" + Object.prototype.toString
                  .call(binding)
                  .slice(8, -1) + "\"");
          }
      }
      function createSetupContext(vm) {
          var ctx = {
              slots: {},
          };
          var props = [
              'root',
              'parent',
              'refs',
              'attrs',
              'listeners',
              'isServer',
              'ssrContext',
          ];
          var methodReturnVoid = ['emit'];
          props.forEach(function (key) {
              var _a;
              var targetKey;
              var srcKey;
              if (Array.isArray(key)) {
                  _a = __read(key, 2), targetKey = _a[0], srcKey = _a[1];
              }
              else {
                  targetKey = srcKey = key;
              }
              srcKey = "$" + srcKey;
              proxy(ctx, targetKey, {
                  get: function () { return vm[srcKey]; },
                  set: function () {
                      warn("Cannot assign to '" + targetKey + "' because it is a read-only property", vm);
                  },
              });
          });
          methodReturnVoid.forEach(function (key) {
              var srcKey = "$" + key;
              proxy(ctx, key, {
                  get: function () {
                      return function () {
                          var args = [];
                          for (var _i = 0; _i < arguments.length; _i++) {
                              args[_i] = arguments[_i];
                          }
                          var fn = vm[srcKey];
                          fn.apply(vm, args);
                      };
                  },
              });
          });
          return ctx;
      }
  }

  var _install = function (Vue) { return install(Vue, mixin); };
  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  if (currentVue && typeof window !== 'undefined' && window.Vue) {
      _install(window.Vue);
  }

  function mapHook() {
    var initVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var initMap = ref(new Map(initVal));
    var map = ref(new Map(initVal));

    var get = function get(key) {
      return map.value.get(key);
    };

    var set = function set(key, val) {
      // 先使用原map设置值,覆盖已有key和无key的情况
      map.value.set(key, val); // immutable

      map.value = new Map(_toConsumableArray(map.value));
    };

    var setAll = function setAll(newMap) {
      map.value = new Map(newMap);
    };

    var remove = function remove(key) {
      map.value.delete(key);
      map.value = new Map(_toConsumableArray(map.value));
    };

    var reset = function reset() {
      return map.value = new Map(_toConsumableArray(initMap.value));
    };

    var resetInit = function resetInit(newMap) {
      return initMap.value = new Map(newMap);
    };

    return [map, {
      get: get,
      set: set,
      setAll: setAll,
      remove: remove,
      reset: reset,
      resetInit: resetInit
    }];
  }

  function boolHook() {
    var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var state = ref(defaultValue);

    var toggle = function toggle(value) {
      return state.value = value !== undefined ? !!value : !state.value;
    };

    var setTrue = function setTrue() {
      return state.value = true;
    };

    var setFalse = function setFalse() {
      return state.value = false;
    };

    return {
      state: state,
      toggle: toggle,
      setTrue: setTrue,
      setFalse: setFalse
    };
  }

  function install$1(Vue) {
    return;
  }

  exports.boolHook = boolHook;
  exports.default = install$1;
  exports.mapHook = mapHook;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
