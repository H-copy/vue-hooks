# useMouse

> 鼠标移动监听



### Example

```vue
<template>
  <div class="home" ref='element'>

    <div ref='hoverEle' >
      <Card style='margin: 20% auto; width: 600px' title='' >
        
        <div v-for='(value, key) of state' :key='key'>
          {{ key }} : {{ value }}
        </div>

      </Card>
    </div>
    
  </div>
</template>

<script>
import { useMouse } from 'vx-hook'

export default { 

  setup(){
 
    const state = useMouse()
   
    return {
      
      state
      
    }

  }

}
</script>

```





### Params

| 名称 | 说明 | 默认值 |
| ---- | ---- | ------ |
|      |      |        |



### Result

| 名称        | 说明           | 类型   |
| ----------- | -------------- | ------ |
| state       | 当前鼠标坐标值 | object |
| --> screenX |                | number |
| --> screenY |                | number |
| --> clientX |                | number |
| --> clientY |                | number |
| --> pageX   |                | number |
| --> pageY   |                | number |

