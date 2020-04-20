import compositionApi  from '../env'
const { ref, watch } = compositionApi
import useThrottleFn from '../useThrottleFn' 


/**
 * 节流值hook 
 * @param { Function } watchFn 观察函数 
 * @param { Number } wait 时间间隔 ms 
 * @return { [ state, setState ] } state 间隔数据, setState 节流函数
 * @example
 * 
 * const count = ref(1)
 * const add = () => count.value += 1
 * const [ state ] = useThrottle(() => count.value)
 * 
 */
export default function useThrottle(watchFn, wait){

    const state = ref(watchFn())
    const [ setState ] = useThrottleFn(data => state.value = data, wait)
    watch(watchFn, (val) => setState(val) )
    
    return [ state, setState ]
}