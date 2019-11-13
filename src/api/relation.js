import http from '@/utils/httpRequest'

// 系统管理 -- 角色管理 -- 删除角色
export function relationAnalysisExpand(data) {
  return http({
    url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/relationAnalysisExpand'),
    method: 'post',
    data: http.adornParams(data, false),
  })
}
