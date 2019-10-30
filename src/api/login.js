import http from '@/utils/httpRequest'

// 通过用户和密码登录
export function login(userData) {
  return http({
    url: process.env.VUE_APP_LOGIN_REQUEST_URL,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: http.adornData(userData, false, 'qs'),
  })
}

/**
 * 通过token获取用户信息
 * @param {*} token 令牌
 */
export function getUserInfo(token) {
  return http({
    url: http.adornUrl('/user/info'),
    method: 'get',
    params: http.adornParams({ token }),
  })
}

// 设置用户二级问题和密码
export function setSecondaryPassword(data) {
  return http({
    url: http.adornUrl('admin/updateSecondary'),
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: http.adornData(data, false, 'qs'),
  })
}

export function verificat2ndPWD(data) {
  return http({
    url: http.adornUrl(
      `admin/userTwoPassword?id=${data.id}&twoPassword=${data.twoPassword}`,
    ),
    method: 'post',
  })
}
