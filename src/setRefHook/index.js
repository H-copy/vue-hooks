import { ref } from '@vue/composition-api'


export default function setRefHook(initVal){
    const state = ref(initVal)
    const setState = data => state.value = data
    
    return [ state, setState ]
}