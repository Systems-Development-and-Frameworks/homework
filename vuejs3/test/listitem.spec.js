import { mount } from '@vue/test-utils';
import listitem from '../src/components/listitem.vue';

describe('listitem.vue', () => {
  it('renders a list item', () =>{
    const todo = "tests implementieren";
    const wrapper = mount(listitem)
    expect(wrapper.contains('div')).toBe(true);
  })
})
