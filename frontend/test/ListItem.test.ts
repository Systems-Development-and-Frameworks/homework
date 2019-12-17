import { mount, Wrapper } from '@vue/test-utils';
import { TodoItem } from 'core';
import { Vue } from 'vue/types/vue';

import ListItem from '../src/components/ListItem';

const todoItem: TodoItem = { id: '1', description: 'test', isDone: false, createdAt: new Date().toISOString() };

describe('ListItem', () => {
  let wrapper: Wrapper<Vue>;

  describe('given an `item`', () => {
    beforeAll(() => {
      wrapper = mount(ListItem, {
        propsData: {
          item: { ...todoItem },
        },
      });
    });

    test('renders `item.description`', () => {
      expect(wrapper.html()).toContain(`<span>test</span>`);
    });

    test('does not show input field', () => {
      expect(wrapper.contains('input')).toBeFalsy();
    });

    describe('click on `Edit` button', () => {
      beforeAll(() => {
        wrapper.find('.edit').trigger('click');
      });

      test('shows input field', () => {
        expect(wrapper.contains('input')).toBeTruthy();
      });

      describe('edit text and submit', () => {
        beforeAll(() => {
          wrapper.find('input').setValue('edited');
          wrapper.find('.save').trigger('click');
        });

        test('$emits `input` with edited item', () => {
          const expectedObject: Omit<TodoItem, 'createdAt'> = {
            id: '1',
            description: 'edited',
            isDone: false,
          };
          expect(wrapper.emitted('input')[0][0]).toMatchObject(expectedObject);
        });
      });
    });

    describe('click on `Delete` button', () => {
      beforeAll(() => {
        wrapper.find('.delete').trigger('click');
      });

      test('$emits `delete`', () => {
        expect(wrapper.emitted('delete')).toBeTruthy();
      });
    });
  });
});
