import List from './components/List.js'
import ListItem from './components/ListItem.js'

new Vue({
  el: '#app',
  data: {
    newTodoText: '',
    counter:0,
    editmode:[
      false,false,false
      ],
    tempValues:[
      { id: '0', message: null, },
      { id: '1', message: null, },
      { id: '2', message: null, }
    ],
    todos: [
      { id: '0', message: 'Foo', },
      { id: '1', message: 'Bar', },
      { id: '2', message: 'Baz', }
    ] // feel free to put the `todos` array where you find it most suitable
    ,nextTodoId: 3
  },
  methods:{
    enableEditing: function(index){
      this.tempValues[index].message= this.todos[index].message
      this.$set(this.editmode, index, true)
    },
    disableEditing: function(index){
      this.tempValues[index].message=null
      this.$set(this.editmode, index, false)
    },
    saveEdit: function(index){
      this.todos[index].message=this.tempValues[index].message
      this.disableEditing(index);
    },
    removeTodo: function (index) {
     this.todos=this.todos.filter(function(item) {
        return item.id != index;
      });
    },
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        message: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})
