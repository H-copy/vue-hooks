import { setRuntimeVM } from './util/runtime';

import mapHook from './mapHook'
import boolHook from './boolHook'


export {
    mapHook,
    boolHook
}

export default function install(Vue) {
    return
    Vue.mixin({ beforeCreate: setRuntimeVM });
}