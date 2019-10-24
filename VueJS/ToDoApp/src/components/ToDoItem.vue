<template>
  <b-list-group-item>
    <span v-if="editModeOn">
      <input ref="editRef" v-model="todoEditTextInput" value="todo.text" @keydown.enter="save">
      <b-button variant="outline-danger" @click="save()" >Save</b-button>
    </span>
    <span v-else>
      {{todo.text}}
      <b-button variant="outline-primary" @click="edit()" >Edit</b-button>
    </span>
    <b-button variant="outline-danger" @click="$emit('removeTodo', todo.id)">Remove</b-button>
  </b-list-group-item>
</template>

<script>
  import { BButton, BListGroupItem } from 'bootstrap-vue'

  export default {
    components: {
      'b-button' : BButton,
      'b-list-group-item' : BListGroupItem
    },
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
