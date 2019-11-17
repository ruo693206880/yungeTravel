const state = () => ({
  history: [],
  airInfo: {
    seat_infos: {}
  },
  allPrice: 0
})

const mutations = {
  // 搜索历史记录
  setHistory(state, data) {
    state.history.unshift(data)
  },
  // 机票订单全部信息
  setAirInfo(state, data) {
    state.airInfo = data
  },
  // 总价格
  setAllPrice(state, price) {
    state.allPrice = price
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
