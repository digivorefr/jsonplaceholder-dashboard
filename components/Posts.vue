<template>
  <div :class="`user__posts${($fetchState.error !== null) ? ' error' : ''}`">
    <h2>Posts</h2>
    <h3
      v-if="$fetchState.error !== null"
      class="error__title"
    >
      An error occured.
    </h3>
    <Loader v-else-if="$fetchState.pending === true" />
    <h3 v-else-if="posts.length === 0">
      No posts
    </h3>
    <div
      v-else
      class="user__posts__wrapper"
    >
      <div class="user__posts__grid">
        <div
          v-for="post in posts"
          :key="post.id"
          class="user__post"
        >
          <h4 class="user__post__title">
            {{ post.title }}
          </h4>
          <p class="user__post__content">
            {{ post.body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Loader from '~/components/Loader.vue'

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default Vue.extend({
  name: 'UserPosts',
  components: { Loader },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      posts: [] as Post[]
    }
  },
  async fetch() {
    this.posts = await this.getPostsByUserId()
  },
  methods: {
    async getPostsByUserId(): Promise<Post[]> {
      return await this.$axios.$get(`/posts?userId=${this.id}`)
    }
  }
})
</script>
