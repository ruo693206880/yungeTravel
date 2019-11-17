const state = () => ({
  id: 0
})

const mutations = {
  setId(state, id){
    state.id = id
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
