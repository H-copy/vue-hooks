# useEvent

> 时间监听hook



### Example

```vue
<template>
  <div class="home">

    <div>
      <div style='margin: 20% auto; width: 600px' title=''>

        <Client title='client one' v-bind='clientOne' />
        <Client title='client two' v-bind='clientTwo' />
      
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref } from 'vue'
import { useVmEvent, useEleEvent } from 'vx-hook'


const Client = {
  
  props: [ 'title', 'receive', 'send' ],

  setup(props){

    const msg = ref('')
    props.receive(data => msg.value = data)
    return {
      msg,
    }

  },

 
  render(){
    const { title, msg, send } = this

    return (
      <Card style='margin-bottom: 40px' title={ title }>
        <p> { msg } </p>
        <Input onInput={send} />
      </Card>
    )
    
  }
  
}


export default { 

  components:{
    Client,
  },
  
  setup(_, context){

    const clientOneEventTag = 'toOne' 
    const clientTwoEventTag = 'toTwo'
    const vm = context.root

    const clientOne = ref({
      receive: handler => useVmEvent(clientOneEventTag, handler, vm),
      send: msg => vm.$emit(clientTwoEventTag, msg)
    })

    const clientTwo = ref({
      receive: handler => useVmEvent( clientTwoEventTag, handler, vm),
      send: msg => vm.$emit(clientOneEventTag, msg)
    })
    

    return {
      clientOne,
      clientTwo
    }
    

  }

}
</script>

```





## useVmEvent

> 通过 vue.$on 将事件绑定到 vue 实例上



### Params

| 名称    | 说明        | 默认值 |
| ------- | ----------- | ------ |
| name    | 时间名称    |        |
| handler | 事件回调    |        |
| vm      | 当前vue实例 |        |
| option  | 事件配置    |        |



### Result

| 名称    | 说明         | 类型       |
| ------- | ------------ | ---------- |
| remove  | 事件移除函数 | () => void |





## useEleEvent

> 通过dom api 将事件绑定到dom元素上




### Params

| 名称    | 说明     | 默认值 |
| ------- | -------- | ------ |
| name    | 时间名称 |        |
| handler | 事件回调 |        |
| target  | dom 元素 |        |
| option  | 事件配置 |        |



### Result

| 名称    | 说明         | 类型       |
| ------- | ------------ | ---------- |
| remove  | 事件移除函数 | () => void |
| element | 绑定元素 ref | ref        |
| reBind  | 重绑定       | () => void |


