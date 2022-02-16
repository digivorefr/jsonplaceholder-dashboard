<template>
  <div class="data-table">
    <div class="data-table__scroller">
      <div class="data-table__wrapper">
        <div
          v-for="columnIndex in columns"
          :key="columnIndex"
          class="data-table__column"
        >
          <div
            v-if="headers !== null"
            class="data-table__cell data-table__cell--heading"
          >
            {{ headers[columnIndex -1] }}
          </div>
          <DataTableCell
            v-for="(row, index) in values"
            :key="index"
            :value="row[columnIndex-1]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'
import DataTableCell, { Value } from '~/components/DataTableCell.vue'
// export type Value = string | VNode | null;
export type Action = VNode | null;

export type Options = {
  values: Value[][],
  headers?: string[],
}

export default Vue.extend({
  name: 'DataTable',
  components: { DataTableCell },
  props: {
    options: {
      type: Object as () => Options,
      required: true
    }
  },
  computed: {
    headers(): string[] | null {
      if (this.options.headers !== undefined &&
        this.options.headers !== null &&
        this.options.headers.length !== this.options.values[0].length) {
        this.$nuxt.error({ statusCode: 500, message: 'DataTable headers and values must have the same length.' })
      }
      return this.options.headers || null
    },
    values(): Value[][] {
      return this.options.values
    },
    columns(): number { return (this.values[0] || []).length },
    rows(): number { return this.values.length }
  }
})
</script>
