# useList

> 列表操作hook,  对useSet 的二次封装



### Example

```vue
<style>

*{
  margin: 0;
  padding: 0;
}

li{
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul{
  margin: auto;
  width: 400px;
}

li{
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fff;
}

li + li{
  margin-top: 10px;
}

button{
  padding: 6px 12px;
  background: #efefef;
  border-radius: 4px;
  border: 0;
  box-shadow: 0;
}

button.full{
  display: block;
  box-sizing: border-box;
  width: 100%;
  
}

.card{
  margin: 20px auto;
  padding: 10px 20px;
  width: 400px;
  border-radius: 6px;
  box-shadow: 0 -4px 16px 4px rgba(100, 100, 100, .1);
}

</style>
<template>
  <div id="app">

    <div class="card">
      {{ [...set.values()] }}
    </div>

    <ul>
      <li v-for="item of list" :key='item.key' > 
        {{ item.label }}
        <Button @click="remove(item)"> del </Button>
      </li>
      <li>
        <Button class="full" @click="add({ label:'xxxx', key: 4 })"> add </Button>
      </li>
    </ul>

    
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useList } from 'left-vue-hooks'

export default {
  name: 'App',
  components:{
    
  },
  setup(){
    const [ list, util, set ] = useList([
      {
        label: 'x',
        key: 1
      },
      {
        label: 'xx',
        key: 2
      },
      {
        label: 'xxx',
        key: 3
      }
    ])

    return {
      list,
      set,
      ...util,
    }
  }
}
</script>



```





### Params

| 名称    | 说明   | 默认值 |
| ------- | ------ | ------ |
| initVal | 初始值 | []     |



### Result

```js

const [ list, { add, remove, reset, setInit, update }, set ] = useList([...])

```



- list 包装后列表 ref
- util 工具函数
  - add 添加项   any => void
  - remove 移除项  any => void
  - reset  重置  () => void
  - setInit 修改初始值, 影响reset 的值  () => void
  - update 修改初始值并执行重置  array => void
- set 被映射 Set

