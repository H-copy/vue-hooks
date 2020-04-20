import compositionApi  from '../env'
const { ref, onMounted, onUnmounted } = compositionApi


/**
 * 鼠标移动监听 hook
 * @returns { ref } state 数据对象
 * 
 */
export default function useMouse(){
    const state = ref({})
    

    const moveHandler = event => {

        const { screenX, screenY, clientX, clientY, pageX, pageY } = event;
        state.value = { screenX, screenY, clientX, clientY, pageX, pageY }

    }
    
    onMounted(() => {
        document.addEventListener('mousemove', moveHandler)
    })
    
    onUnmounted(() =>{
        document.removeEventListener('mousemove', moveHandler)
    })


    return state
    
}