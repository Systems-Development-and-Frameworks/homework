import {mount} from "@vue/test-utils"
import todos from '@/components/Todos.vue'

describe('TodoItem', () => {
    const wrapper = mount(todos);
    it('renders todo header', () =>{
        const wrapper=mount(todos)
        expect(wrapper.text()).toEqual('');
    })
})
