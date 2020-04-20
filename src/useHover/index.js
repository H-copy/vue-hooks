import compositionApi  from '../env'
const { ref, watch, computed } = compositionApi
import useBool from '../useBool'


/**
 * dom 鼠标悬浮事件 hook
 * @param { { dom, onEnter, onLeave } } options 配置  dom 初始绑定dom  onEnter 滑入事件 onLeave 滑出事件 
 * @returns { [ state, element ] } state 滑入状态  element dom绑定ref
 * 
 * @example
 * 
 *  setup
 *  
 *  const [ isHover, hoverEle ] = hoverHook({
      onEnter(e){ console.log('enter >>>', e) },
      onLeave(e){ console.log('leave >>>', e) },
    })
 *
 *  模板
 * 
 *  <div ref='hoverEle' >
      <Card style='margin: 20% auto; width: 600px' title='' >
        {{ isHover }}
      </Card>
    </div>
 *  
 */

export default function useHover(options={}){
    const { dom, onEnter, onLeave } = options
    const element = ref(null)
    const onEnterRef = ref(onEnter)
    const onLeaveRef = ref(onLeave)

    const { state, setTrue, setFalse } = useBool(false)

    const targetElement = computed(() => {
        const ele = dom ? dom.value : element.value
        return ele || element.value
    })
    
    const onMouseEnter = () => {
        onEnterRef.value && onEnterRef.value()
        setTrue()
    }

    const onMouseLeave = () => {
        onLeaveRef.value && onLeaveRef.value()
        setFalse()
    }
    
    
    watch(() => targetElement.value, (val, oldVal) =>{

        if(oldVal){
            oldVal.removeEventListener('mouseenter', onMouseEnter);
            oldVal.removeEventListener('mouseleave', onMouseLeave);
        }
        
        if(val){
            val.addEventListener('mouseenter', onMouseEnter);
            val.addEventListener('mouseleave', onMouseLeave);
        }

    })
    

    return [ state, element ]
    
}