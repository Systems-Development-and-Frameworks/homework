import List from './components/List.js'
import ListItem from './components/ListItem.js'

new Vue({
  el: '#app',
  data: {
    todos: [
      { id: '1', message: 'Foo', },
      { id: '2', message: 'Bar', },
      { id: '3', message: 'Baz', }
    ]
  }
})
