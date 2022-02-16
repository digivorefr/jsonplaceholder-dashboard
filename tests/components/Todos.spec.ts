import { mount, Wrapper } from '@vue/test-utils'
import Todos from '@/components/Todos.vue'
import Loader from '@/components/Loader.vue'

const todosMock = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  }
]

describe('Todos', () => {
  test('renders correctly', () => {
    const wrapper = mount(Todos, {
      mocks: {
        $fetchState: { pending: true, error: true, timestamp: Date.now() }
      }
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.exists()).toBe(true)
    wrapper.destroy()
  })
  test('show error if fetch fails', () => {
    const wrapper = mount(Todos, {
      mocks: {
        $fetchState: { pending: null, error: true, timestamp: Date.now() }
      }
    })
    expect(wrapper.html()).toContain('An error occured.')
    wrapper.destroy()
  })
  test('show loader while fetching', () => {
    const wrapper = mount(Todos, {
      mocks: {
        $fetchState: { pending: true, error: null, timestamp: Date.now() }
      }
    })
    expect(wrapper.findComponent(Loader))
    wrapper.destroy()
  })
  test('show no todos text', () => {
    const wrapper = mount(Todos, {
      data() {
        return { todos: [] }
      },
      mocks: {
        $fetchState: { pending: null, error: null, timestamp: Date.now() }
      }
    })
    expect(wrapper.html()).toContain('No todos')
    wrapper.destroy()
  })
  test('fetch and display todos', async () => {
    const wrapper: Wrapper<Vue & { [key: string]: any }> = mount(Todos, {
      mocks: {
        $fetchState: { pending: null, error: null, timestamp: Date.now() },
        $axios: { $get: () => todosMock }
      }
    })
    wrapper.vm.$data.todos = await wrapper.vm.getTodosByUserId()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.todos[0].id).toBe(1)
    expect(wrapper.findAll('.user__todo').length).toBe(2)
    expect(wrapper.element).toMatchSnapshot()
    wrapper.destroy()
  })
  test('Toggle todos', async () => {
    const wrapper = mount(Todos, {
      data() {
        return { todos: todosMock }
      },
      mocks: {
        $fetchState: { pending: null, error: null, timestamp: Date.now() }
      }
    })
    const todo = wrapper.find('#todo1')
    const label = wrapper.find('label[for="todo1"]')
    await todo.setChecked()

    expect(label.classes().includes('completed')).toBeTruthy()
    expect(wrapper.vm.$data.todos[1].id).toBe(1)

    await todo.setChecked(false)
    expect(label.classes().includes('completed')).toBeFalsy()
    expect(wrapper.vm.$data.todos[1].id).toBe(1)

    wrapper.destroy()
  })
})
