import { mount, Wrapper } from '@vue/test-utils';
import { Vue } from 'vue/types/vue';

import { TodoItem } from '../src';
import ListItem from '../src/components/ListItem';

const todoItem: TodoItem = { id: '1', message: 'test' };

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

    test('renders `item.message`', () => {
      expect(wrapper.html()).toContain(`<span>${todoItem.message}</span>`);
    });

    test('does not show input field', () => {
      expect(wrapper.contains('input')).toBeFalsy();
    });

    describe('click on `Edit` button', () => {
      beforeAll(() => {
        console.log(wrapper);
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
          const expectedObject: TodoItem = {
            id: '1',
            message: 'edited',
          };
          expect(wrapper.emitted('input')[0][0]).toEqual(expectedObject);
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
