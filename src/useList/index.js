import compositionApi  from '../env'
const { ref, watch, computed } = compositionApi
import useSet from '../useSet'

/**
 * 列表
 * @param { Array } initVal 初始数据
 * @summary 对Set类型做的hook封装，利用Set的幂等性
 * @exports 
 * const [ set, utils ] = useList([ 1, 2 ])
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
 */
export default function useList(initVal=[]){

    const [ set, util ] = useSet(initVal)
    const list = ref(initVal)
    watch(() => set.value, () =>{ list.value = [ ...set.value ] } )
    
    return [ list, util, set ]
}

