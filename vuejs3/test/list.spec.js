import { mount } from '@vue/test-utils';
import list from '../src/components/list.vue';

describe('list.vue', () => {
  it('renders a list item', () =>{
    const todo = "tests implementieren";
    const wrapper = mount(list)
    expect(wrapper.contains('div')).toBe(true);
  })
})
