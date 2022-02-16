<template>
  <header class="header">
    <div class="container header__wrapper">
      <nav class="header__nav">
        <nuxt-link to="/">
          All users
        </nuxt-link>
      </nav>
      <input
        id="theme"
        type="checkbox"
        name="theme"
        style="opacity:0; position:absolute; visibility: hidden; z-index:-1; pointer-events: none;"
        :checked="theme === 'dark-mode'"
        @change="onThemeChange"
      >
      <label
        id="theme-switcher"
        for="theme"
      >
        <div class="icon icon--sun" />
        <div class="icon icon--moon" />
      </label>
      <div class="profile">
        <p class="profile__name">
          Marty McFly
        </p>
        <a
          class="profile__picture"
          href="https://youtu.be/fCjsUxbNmIs?t=102"
          target="_blank"
        >
          <img
            src="~/static/images/profile.jpg"
            alt="Profile picture"
          >
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MainHeader',
  data() {
    return {
      route: this.$route.path,
      theme: this.$theme
    }
  },
  methods: {
    onThemeChange(event: any) {
      if (event?.target?.checked !== null && event?.target?.checked === true) {
        this.$changeTheme('dark-mode')
      } else {
        this.$changeTheme('light-mode')
      }
    }
  }
})
</script>
