import http from '@/utils/httpRequest'

// 通过用户和密码登录
export function archivesDetailApi(params) {
  return http({
    url: http.adornUrl('i2/nodeDetailCtlr/archives'),
    method: 'get',
    params: http.adornParams(params, false),
  })
}
