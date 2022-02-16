import { shallowMount, Wrapper } from '@vue/test-utils'
import { User as UserState } from '@/store'
import User from '@/pages/users/_id.vue'

const routeMock = { params: { id: 1 } }
const usersMock = <UserState[]>[
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618'
      }
    },
    phone: '010-692-6593 x09125',
    website: 'https://www.anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains'
    }
  }
]
const storeMock = {
  state: {
    users: usersMock
  },
  dispatch: jest.fn(),
  getters: {
    getUserById: (): UserState | undefined => usersMock[0]
  }
}

const nuxtErrorMock = jest.fn()

describe('User', () => {
  test('renders correctly', async () => {
    const wrapper = shallowMount(User, {
      mocks: {
        $route: routeMock,
        $store: storeMock,
        $nuxt: { error: jest.fn() }
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
  test('User does not exist, throw nuxt 404', async () => {
    const wrapper = shallowMount(User, {
      mocks: {
        $route: routeMock,
        $store: {
          ...storeMock,
          getters: {
            getUserById: () => undefined
          }
        },
        $nuxt: { error: nuxtErrorMock }
      }
    })
    await wrapper.vm.$nextTick()
    expect(nuxtErrorMock).toHaveBeenCalledWith({ statusCode: 404, message: 'User not found' })
    wrapper.destroy()
  })
  test('Url cleaner', async () => {
    const wrapper: Wrapper<Vue & { [key: string]: any }> = shallowMount(User, {
      mocks: {
        $route: routeMock,
        $store: storeMock,
        $nuxt: { error: jest.fn() }
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.cleanUrl('www.cafe80.com')).toBe('https://www.cafe80.com')
    expect(wrapper.vm.cleanUrl('http://biffcompany.com')).toBe('http://biffcompany.com')
  })
  test('phone number cleaner', async () => {
    const wrapper: Wrapper<Vue & { [key: string]: any }> = shallowMount(User, {
      mocks: {
        $route: routeMock,
        $store: storeMock,
        $nuxt: { error: jest.fn() }
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.cleanPhone('3324564569')).toBe('+13324564569')
    expect(wrapper.vm.cleanPhone('1 332-456-4569')).toBe('+13324564569')
    expect(wrapper.vm.cleanPhone('+33 33 24 56 45 69')).toBe('+333324564569')
    expect(wrapper.vm.cleanPhone('(332).456.4569')).toBe('+13324564569')
    expect(wrapper.vm.cleanPhone('(332).456.4569  x4598')).toBe('+13324564569')
    expect(wrapper.vm.cleanPhone('123456')).toBe('')
    expect(wrapper.vm.cleanPhone('aghkjhga')).toBe('')
  })
})
