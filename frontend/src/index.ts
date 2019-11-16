import Vue from 'vue';

import './components/AddButton';
import './components/List';
import './components/ListItem';

export interface TodoItem {
  id: string;
  message: string;
}

const todos: TodoItem[] = [{ id: '1', message: 'Foo' }, { id: '2', message: 'Bar' }, { id: '3', message: 'Baz' }];

// tslint:disable-next-line
new Vue({
  el: '#app',
  data: {
    todos,
  },
  template: `<div>
                <h1>ToDo List</h1>
                <list :todos="todos"></list>
             </div>`,
});
