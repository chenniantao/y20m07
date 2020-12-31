<template>
  <div>
    <p>{{obj1.name}}</p>
    <p>{{obj3.name}}</p>
    <button @click="update">更新</button>
  </div>
</template>

<script>
import {reactive, ref,toRaw} from 'vue'
export default {
  name: 'App',
  setup(){
    const obj1 =  reactive({name:'Tom'})
    const obj3 = ref({name:'Tom'})
    const update = ()=>{
      /*
      const obj2 = toRaw(obj1)
      obj2.name = 'Amy'
      console.log(obj1)
      console.log(obj2)
      // obj1.name = 'Amy'
      */

      const obj4 = toRaw(obj3.value)
      obj4.name = 'Amy'
      console.log(obj3)
      console.log(obj4)
    }
    return {update,obj1,obj3}
  }

}
</script>
