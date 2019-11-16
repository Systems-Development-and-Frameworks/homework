import { shallowMount, Wrapper } from '@vue/test-utils';
import { TodoItem } from 'core';
import { Vue } from 'vue/types/vue';

import AddButton from '../src/components/AddButton';
import List from '../src/components/List';
import ListItem from '../src/components/ListItem';

const todoItems: TodoItem[] = [
  { id: '1', description: 'test', isDone: false, createdAt: new Date(new Date().getTime() - 600000).toISOString() },
  { id: '2', description: 'second', isDone: true, createdAt: new Date().toISOString() },
];

describe('List', () => {
  let wrapper: Wrapper<Vue & { todos: TodoItem[] }>;

  describe('given a `todos` that is not empty', () => {
    beforeAll(() => {
      wrapper = shallowMount(List, {
        propsData: {
          todos: todoItems.slice(),
        },
        components: {
          AddButton,
          ListItem,
        },
      });
    });

    test('renders ListItems', () => {
      expect(wrapper.contains(ListItem)).toBeTruthy();
    });

    describe('events', () => {
      describe('`AddButton`', () => {
        let addButton: Wrapper<Vue>;
        beforeAll(() => {
          addButton = wrapper.find(AddButton);
        });

        test('appends a new todo to the list', () => {
          addButton.vm.$emit('submit', 'New Todo');
          expect(wrapper.vm.todos[wrapper.vm.todos.length - 1].description).toBe('New Todo');
        });
      });

      describe('can handle ListItem events', () => {
        let listItem: Wrapper<Vue>;
        beforeAll(() => {
          listItem = wrapper.find(ListItem);
        });

        test('can handle `input`', () => {
          listItem.vm.$emit('input', { id: '1', description: 'edited' });
          expect(wrapper.vm.todos[0].description).toBe('edited');
        });

        test('can handle `delete`', () => {
          expect(wrapper.vm.todos).toHaveLength(3);
          listItem.vm.$emit('delete', { id: '2', description: 'second' });
          expect(
            wrapper.vm.todos.some((item: TodoItem) => {
              return item.description === 'second';
            }),
          ).toBeFalsy();
          expect(wrapper.vm.todos).toHaveLength(2);
        });
      });
    });
  });

  describe('given a `todos` that is empty', () => {
    beforeAll(() => {
      wrapper = shallowMount(List, {
        propsData: {
          todos: [],
        },
        components: {
          AddButton,
          ListItem,
        },
      });
    });

    test('does not render ListItems', () => {
      expect(wrapper.contains(ListItem)).toBeFalsy();
    });
  });

  describe('does not render list-empty info', () => {
    test('except `todos` is empty', () => {
      wrapper = shallowMount(List, {
        propsData: {
          todos: todoItems.slice(),
        },
        components: {
          AddButton,
          ListItem,
        },
      });
      const wrapperEmpty = shallowMount(List, {
        propsData: {
          todos: [],
        },
        components: {
          AddButton,
          ListItem,
        },
      });

      expect(wrapper.html()).not.toContain('<p>Currently, there are no items.</p>');
      expect(wrapperEmpty.html()).toContain('<p>Currently, there are no items.</p>');
    });
  });
});
