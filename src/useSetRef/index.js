import compositionApi  from '../env'
const { ref } = compositionApi


export default function useSetRef(initVal){
    const state = ref(initVal)
    const setState = data => state.value = data
    
    return [ state, setState ]
}