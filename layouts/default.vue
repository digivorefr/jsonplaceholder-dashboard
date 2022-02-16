<template>
  <div id="app">
    <Header />
    <div class="page">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.vue'

export default Vue.extend({
  name: 'DefaultLayout',
  components: { Header },
  beforeMount() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$changeTheme('dark-mode')
    }
  }
})
</script>
