const state = () => ({
  userInfo: {
    token: '',
    user: {}
  }
})

const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  }
}

const actions = {
  // 登录
  login(store, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'post',
      data
    }).then(res => {
      // 请求成功时
      store.commit('setUserInfo', res.data)
    })
  },
  // 发送手机验证码
  sendCaptcha(store, tel) {
    return this.$axios({
      url: '/captchas',
      method: 'post',
      data: { tel }
    }).then(res => {
      const { code } = res.data
      return code
    })
  },
  // 注册
  register(store, data) {
    return this.$axios({
      url: '/accounts/register',
      method: 'post',
      data
    }).then(res => {
      console.log(res)
      return { code: 0 }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
