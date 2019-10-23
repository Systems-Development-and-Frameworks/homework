<template>
  <div class="todoItem">
    <span v-if="editModeOn">
      <input ref="editRef" v-model="todoEditTextInput" value="todo.text" @keydown.enter="save">
      <button @click="save()" >Save</button>
    </span>
    <span v-else>
      {{todo.text}}
      <button @click="edit()" >Edit</button>
    </span>
    <button @click="$emit('removeTodo', todo.id)">Remove</button>
  </div>
</template>

<script>
  export default {
    props:{
      todo: {
        text: String
      },
      editTodo: Function,
      removeTodo: Function,
    },
    data() {
      return {
        editModeOn: false,
        todoEditTextInput: "",
      }
    },
    methods: {
      edit(){
        this.editModeOn = true;
        this.$nextTick(() => this.$refs.editRef.focus())
      },
      save(){
        this.editModeOn = false;
        this.$emit('editTodo', this.$props.todo.id, this.todoEditTextInput);
      }
    }
  }
</script>

<style lang="scss">
  .todoItem{
    margin: 20px;
  }
</style>
