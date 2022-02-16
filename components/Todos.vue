<template>
  <div :class="`user__todos${($fetchState.error !== null) ? ' error' : ''}`">
    <h2>Todos</h2>
    <h3 v-if="$fetchState.error !== null">
      An error occured.
    </h3>
    <Loader v-else-if="$fetchState.pending === true" />
    <h3 v-else-if="todos.length === 0">
      No todos
    </h3>
    <div
      v-else
      class="user__todos__wrapper"
    >
      <div class="user__todos__grid">
        <label
          v-for="(todo, index) in todos"
          :key="todo.id"
          :class="`user__todo${todo.completed ? ' completed' : ''}`"
          :for="`todo${todo.id}`"
        >
          <input
            :id="`todo${todo.id}`"
            type="checkbox"
            :checked="todo.completed"
            class="user__todo__checkbox"
            @change="() => onCheckboxChange(index)"
          >
          <div :class="`icon icon${todo.completed ? '--validate--success' : '--circle--light'} user__todo__icon`" />
          <p class="user__todo__content">{{ todo.title }}</p>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Loader from '~/components/Loader.vue'

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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
      todos: [] as Todo[]
    }
  },
  async fetch() {
    this.todos = await this.getTodosByUserId()
    this.sortTodos()
  },
  methods: {
    async getTodosByUserId(): Promise<Todo[]> {
      return await this.$axios.$get(`/todos?userId=${this.id}`)
    },
    onCheckboxChange(index: number) {
      this.todos[index].completed = !this.todos[index].completed
      this.sortTodos()
    },
    sortTodos() {
      this.todos = this.todos
        .filter(todo => !todo.completed)
        .concat(
          this.todos.filter(todo => todo.completed)
        )
    }
  }
})
</script>
