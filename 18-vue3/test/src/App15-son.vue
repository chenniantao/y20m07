<template>
    <div>     
        <p>this is son</p>      
    </div>
</template>

<script>
import { inject } from 'vue'

export default {
    name:'Son',
    setup(){
        const msg = inject('msg')
        const person = inject('person')
        console.log(msg)
        console.log(person)
    }
}
</script>