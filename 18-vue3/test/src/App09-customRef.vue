<template>
    <div>     
        <button @click="add">我别点击了{{count}}次</button>
    </div>
</template>

<script>
import { ref,customRef } from 'vue'

const myRef = (value,delay=200)=>{
    let timer
    return customRef((track, trigger)=>{
        return {
            get(){
                track()
                return value
            },
            set(newValue){
                clearTimeout(timer)
                timer = setTimeout(()=>{
                    value = newValue
                    trigger()
                },delay)
            }
        }
    })
}



export default {
    name:'App',
    setup(){
        // const count = ref(0)
        const count = myRef(0)

        const add = ()=>{
            count.value += 1
        }

        return {count,add}
    }
}
</script>