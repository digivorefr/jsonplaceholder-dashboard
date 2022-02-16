import { shallowMount } from '@vue/test-utils'
import DataTableCell from '@/components/DataTableCell.vue'

describe('DataTableCell', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(DataTableCell, {
      propsData: {
        value: 'On n\'a pas besoin... de route'
      }
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toContain('On n\'a pas besoin... de route')
    wrapper.destroy()
  })
  test('display link', () => {
    const wrapper = shallowMount(DataTableCell, {
      propsData: {
        value: {
          component: 'nuxt-link',
          props: {
            to: '/thefuture'
          }
        }
      }
    })
    expect(wrapper.find('a[href="/thefuture"'))
    wrapper.destroy()
  })
})
