# useSessionStorageState

> sessionStorage 缓存序列化



### Example

```vue
import { useSessionStorageState } from 'vx-hook'

const [ state, updateState ] = useSessionStorageState(id, 'xxx')
```





### Params

| 名称         | 说明   | 默认值 |
| ------------ | ------ | ------ |
| key          | 缓存名 |        |
| defaultValue | 默认值 | []     |



### Result

| 名称        | 说明   | 类型          |
| ----------- | ------ | ------------- |
| state       | 当前值 | ref           |
| updateState | 更新值 | (any) => void |





