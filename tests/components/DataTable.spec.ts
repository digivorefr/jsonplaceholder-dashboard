import { shallowMount, Wrapper } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'

const entriesMock = {
  headers: ['Name', 'Role'],
  values: [
    ['Marty', 'Hero'],
    ['Emmett', 'Scientist'],
    ['Biff', 'Vilain']
  ]
}

describe('DataTable', () => {
  test('renders correctly', () => {
    const wrapper: Wrapper<Vue & { [key: string]: any }> = shallowMount(DataTable, {
      propsData: {
        options: {
          headers: null,
          values: []
        }
      }
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.columns).toBe(0)
    wrapper.destroy()
  })

  test('table well formed', () => {
    const wrapper: Wrapper<Vue & { [key: string]: any }> = shallowMount(DataTable, {
      propsData: {
        options: entriesMock
      }
    })
    expect(wrapper.vm.columns).toBe(2)
    expect(wrapper.vm.rows).toBe(3)
    expect(wrapper.find('.data-table__cell--heading'))
    expect(wrapper.element).toMatchSnapshot()
    wrapper.destroy()
  })
  test('table well formed without headers', () => {
    const wrapper: Wrapper<Vue & { [key: string]: any }> = shallowMount(DataTable, {
      propsData: {
        options: { ...entriesMock, headers: null }
      }
    })
    expect(wrapper.vm.headers).toBe(null)
    wrapper.destroy()
  })

  test('configuration mismatch between headers and values', () => {
    const nuxtMock = jest.fn()

    const wrapper: Wrapper<Vue & { [key: string]: any }> = shallowMount(DataTable, {
      propsData: {
        options: {
          ...entriesMock,
          headers: ['Back to the future']
        }
      },
      mocks: {
        $nuxt: { error: nuxtMock }
      }
    })
    expect(nuxtMock).toHaveBeenCalledWith({ statusCode: 500, message: 'DataTable headers and values must have the same length.' })
    wrapper.destroy()
  })
})
