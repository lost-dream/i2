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

// 删除 || 停用 || 启用用户
export function operateUser(params) {
  return http({
    url: http.adornUrl('admin/userOnedandT'),
    method: 'get',
    params: http.adornParams(params, false),
  })
}

// 重置密码
export function resetPassword(params) {
  return http({
    url: http.adornUrl('admin/userCzPassword'),
    method: 'get',
    params: http.adornParams(params, false),
  })
}

// 重置回答二级密码问题
export function reset2ndPWD(params) {
  return http({
    url: http.adornUrl('admin/userSecondaryPassword'),
    method: 'get',
    params: http.adornParams(params, false),
  })
}

// 查询机构
export function queryDepartment(data) {
  return http({
    url: http.adornUrl(
      `admin/queryDepartment?page=${data.page}&size=${data.size}`,
    ),
    method: 'post',
  })
}

// 添加机构
export function addDepartment(data) {
  return http({
    url: http.adornUrl(
      `admin/addDepartment?userId=${data.userId}&title=${data.title}&coding=${
        data.coding
      }&describe=${data.describe}&parentId=${data.parentId}&roleCount=${
        data.roleCount
      }`,
    ),
    method: 'post',
  })
}

// 编辑机构
export function editDepartment(data) {
  return http({
    url: http.adornUrl(
      `admin/compileDepartment?userId=${data.userId}&id=${data.id}&title=${
        data.title
      }&coding=${data.coding}&describe=${data.describe}&parentId=${
        data.parentId
      }&roleCount=${data.roleCount}`,
    ),
    method: 'post',
  })
}

// 删除机构
export function delDepartment(data) {
  return http({
    url: http.adornUrl(`admin/departmentDel?id=${data.id}`),
    method: 'post',
  })
}
