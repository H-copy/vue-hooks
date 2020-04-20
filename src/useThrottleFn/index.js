import compositionApi  from '../env'
const { ref } = compositionApi


/**
 * 
 * @param { Function } fn 被包装函数 
 * @param { Number } wait 间隔时间 ms 
 * @return { { run, cancel } } run 执行函数  cancel 取消执行
 * @exports
 * 
 * const state = 1
 * const addOne = () => state = state + 1
 * const { run: addOne } = useThrottleFn(addOne, 500) 
 * 
 */
export default function useThrottleFn(fn, wait){

    const timer = ref(null)

    const cancel = () => timer.value&&clearTimeout(timer.value)

    const run = (...args) => {
        if(timer.value){return}
        
        timer.value = setTimeout(() => {

            fn(...args)
            timer.value = null
            
        }, wait)
    }
    
    return [ run, cancel ]
}