import request from '../request';

export default {
  index(data) {
    return request({
      method: 'GET',
      url: '/expenses/index',
      data,
    });
  },
  add(data) {
    return request({
      method: 'POST',
      url: '/expenses/add',
      data,
    });
  },
  update(data) {
    return request({
      method: 'POST',
      url: '/expenses/update',
      data,
    });
  },
  delete(data) {
    return request({
      method: 'POST',
      url: '/expenses/delete',
      data,
    });
  },
};
