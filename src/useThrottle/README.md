# useThrottle

> 将值设置函数包装为节流函数



### Example

```vue
<template>
  <div class="home">

    <div>
      <Card style='margin: 20% auto; width: 600px' title=''>
        <h2> {{ state.name }} </h2>
        <div> default:  {{ state.age }} </div>
        <div> throttle: {{ info }} </div>
        <Button @click='add' > add </Button>
      </Card>
    </div>
    
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useThrottle } from 'vx-hook'


export default {

  setup(){
    const state = reactive({name: 'jeck', age: 23})
    const add = () => state.age += 1
    const [ info ] = useThrottle(() => state.age, 1000)

   return {
     add,
     state,
     info,
   }

  }

}
</script>

```





### Params

| 名称    | 说明             | 默认值 |
| ------- | ---------------- | ------ |
| watchFn | 返回节流值得函数 |        |
| wait    | 间隔时间 ms      |        |



### Result

| 名称     | 说明       | 类型          |
| -------- | ---------- | ------------- |
| state    | 当前       | ref           |
| setState | 值设置函数 | (any) => void |





