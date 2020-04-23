import config from '../../config/config'

Page({
  data: {
  },
  onLoad() {
    wx.showNavigationBarLoading()
    // 必须在冷启动时在取数据预加载的内容，不然会取到上次的
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
   * 进入小程序的登录请求
   * （开发/测试环境使用，或作为生产环境数据预加载失败的兜底）
   * @param {String} env 当前环境
   * @return {String} path 落地页需要跳转的页面
   */
  fetchLogin () {
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
    console.log(result)
  },
})
