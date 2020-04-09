import { ref } from '@vue/composition-api'


import strongeStateHook from './strongeStateHook'

export default function sessionStorageStateHook(key, defaultValue){
    return strongeStateHook(sessionStorage, key, defaultValue)
}

