import { mount } from '@vue/test-utils'
import ListItem from './ListItem'
const wrapper = mount(ListItem)

describe('given a `todo`', () => {
  it('renders todo text', () => {
    expect(wrapper.text()).toContain('Save');
  })

  it('should show an input field', () => {
    expect(wrapper.emitted('edit', () => {
      wrapper.contains('input').tobe(false)
    }))
  })

  describe('click on delete button', () => {
    expect(wrapper.emitted('delete'))
  })
})

