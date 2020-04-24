import request from '../request'
export default {
  index(data) {
    return request({
      method: 'GET',
      url: '/expenses/index',
      data: data
    })
  },
  add(data) {
    return request({
      method: 'POST',
      url: '/expenses/add',
      data: data
    })
  },
  update(data) {
    return request({
      method: 'POST',
      url: '/expenses/update',
      data: data
    })
  },
  delete(data) {
    return request({
      method: 'POST',
      url: '/expenses/delete',
      data: data
    })
  },
}
