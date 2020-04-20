import compositionApi  from '../env'
import useDebounceFn from '../useDebounceFn'
const { ref, watch } = compositionApi


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
export default function useDebounce(watchFn, wait){
    const state = ref(watchFn())
    const { run:setState } = useDebounceFn(data => state.value = data, wait)
    
    watch(watchFn, (val) => setState(val) )

    return [ state, setState ]
}