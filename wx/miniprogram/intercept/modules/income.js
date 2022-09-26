import request from '../request';

export default {
  index(data) {
    return request({
      method: 'GET',
      url: '/income/index',
      data,
    });
  },
  add(data) {
    return request({
      method: 'POST',
      url: '/income/add',
      data,
    });
  },
  update(data) {
    return request({
      method: 'POST',
      url: '/income/update',
      data,
    });
  },
  delete(data) {
    return request({
      method: 'POST',
      url: '/income/delete',
      data,
    });
  },
};
