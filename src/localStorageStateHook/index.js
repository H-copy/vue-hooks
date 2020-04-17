import { ref } from '@vue/composition-api'


import strongeStateHook from './strongeStateHook'

export default function localStorageStateHook(key, defaultValue){
    return strongeStateHook(localStorage, key, defaultValue)
}

