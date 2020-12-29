<template>
    <div>
        <transition-group  class="list" tag='ul' name="fade" appear>
            <!-- <li 
                class="item"
                v-for="item in this.$store.state.list"
                :key="item.id"
                @click="delItem(item.id)"
            > -->
            <li 
                class="item"
                v-for="item in list"
                :key="item.id"
                @click="delItem(item.id)"   
             >                          
                {{item.task}}
                          
            </li>
        </transition-group>
        <!-- <p class="footer">共计{{this.$store.getters.total}}个项目</p>  -->
        <p class="footer">共计{{total}}--{{total2}}个项目</p> 
    </div>
</template>

<script>
import { mapState,mapGetters,mapMutations } from 'vuex'
import {DEL_ITEM} from '../../pages/todolist/store/types'
export default {
    name:'List',
    methods:{
        // ...mapMutations(['delItem']),
        // ...mapMutations([DEL_ITEM]),
        ...mapMutations({
            // delItem:'delItem'
            delItem:DEL_ITEM
        })
        /*
        delItem(id){
            // this.$store.commit('delItem',id)
            this.$store.commit(DEL_ITEM,id)
        }
        */
    },
    computed:{
        //...mapState(['list']), 
        ...mapState({
            list:state=>state.todolist.list
        }),
        // ...mapGetters(['total'])
        ...mapGetters({
            total:'total',
            total2:'home_total'
        })
    }
}
</script>

<style lang="less" scoped>
.item{
    width: 100%;
    line-height: 40px;
    padding: 5px 0;
    border-bottom: 1px dashed #ccc;
    cursor: pointer;
}
.item:hover{
    background-color:#eee
}
.footer{
    margin-top: 15px;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
</style>