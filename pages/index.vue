<template>
  <div class="container container--grid">
    <Users />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Users from '~/components/Users.vue'

export default Vue.extend({
  name: 'HomePage',
  components: { Users },
  async fetch() {
    if (this.$store.state.users.length === 0) {
      await this.$store.dispatch('fetchUsers')
    }
  }
})
</script>
