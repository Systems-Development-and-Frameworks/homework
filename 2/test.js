// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils'
import ListItem from './ListItem'

const wrapper = mount(ListItem)

describe('given a `todo`', () => {
    it('renders todo text', () => {
        expect(wrapper.text()).toContain('Save');
    })

    it('does show input field', () => {
        expect(wrapper.emitted('edit', () => {
            wrapper.contains('input').tobe(false)
        }))
    })

    describe('Clik on Edit button', () => {
        it('show input field', () => {
            expect(wrapper.emitted('edit', () => {
                wrapper.contains('input').tobe(true)
            }))
        })

        describe('Edit text and Submit', () => {
            it('$emit save with editted todo', () => {
                expect(wrapper.emitted('save', () => {
                    wrapper.contains('input').tobe(false)
                }))
            })
        })

    })

    describe('Clik on Delete button', () => {
        it(' $emit delete', () => {
            expect(wrapper.emitted('delete'))
        })
    })
})





