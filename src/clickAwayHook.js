import { ref, computed, onMounted, onUnmounted, watch } from '@vue/composition-api'
import { getVmElement } from './util/isVm'


/**
 * 监听元素外事件
 * @param { Function } onClickAway 外部事件触发回调
 * @param { String ? } eventName  监听事件 默认 click
 * @param { element ? } dom 初始dom 
 * @returns { ref } 被监听dom挂载对象
 * 
 * @example
 *  
 * setup
 *  const state = ref(null)
 *  const innerClick = () => state.value = 'inner'
 *  const outClick = () => state.value = 'out'
 *  const element = clickAwayHook( outClick , 'click')
 * 
 *  
 *  模板
 *   <Card style='margin: 20% auto; width: 600px' title='' >
        <h1> {{ state }} </h1>
        <Button ref='element' @click="innerClick"> inner </Button>
      </Card>
 * 
 */
export default function clickAwayHook( onClickAway, eventName='click', dom={} ){

    const element = ref(null)

    const tarageElement = computed(() =>  dom.value || element.value )
    
    const handler = event => {
        const el = getVmElement(tarageElement.value)  
        
        // 触发事件对象是否在容器元素内
        if(!el || el.contains(event.target) ) return
        onClickAway(event)

    }
    
    onMounted(() => {
        document.addEventListener(eventName, handler)
    })

    onUnmounted(() => {
        document.removeEventListener(eventName, handler)
    })
    
    watch(() => eventName, () => {
        document.addEventListener(eventName,handler)
    })

    return element
}