import compositionApi  from '../env'
const { ref } = compositionApi



/**
 * 函数防抖处理
 * @param { Function } fn 被包装函数 
 * @param { Number } wait 等待时间 ms 
 * @return { { run, cancel } } run 包装后的执行函数  cancel 取消执行
 * @exports
 * 
 *  const [ state, setState ] = useSetRef('')
    const { run, cancel } = useDebounceFn( setState, 500 )
 *  
 */
export default function useDebounceFn(fn, wait){
    const timer = ref(null)
    
    const cancel = () => timer.value&&clearTimeout(timer.value)

    const run = (...args) => {
        cancel()
        timer.value = setTimeout(() => fn(...args), wait)
    }

    return {
        run,
        cancel
    }
}