# useToggle

> 切换器



### Example

```vue
<template>
  <div class="home">

    <div>
     <h1>
        {{ state }} 
     </h1>
     <button @click='onOpen'>
        open
    </button>
    <button @click='onClose'>
        close
    </button>
    </div>
    
  </div>
</template>

<script>

import { useToggle } from 'vx-hook'


export default { 

  setup(){

   	const { state, setLeft, setRight } = useToggle('open', 'close')
	
    return {
    	state,
        onOpen: setLeft,
        onclose: setRight
    }
    

  }

}
</script>

```





### Params

| 名称         | 说明                         | 默认值                   |
| ------------ | ---------------------------- | ------------------------ |
| defaultValue | 默认值                       |                          |
| reverseValue | 切换值                       | []                       |



### Result

| 名称              | 说明       | 类型          |
| ----------------- | ---------- | ------------- |
| state             | 当前值     |               |
| toggle            | 设置值     | (any) => void |
| setLeft           | 设置默认值 | () => void    |
| setRigth          | 设置却换值 | () => void    |





