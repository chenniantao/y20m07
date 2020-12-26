<!--1.模版-->
<template>
    <div class="home">
       {{msg}} home page
    </div>
</template>

<!--2.逻辑-->
<script>
//导出当前组件的配置
export default {
    name:'Home',
    data(){
        return {
            msg:'hello'
        }
    }
}
</script>

<!--3.样式-->
<!--scoped选项会为当前的组件所有的标签动态生成一个属性,然后用该属性做为属性选择器来保证里面的样式只作用于当前页面-->
<style lang="less" scoped>
    @priary-color:#f21;
    div{
        color: @priary-color;
    }
</style>