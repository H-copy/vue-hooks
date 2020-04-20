import compositionApi  from '../env'
const { ref, watch, computed } = compositionApi



/**
 * dom 事件绑定
 * @param { String } name 事件名称 
 * @param { Function } handler 回调函数
 * @param { Element } target 绑定对象
 * @param { Object } option 配置属性
 * @returns { [ remove, element, reBind ] } remove 事件移除函数 element 绑定元素 reBind 重新绑定
 */
export function useEleEvent( name, handler, target ){

    const element = ref(null)
    let remove = ref(null)
    let reBind = ref(null)
    
    const targetElement = computed(() => {
        return target&&target.value ? target.value : element.value
    })
    
    if(!handler) return
    

    watch(() => targetElement.value, (val, oldVal) =>{

        if(oldVal){
          remove.value && remove.value()
        }

        if(val){
          val.addEventListener(name, handler)
          reBind.value = () => val.addEventListener(name, handler)
          remove.value = () => val.removeEventListener(name, handler)
        }

    })

    return [ remove, element, reBind ]
}


/**
 * vm 事件绑定
 * @param { String } name 事件名称 
 * @param { Function } handler 回调函数
 * @param { vm } vm 绑定vue实例
 * @param { Object } option 配置属性
 * @returns { Function } remove 事件移除函数
 * @exports
 * 
 * const vm = new Vue({...})
 * // 绑定事件，并返回移除函数
 * const removeTime = useVmEvent('time', () => console.log(new Date()), vm)
 *  
 */
export function useVmEvent (name, handler, vm ){

    if(!handler)return
    if(!vm) return

    vm.$on(name, handler)
    const remove = () => vm.$off(name)
    return remove

}
