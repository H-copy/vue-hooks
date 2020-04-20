# useSize

> 监听尺寸变化



### Example

```vue
<template>
  <div class="home" ref='element'>

    <div>
      <Card style='margin: 20% auto; width: 600px' title=''>

        <h4>
          width: {{ size.width }}
          /
          height: {{ size.height }}
        </h4>
    
      </Card>
    </div>
    
  </div>
</template>

<script>
import { useSize } from 'vx-hook'

export default { 

  setup(){
    const [ size, element ] = useSize()
   
   
    return {
      element,
      size
    }
    

  }

}
</script>


```





### Params

| 名称    | 说明         | 默认值 |
| ------- | ------------ | ------ |
| initDom | 事件绑定元素 |        |



### Result

| 名称    | 说明     | 类型               |
| ------- | -------- | ------------------ |
| state   | 当前值   | { width,  height } |
| element | 绑定元素 | ref                |





