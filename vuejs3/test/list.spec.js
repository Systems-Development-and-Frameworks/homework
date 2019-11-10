import { mount } from '@vue/test-utils';
import list from '../src/components/list.vue';

describe('list.vue', () => {
  const items = [{text: '1'}, {text: '2'}, {text:'3'}]
  const wrapper = mount(list, {
    propsData: { items: items }
  });
  it('renders a list', () =>{
    expect(wrapper.contains('div')).toBe(true);
    expect(wrapper.findAll('p')).toHaveLength(items.length)
  });
  const buttons = wrapper.findAll('button');
  const addButton = buttons.at((buttons.length-1));
  describe('when the add entry button is pressed', () => {
    addButton.trigger('click');
    it('emits an addEntry event', () => {
      expect(wrapper.emitted('addEntry'));
    });
  });
})
