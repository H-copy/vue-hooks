import { ref, onMounted, onUnmounted } from '@vue/composition-api'


/**
 * 鼠标移动监听 hook
 * @returns { ref } state 数据对象
 * 
 */
export default function mouseHook(){
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