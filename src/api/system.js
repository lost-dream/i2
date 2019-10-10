import http from '@/utils/httpRequest'

export function getMenu(data) {
  return http({
    url: http.adornUrl('admin/permissionList'),
    method: 'post',
    data: http.adornData(data, false, 'qs'),
  })
}
