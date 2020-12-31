<template>
    <div>     
        <p>hello</p>        
    </div>
</template>

<script>
import { ref,computed, watch,onMounted } from 'vue'

export default {
    name:'App',
    /*
    beforeCreate(){
        console.log('beforeCreate...')
    },
    created(){
        console.log('created...')
    },
    mounted(){
        console.log('mounted...')
    },
    */
    setup(){
        onMounted(()=>{
            console.log('onMounted');
        })
        console.log('setup..')
    }
}
</script>