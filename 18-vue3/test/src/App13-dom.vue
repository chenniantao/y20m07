<template>
    <div>     
        <p ref="box">hello</p>        
    </div>
</template>

<script>
import { ref,computed, watch,onMounted } from 'vue'

export default {
    name:'App',
    /*
    mounted(){
       console.log(this.$refs.box)
    },
    */
    setup(){
        const box = ref(null)
        onMounted(()=>{
            console.log(box.value)
        })
        return {box}
    }
}
</script>