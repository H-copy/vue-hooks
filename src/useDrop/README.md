# useDrop  useDrag

> 拖拽 hook



### Uesage

```vue
<style>

*{
  margin: 0;
  padding: 0;
}

li{
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul{
  margin: auto;
  width: 400px;
}

li{
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fff;
}

li + li{
  margin-top: 10px;
}

button{
  padding: 6px 12px;
  background: #efefef;
  border-radius: 4px;
  border: 0;
  box-shadow: 0;
}

button.full{
  display: block;
  box-sizing: border-box;
  width: 100%;
  
}

.card{
  margin: 20px auto;
  padding: 10px 20px;
  width: 400px;
  border-radius: 6px;
  box-shadow: 0 -4px 16px 4px rgba(100, 100, 100, .1);
}


.area{
  
  height: 200px;
  background: #eee;

}

.move{
  display: inline-block;
  margin: 10px;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  border: 1px dashed orange;
}

</style>
<template>
  <div id="app">
    
    <div class="card">
	 isHovering: {{ isHovering }}
    <div class="area" @drop='onDrop' v-on="dropHandlers" ></div>

      <div>
        <div 
          v-for='item of [...state]' 
          class="move" 
          :key='item' 
          @click='remove(item)'
          :ref='addEle(item)'>
        </div>

        <button @click='addHandler' > add </button>
      </div>

    </div>
    
    
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useSet, useDrag, useDrop } from 'left-vue-hooks'



export default {
  name: 'App',
  components:{
    
  },
  setup(){

    const [ dropHandlers, { isHovering } ] = useDrop({
      onText(text){ console.log(text) },
      onDom(data){ console.log(data) }
    })
    
    const [ state, { add, remove } ] = useSet([])
    

    const addEle = useDrag()

    const addHandler = () => add(new Date())

    return {
      addHandler,
      state,
      add,
      remove,
      addEle,
      dropHandlers,
      isHovering
    }
  }
}
</script>



```





## useDrop

> 拖拽区事件



### Params

- options

  - onDom dom拖拽释放回调

  - onUri uri拖拽释放回调

  - onFiles file拖拽释放回调

  - onText text拖拽释放回调

  

### Result

- props 拖拽监听函数
  - dragover   e => void
  - dragenter  e => void
  - dragleave  e => void
  - drop  e => void
  - paste  e => void
- isHovering  是否进入监听区   boolean





## useDrag

> 被拖拽dom 



### Result

- addEle   数据及元素绑定函数  any =>  ele => void

```js
   <div 
      v-for='item of [ 1, 2, 3 ]' 
      class="move" 
      :key='item'
      :ref='addEle(item)'>
    </div>
```



