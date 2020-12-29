<template>
    <div class="todolist">
        <div class="head">
            <input type="text" v-model='task' />
            <button @click="addItem">提交</button>
        </div>
        <transition-group  class="list" tag='ul' name="fade" appear>
            <li 
                class="item"
                v-for="item in list"
                :key="item.id"
                @click="delItem(item.id)"
            >
                {{item.task}}
            </li>
        </transition-group>
        <p class="footer">共计{{total}}个项目</p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'TodoList',
    data(){
        return {
            list:[],
            task:''
        }
    },
    async mounted(){
        const result = await axios.get('http://127.0.0.1:3000')
        this.list = result.data
    },
    methods:{
        addItem(){
            this.list.push({
                id:Date.now(),
                task:this.task
            })
            this.task = '' 
        },
        delItem(id){
            const list = this.list.filter(item=>item.id != id)
            this.list = list
        }
    },
    computed:{
        total(){
            return this.list.length
        }
    }
}
</script>

<style lang="less" scoped>
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
.todolist .head{
    display: flex;
    height: 40px;
    margin-bottom: 10px;
}
.todolist .head input{
    width: 700px;
    outline: none;
    padding: 10px;
    font-size: 28px;
}
.todolist .head button{
    width: 100px;
}
.todolist .item{
    width: 100%;
    line-height: 40px;
    padding: 5px 0;
    border-bottom: 1px dashed #ccc;
    cursor: pointer;
}
.todolist .item:hover{
    background-color:#eee
}
.todolist .footer{
    margin-top: 15px;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
</style>