import config from '../../config/config'

Page({
  data: {
    auth: false, //是否有家庭权限
    //云笔记
    cloudNotes: {
      count: 0, //总数量
      lastNote: {}, //最后更新的笔记
    },
    // 消费
    expenses: {
      daily: 0, //当日统计
      monthly: 0, //当月统计
    },
    // 收入
    income: {
      monthly: 0, //当月统计
    },
    //记事本
    notes: {
      count: 0, //总数量
      lastNote: {}, //最后更新的笔记
    },
    //日记
    diary: {
      date: '', //当前日期
      content: '今日暂无内容', //今日日记
    },
  },
  onLoad () {
    this.login()
  },
  onShow () {
    this.getCloudNotes()
    this.getDatas()
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
  // 直接发起登录请求
  fetchLogin () {
    console.warn('直接发起登录请求')
    wx.cloud.callFunction({
      name: 'login',
    }).then(res=>{
      wx.hideNavigationBarLoading()
      this.loginSuccess(res.result)
    })
  },
  // 登录接口返回之后的逻辑
  loginSuccess (result) {
    getApp().globalData.openId = result.wxContext.OPENID
    getApp().globalData.token = result.res.data.access_token
    getApp().globalData.name = result.res.data.nickname

    // 登录完成之后，刷新数据
    this.getCloudNotes()
    this.getDatas()
    // 如果token有值，则显示更多功能
    if (getApp().globalData.token) {
      this.setData({
        auth: true,
      })
    }
  },

  /**
   * 刷新数据
   */
  // 下拉页面时，刷新数据
  onPullDownRefresh () {
    this.getCloudNotes()
    this.getDatas()
  },
  // 获取云笔记信息（云数据库）
  getCloudNotes () {
    if (!getApp().globalData.openId) {
      return
    }
    // TODO
  },
  // 获取其他数据（Api）
  getDatas () {
    if (!getApp().globalData.token) {
      return
    }
    // TODO
  },
})
