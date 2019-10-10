import http from '@/utils/httpRequest'

export function getUserInfo(data) {
  return http({
    url: http.adornUrl('admin/quertUserOne'),
    method: 'get',
    params: http.adornParams(data, false),
  })
}

export function updateUserInfo(data) {
  return http({
    url: http.adornUrl('admin/userUpdateOne'),
    method: 'post',
    data: http.adornData(data, false, 'qs'),
  })
}
