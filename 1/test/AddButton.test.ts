import { mount, Wrapper } from '@vue/test-utils';
import { Vue } from 'vue/types/vue';

import AddButton from '../src/components/AddButton';

describe('AddButton', () => {
  let wrapper: Wrapper<Vue>;

  describe('given no slot', () => {
    beforeAll(() => {
      wrapper = mount(AddButton);
    });

    test('renders `Add`', () => {
      expect(wrapper.html()).toContain('Add');
    });

    test('does not show input field', () => {
      expect(wrapper.contains('input')).toBeFalsy();
    });

    describe('click on `Add` button', () => {
      beforeAll(() => {
        wrapper.find('.toggle').trigger('click');
      });

      test('$emits `toggle` with `true`', () => {
        expect(wrapper.emitted('toggle')[0][0]).toEqual(true);
      });

      test('shows input field', () => {
        expect(wrapper.contains('input')).toBeTruthy();
      });

      describe('set text and submit', () => {
        beforeAll(() => {
          wrapper.find('input').setValue('value');
          wrapper.find('button').trigger('click');
        });

        test('$emits `submit` with `value`', () => {
          expect(wrapper.emitted('submit')[0][0]).toEqual('value');
        });

        test('$emits `toggle` with `false`', () => {
          expect(wrapper.emitted('toggle')[1][0]).toEqual(false);
        });
      });
    });
  });

  describe('given a default slot', () => {
    beforeAll(() => {
      wrapper = mount(AddButton, {
        slots: { default: 'Custom' },
      });
    });

    test('renders `Custom`', () => {
      expect(wrapper.html()).toContain('Custom');
    });
  });
});
