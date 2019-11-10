import { mount } from '@vue/test-utils';
import list from '../src/components/list.vue';

describe('list.vue', () => {
  it('renders a list item', () =>{
    const items = [{text: '1'}, {text: '2'}, {text:'3'}]
    const wrapper = mount(list, {
      propsData: { items: items }
    });
    expect(wrapper.contains('div')).toBe(true);
    expect(wrapper.findAll('p')).toHaveLength(items.length)
  })
})
