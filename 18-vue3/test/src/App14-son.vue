<template>
    <div>     
        <p>this is son</p>  
        <p>{{sonCount}}</p>      
    </div>
</template>

<script>
import { ref,computed, watch,onMounted } from 'vue'

export default {
    name:'Son',
    props:['count'],
    setup(props){////父组件中的参数
        const sonCount = props.count * 2
        return {sonCount}
    }
}
</script>