import List from './components/List.js'
import ListItem from './components/ListItem.js'

new Vue({
  el: '#app',
  components: {
    List,
    ListItem
  },
  data: {
    todos:  [
      { id: '1', message: 'Foo', },
      { id: '2', message: 'Bar', },
      { id: '3', message: 'Baz', }
    ]
  },
  methods: {
    updateTodo: function(passedTodo) {
        // console.log("(Großeltern) \nIch erhielt die todo [" + passedTodo.id + " | " + passedTodo.message + "] via $emit ")
        // console.log("(Großeltern) \nFinde den entsprechenden index passend zur ID(" + passedTodo.id +") in todos[]")
        let index = this.todos.findIndex( todo => todo.id == passedTodo.id)
        // console.log("(Großeltern) \nUpdate das entsprechend gefundene Objekt in todos[]")
        this.todos[index] = passedTodo   
        // console.log("(Großeltern)\nTodo wurde geupdated: [" + this.todos[index].id + " | " + this.todos[index].message +"]")     
      },  
    deleteTodo: function(id) {
        // console.log("(Großeltern) Finde den entsprechenden index passend zur ID(" + id +") in todos[]")'
        let index = this.todos.findIndex( todo => todo.id == id)
        this.$delete(this.todos, index)
        // console.log("(Großeltern)\nIch habe das Todo mit der folgenden ID gelöscht: " + id)
    }
}
})
