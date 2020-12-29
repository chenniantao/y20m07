<template>
    <div class="head">
        <input type="text" v-model='task' />
        <button @click="handleAddItem">提交</button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {ADD_ITEM} from '../../store/types'
export default {
    name:'Head',
    data(){
        return {
            task:''
        }
    },
    methods:{
        // ...mapMutations(['addItem']),
        ...mapMutations([ADD_ITEM]),
        handleAddItem(){
            const payload = {
                id:Date.now(),
                task:this.task
            }
            //this.$store.commit('addItem',payload)
            //this.$store.commit(ADD_ITEM,payload)
            this.addItem(payload)
            this.task = ''
        }
    }
}
</script>

<style lang="less" scoped>
.head{
    display: flex;
    height: 40px;
    margin-bottom: 10px;
}
.head input{
    width: 700px;
    outline: none;
    padding: 10px;
    font-size: 28px;
}
.head button{
    width: 100px;
}
</style>