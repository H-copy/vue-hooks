import { ref, computed } from '@vue/composition-api'


/**
 * 转换hook
 * @param { any } defaultValue 初始值 
 * @param { any } reverseValue 切换值 
 * @returns{ { state, toggle, setLeft, setRight } }  state 当前状态值  toggle 切换函数  setLeft 设置默认值  setRight 设置转换值
 * 
 * @example
 * 
 * const { currentStatus, toggle, setLeft as open, setRight as close } = toggleHook('open', 'close')
 * 
 *  模板
 *  <div>
 * 
 *      <h1> {{ currentStatus }} </h1>
 *      <button @click='toggle'> toggle </button>
 *      <button @click='open'> open </button>
 *      <button @click='close'> close </button>
 *      
 *  </div>
 * 
 */
export default function toggleHook(defaultValue, reverseValue){

    const state = ref(defaultValue)
    const reverseValueOrigin = computed(() => reverseValue === undefined ? !defaultValue : reverseValue )
    const toggle = value => state.value = value !== undefined ? value : state.value === defaultValue ? reverseValueOrigin.value : defaultValue
    const setLeft = () => state.value = defaultValue
    const setRight = () => state.value = reverseValueOrigin.value
    
    
    return {
        state,
        toggle,
        setLeft,
        setRight
    }
}
