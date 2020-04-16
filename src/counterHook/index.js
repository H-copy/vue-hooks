import { ref, computed } from '@vue/composition-api'

export default function counterHook(initVal, options={}){
    const { max, min } = options
    const check = value => {

        if(typeof max === 'number'){
            value = Math.min(max, value)
        }

        if(typeof min === 'number'){
            value = Math.max(min, value)
        }

        return value
        
    }

    // 初始校验
    const init = computed(() => check(initVal))
    const current = ref(init.value)
    const setValue = value => current.value = check(value) 
    const set = setValue
    const inc = (delta=1) => setValue(current.value + delta )
    const dec = (delta=1) => setValue(current.value - delta )
    const reset = () => setValue(init.value)
    
    return [ current, { set, inc, dec, reset } ]
}
