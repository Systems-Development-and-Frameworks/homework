import { mount } from '@vue/test-utils';
import listitem from '../src/components/listitem.vue';

describe('listitem.vue', () => {
  it('renders a list item', () =>{
    const todo = "tests implementieren";
    const wrapper = mount(listitem, {
      propsData: {
        entry: "test a todo list"
      }
    })
    expect(wrapper.html()).toContain('<div class="row mx-lg-n5">');
  })
})
