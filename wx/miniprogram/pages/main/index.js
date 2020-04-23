import config from '../../config/config'

Page({
  data: {
  },
  onLoad() {
    this.login()
  },
  /**
   * 登录(从数据预拉取拿结果，或者直接发起请求)
   */
  login () {
    wx.showNavigationBarLoading()
    if (wx.getBackgroundFetchData) {
      // 数据预加载
      wx.getBackgroundFetchData({
        fetchType: 'pre',
        success: res=> {
          const data = JSON.parse(res.fetchedData)
          this.loginSuccess(data)
        },
        fail: res=> {
          this.fetchLogin()
        },
      })
    } else {
      this.fetchLogin()
    }
  },
  /**
   * 直接发起登录请求
   * @param {String} env 当前环境
   * @return {String} path 落地页需要跳转的页面
   */
  fetchLogin () {
    console.warn('直接发起登录请求')
    wx.cloud.callFunction({
      name: 'login',
    }).then(res=>{
      wx.hideNavigationBarLoading()
      this.loginSuccess(res.result)
    })
  },
  /**
   * 登录接口调用完成的处理
   * @param {Object} result 登录接口返回结果
   */
  loginSuccess (result) {
    getApp().globalData.openId = result.wxContext.OPENID
    getApp().globalData.token = result.res.data.access_token
    getApp().globalData.name = result.res.data.nickname
  },


})
