import { ActionTree, MutationTree, GetterTree } from 'vuex'

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

export type Status = 'initial' | 'pending' | 'loaded' | 'error';

export const state = () => ({
  status: 'initial' as Status,
  users: [] as User[]
})

export type UsersState = ReturnType<typeof state>;

export const mutations: MutationTree<UsersState> = {
  REFRESH: (state, newUsers: User[]) => (state.users = newUsers),
  UPDATE_STATUS: (state, newStatus: Status) => (state.status = newStatus)
}

export const getters: GetterTree<UsersState, UsersState> = {
  getUsers: (state: UsersState) => state.users,
  getUserById: (state: UsersState) => (id: number) => state.users.find(user => user.id === id)
}

export const actions: ActionTree<UsersState, UsersState> = {
  async fetchUsers({ commit }) {
    commit('UPDATE_STATUS', 'pending')
    try {
      const users = await this.$axios.$get('/users')
      commit('REFRESH', users)
      commit('UPDATE_STATUS', 'loaded')
    } catch {
      commit('UPDATE_STATUS', 'error')
    }
  }
}
