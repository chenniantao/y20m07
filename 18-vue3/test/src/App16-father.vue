<template>
    <div>     
        <p>this is father</p> 
        <p>{{msg}}</p> 
        <p>{{person.name}}---{{person.age}}</p> 
        <button @click="update">在父组件中修改</button>
        <Son />   
    </div>
</template>

<script>
import { provide, reactive,ref } from 'vue'
import Son from './App16-son.vue'
export default {
    name:'App',
    components:{
        Son
    },
    setup(){
        const msg = ref('hello')
        const person = reactive({name:'Tom',age:18})
        provide('msg',msg)
        provide('person',person)
        const update = ()=>{
            msg.value = '你好'
            person.name = 'Amy'
            person.age = 99
        }
        return {msg,person,update}

    }
}
</script>