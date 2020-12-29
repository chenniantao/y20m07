<template>
  <div>
    <button @click="add">我被点击了{{count}}次</button>
  </div>
</template>

<script>
import {ref} from 'vue'
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
    //ref把普通数据包装成ref类型的响应式的数据
    //可以理解为  count = ref(0) 等价 count = reactive({value:0})
    let count = ref(0)//返回ref类型的响应式的数据
    const add = ()=>{
        count.value += 1
    }

    return {count,add}
  }

}
</script>
