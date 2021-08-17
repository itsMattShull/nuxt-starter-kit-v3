export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.user) {
      commit('SET_USER', req.session.user)
    }
  },
  login ({ commit }, { email, password }) {
    return this.$axios.$post('/api/login', {
      email,
      password
    }).then((res) => {
      if (res.status === 401) {
        throw new Error('Bad credentials')
      } else {
        return res
      }
    }).then((user) => {
      commit('SET_USER', user)
    })
  },
  async logout ({ commit }) {
    await this.$axios.$get('/api/logout').then(() => {
      commit('SET_USER', null)
    })
  }
}
