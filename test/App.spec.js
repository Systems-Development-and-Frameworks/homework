import { mount } from '@vue/test-utils';
import app from '../src/App.vue';

describe('App.vue', () => {

  const wrapper = mount(app);
  it('renders the todo app', () =>{
    expect(wrapper.contains('div')).toBe(true);
  });

  //for some unforsaken reason, this one refuses to work.
  describe('when the toggleEditModeb function is called', () => {
    const editButton = wrapper.findAll('button').at(0);
    editButton.trigger('click')
    it('opens an input field in a listitem component', () => {
        expect(wrapper.html()).toContain('input');
    });
  });

  describe('when the deleteEntryb function is called', () => {
    wrapper.vm.deleteEntryb(0);
    it('decreases the amount of items in the list', () => {
      expect(wrapper.vm.items).toHaveLength(3);
    });
    it('removes the item with the specified id', () => {
      expect(wrapper.vm.items).not.toContain('"id": 0');
    });
  });



  describe('when a the addEntry function is called', () => {

    const wrapper2 = mount(app);
    wrapper2.vm.addEntry();
    it('increases the amount of items in the list', () => {
      expect(wrapper2.vm.items).toHaveLength(5); //previous test has decreased it
    });
    it('increments the maxId property', () => {
      expect(wrapper2.vm.maxId).toBe(4); //is not decreased when entries are removed
    });
    it('opens an input field in the  listitem component', () => {
        expect(wrapper2.html()).toContain('input');
    });
  });
});
