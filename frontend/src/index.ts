import { TodoItem } from 'core';
import Vue from 'vue';

import './components/AddButton';
import './components/List';
import './components/ListItem';

const todos: TodoItem[] = [
  { id: '1', description: 'Foo', isDone: false, createdAt: new Date(new Date().getTime() - 600000).toISOString() },
  { id: '2', description: 'Bar', isDone: false, createdAt: new Date().toISOString() },
  { id: '3', description: 'Baz', isDone: true, createdAt: new Date(new Date().getTime() - 300000).toISOString() },
];

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
