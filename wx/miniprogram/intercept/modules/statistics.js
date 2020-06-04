import request from '../request'
export default {
  index(data) {
    return request({
      method: 'GET',
      url: '/statistics/index',
      data: data
    })
  },
}
