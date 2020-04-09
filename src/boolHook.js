import { ref } from '@vue/composition-api'

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