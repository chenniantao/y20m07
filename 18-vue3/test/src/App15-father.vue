<template>
    <div>     
        <p>this is father</p>  
        <Son />   
    </div>
</template>

<script>
import { provide } from 'vue'
import Son from './App15-son.vue'
export default {
    name:'App',
    components:{
        Son
    },
    setup(){
        provide('msg','hello')
        provide('person',{name:'Tom',age:18})
    }
}
</script>