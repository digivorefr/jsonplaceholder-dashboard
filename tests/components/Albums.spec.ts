import { mount, Wrapper } from '@vue/test-utils'
import Albums from '@/components/Albums.vue'
import Loader from '@/components/Loader.vue'

const albumsMock = [
  {
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim'
  },
  {
    userId: 1,
    id: 2,
    title: 'sunt qui excepturi placeat culpa'
  }
]

const photosMock = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952'
  },
  {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796'
  }
]

const axiosMock = {
  $get: (url: string) => {
    if (url.match(/albums\?userId=[\d]*/)) {
      return albumsMock
    }
    if (url.match(/albums\/[\d]*\/photos/)) {
      return photosMock
    }
    return []
  }
}

describe('Albums', () => {
  test('renders correctly', () => {
    const wrapper = mount(Albums, {
      mocks: {
        $fetchState: { pending: true, error: true, timestamp: Date.now() }
      }
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.exists()).toBe(true)
    wrapper.destroy()
  })
  test('show error if fetch fails', () => {
    const wrapper = mount(Albums, {
      mocks: {
        $fetchState: { pending: null, error: true, timestamp: Date.now() }
      }
    })
    expect(wrapper.html()).toContain('An error occured.')
    wrapper.destroy()
  })
  test('show loader while fetching', () => {
    const wrapper = mount(Albums, {
      mocks: {
        $fetchState: { pending: true, error: null, timestamp: Date.now() }
      }
    })
    expect(wrapper.findComponent(Loader))
    wrapper.destroy()
  })
  test('show no albums text', () => {
    const wrapper = mount(Albums, {
      data() {
        return { albums: [] }
      },
      mocks: {
        $fetchState: { pending: null, error: null, timestamp: Date.now() }
      }
    })
    expect(wrapper.html()).toContain('No albums')
    wrapper.destroy()
  })
  test('fetch and display albums', async () => {
    const wrapper: Wrapper<Vue & { [key: string]: any }> = mount(Albums, {
      mocks: {
        $fetchState: { pending: null, error: null, timestamp: Date.now() },
        $axios: axiosMock
      }
    })
    wrapper.vm.$data.albums = await wrapper.vm.fetchAlbums()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.albums.length).toBe(2)
    expect(wrapper.vm.$data.albums[0].pictures.length).toBe(2)
    expect(wrapper.findAll('.user__album').length).toBe(2)
    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
})
