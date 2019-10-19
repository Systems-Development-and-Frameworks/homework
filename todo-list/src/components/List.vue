<template>
    <div style="width: 300px">
        <input v-model="newTodoName" placeholder="New Todo"
               @keyup.enter="addNewTodo"/>
        <button @click="addNewTodo" >Add</button>
        <ListItem v-for="todo in todos" v-model="todos" :key="todo.id"
                  :todo="todo"
                  @on-delete-clicked="onTodoDelete"
                  @on-name-changed="onNameChanged"
                  @on-done-changed="onDoneChanged" >
        </ListItem>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ListItem from "@/components/ListItem.vue";
    import {ToDo} from "@/todo";

    @Component({components: {ListItem}})
    export default class List extends Vue {
        private newTodoName: string = "";
        private todos: Array<ToDo> = [];

        addNewTodo() {
            let newTodo = new ToDo(this.newTodoName);
            this.todos.push(newTodo);
            this.newTodoName = "";

            console.log(this.todos);
        }

        onTodoDelete(id: number, newName: string) {
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].id == id) {
                    console.debug("deleting element with id: " + id);
                    this.todos.splice(i, 1);
                }
            }
        }

        onNameChanged(id: number, newName: string) {
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].id == id) {
                    console.debug("renaming element with id: " + id);
                    this.todos[i].name = newName;
                }
            }
        }

        onDoneChanged(id: number, newChangedValue: boolean) {
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].id == id) {
                    console.debug("changing done status for element with id: " + id);
                    this.todos[i].done = newChangedValue;
                }
            }
        }
    }
</script>

<style scoped>

</style>