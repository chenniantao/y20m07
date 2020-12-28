<template>
  <div id="app">
    <div id="page">
      <router-view></router-view>
    </div>
    <TabBar />
  </div>
</template>

<script>
import TabBar from 'components/tab-bar'
export default {
  components:{
    TabBar
  }
}
</script>

<style lang="less">

</style>
