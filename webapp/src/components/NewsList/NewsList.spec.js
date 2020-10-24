import { shallowMount } from '@vue/test-utils'
import NewsList from '@/components/NewsList/NewsList.vue'
import NewsItem from '@/components/NewsItem/NewsItem.vue'

describe('NewsList.vue', () => {
  let propsData
  describe(':initialItems', () => {
    describe('empty', () => {
      beforeEach(() => {
        propsData = { initialItems: [] }
      })

      it('renders empty state', () => {
        const wrapper = shallowMount(NewsList, { propsData })
        expect(wrapper.text()).toMatch('The list is empty :(')
      })
    })

    describe('not empty', () => {
      beforeEach(() => {
        propsData= { initialItems: [1,2,3].map(i => ({ id: i, title: `Item ${i}`, votes: i})) }
      })

      it('renders <NewsItem> for each item', () => {
        const wrapper = shallowMount(NewsList, { propsData })
        expect(wrapper.findAllComponents(NewsItem)).toHaveLength(3)
      })

      describe('click "Reverse order"', () => {
        it('toggles between ascending and descending order', async () => {
          const wrapper = shallowMount(NewsList, { propsData })
          expect(wrapper.findAllComponents(NewsItem).wrappers.map(c => c.props('item').id)).toEqual([ 3,2,1 ])
          await wrapper.get('button').trigger('click')
          expect(wrapper.findAllComponents(NewsItem).wrappers.map(c => c.props('item').id)).toEqual([ 1,2,3 ])
        })
      })
    })
  })
})
