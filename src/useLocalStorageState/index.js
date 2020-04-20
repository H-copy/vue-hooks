import useStrongeState from '../useStrongeState'

export default function useLocalStorageState(key, defaultValue){
    return useStrongeState(localStorage, key, defaultValue)
}

