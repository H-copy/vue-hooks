#  left-vue-hooks

> [vx-hook](https://www.npmjs.com/package/vx-hook) 的  @vue/composition-api 同步版本。 是对umi及其他 react hook 的 vue实现



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
import { useThrottle } from 'left-vue-hooks'


export default {

  setup(){
    const state = reactive({name: 'jeck', age: 23})
    const add = () => state.age += 1
    const [ info ] = useThrottle(() => state.age, 1000) // 防抖hook

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

- [useSelections](./src/useSelections/README.md) 


#### SideEffect

- [useDebounceFn](./src/useDebounceFn/README.md)
- [useDebounce](./src/useDebounce/README.md)
- [useThrottleFn](./src/useThrottleFn/README.md)
- [useThrottle](./src/useThrottle/README.md)


#### State

- [useMap](./src/useMap/README.md)
- [useSet](./src/useSet/README.md)
- [useList](./src/useList/README.md)
- [useSetRef](./src/useSetRef/README.md)
- [useBool](./src/useBool/README.md)
- [useToggle](./src/useToggle/README.md)
- [usePrevious](./src/usePrevious/README.md)
- [useCounter](./src/useCounter/README.md)


#### Cache

- [useLocalStorageState](./src/useLocalStorageState/README.md)
- [useSessionStorageState](./src/useSessionStorageState/README.md)
- [useStrongeState](./src/useStrongeState/README.md)


#### Dom

- [useClickAway](./src/useClickAway/README.md)
- [useHover](./src/useHover/README.md)
- [useMouse](./src/useMouse/README.md)
- [useScroll](./src/useScroll/README.md)
- [useSize](./src/useSize/README.md)
- [useEleEvent](./src/useEvent/README.md)
- [useVmEvent](./src/useEvent/README.md)
