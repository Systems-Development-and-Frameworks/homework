import { shallowMount } from '@vue/test-utils'
import IndexPage from './index.vue'

describe('index.vue', () => {
  it('is empty', () => {
    const wrapper = shallowMount(IndexPage)
    expect(wrapper.text()).toEqual('')
  })

  describe('calling asyncData() manually', () => {
    it('renders title', async () => {
      const wrapper = shallowMount(IndexPage)
      const data = IndexPage.asyncData()
      await wrapper.setData(data)
      expect(wrapper.text()).toContain('Hello')
    })
  })
})
