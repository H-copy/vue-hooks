# useSetRef

> 创建react 风格的ref



### Example

```vue
import { useSetRef } from 'vx-hook'

const [ state, setState ] = useSetRef('init')

//更行state
setState('new info')

```





### Params

| 名称    | 说明   | 默认值 |
| ------- | ------ | ------ |
| initVal | 初始值 |        |



### Result

| 名称     | 说明     | 类型           |
| -------- | -------- | -------------- |
| state    | 当前值   | ref            |
| setState | 更新函数 | (any) =>  void |





