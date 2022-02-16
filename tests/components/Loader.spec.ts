import { shallowMount } from '@vue/test-utils'
import Loader from '@/components/Loader.vue'

describe('Loader', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Loader)
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
    wrapper.destroy()
  })
})
