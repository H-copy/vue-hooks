# mapHook

> 包装Map类型



### Example

```vue
<template>
  <div class="home">

    <div>
        <input v-model='newName' />
        <button @click='add'>
            add
    	</button>
     	<ul>
        	<li v-for='name of names' :key='name' @click='remove(name)' > 
                {{ name }} 	
    		</li>    
    	</ul>
    </div>
    
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { mapHook } from 'left-vue-hook'

export default {

  setup(){
      const newName = ref('')
      const [ map, { get, set, remove } ] = mapHook([
          [ 'Rogen', 1 ],  
          [ 'Coco', 2 ],
          [ 'Jim', 3 ]
      ])
     	
      const names = computed(() => [ ...map.keys() ])
      const add = () => set(newName, names.value.length)
     
      
   return {
       	newName,
		names,
       	remove
   }

  }

}
</script>

```





### Params

| 名称 | 说明       | 默认值 |
| ---- | ---------- | ------ |
| fn   | 被处理函数 |        |
| wait | 间隔时间   |        |



### Result

| 名称   | 说明     | 类型          |
| ------ | -------- | ------------- |
| run    | 执行函数 | (any) => void |
| cancel | 取消执行 | () => void    |



