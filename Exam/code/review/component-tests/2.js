import { mount } from '@vue/test-utils'
import ListItem from './ListItem.vue'

describe('ListItem', () => {
  describe('given an `item`', () => {
    const dummy = { id: "1", message: "Foo" };
    const wrapper = mount(ListItem, { propsData: { item: dummy } });

    it('init with dummy parameter', () => {
      expect(wrapper.vm.item).toEqual(dummy);
    });

    it('renders item', () => {
      var foundItem = wrapper.find('#item-description');
      var itemDescription = wrapper.vm.item.id + '. ' + wrapper.vm.item.message;
      expect(foundItem.text()).toEqual(itemDescription);
    });

    describe('testing `Delete` button', () => {
      it('click on button emits delete event', () => {
        //wrapper.vm.deleteItem();
        wrapper.find('#button-delete').trigger('click');
        //console.log(wrapper.emitted());
        var itemToDelete = wrapper.emitted('delete-item')[0][0];
        //console.log(itemToDelete);
        expect(itemToDelete.message).toEqual(wrapper.vm.item.message);
        expect(itemToDelete.message).toEqual(dummy.message);
      });
    });
  });
});
