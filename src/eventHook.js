
/**
 * dom 事件绑定
 * @param { String } name 事件名称 
 * @param { Function } handler 回调函数
 * @param { Element } target 绑定对象
 * @param { Object } option 配置属性
 * @returns { Function } remove 事件移除函数
 */
export function eleEventHook( name, handler, target, option ){

    if(!handler) return
    if(!target) return

    const addEvent = target.addEventListener || target.on
    const removeEvent = target.removeEventListener || target.off
    const remove = () => removeEvent.call(target, name, handler, option)
    addEvent.call(target, name, handler, Option)

    return remove
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
 * const removeTime = vmEventHook('time', () => console.log(new Date()), vm)
 *  
 */
export function vmEventHook (name, handler, vm, option){

    if(!handler)return
    if(!vm) return

    vm.$on(name, handler, option)
    const remove = () => vm.$off(name)
    return remove

}


export default{
    vmEventHook,
    eleEventHook
}