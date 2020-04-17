# hoverHook

> 鼠标悬浮监听



### Example

```vue
<template>
  <div class="home" ref='element'>

    <div ref='hoverEle' >
      <Card style='margin: 20% auto; width: 600px' title='' >
        {{ isHover }}
      </Card>
    </div>
    
  </div>
</template>

<script>
// import { ref } from '@vue/composition-api'
import hoverHook from '@/left-vue-hooks'

export default { 

  setup(){
 
    const [ isHover, hoverEle ] = hoverHook({
      onEnter(e){ console.log('enter >>>', e) },
      onLeave(e){ console.log('leave >>>', e) },
    })
   
    return {
      
      isHover,
      hoverEle
      
    }
    

  }

}
</script>


```





### Params

| 名称        | 说明        | 默认值 |
| ----------- | ----------- | ------ |
| options     | 设置项      | {}     |
| --> dom     | 初始绑定Dom |        |
| --> onEnter | 滑入事件    |        |
| --> onLeave | 滑出事件    |        |



### Result

| 名称    | 说明              | 类型 |
| ------- | ----------------- | ---- |
| state   | 是否进入绑定dom内 | bool |
| element | dom绑定ref        | ref  |

