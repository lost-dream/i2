import http from '@/utils/httpRequest'

export function getUserInfo(data) {
  return http({
    url: http.adornUrl('quertUserOne'),
    method: 'get',
    params: http.adornParams(data),
  })
}
