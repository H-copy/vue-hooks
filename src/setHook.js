import { ref } from '@vue/composition-api'


/**
 * Set hooks
 * @param { Array } initVal 初始数据
 * @summary 对Set类型做的hook封装，利用Set的幂等性
 * @exports 
 * const [ set, utils ] = setHook([ 1, 2 ])
 * 
 * 添加
 * set.add(3) ==> [1, 2, 3]
 * set.add(2) ==> [1, 2, 3]
 * 
 * 移除
 * set.remove(1) ==> [2, 3]
 * 
 * 重置
 * set.reset()  ==> [1, 2]
 * 
 * 
 * 其他Set方法
 * 
 * 校验
 * set.value.has(1) ==> true
 * 
 * 遍历
 * const newList = [...set.value].map(num => num + 1)  ==> [ 2, 3 ]
 * 
 */
export default function setHook(initVal=[]){

    const initSet = ref(new Set(initVal))
    const set = ref(new Set(initVal))
    
    const add = key => set.value = new Set([...[...set.value], key])
    const remove = key => set.value = new Set([...set.value].filter(i => i !== key))
    const reset = () => set.value = new Set([...initSet.value])
    const setInit = initVal => initSet.value = new Set(initVal)
    const update = val =>{ setInit(val); reset() }

    return [ set, {  add, remove, reset, setInit, update } ]
}