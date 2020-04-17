# selectionsHook

> 选择器



### Example

```vue
<template>
  <div class="home">

    <div>
      <div style='margin: 20% auto; width: 600px' title=''>

        <ul style='margin-bottom: 20px'>
          <li> all selected: {{ statusIcon(allSelected) }} </li>
          <li> none selected: {{ statusIcon(noneSelected) }} </li>
          <li> partially selected: {{ statusIcon(partiallySelected) }} </li>
        </ul>
        
        <CheckboxGroup style='margin-bottom: 20px' v-model="selected" >
          <Checkbox v-for='item of list' :key='item' :label='item'>
          </Checkbox>
        </CheckboxGroup> 
        
        <ButtonGroup >
          <Button @click='toggleAll' > toggleAll </Button>
          <Button @click='selectAll' > selectAll </Button>
          <Button @click='unSelectAll' > unSelectAll </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button @click='select(list[0])' > select {{ list[0] }} </Button>
          <Button @click='unSelect(list[0])' > unSelect {{ list[0] }} </Button>
          <Button @click='toggle(list[0])' > toggle {{ list[0] }} </Button>
          <Button @click='() => selected = [ list[1] ] ' > set selected </Button>
        </ButtonGroup>
        
      
      </div>
    </div>
    
  </div>
</template>

<script>
// import { ref } from '@vue/composition-api'
import selectionsHook from '@/hooks/selectionsHook'


export default { 

  setup(){

    const list = [
      'coco',
      'jeck',
      'rogen'
    ]
    
    const statusIcon = status => status ? '✅'  : '❎'


    return {
      ...selectionsHook(list, [], { statusVisibal:true }),
      list,
      statusIcon,
    }
    

  }

}
</script>

```





### Params

| 名称            | 说明                         | 默认值                   |
| --------------- | ---------------------------- | ------------------------ |
| items           | 选项集合                     |                          |
| defaultSelected | 默认已选集合                 | []                       |
| options         | 设置项, 是否返回集合控制函数 | { statusVisibal: false } |



### Result

| 名称              | 说明             | 类型          |
| ----------------- | ---------------- | ------------- |
| selected          | 已选集合         | Array         |
| isSelected        | 校验元素是否已选 | (any) => bool |
| select            | 选择元素         | (any) => void |
| unSelect          | 移除已选         | (any) => void |
| toggle            | 选择切换         | (any) => void |
| selectAll         | 全选             | () => void    |
| unSelectAll       | 全反选           | () => void    |
| noneSelected      | 是否全未选       | () => bool    |
| allSelected       | 是否全选         | () => bool    |
| partiallySelected | 部分选择         | () => bool    |
| toggleAll         | 全选切换         | () => void    |





