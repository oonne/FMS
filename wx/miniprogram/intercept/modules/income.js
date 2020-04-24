import request from '../request'
export default {
  index(data) {
    return request({
      method: 'GET',
      url: '/income/index',
      data: data
    })
  },
  add(data) {
    return request({
      method: 'POST',
      url: '/income/add',
      data: data
    })
  },
  update(data) {
    return request({
      method: 'POST',
      url: '/income/update',
      data: data
    })
  },
  delete(data) {
    return request({
      method: 'POST',
      url: '/income/delete',
      data: data
    })
  },
}
