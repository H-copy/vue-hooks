import compositionApi  from '../env'
const { ref, watch } = compositionApi


/**
 * 
 * @param { any } initVal 初始值
 * @param { function | undefined } compare 校验函数 
 */
export default function usePrevious(initVal, compare){
    const curRef = ref(initVal)
    const prevRef = ref(null)
    
    watch( () => curRef.value, (val, oldVal) => {

        const needUpdate = typeof compare === 'function' ? compare(val, oldVal) : true   
        
        if(needUpdate){
            [ prevRef.value, curRef.value  ] = [ oldVal, val]            
         }
    })

    return [ curRef, prevRef ]
}