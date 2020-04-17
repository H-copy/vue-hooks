import { ref, watch } from '@vue/composition-api'
import throttleFnHook from './throttleFnHook' 


/**
 * 节流值hook 
 * @param { Function } watchFn 观察函数 
 * @param { Number } wait 时间间隔 ms 
 * @return { [ state, setState ] } state 间隔数据, setState 节流函数
 * @example
 * 
 * const count = ref(1)
 * const add = () => count.value += 1
 * const [ state ] = throttleHook(() => count.value)
 * 
 */
export default function throttleHook(watchFn, wait){

    const state = ref(watchFn())
    const { run: setState } = throttleFnHook(data => state.value = data, wait)
    watch(watchFn, (val) => setState(val) )

    return [ state, setState ]
}