<template>
    <div>
        <p>{{obj2}}</p>
        <p>{{obj4}}</p>
        <button @click="update">update</button>
    </div>
</template>

<script>
import { reactive, toRef } from 'vue'
export default {
    name:'App',
    setup(){
        const obj1 = reactive({name:'Tom',age:88})
        const obj2 = toRef(obj1,'name')

        const obj3 = {name:'Tom',age:88}
        const obj4 = toRef(obj3,'name')

        const update = ()=>{
            // obj1.name = 'Amy'
            // console.log(obj2)
            // obj2.value = 'Amy'
            obj4.value = 'Amy'
            console.log(obj4)
        }

        return {obj2,obj4,update}
    }
}
</script>