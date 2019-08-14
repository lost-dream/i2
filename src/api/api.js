import http from '@/utils/httpRequest'

export default {
  /**
   * 通过用户和密码登录
   * @param {*} username 用户名
   * @param {*} password 密码
   */
  login (username, password) {
    return http({
      url: http.adornUrl('/login'),
      method: 'post',
      data: http.adornData({
        username: username,
        password: password
      })
    })
  },
  /**
   * 通过token获取用户信息
   * @param {*} token 令牌
   */
  getUserInfo (token) {
    return http({
      url: http.adornUrl('/user/info'),
      method: 'get',
      params: http.adornParams({
        token
      })
    })
  },
  // ------------------------------------I2---------------------------------------------//
  /**
   * 根据输入的关键字查询节点
   * @param {*} key
   */
  queryNode (key) {
    return [{ id: 3, label: 'Node 3', x: -400, y: -50, shape: 'image', image: './nodeImg/person.png' }]
  },
  // ------------------------------------timespace---------------------------------------------//
  /**
   * 通过用户和密码登录
   * @param {*} username 用户名
   * @param {*} password 密码
   */
  spacequery (from) {
    return http({
      url: http.adornUrl('/spacequery'),
      method: 'post',
      data: http.adornData(from)
    })
  }
}
