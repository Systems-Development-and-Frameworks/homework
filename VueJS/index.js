import TodoList from './components/List.js'
import TodoItem from './components/ListItem.js'

var app = new Vue({
  el: '#app',
  data() {
    return {
      newTodoText: '',
      todos: [
        { id: '1', message: 'Einkaufen', },
        { id: '2', message: 'Aufräumen', },
        { id: '3', message: 'Putzen', }
      ],
      nextTodoId: 4
    }
  },

  methods: {
    addNewTodo: function(){
      this.todos.push({
        id: this.nextTodoId++,
        message: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})
