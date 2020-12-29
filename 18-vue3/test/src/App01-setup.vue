<template>
  <div>
    hello
  </div>
</template>

<script>

export default {
  name: 'App',
  beforeCreate(){
    console.log('beforeCreate....')
  },
  created(){
    console.log('created....')
  },
  data(){
    return {
      msg:'hello'
    }
  },
  setup(props,context){
    console.log(props,context)
    console.log('setup...')
    // console.log(this.msg)
  }
}
</script>
