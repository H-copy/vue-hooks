#  left-vue-hooks

> 以[umi-hooks](https://github.com/umijs/hooks)为模板的 vue-hook 实现



## Install

```shell
yarn add  @vue/composition-api left-vue-hooks

or

npm i --save @vue/composition-api left-vue-hooks
```

> 当前vue 版本为2.x.x, 需要依赖 @vue/composition-api



## Usage

#### 引入 @vue/composition-api

```js
// main.js
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI); 

```



#### 组件内使用

```vue
<template>
  <div class="home">

    <div>
      <Card style='margin: 20% auto; width: 600px' title=''>
        <h2> {{ state.name }} </h2>
        <div> default:  {{ state.age }} </div>
        <div> throttle: {{ info }} </div>
        <Button @click='add' > add </Button>
      </Card>
    </div>
    
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import throttleHook from '@/hooks/throttleHook'


export default {

  setup(){
    const state = reactive({name: 'jeck', age: 23})
    const add = () => state.age += 1
    const [ info ] = throttleHook(() => state.age, 1000) // 防抖hook

   return {
     add,
     state,
     info,
   }

  }

}
</script>



```



## Hooks



#### UI

- [selectionsHook](./src/selectionsHook) 

#### SideEffect

- [debounceFnHook](./src/debounceFnHook)
- [debounceHook](./src/debounceHook/doc.md)
- [throttleFnHook](./src/throttleFnHook)
- [throttleHook](./src/throttleHook)

#### State

- [mapHook](./src/mapHook)
- [setHook](./src/setHook)
- [setRefHook](./src/setRefHook)
- [boolHook](./src/boolHook/doc.md)
- [toggleHook](./src/toggleHook)
- [previousHook](./src/previousHook)
- [counterHook](./src/counterHook/doc.md)

#### Cache

- [localStorageStateHook](./src/localStorageStateHook/doc.md)
- [sessionStorageStateHook](./src/sessionStorageStateHook)
- [strongeStateHook](./src/strongeStateHook)

#### Dom

- [clickAwayHook](./src/clickAwayHook)
- [hoverHook](./src/hoverHook/doc.md)
- [mouseHook](./src/mouseHook/doc.md)
- [scrollHook](./src/scrollHook)
- [sizeHook](./src/sizeHook)
- [eleEventHook](./src/eleEventHook)
- [vmEventHook](./src/vmEventHook)