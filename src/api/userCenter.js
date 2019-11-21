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
    url: http.adornUrl(
      `admin/userUpdateOne?id=${data.id}&nickName=${data.nickName}&siren=${data.siren}&card=${data.card}&mobile=${data.mobile}&email=${data.email}`,
    ),
    method: 'post',
  })
}

// 用户密码修改
export function updatePassword(data) {
  return http({
    url: http.adornUrl(
      `admin/userUpdatePassword?id=${data.id}&longPassword=${data.longPassword}&newPassword=${data.newPassword}&affirmPassword=${data.affirmPassword}`,
    ),
    method: 'post',
  })
}
