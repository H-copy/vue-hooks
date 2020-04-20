# usePrevious

> 缓存上次值



### Example

```vue
<template>
  <div class="home">

    <div>
		<h1>
        	old: {{ prevRef }}    
    	</h1>
        <h1>
        	new: {{ curRef }}    
    	</h1>
        <input v-model='curRef' />
    </div>
    
  </div>
</template>

<script>
import { usePrevious } from 'vx-hook'

export default {

  setup(){
      
   const [ curRef, prevRef ] = usePrevious('init')
      
   return {
		curRef,
        prevRef
   }

  }

}
</script>

```





### Params

| 名称    | 说明                             | 默认值 |
| ------- | -------------------------------- | ------ |
| initVal | 初始值                           |        |
| compare | 比较函数, 返回值为true时更新缓存 |        |



### Result

| 名称    | 说明   | 类型 |
| ------- | ------ | ---- |
| curRef  | 当前值 | ref  |
| prevRef | 缓存值 | ref  |



