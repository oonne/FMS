import request from '../request';

export default {
  index(data) {
    return request({
      method: 'GET',
      url: '/password/index',
      data,
    });
  },
  add(data) {
    return request({
      method: 'POST',
      url: '/password/add',
      data,
    });
  },
  update(data) {
    return request({
      method: 'POST',
      url: '/password/update',
      data,
    });
  },
  delete(data) {
    return request({
      method: 'POST',
      url: '/password/delete',
      data,
    });
  },
};
