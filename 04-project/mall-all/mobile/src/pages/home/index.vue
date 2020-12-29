<!--1.模版-->
<template>
    <div class="home">
        <Search />
        <div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div 
                        class="swiper-slide"
                        v-for="ad in ads"
                        :key="ad._id"
                    >
                        <router-link :to="'/detail?'+ad.link">
                            <img :src="ad.image" :alt="ad.name">
                        </router-link>
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
</template>

<!--2.逻辑-->
<script>
import  Search  from 'components/search'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {GET_ADS} from './store/types'
import {mapActions,mapState} from 'vuex'
export default {
    name:'Home',
    components:{
        Search
    },
    mounted(){
        this[GET_ADS]()
        .then(()=>{
            new Swiper ('.swiper-container', {
                loop: true, // 循环模式选项
                autoplay:true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true
                }
            })         
        })
    },
    methods:{
        ...mapActions([GET_ADS])
    },
    computed:{
        ...mapState({
            ads:state=>state.home.ads
        })
    }
}
</script>

<!--3.样式-->
<style lang="less" scoped>
.home{
    .swiper-slide img{
        width: 100%;
        height: 160px;
    }
}
</style>