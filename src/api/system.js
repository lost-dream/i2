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
    method: 'get',
    params: http.adornParams(data, false, 'qs'),
  })
}

// 查询机构下拉框选项
export function queryDepartmentApi(data) {
  return http({
    url: http.adornUrl('admin/departmentDropDownBox'),
    method: 'post',
    data: http.adornData(data, false, 'qs'),
  })
}
// 查询用户组
export function queryUserGroup(data) {
  return http({
    url: http.adornUrl('admin/queryRole'),
    method: 'post',
    data: http.adornData(data, false, 'qs'),
  })
}

// 查询警种类别
export function queryPoliceType(params) {
  return http({
    url: http.adornUrl('admin/queryTLaunchingTheCategoryquertList'),
    method: 'get',
    params: http.adornParams(params, false),
  })
}

// 添加用户
export function addUser(data) {
  return http({
    url: http.adornUrl('admin/addUser'),
    method: 'post',
    data: http.adornData(data, false, 'qs'),
  })
}
