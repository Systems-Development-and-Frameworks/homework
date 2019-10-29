// import List from './components/List.js'
// import ListItem from './components/ListItem.js'

Vue.component('list-item', {
  props: ['todo'],
  template: `
      <div v-if="edit">
        <li>
          <input id="input" v-model="newTodo">
          <button v-on:click="saveTodo">Save</button>
          <button v-on:click="cancelTodo">Cancel</button>
          <button v-on:click="$emit('deleteTodo')">Delete</button>
        </li>
      </div>
      <div v-else>
        <li>
        {{ todo.message }}
        <button v-on:click="editTodo">Edit</button>
        <button v-on:click="$emit('deleteTodo')">Delete</button>
        </li>
      </div>
  `,
  data: function(){
    return{
      edit: false,
      newTodo: ''
    }
  },
  methods: {
    editTodo: function(){
      this.edit = true
    },
    cancelTodo: function(){
      this.edit = false
    },
    saveTodo: function(){
      this.todo.message = document.getElementById("input").value;
      this.edit = false
    }
  }
})

Vue.component('list', {
  template: `
    <ol>
      <list-item
        v-for="item in todos"
        v-bind:todo="item"
        v-bind:key="item.id"
        v-on:deleteTodo="deleteTodo(id)">
      </list-item>
  </ol>
  `,
  data: function() {
    return{
      todos: [
        { id: '1', message: 'Clean', },
        { id: '2', message: 'Cook', },
        { id: '3', message: 'Study', },
      ]
    }
  },
  methods: {
    deleteTodo: function(id){
      this.todos.splice(id,1)
    }
  }
})

var app = new Vue({
  el: '#app'
});
