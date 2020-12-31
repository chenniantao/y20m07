<template>
    <div>     
        <p>this is father</p>  
        <p>{{count}}</p>   
        <Son :count="count" />   
    </div>
</template>

<script>
import { ref,computed, watch,onMounted } from 'vue'
import Son from './App14-son.vue'
export default {
    name:'App',
    components:{
        Son
    },
    setup(){
        const count = ref(1)
        return {count}
    }
}
</script>