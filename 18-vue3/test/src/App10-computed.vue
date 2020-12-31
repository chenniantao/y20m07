<template>
    <div>     
        <p>{{doubleCount}}</p>
        <button @click="add">我别点击了{{count}}次</button>
        <div>
            <input type="text" v-model="fullName">    
            <p>firstName:{{firstName}}</p>
            <p>lastName:{{lastName}}</p>
            <p>fullName:{{fullName}}</p>
        </div>
        
    </div>
</template>

<script>
import { ref,computed } from 'vue'

export default {
    name:'App',
    setup(){
        const count = ref(0)

        const add = ()=>{
            count.value += 1
        }

        const doubleCount = computed(()=>{
            return count.value * 2
        })

        console.log(doubleCount)


        const firstName = ref('Chen')
        const lastName = ref('Tom')

        const fullName = computed({
            get(){
                return firstName.value +' '+ lastName.value
            },
            set(val){
                const names = val.split(' ')
                firstName.value = names[0]
                lastName.value = names.slice(1).join(' ')
            }
        })

        return {count,add,doubleCount,firstName,lastName,fullName}
    }
}
</script>