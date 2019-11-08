import { mount, shallowMount } from '@vue/test-utils';
import listitem from '../src/components/listitem.vue';

describe('listitem.vue', () => {
  const wrapper = shallowMount(listitem, {
    propsData: {
      entry: "test a todo list"
    }
  })
  it('renders a list item', () =>{
    expect(wrapper.html()).toContain('<div class="row mx-lg-n5">');
    expect(wrapper.html()).toContain('<form class="text">');
    expect(wrapper.html()).toContain('<b-button type="button" class="btn btn-danger"');
  });
  it('doesn\'t show the edit input immediately', () => {
    expect(wrapper.html()).not.toContain('<input type="text" name="newText">');
  });

  describe('when the edit button is pressed', () => {
    const newText = "this is the updated text";
    const editButton = wrapper.find('#buttonEdit');
    //console.log(editButton.element);
    editButton.trigger('click');
    it('shows the edit input field', () => {
      expect(wrapper.html()).toContain('<input type="text" name="newText">');
    });
    it('emitted a ToggleEditMode event', () => {

    });

  });
})
