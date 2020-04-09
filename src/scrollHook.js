import { ref, watch, computed } from '@vue/composition-api'
import { getVmElement } from './util/isVm'



/**
 * 
 * @param { dom ref } initDom 初始 dom 
 * @returns { [ state, element ] } state 数据对象  element dom挂载ref
 * 
 * @example
 * 
 * setup
 * 
 * const [ state, element ] = scrollHook()
 * const loadMore = () => {....}
 * const scrollY = computed(() => state.value.top)
 * watch(() => scrollY.value, (val) => {
 *  if(val < 500) return
 *  loadMore()
 * }
 * 
 * 
 * 模板
 * 
 * <div class='contaier' ref='element' >
 *  ....
 * </div>
 * 
 * 
 */
export default function scrollHook(initDom={}){

    const element = ref(null)

    const state = ref({
        left: NaN,
        top:  NaN,
    })
    
    const targetElement = computed(() => initDom.value || element.value)
    
    function updatePositon(target){

        if(target === document){
            target = document.scrollingElement
            if(!target) return;
        }

        state.value = {
            left: target.scrollLeft,
            top: target.scrollTop
        }
        
    }

    function listener(event){
        if(!event.target) return
        updatePositon(event.target)
    }
    

    watch(() => targetElement.value, (val, oldVal) => {

        val = getVmElement(val)
        oldVal = getVmElement(oldVal)

        if(oldVal){
            oldVal.removeEventListener('scroll',  listener)
        }

        if(val){
            console.log(val)
            val.addEventListener('scroll', listener)
        }
        
    })
    

    return [ state, element ]

    
}