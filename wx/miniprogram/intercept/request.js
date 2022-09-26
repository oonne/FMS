import config from '../config/config';

/*
 * 发起http请求
 */
const request = (opt) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.reqApi + opt.url,
      data: opt.data,
      header: {
        'X-Auth-Token': getApp().globalData.token,
      },
      timeout: 10000,
      method: opt.method,
      dataType: 'json',
      enableHttp2: true,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

module.exports = request;
