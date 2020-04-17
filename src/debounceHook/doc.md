# debounceHook

> 值设置防抖



### Example

```vue
<template>
	
	<h1>
        {{ state }}
    </h1>

	<button @click='setState(state + 1)'>
        inc
    </button>
	

</template>
import { ref } from '@vue/composition-api'
import { debounceHook } from 'left-vue-hook'

export default {
	
	setup(){
		const count = ref(0)
		const [ state, setState ] = debounceHook(() => count.value, 500)

		return [ state, setState ]

	}

}

```





### Params

| 名称    | 说明          | 默认值 |
| ------- | ------------- | ------ |
| watchFn | 防抖值函数    |        |
| wait    | 间隔时间 (ms) |        |



### Result

| 名称      | 说明       | 类型               |
| --------- | ---------- | ------------------ |
| state     | 当前值     | ref                |
| setState  | 值设置函数 | any => void        |

