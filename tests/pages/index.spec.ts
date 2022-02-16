import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

describe('Index', () => {
  test('renders correctly', async () => {
    const fetch = jest.fn()
    const wrapper = shallowMount(Index, {
      mocks: {
        fetch
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
})
