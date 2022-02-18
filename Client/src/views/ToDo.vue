<template>
    <div class="container">
        <h2>TodoList</h2>

        <label for="" >Item:</label>
        <input type="text" v-model="toDoItem">
        <button>Add</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            toDoItem: null
        }
    }
}
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
}
</style>