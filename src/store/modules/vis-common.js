
export default {
  namespaced: true,
  state: {
    network: null
  },
  mutations: {
    setNetwork (state, { network }) {
      state.network = network
      console.log(network)
    }
  },
  actions: {
    initWorkbench ({ commit }, network) {
      commit('setNetwork', { network })
      console.log(network)
    }
  }
}
