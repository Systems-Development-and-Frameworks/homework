<template>
    <div>
        <form @submit.prevent="addTodo">
            <input type="text" v-model="message" name="title" placeholder="Add Todo...">
            <input type="submit" value="Add" class="btn" :disabled="!message">
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddTodo",
        data() {
            return {
                message: ''
            }
        },
        methods: {
            addTodo() {
                const newTodo = {
                    message: this.message,
                    completed: false
                }
                this.$emit('addTodo', newTodo)
                this.message = ""
            }
        }
    }
</script>

<style scoped>
    form {
        display: flex;
    }

    input[type="text"] {
        flex: 10;
        padding: 5px;
    }

    input[type="submit"] {
        flex: 2;
    }
</style>