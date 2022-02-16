<template>
  <div
    v-if="user !== undefined"
    class="container container--grid"
  >
    <div class="user">
      <header>
        <div>
          <h1>{{ user.username }}</h1>
          <p>#{{ user.id }} - {{ user.name }} </p>
        </div>
      </header>
      <section class="user__main">
        <h2>Infos</h2>
        <div class="user__main__wrapper">
          <div class="user__info">
            <h4>Contact</h4>
            <ul>
              <li>
                <div class="icon icon--email" />
                <a
                  :href="`mailto:${user.email}`"
                  target="_blank"
                >{{ user.email }}</a>
              </li>
              <li>
                <div class="icon icon--phone" />
                <a
                  :href="`tel:${cleanPhone(user.phone)}`"
                  target="_blank"
                >{{ user.phone }}</a>
              </li>
              <li>
                <div class="icon icon--link" />
                <a
                  :href="cleanUrl(user.website)"
                  target="_blank"
                >{{ user.website }}</a>
              </li>
            </ul>
          </div>
          <div class="user__info">
            <h4>Address</h4>
            <ul>
              <li>
                <div class="icon icon--home" />
                <span>
                  {{ user.address.suite }}<br>
                  {{ user.address.street }}<br>
                  {{ `${user.address.city} ${user.address.zipcode.substr(0,5)}` }}
                </span>
              </li>
              <li>
                <div class="icon icon--location" />
                <a
                  :href="`https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`"
                  target="_blank"
                >View on Google Maps</a>
              </li>
            </ul>
          </div>
          <div class="user__info">
            <h4>Company</h4>
            <ul>
              <li>
                <div class="icon icon--business" />
                <span>
                  <h5>{{ user.company.name }}</h5>
                  <span class="catchphrase">
                    {{ user.company.catchPhrase }}
                  </span>
                </span>
              </li>
              <li>
                <div class="icon icon--activity" />
                {{ user.company.bs }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <div class="user__activities">
      <Posts :id="id" />
      <Todos :id="id" />
      <Albums :id="id" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/store'
import Posts from '~/components/Posts.vue'
import Todos from '~/components/Todos.vue'
import Albums from '~/components/Albums.vue'

export default Vue.extend({
  name: 'UserView',
  components: { Albums, Posts, Todos },
  async fetch() {
    if (this.$store.state.users.length === 0) {
      await this.$store.dispatch('fetchUsers')
    }
  },
  computed: {
    id(): number {
      return parseInt(this.$route.params.id, 10)
    },
    user(): User | undefined {
      const user = this.$store.getters.getUserById(this.id) as User | undefined
      if (user === undefined) {
        this.$nuxt.error({ statusCode: 404, message: 'User not found' })
      }
      return user
    }
  },
  methods: {
    cleanUrl(url: string): string {
      if (!url.match(/^http/)) {
        return `https://${url}`
      }
      return url
    },
    cleanPhone(phone: string): string {
      const phoneString = phone.split(' x')[0]
      const phoneNumbers = phoneString.match(/\d/gi) || []
      if (phoneNumbers.length < 9) { return '' }
      return `+${phoneNumbers.length <= 10 ? '1' : ''}${phoneNumbers.join('')}`
    }
  }
})
</script>
