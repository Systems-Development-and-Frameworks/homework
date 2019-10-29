import List from './components/List.js'
import ListItem from './components/ListItem.js'

Vue.component('todo-list', List);

new Vue({
  el: '#app',
  data: {
    idCounter: -1,
    items: [
      { id: '1', message: 'Foo', },
      { id: '2', message: 'Bar', },
      { id: '3', message: 'Baz', }
    ]
  },
  methods:{
    add: function(){
      this.items.push({id: this.getId(), message:''});
    },
    save: function(item){
        this.items[item.listIndex].message = item.message;
    },
    remove: function(index){
        this.items.splice(index, 1);
    },
    getId: function(){
      return this.idCounter++;
    }
  },
  created: function(){
    this.idCounter = this.idCounter === -1 ? this.items.length + 1 : this.idCounter;
  }
})
