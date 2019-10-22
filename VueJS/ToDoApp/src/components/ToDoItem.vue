<template>
  <div>
    <input v-if="editModeOn" ref="editRef" v-model="todoEditTextInput" value="todo.text" @keydown.enter="save">
    <span v-else>
      {{todo.text}}
      <button  @click="edit()" >Edit</button>
    </span>
    <button>Remove</button>
  </div>
</template>

<script>
  export default {
    props:{
      todo: {
        text: String
      },
      editTodo: Function,
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
