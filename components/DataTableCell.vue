<template>
  <div class="data-table__cell">
    <nuxt-link
      v-if="typeof value === 'object' && value.component === 'nuxt-link'"
      :to="value.props.to || ''"
    >
      {{ value.props.children }}
    </nuxt-link>
    <template v-else>
      {{ value }}
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export type Value = string | {
  component: string;
  props: Object;
}

export default Vue.extend({
  name: 'DataTableCell',
  props: {
    value: {
      type: [String, Object as () => Value],
      required: true
    }
  }
})
</script>
