<template>
  <div :class="`user__albums${($fetchState.error !== null) ? ' error' : ''}`">
    <h2>Albums</h2>
    <h3 v-if="$fetchState.error !== null">
      An error occured.
    </h3>
    <Loader v-else-if="$fetchState.pending === true" />
    <h3 v-else-if="albums.length === 0">
      No albums
    </h3>
    <div
      v-else
      class="user__albums__wrapper"
    >
      <div class="user__albums__grid">
        <div
          v-for="album in albums"
          :key="album.id"
          class="user__album"
        >
          <h4 class="user__album__title">
            {{ album.title }}
          </h4>
          <div
            v-if="album.pictures.length > 0"
            class="user__album__gallery"
          >
            <div
              v-for="picture in album.pictures"
              :key="picture.id"
              class="user__album__gallery__picture"
            >
              <Loader />
              <img
                :src="picture.thumbnailUrl"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Loader from '~/components/Loader.vue'

export type Picture = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type Album = {
  userId: number;
  id: number;
  title: string;
  pictures: Picture[],
}

export default Vue.extend({
  name: 'UserTodos',
  components: { Loader },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      albums: [] as Album[]
    }
  },
  async fetch() {
    this.albums = await this.fetchAlbums()
  },
  methods: {
    async fetchAlbums() {
      const albums = await this.$axios.$get(`/albums?userId=${this.id}`) as Album[]
      const picturePromises = albums.map(album => this.$axios.$get(`/albums/${album.id}/photos`))
      const pictures = await Promise.all(picturePromises)
      return albums.map((album, index) => ({ ...album, pictures: pictures[index] }))
    }
  }
})
</script>
