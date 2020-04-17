import { ref } from '@vue/composition-api'

export default function mapHook(initVal=[]){

    const initMap = ref(new Map(initVal))
    const map = ref(new Map(initVal))
    
    const get = key => map.value.get(key)

    const set = (key, val) => {
        // 先使用原map设置值,覆盖已有key和无key的情况
        map.value.set(key, val)

        // immutable
        map.value = new Map([...map.value])
    }

    const setAll = newMap => {
        map.value = new Map(newMap)
    }

    const remove = key => {
        map.value.delete(key);
        map.value = new Map([...map.value])
    }

    const reset = () => map.value = new Map([...initMap.value])
    const resetInit = (newMap) => initMap.value = new Map(newMap)

    return [ map, { get, set, setAll, remove, reset, resetInit } ] 
    
}