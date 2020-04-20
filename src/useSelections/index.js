import compositionApi  from '../env'
const { computed } = compositionApi
import useSet from '../useSet'

const defaultOptions = {
    statusVisibal: false
}

/**
 * 选择器 hook
 * @param { Array } items 列表配置
 * @param { Array | undefined } defaultSelected 默认设置 
 * @param { Object } options 方法配置
 * @summary 基于 useSet 实现的选择器hook，支持多选，单选 全选切换, 及状态显示
 * 
 * @example
 * const list = [ '台湾', '香港', '澳门' ]
 * const { selected, isSelected } = selectionsHook(list)
 * 
 */
export default function useSelections(items, defaultSelected=[], options={}){
    const { statusVisibal } = Object.assign({}, defaultOptions, options)
    const [ selectedSet, setUtils ] = useSet(defaultSelected) 
    
    const isSelected = item => selectedSet.value.has(item)

    const select = item => setUtils.add(item)
    
    const unSelect = item => setUtils.remove(item)

    const toggle= item => {
        selectedSet.value.has(item) ? unSelect(item) : select(item)
    } 

    const selectAll = () => setUtils.update(items)

    const unSelectAll = () => setUtils.update([])

    
    let groupControl = {} 

    if(statusVisibal){

        const noneSelected =  computed(() => items.every(item => !selectedSet.value.has(item)) )

        const allSelected = computed(() => items.every(item => selectedSet.value.has(item)))
    
        const partiallySelected = computed(() => !noneSelected.value && !allSelected.value)
    
        const toggleAll = () => allSelected.value ? unSelectAll() : selectAll()
        
        
        groupControl = {
            noneSelected,
            allSelected,
            partiallySelected,
            toggleAll
        }
    }
    
  
    const selected = computed({
        get(){
            return [...selectedSet.value]
        },

        set(data){
            setUtils.setInit(data)
            setUtils.reset()
        }
    })


    return {
        selected,
        isSelected,
        select,
        unSelect,
        toggle,
        selectAll,
        unSelectAll,
        ...groupControl
    }

}