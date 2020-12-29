<template>
    <div class="todolist">
        <Head :addItem="addItem"></Head>
        <List :list="list" :delItem="delItem"></List>
    </div>
</template>

<script>
import axios from 'axios'
import Head from '../../components/head'
import List from '../../components/list'
export default {
    name:'TodoList',
    components:{
        Head,
        List
    },  
    data(){
        return {
            list:[],
        }
    },
    async mounted(){
        const result = await axios.get('http://127.0.0.1:3000')
        this.list = result.data
    },
    methods:{
        addItem(task){
            this.list.push({
                id:Date.now(),
                task:task
            })
        },
        delItem(id){
            const list = this.list.filter(item=>item.id != id)
            this.list = list
        }
    }
}
</script>

<style lang="less">
*{
    margin: 0;
    padding: 0;
}
li{
    list-style: none;
}
.todolist{
    width: 800px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
}
</style>