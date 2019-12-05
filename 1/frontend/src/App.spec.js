import {mount, shallowMount} from '@vue/test-utils'
import app from '../src/App.vue'

describe('App.vue', () => {
    const wrapper = mount(app);
    it('renders the todo app', () => {
        expect(wrapper.contains('div')).toBe(true);
    })

    it('contains data', () =>{
        const wrapper=mount(app)
        expect(wrapper.find('h1').text()).toEqual('TodoList');
    })
})