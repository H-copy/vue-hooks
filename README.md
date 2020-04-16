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

- selectionsHook 



#### SideEffect

- debounceFnHook
- debounceHook
- throttleFnHook
- throttleHook

#### State

- mapHook
- setHook
- setRefHook
- [boolHook](./src/boolHook/doc.md)
- toggleHook
- previousHook
- counterHook

#### Cache

- localStorageStateHook
- sessionStorageStateHook
- strongeStateHook

#### Dom

- clickAwayHook
- hoverHook
- mouseHook
- scrollHook
- sizeHook
- eleEventHook
- vmEventHook