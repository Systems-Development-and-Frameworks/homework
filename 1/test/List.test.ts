import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import { Vue } from 'vue/types/vue';

import { TodoItem } from '../src';
import AddButton from '../src/components/AddButton';
import List from '../src/components/List';
import ListItem from '../src/components/ListItem';

const todoItems: TodoItem[] = [{ id: '1', message: 'test' }, { id: '2', message: 'second' }];

// TODO finish all tests

describe('List', () => {
  let wrapper: Wrapper<Vue & { value: TodoItem[] }>;

  describe('given a `value` that is not empty', () => {
    beforeAll(() => {
      wrapper = shallowMount(List, {
        propsData: {
          value: todoItems.slice(),
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

    test('does not render list-empty info', () => {
      expect(wrapper.html()).not.toContain('<p>Currently, there are no items.</p>');
    });

    describe('can handle events', () => {
      describe('can handle AddButton events', () => {
        let addButton: Wrapper<Vue>;
        beforeAll(() => {
          addButton = wrapper.find(AddButton);
        });

        test('can handle add', () => {
          addButton.vm.$emit('submit', 'New Todo');
          expect(wrapper.vm.value[wrapper.vm.value.length - 1].message).toBe('New Todo');
        });
      });

      describe('can handle ListItem events', () => {
        let listItem: Wrapper<Vue>;
        beforeAll(() => {
          listItem = wrapper.find(ListItem);
        });

        test('can handle `input`', () => {
          listItem.vm.$emit('input', { id: '1', message: 'edited' });
          expect(wrapper.vm.value[0].message).toBe('edited');
        });

        test('can handle `delete`', () => {
          listItem.vm.$emit('delete', { id: '2', message: 'second' });
          expect(wrapper.vm.value.some((item: TodoItem) => {
            return item.message === 'second';
          })).toBeFalsy();
        });
      });
    });
  });

  describe('given a `value` that is empty', () => {
    beforeAll(() => {
      wrapper = shallowMount(List, {
        propsData: {
          value: [],
        },
        components: {
          AddButton,
          ListItem,
        },
      });
    });

    test('renders list-empty info', () => {
      expect(wrapper.html()).toContain('<p>Currently, there are no items.</p>');
    });

    test('does not render ListItems', () => {
      expect(wrapper.contains(ListItem)).toBeFalsy();
    });
  });
});
