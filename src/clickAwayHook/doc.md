# clickAwayHook

> 元素外点击事件



### Example

```vue
<template>
  <div class="home" >

      <Card style='margin: 20% auto; width: 600px' title='' >
        <h1> {{ state }} </h1>
        <Button ref='element' @click="innerClick"> inner </Button>
      </Card>
    
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import clickAwayHook from '@/hooks/clickAwayHook'


export default { 

  setup(){

    const state = ref(null)
    const innerClick = () => state.value = 'inner'
    const outClick = () => state.value = 'out'
    const element = clickAwayHook( outClick , 'click')
    
    
    return {

      state,
      innerClick,
      outClick,
      element,
      
    }
    

  }

}
</script>

```





### Params

| 名称        | 说明       | 默认值 |
| ----------- | ---------- | ------ |
| onClickAway | 事件回调   |        |
| eventName   | 监听事件名 |        |
| dom         | 挂在元素   |        |



### Result

| 名称    | 说明     | 类型 |
| ------- | -------- | ---- |
| element | 挂在元素 | ref  |



