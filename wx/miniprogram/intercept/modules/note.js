import request from '../request';

export default {
  index(data) {
    return request({
      method: 'GET',
      url: '/note/index',
      data,
    });
  },
  add(data) {
    return request({
      method: 'POST',
      url: '/note/add',
      data,
    });
  },
  update(data) {
    return request({
      method: 'POST',
      url: '/note/update',
      data,
    });
  },
  delete(data) {
    return request({
      method: 'POST',
      url: '/note/delete',
      data,
    });
  },
};
