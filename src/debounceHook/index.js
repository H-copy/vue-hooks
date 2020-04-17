import { ref, watch } from '@vue/composition-api'
import debounceFnHook from './debounceFnHook.js'


/**
 * 防抖值hook 
 * @param { Function } watchFn 观察函数 
 * @param { Number } wait 时间间隔 ms 
 * @return { [ state, setState ] } state 间隔数据, setState 防抖函数
 * @example
 * 
 * const count = ref(1)
 * const add = () => count.value += 1
 * const [ state ] = debounceHook(() => count.value)
 * 
 */
export default function debounceHook(watchFn, wait){
    const state = ref(watchFn())
    const { run:setState } = debounceFnHook(data => state.value = data, wait)
    
    watch(watchFn, (val) => setState(val) )

    return [ state, setState ]
}