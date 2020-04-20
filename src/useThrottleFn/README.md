# useThrottleFn

> 包装节流函数



### Example

```vue
<template>
  <div class="home">

    <div>
      <Card style='margin: 20% auto; width: 600px' title='form'>
        <h4> {{state}} </h4>
        <Button @click="run"> add </Button>
      </Card>
    </div>
    
  </div>
</template>

<script>
import { useSetRef, useThrottleFn }  from 'vx-hook' 

export default {

  setup(){
    const [state, setState] = setRefHook(0)
    const [ run, cancel ] = useThrottleFn( () => setState(state.value + 1) , 500 )

   return {
     state,
     run,
     cancel
   }

  }

}
</script>

```





### Params

| 名称         | 说明        | 默认值 |
| ------------ | ----------- | ------ |
| fn           | 被包装函数  |        |
| wait         | 间隔时间 ms |        |



### Result

| 名称   | 说明       | 类型       |
| ------ | ---------- | ---------- |
| run    | 节流函数   | ref        |
| cancel | 取消值设置 | () => void |





