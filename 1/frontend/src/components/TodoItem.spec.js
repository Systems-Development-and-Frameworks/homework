import {mount, shallowMount} from '@vue/test-utils'
import todoitem from '@/components/TodoItem.vue'

describe('TodoItem', () => {

    it('renders props.msg when passed', () => {
        const todo = 'new todo'
        const wrapper = mount(todoitem, {
            propsData: { todo }
        })
        expect(wrapper.text()).toBe('Edit  X')
    })
})