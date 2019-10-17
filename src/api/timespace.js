import http from '@/utils/httpRequest'

export function searchList(data) {
  return http({
    url: http.adornUrl('space/spacetime/spacequery'),
    method: 'post',
    data: http.adornData(data, false),
  })
}

export function analyzedetailsApi(data) {
  return http({
    url: http.adornUrl('space/spacetime/analyzedetails'),
    method: 'post',
    data: http.adornData(data, false),
  })
}
