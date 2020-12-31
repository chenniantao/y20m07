<template>
  <div>
      <p>{{state.val}}</p>
      <p>{{state.father.val}}</p>
      <p>{{state.father.son.val}}</p>
    <button @click="update">更新</button>
  </div>
</template>

<script>
import {ref} from 'vue'
import {shallowRef,triggerRef} from 'vue'
export default {
  name: 'App',
  setup(){
    //let state = ref({...}) let state = reactive(value:{...})
    // let state = ref({
    let state = shallowRef({//shallowRef只代理第一层的数据
        val:'l1',
        father:{
            val:'l2',
            son:{
                val:'l3'
            }
        }
    })
    console.log(state)//ref类型的实例
    console.log(state.value)//Proxy的实例 如果是shallowRef则是原始对象
    console.log(state.value.father)//Proxy的实例 如果是shallowRef则是原始对象
    console.log(state.value.father.son)//Proxy的实例 如果是shallowRef则是原始对象

    const update = ()=>{
        /*
        state.value.val = 1
        state.value.father.val = 2
        state.value.father.son.val = 3
        */
        state.value = {
            val:'1',
            father:{
                val:'2',
                son:{
                    val:'3'
                }
            }
        }
        triggerRef(state)
    }

    return {state,update}
  }

}
</script>
