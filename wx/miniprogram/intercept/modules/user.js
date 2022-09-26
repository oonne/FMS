import request from '../request';

export default {
  login(data) {
    return request({
      method: 'POST',
      url: '/user/login',
      data,
    });
  },
};
