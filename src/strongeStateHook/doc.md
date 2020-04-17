# strongeStateHook

> 通用缓存序列化 



### Example

```vue
<template>
  <div class="home">

    <div>
      <Card style='margin: 20% auto; width: 600px' title=''>

        <p> {{ userInfo }} </p>
        <Input v-model="userName" />
        <Button @click='updateUserName' > update </Button>
        <Button @click='clearUserInfo' > clear </Button>
        <Button @click='addPrefix' > addPrefix </Button>
   
      </Card>
    </div>
    
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import strongeStateHook from '@/hooks/strongeStateHook'


export default { 

  setup(){

    const [ userInfo, updateState ] = strongeStateHook(localStorage, 'USER_INFO', { name: 'coco' })
    const userName = ref('')
    const updateUserName = () => updateState({ ...userInfo.value, name: userName.value })
    const clearUserInfo = () => updateState()
    const addPrefix = () => updateState(userInfo => { return { name: `super-${userInfo.name}` } })

    return {
      userName,
      userInfo,
      updateUserName,
      clearUserInfo,
      addPrefix
    }
    

  }

}
</script>

```





### Params

| 名称         | 说明     | 默认值 |
| ------------ | -------- | ------ |
| storage      | 缓存接口 |        |
| key          | 缓存名   |        |
| defaultValue | 默认值   | []     |



### Result

| 名称        | 说明   | 类型          |
| ----------- | ------ | ------------- |
| state       | 当前值 | ref           |
| updateState | 更新值 | (any) => void |





