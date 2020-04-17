# sessionStorageStateHook

> sessionStorage 缓存序列化



### Example

```vue
import { sessionStorageStateHook } from 'left-vue-hooks'

const [ state, updateState ] = sessionStorageStateHook(id, 'xxx')
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





