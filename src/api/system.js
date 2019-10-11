import http from '@/utils/httpRequest'

// 系统管理 -- 菜单管理 -- 获取左侧菜单
export function getMenu(data) {
  return http({
    url: http.adornUrl('admin/permissionList'),
    method: 'post',
    data: http.adornData(data, false, 'qs'),
  })
}

// 用户列表查询接口
export function queryUserApi(data) {
  return http({
    url: http.adornUrl('admin/quertUser'),
    method: 'post',
    data: http.adornData(data, false, 'qs'),
  })
}
