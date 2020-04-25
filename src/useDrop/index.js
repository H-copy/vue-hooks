import compositionApi  from '../env'
const { ref, watch, computed } = compositionApi

const CUSTOM = 'CUSTOM'

export function getDragDomSign(){
    return CUSTOM
}

export function domDragCallback(){
    return data => ({ dataTransfer }) => dataTransfer.setData(CUSTOM, JSON.stringify(data))
}

/**
 * DOM 拖拽快速绑定hook
 * @returns { function } 
 * - addEle any => element => void 接收事件传参，返回dom元素收集器
 */
export function useDrag(){

    const elems = ref([])
    const handlers = ref([])
  
    watch(() => elems.value, (val, oldVal) =>{
  
      if(oldVal){
        oldVal.forEach((ele, index) => {
          ele.removeEventListener('onDragstart', handlers.value[index])
          handlers.value.splice(index, 1)
          elems.value.splice(index, 1)
        })
      }
  
      if(val){
        val.forEach((ele, index) => {
          ele.setAttribute('draggable', true)
          ele.addEventListener('dragstart', handlers.value[index])
        })
      }
    })
  
    const addEle = data => ele => {
      
       if(!ele){return}
       handlers.value = [ ...handlers.value, ({ dataTransfer }) => {
        dataTransfer.setData(CUSTOM, JSON.stringify(data))
      } ]
      elems.value = [ ...elems.value, ele ]
    }
   
   return addEle
   
}


/**
 * 拖拽事件
 * @param {*} callback 
 * @param {*} setIsHovering 
 * @return { obejct } 监听函数
 */
function getProps( callback, setIsHovering ) {

    return {
        dragover: e => e.preventDefault(),
        dragenter: e => { e.preventDefault(); setIsHovering(true) },
        dragleave: () => { setIsHovering(false) },
        paste: e => callback(e.dataTransfer, e),
        drop: e => {
         e.preventDefault();
         setIsHovering(false);
         callback(e.dataTransfer, e);
       }
     }
    
}
  

/**
 * 拖拽区hook
 * @param { Object } options 
 * - onDom dom拖拽释放回调
 * - onUri uri拖拽释放回调
 * - onFiles file拖拽释放回调
 * - onText text拖拽释放回调
 * 
 * @returns { array  }
 * - props 拖拽监听函数
 * - isHovering 是否进入监听区
 */
 export function useDrop(options={}){
    
    const optionsRef = ref(options)
    const isHovering = ref(false)
    const setIsHovering = status => isHovering.value = status
    
    const callback = (dataTransfer, event) =>{
  
      const url = dataTransfer.getData('text/uri-list')
      const dom = dataTransfer.getData(CUSTOM)
  
      const { onDom, onUri, onFiles, onText } = optionsRef.value
      
    
      if(dom&&onDom){
        onDom(JSON.parse(dom), event)
        return
      }
  
      if(url&&onUri){
        onUri(url, event)
        return
      }
  
      if(dataTransfer.files && dataTransfer.files.length && onFiles){
        onFiles( [...dataTransfer.files], event )
        return 
      }
  
      if(dataTransfer.items&&dataTransfer.items.length&&onText){
        dataTransfer.items[0].getAsString(text => onText(text, event))
      }
      
    }
    
    const props = getProps(callback, setIsHovering)
  
  
    return [ props, { isHovering } ]
    
}