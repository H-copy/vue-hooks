import { ref, watch } from '@vue/composition-api'


/**
 * 
 * @param { any } initVal 初始值
 * @param { function | undefined } compare 校验函数 
 */
export default function previousHook(initVal, compare){
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