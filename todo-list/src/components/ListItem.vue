<template>
    <div class="row">
        <div class="column">
            <input type="checkbox" name="done" v-model="todo.done">
        </div>
        <div class="column">
            <input v-if="editMode" v-model="tempName"
                   @keyup.enter="saveNewName" @keydown.esc="cancelNewName" />
            <p v-else :class="{ 'completed-todo-item': todo.done}" >{{todo.name}}</p>
        </div>
        <div v-if="editMode" class="column">
            <button @click="saveNewName">Save</button>
            <button @click="cancelNewName">Cancel</button>
        </div>
        <div v-else class="column">
            <button @click="startEditMode">Edit</button>
            <button @click="onDeleteClicked">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import {ToDo} from "@/todo";

    @Component
    export default class ListItem extends Vue {
        @Prop() private todo!: ToDo;
        @Prop() private id!: number;

        private editMode: boolean = false;
        private tempName: string = "";

        startEditMode() {
            this.tempName = this.todo.name;
            this.editMode = true;
        }

        saveNewName() {
            if (!this.editMode) {
                return;
            }

            this.$emit("on-name-changed", this.todo.id, this.tempName);
            this.editMode = false;
        }

        cancelNewName() {
            this.tempName = "";
            this.editMode = false;
        }

        onDeleteClicked() {
            this.$emit("on-delete-clicked", this.todo.id);
        }

        onDoneChanged() {
            this.$emit("on-done-changed", this.todo.id);
        }

    }
</script>

<style scoped>
    .row {
        display: grid;
        grid-template-columns: min-content auto min-content min-content;
        grid-template-rows: 30px;
    }

    .column {
        place-self: center;
        align-self: center;
        display: flex;
    }

    .completed-todo-item {
        text-decoration: line-through;
    }
</style>