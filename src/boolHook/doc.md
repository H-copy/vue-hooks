# boolHook

> 布尔值管理hook



### Uesage

```vue
<template>
		
	<h1 v-if='state'>
        visibal
    </h1>

	<button @click='toggle'>
        toggle
    </button>
	
</template>

import { boolHook } from 'left-vue-hook'

export default {
	
	setup(){
		const { state, toggle } = boolHook(true)
		
		return { state, toggle }
	}

}


```





### Params

| 名称       | 说明     | 默认值 |
| ---------- | -------- | ------ |
| initStatus | 初始状态 | false  |



###  Result

| 名称     | 说明            |                |
| -------- | --------------- | -------------- |
| status   | 当前状态        | bool           |
| setTrue  | 状态设置为true  | () => void     |
| setFalse | 状态设置为false | () => void     |
| toggle   | 状态切换        | (bool) => void |


