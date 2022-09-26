import request from '../request';

export default {
  index(data) {
    return request({
      method: 'GET',
      url: '/diary/index',
      data,
    });
  },
  add(data) {
    return request({
      method: 'POST',
      url: '/diary/add',
      data,
    });
  },
  update(data) {
    return request({
      method: 'POST',
      url: '/diary/update',
      data,
    });
  },
  delete(data) {
    return request({
      method: 'POST',
      url: '/diary/delete',
      data,
    });
  },
};
