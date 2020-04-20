
import useStrongeState from '../useStrongeState'

export default function useSessionStorageState(key, defaultValue){
    return useStrongeState(sessionStorage, key, defaultValue)
}

