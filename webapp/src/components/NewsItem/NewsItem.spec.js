import { shallowMount } from '@vue/test-utils'
import NewsItem from '@/components/NewsItem/NewsItem.vue'

describe('NewsItem.vue', () => {
  it('renders votes', () => {
    const item = { title: 'Hello World', votes: 2 }
    const wrapper = shallowMount(NewsItem, {
      propsData: { item }
    })
    expect(wrapper.text()).toMatch('Hello World (2)')
  })
})
