<template>
  <div>
      <p>{{state.val}}</p>
      <p>{{state.father.val}}</p>
      <p>{{state.father.son.val}}</p>
    <button @click="update">更新</button>
  </div>
</template>

<script>
import {reactive} from 'vue'
import {shallowReactive} from 'vue'
export default {
  name: 'App',
  setup(){
    // let state = reactive({
    let state = shallowReactive({//shallowReactive只代理第一层的数据
        val:'l1',
        father:{
            val:'l2',
            son:{
                val:'l3'
            }
        }
    })
    console.log(state)//Proxy
    console.log(state.father)//Proxy 如果是shallowReactive则是原始对象
    console.log(state.father.son)//Proxy 如果是shallowReactive则是原始对象

    const update = ()=>{
        state.val = 1
        state.father.val = 2
        state.father.son.val = 3
    }

    return {state,update}
  }

}
</script>
