import { ref } from '@vue/composition-api'

/**
 * 布尔值 hook
 * @param { boolean } defaultValue 初始状态
 * @returns { { state, toggle, setTrue, setFalse } }
 * 
 * state 当前状态
 * toggle 状态切换, 接受设置值
 * setTrue 设置状态为 true
 * setFalse 设置状态为 false 
 * 
 */
export default function boolHook(defaultValue=false){
    const state = ref(defaultValue)
    const toggle = value =>  state.value = value !== undefined ? !!value : !state.value
    const setTrue = () => state.value = true
    const setFalse = () => state.value = false

    return {
        state,
        toggle,
        setTrue,
        setFalse
    }

}