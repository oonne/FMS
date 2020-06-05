import request from '../request'
export default {
  index(data) {
    return request({
      method: 'GET',
      url: '/diary/index',
      data: data
    })
  },
  add(data) {
    return request({
      method: 'POST',
      url: '/diary/add',
      data: data
    })
  },
  update(data) {
    return request({
      method: 'POST',
      url: '/diary/update',
      data: data
    })
  },
  delete(data) {
    return request({
      method: 'POST',
      url: '/diary/delete',
      data: data
    })
  },
}
