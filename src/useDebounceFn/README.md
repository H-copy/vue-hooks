# useDebounceFn

> 函数防抖



### Example

```vue
<template>
  <div class="home">

    <div>
      <Card style='margin: 20% auto; width: 600px' title='form'>
        <h4> {{state}} </h4>
        <Input  :value='state' @input='run'  />
      </Card>
    </div>
    
  </div>
</template>

<script>
import { useDebounceFn, useSetRef } from 'vue'

export default {

  setup(){
    const [ state, setState ] = useSetRef('')
    const { run, cancel } = useDebounceFn( setState, 500 )

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

| 名称   | 说明       | 默认值 |
| ------ | ---------- | ------ |
| fn     | 被处理函数 |        |
| wait | 间隔时间   |        |



### Result

| 名称   | 说明     | 类型          |
| ------ | -------- | ------------- |
| run    | 执行函数 | (any) => void |
| cancel | 取消执行 | () => void    |



