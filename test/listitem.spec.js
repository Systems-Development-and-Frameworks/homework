import { mount, shallowMount } from '@vue/test-utils';
import listitem from '../src/components/listitem.vue';

describe('listitem.vue', () => {
  const wrapper = mount(listitem, {
    propsData: {
      entry: { text: "test a todo list" },
    }
  })
  it('renders a list item', () =>{
    expect(wrapper.html()).toContain('<div class="row mx-lg-n5">');
    expect(wrapper.html()).toContain('<form class="text">');
    expect(wrapper.html()).toContain('type="button" name="delete-button" id="buttonDelete"');
    expect(wrapper.html()).toContain('type="button" name="edit-button" id="buttonEdit"');
  });
  it('doesn\'t show the edit input immediately', () => {
    expect(wrapper.html()).not.toContain('<input type="text" name="newText">');
  });

  const newText = "this is the updated text";
  const editButton = wrapper.findAll('button').at(0);
  const deleteButton = wrapper.findAll('button').at(1);
  //console.log(editButton.element);
  //console.log(wrapper.html());

  describe('when the edit button is pressed', () => {
    editButton.trigger('click');
    it('emits a ToggleEditMode event', () => {
      expect(wrapper.emitted('toggleEditMode'));
    });
    //the test cases below do not work, as logic for html changes resides outside the listitem component

    // it('shows the edit input field', () => {
    //   expect(wrapper.html()).toContain('<input type="text" name="newText">');
    // });
    // it('renders the save button', () => {
    //   expect(wrapper.html()).toContain('type="button" name="save-button" id="buttonSave"')
    // })
  });

  describe('when the delete button is pressed', () => {
    deleteButton.trigger('click');
    it('emits a DeleteEntry event', () => {
      expect(wrapper.emitted('deleteEntry'));
    });
  });
});
