import http from '@/utils/httpRequest'

export function searchList(data) {
  return http({
    url: http.adornUrl('i2/cacheDataCtlr/getAllCacheDataByUsername'),
    method: 'post',
    data: http.adornData(data),
  })
}
