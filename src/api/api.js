import http from '@/utils/httpRequest'

export default {
  /**
   * 通过用户和密码登录
   * @param {*} username 用户名
   * @param {*} password 密码
   */
  login (username, password) {
    return http({
      url: http.adornUrl('/login'),
      method: 'post',
      data: http.adornData({
        username: username,
        password: password
      })
    })
  },
  /**
   * 通过token获取用户信息
   * @param {*} token 令牌
   */
  getUserInfo (token) {
    return http({
      url: http.adornUrl('/user/info'),
      method: 'get',
      params: http.adornParams({
        token
      })
    })
  },
  /**
   * 获取用户对应菜单
   */
  getMenuNav () {
    return http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',
      params: http.adornParams()
    })
  },
  /**
   * 图片上传
   */
  uploadImg (fd) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return http.post(http.adornUrl(`/sys/upload`), fd, config)
  },
  /**
   * 获取banner列表
   */
  getBannerList () {
    return http({
      url: http.adornUrl('/st_banner/list'),
      method: 'get',
      params: http.adornParams()
    })
  },
  /**
   * 根据id获取banner详情
   * @param {*} id id
   */
  getBannerInfo (id) {
    return http({
      url: http.adornUrl('/st_banner/info'),
      method: 'get',
      params: http.adornParams({ id })
    })
  },
  bannerAddOrUpdate (addr, datas) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return http.post(http.adornUrl(`/st_banner/${addr}`), datas, config)
  },
  bannerDelete (bannerIds) {
    return http({
      url: http.adornUrl('/st_banner/delete'),
      method: 'post',
      data: http.adornData(bannerIds, false)
    })
  },
  /**
   * 获取news列表
   */
  getNewsList () {
    return http({
      url: http.adornUrl('st_news/list'),
      method: 'get',
      params: http.adornParams()
    })
  },
  getNewsInfo (id) {
    return http({
      url: http.adornUrl('/st_news/info'),
      method: 'get',
      params: http.adornParams({ id })
    })
  },
  newsAddOrUpdate (addr, datas) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return http.post(http.adornUrl(`/st_news/${addr}`), datas, config)
  },
  newsDelete (ids) {
    return http({
      url: http.adornUrl('/st_news/delete'),
      method: 'post',
      data: http.adornData(ids, false)
    })
  },
  // product
  getProductMenuList () {
    return http({
      url: http.adornUrl('/st_product/menu/list'),
      method: 'get',
      params: http.adornParams()
    })
  },
  productMenuSelect () {
    return http({
      url: http.adornUrl('/st_product/menu/select'),
      method: 'get',
      params: http.adornParams()
    })
  },
  productMenuInfo (id) {
    return http({
      url: http.adornUrl(`/st_product/menu/info/${id}`),
      method: 'get',
      params: http.adornParams(null, false)
    })
  },
  productMenuAddOrUpdate (addr, datas) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return http.post(http.adornUrl(`/st_product/menu/${addr}`), datas, config)
    // return http({
    //   url: http.adornUrl(`/st_product/menu/${addr}`),
    //   method: 'post',
    //   data: http.adornData(datas, false)
    // })
  },
  productMenuDelete (id) {
    return http({
      url: http.adornUrl('/st_product/menu/delete'),
      method: 'post',
      data: http.adornData({ id }, false)
    })
  },
  productInfoAddOrUpdate (obj) {
    return http({
      url: http.adornUrl('/st_product/info/add'),
      method: 'post',
      data: http.adornData(obj, false)
    })
  },
  productInfo (id) {
    return http({
      url: http.adornUrl(`/st_product/info/${id}`),
      method: 'get',
      params: http.adornParams(null, false)
    })
  }

}
