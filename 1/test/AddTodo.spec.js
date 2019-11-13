import { mount } from '@vue/test-utils'
import AddTodo from '../src/components/AddTodo.vue'

describe('AddTodo', () => {
test('is a Vue instance', () => {
const wrapper = mount(AddTodo)
expect(wrapper.isVueInstance()).toBeTruthy()
})
})