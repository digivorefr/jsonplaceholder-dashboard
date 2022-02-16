<template>
  <div>
    <h1>Users</h1>
    <Loader v-if="status === 'loading'" />
    <DataTable
      v-else-if="users.length > 0"
      :options="buildTableData()"
    />
    <div v-else>
      No users.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Loader from '~/components/Loader.vue'
import { User, Status } from '~/store'
import DataTable, { Options as DataTableOptions } from '~/components/DataTable.vue'
import { Value } from '~/components/DataTableCell.vue'

export default Vue.extend({
  name: 'UsersView',
  components: { Loader, DataTable },
  computed: {
    users(): User[] {
      return this.$store.getters.getUsers
    },
    status(): Status {
      return this.$store.state.status as Status
    }
  },
  methods: {
    buildTableData(): DataTableOptions {
      return {
        headers: ['#', 'Username', 'Email', 'Company'],
        values: this.users.map(user => [
          `${user.id}`,
          {
            component: 'nuxt-link',
            props: {
              to: `/users/${user.id}`,
              children: `${user.username}`
            }
          },
          user.email,
          user.company.name
        ] as Value[])
      }
    }
  }
})
</script>
