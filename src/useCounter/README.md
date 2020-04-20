# useCounter

> 计数器hook



### Example

```vue

<template>
	
	<h1>
        {{ current }}
    </h1>

	<button @click='() => inc(2)'>
        inc
    </button>
	
	<button @click='() => dec(2)'>
        dec
    </button>
		
	<button @click='reset'>
        reset
    </button>
	
	<button @click='() => set(1)'>
        setOne
    </button>

</template>

import { useCounter } from 'vx-hook'

export default {
	
	setup(){
		const [ current, { inc, dec, reset, set } ] = useCounter(0， { max: 10, min: -10 })		
		
		return { current, inc, dec, reset, set }
	}

}

```





### Params

| 名称    | 说明   | 默认值        |
| ------- | ------ | ------------- |
| initVal | 初始值 |               |
| options | 配置项 | { max,  min } |
| --> max | 值上限 |               |
| --> min | 值下限 |               |



### Result

| 名称      | 说明     | 类型                     |
| --------- | -------- | ------------------------ |
| current   | 当前值   | number                   |
| utils     | 工具函数 | { inc, dec, reset, set } |
| --> inc   | 加函数   | （delta=1）=> void       |
| --> dec   | 减函数   | （delta=1）=> void       |
| --> reset | 重置     | （）=> void              |
| --> set   | 设置值   | （number）=> void        |

