import { mount, Wrapper } from '@vue/test-utils'
import Posts from '@/components/Posts.vue'
import Loader from '@/components/Loader.vue'

const postsMock = [
  {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  }
]

describe('Posts', () => {
  test('renders correctly', () => {
    const wrapper = mount(Posts, {
      mocks: {
        $fetchState: { pending: true, error: true, timestamp: Date.now() }
      }
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.exists()).toBe(true)
    wrapper.destroy()
  })
  test('show error if fetch fails', () => {
    const wrapper = mount(Posts, {
      mocks: {
        $fetchState: { pending: null, error: true, timestamp: Date.now() }
      }
    })
    expect(wrapper.html()).toContain('An error occured.')
    wrapper.destroy()
  })
  test('show loader while fetching', () => {
    const wrapper = mount(Posts, {
      mocks: {
        $fetchState: { pending: true, error: null, timestamp: Date.now() }
      }
    })
    expect(wrapper.findComponent(Loader))
    wrapper.destroy()
  })
  test('show no posts text', () => {
    const wrapper = mount(Posts, {
      data() {
        return { posts: [] }
      },
      mocks: {
        $fetchState: { pending: null, error: null, timestamp: Date.now() }
      }
    })
    expect(wrapper.html()).toContain('No posts')
    wrapper.destroy()
  })
  test('Fetch and display posts', async () => {
    const wrapper: Wrapper<Vue & { [key: string]: any }> = mount(Posts, {
      mocks: {
        $fetchState: { pending: null, error: null, timestamp: Date.now() },
        $axios: { $get: () => postsMock }
      }
    })
    wrapper.vm.$data.posts = await wrapper.vm.getPostsByUserId()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.posts.length).toBe(2)
    expect(wrapper.findAll('.user__post').length).toBe(2)
    expect(wrapper.element).toMatchSnapshot()
    wrapper.destroy()
  })
})
