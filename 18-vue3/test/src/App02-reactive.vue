<template>
  <div>
    <button @click="add">我被点击了{{count.value}}次</button>
  </div>
</template>

<script>
import {reactive} from 'vue'
export default {
  name: 'App',
  /*
  data(){
    return {
      count:0
    }
  },
  methods:{
    add(){
      this.count += 1
    }
  },
  */
  setup(){
    //reactive把对象或者数组包装成一个响应式的数据(Proxy的实例)
    let count = reactive({value:0})//返回了一个Proxy的实例
    const add = ()=>{
      count.value += 1
    }

    return {count,add}
  }

}
</script>
