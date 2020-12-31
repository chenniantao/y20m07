<template>
    <div>          
    </div>
</template>

<script>
import { provide } from 'vue';

export default {
    name:'App',
    setup(){
        const obj = {name:'Tom',age:18}
        const proxy = new Proxy(obj,{
            get(obj,key){
                console.log('get...');
                return obj[key]
            },
            set(obj,key,value){
                console.log('set...',obj,key,value);
                obj[key] = value
                return true //返回设置是否成功
            }
        })
        console.log(proxy)
        console.log(proxy.name);
        proxy.name = 'Amy'
        console.log(proxy);

    }
}
</script>