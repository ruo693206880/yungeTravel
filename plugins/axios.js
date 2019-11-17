// 登录拦截js文件
import { Message } from 'element-ui'

export default ({ $axios, redirect }) => {
  $axios.onError(err => {
    let { statusCode, message } = err.response.data
    // 状态码为400的时候
    if (statusCode === 400) {
      Message.error(message)
    }
    // 状态码为403 401 的时候
    if (statusCode === 403 || statusCode === 401) {
      Message.warning('请先登陆')
      redirect('/user/login')
    }
  })
}
