import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Header, {
      mocks: {
        $route: {
          path: '/'
        }
      }
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
    wrapper.destroy()
  })

  test('switch theme', async () => {
    const changeTheme = jest.fn()

    const wrapper = shallowMount(Header, {
      mocks: {
        $route: {
          path: '/'
        },
        $theme: 'light-mode',
        $changeTheme: changeTheme
      }
    })

    expect(wrapper.vm.$data.theme).toBe('light-mode')
    const switcher = wrapper.find('#theme')
    await switcher.setChecked()
    await switcher.setChecked(false)
    expect(changeTheme).toHaveBeenNthCalledWith(1, 'dark-mode')
    expect(changeTheme).toHaveBeenNthCalledWith(2, 'light-mode')
    wrapper.destroy()
  })
})
