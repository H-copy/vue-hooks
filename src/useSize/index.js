import compositionApi  from '../env'
const { ref, watch, computed } = compositionApi
import ResizeObserver from 'resize-observer-polyfill';

/**
 * dom尺寸监听
 * @param { dom ref } initDom 初始dom对象
 * @returns { [ state, element ] } state dom尺寸  element 绑定ref
 * 
 * @example
 * 
 * setup(){
 *  const [ size, element ] = useSize()
 *  return{ size, element } 
 * }
 * 
 * 模板
 * 
 * <h4>
        width: {{ size.width }}
        /
        height: {{ size.height }}
    </h4>
 * 
 */
export default function useSize(initDom={}){
    
    const element = ref(null)

    const state = ref({
        width: ( initDom.value || {} ).clientWidth,
        height: ( initDom.value || {} ).clientHeight 
    })
    
    const resizeObserver = ref(null)
    const targetElement = computed(() => initDom.value || element.value)

    watch(() => targetElement.value, () => {

        if(resizeObserver.value){ resizeObserver.disconnect() }
        if(!targetElement.value) return

        
        resizeObserver.value = new ResizeObserver( entries => {
            
            entries.forEach( entry => {

                state.value = {
                    width: entry.target.clientWidth,
                    height: entry.target.clientHeight,
                }
                   
            })

        })

        resizeObserver.value.observe(targetElement.value);

    })
    

    
    return [ state, element ]
}