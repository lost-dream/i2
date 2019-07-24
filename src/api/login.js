import http from '@/utils/httpRequest'

/**
 * 通过用户和密码登录
 * @param {*} username 用户名
 * @param {*} password 密码
 */
export function loginByUserName (username, password) {
  return http({
    url: http.adornUrl('/sys/login'),
    method: 'post',
    data: http.adornData({
      'username': username,
      'password': password
    })
  })
}
/**
 * 通过token获取用户信息
 * @param {*} token 令牌
 */
export function getUserInfo (token) {
  return http({
    url: http.adornUrl('/user/info'),
    method: 'get',
    params: http.adornParams({ token })
  })
}
