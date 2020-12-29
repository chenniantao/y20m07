<template>
    <div class="todolist">
        <Head></Head>
        <List></List>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import {LOAD_ITEM} from './store/types'
import Head from '../../components/head'
import List from '../../components/list'
export default {
    name:'TodoList',
    components:{
        Head,
        List
    },
    mounted(){
        //this.$store.dispatch('loadItem')
        // this.$store.dispatch(LOAD_ITEM)
        this.loadItem()
    },
    methods:{
        // ...mapActions(['loadItem'])
        // ...mapActions([LOAD_ITEM])
        ...mapActions({
            // loadItem:'loadItem'
            loadItem:LOAD_ITEM
        })
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