<template>
    <div>     
        <p>this is son</p>  
        <p>{{msg}}</p> 
        <p>{{person.name}}---{{person.age}}</p>   
        <button @click="update">在子组件中修改</button>        
    </div>
</template>

<script>
import { inject } from 'vue'

export default {
    name:'Son',
    setup(){
        const msg = inject('msg')
        const person = inject('person')
        const update = ()=>{
            msg.value = '你好'
            person.name = 'Amy'
            person.age = 99
        }
        return {msg,person,update}
    }
}
</script>