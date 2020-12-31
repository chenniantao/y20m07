<template>
    <div>
        <TodoList />
    </div>
</template>

<script>
import TodoList from './pages/todolist/index.vue'
export default {
    name:'App',
    components:{
        TodoList
    }
}
</script>