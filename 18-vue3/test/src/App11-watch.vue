<template>
    <div>     
        <p>{{count}}</p>
        <p>{{msg}}</p>
        <button @click="update">更新</button>
        
    </div>
</template>

<script>
import { ref,computed, watch } from 'vue'

export default {
    name:'App',
    setup(){
        const count = ref(0)
        const msg = ref('hello')

        const update = ()=>{
            count.value += 1
            msg.value = '你好'
        }
        /*
        watch(count,(value,oldValue)=>{
            console.log('count has been changed...');
            console.log('value,oldValue',value,oldValue)
        })
        watch(msg,(value,oldValue)=>{
            console.log('msg has been changed...');
            console.log('value,oldValue',value,oldValue)
        })
        */
        watch([count,msg],(value,oldValue)=>{
            console.log('data has been changed...');
            console.log('value,oldValue',value,oldValue)
        })

        return {count,update,msg}
    }
}
</script>