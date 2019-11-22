const state = () => ({
  draftList: []
})

const mutations = {
  addDraftList(state, data){
    state.draftList.push(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
