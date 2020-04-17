import { ref } from '@vue/composition-api'

function isFunction(obj){
    return typeof obj === 'function'
}

function getStoreValue(storage, key, defaultValue){

    const raw = storage.getItem(key)

    if(raw){
        return JSON.parse(raw)
    }

    if(isFunction(storage)){
        return defaultValue()
    }
    
    return defaultValue
}


/**
 * 
 * @param { localStorage | sessionStorage } storage  
 * @param { string } key 缓存字段名 
 * @param { any } defaultValue 默认数据
 * @returns { array } [ state, updateState ] 返回缓存ref对象，及更新方法。 更新数据为空时，清楚缓存字段 
 * @summary 缓存基础函数，封装解析及格式化操作
 * @example
 *  
 * const [ userInfo, updateState ] = strongeStateHook(localStorage, 'USER_INFO', { nickname: 'coco', age: 24 })
 *  
 * const closeUserInfo = () => updateState()
 * const updateNickname = name => updateState({ ...userInfo.value, nickname: name }) 
 * 
 */
export default function strongeStateHook(storage, key, defaultValue){

    const state = ref( getStoreValue(storage, key, defaultValue) )
    
    function updateState(value){

        if(typeof value === 'undefined'){
            storage.removeItem(key)
            state.value = undefined
            return 
        }

        if(isFunction(value)){
            const previousState = getStoreValue(storage, key, defaultValue)
            const currentState = value(previousState)
            storage.setItem(key, JSON.stringify(currentState))
            state.value = currentState
            return 
        }

        storage.setItem(key, JSON.stringify(value))
        state.value = value
    }

    return [ state, updateState ]
    
}