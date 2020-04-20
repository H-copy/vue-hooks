# useLocalStorageState

> localStorage 缓存 序列及反序列化



### Example

```vue
<template>
  <div class="home" ref='element'>

    <div>
        {{ useInfo.usename }}
    </div>
    
  </div>
</template>

<script>
import useLocalStorageState from 'vx-hook'

export default { 

  setup(){
 
    const [ useInfo, updateState ] = useLocalStorageState('useInfo', { usename: 'none' })
   
    return {
      useInfo
    }

  }

}
</script>

```





### Params

| 名称         | 说明                       | 默认值 |
| ------------ | -------------------------- | ------ |
| key          | 取值字段                   |        |
| defaultValue | 未设置值或值为空时的默认值 |        |



### Result

| 名称        | 说明         | 类型        |
| ----------- | ------------ | ----------- |
| state       | 本地缓存值   | any         |
| updateState | 缓存更新函数 | any => void |

