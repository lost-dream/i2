import http from '@/utils/httpRequest'

// 获取用户信息
export function getUserInfo(data) {
  return http({
    url: http.adornUrl('admin/quertUserOne'),
    method: 'get',
    params: http.adornParams(data, false),
  })
}

// 用户信息修改
export function updateUserInfo(data) {
  return http({
    url: http.adornUrl('admin/userUpdateOne'),
    method: 'post',
    data: http.adornData(data, false, 'qs'),
  })
}

// 用户密码修改
export function updatePassword(data) {
  return http({
    url: http.adornUrl('admin/userUpdatePassword'),
    method: 'post',
    data: http.adornData(data, false),
  })
}
