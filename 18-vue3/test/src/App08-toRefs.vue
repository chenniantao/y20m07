<template>
    <div>
        <p>{{name}}</p>
        <p>{{age}}</p>
        <p>{{name1}}</p>
        <p>{{age1}}</p>        
        <button @click="update">update</button>
    </div>
</template>

<script>
import { reactive, toRef, toRefs } from 'vue'
export default {
    name:'App',
    setup(){
        const obj1 = reactive({name:'Tom',age:88})
        const obj2 = toRefs(obj1)


        const obj3 = {name1:'Tom',age1:88}
        const obj4 = toRefs(obj3)

        const update = ()=>{
            /*
           obj2.name.value = 'Amy'
           obj2.age.value = 99
           */
        obj4.name1.value = 'Amy'
           obj4.age1.value = 99
          console.log(obj4)
        }

        return {...obj2,...obj4,update}
    }
}
</script>