import config from '../config/config'

/*
 * 发起http请求
 */ 
const request = (opt) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.reqApi+opt.url,
      data: opt.data,
      header: {
        'kp-request-id': getApp().globalData.token,
      },
      timeout: 10000,
      method: opt.method,
      dataType: 'json',
      enableHttp2: true,
      success(res){
        if (res.statusCode == 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail(err){
        reject(err)
      },
    })
  })




























  // init params
  let isShowloading = true
  let params = Object.assign({
    method: 'POST',
    data: {}
  }, JSON.parse(JSON.stringify(opt)))

  let requestTaskId
  params.data && params.data.requestTaskId && (requestTaskId = params.data.requestTaskId, delete params.data.requestTaskId)
  let consoleErrLog = (errLog, params) => {
    if(config.printNetworkErr) {
      errLog.apiUrl = buildURL(params)
      errLog.reqBody = params.data
      console.error(errLog)
    }
  }
  return new Promise((resolve, reject) => {
    // delete loading status
    params.data && !!params.data.loading !== undefined && (delete params.data.loading)
    Object.assign(params, {
      url: buildURL(params),
      header: buildGatewayHeader(),
      data: params.data,
      success: function (res) {
        let wxRes = res
        let kpServerRes= wxRes.data
        let errMsg =' [' + res.data.requestId + '，' + res.data.code + ']'
        if(wxRes.statusCode == 200) {
          if(kpServerRes.code == 0) {
            resolve(kpServerRes)
          } else if (kpServerRes.code == 100003) {
            // token过期处理 TODO
            reject(kpServerRes)
          } else if (~whiteList.indexOf(kpServerRes.code)) {
            reject(kpServerRes)
          } else {
            wx.showToast({
              icon: 'none',
              title: (kpServerRes.msg || '系统繁忙,请稍后再试') + errMsg,
              duration: 3000
            })
            // 错误日志处理
            consoleErrLog(kpServerRes, params)
            reject(kpServerRes)
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: '网络繁忙，请稍后再试',
            duration: 3000
          })
          // 错误日志处理
          consoleErrLog(kpServerRes, params)
          reject(kpServerRes)
        }
      },
      fail: function (err) {
        // 如果错误类型为abort 页面不做提示, 非abort类型才做提示
        if(!(err.errMsg && err.errMsg.toLowerCase().indexOf('request:fail abort') !== -1)) {
          wx.showToast({
            icon: 'none',
            title: '~网络繁忙，请稍后再试',
            duration: 3000
          })
        }
        reject(err)
      },
      complete: function (res) {
        deleteRequestTask(requestTaskId) // delete completed request task
      }
    })
    opt.data &&  opt.data.loading === false && (isShowloading = false)
    const requestTask = wx.request(params)
    setRequestTask(requestTaskId, requestTask) // 暂存request task
  }).catch(err => {
    // wechat server 500
    if (err.errMsg === 'request:fail timeout') {
      wx.showToast({
        icon: 'none',
        title: config.common.server_out,
        duration: 3000
      })
    }

    if (err.data && err.data.error) {
      err.code = err.data.error.substr(-9);
    }
    return Promise.reject(err)
  })
}

module.exports = request
