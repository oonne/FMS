import route from '../../config/route'
import { formatDate } from '../../utils/util'
import { statistics } from '../../intercept/index'

Page({
  data: {
    auth: false, //是否有家庭权限
    //云记账
    cloudExpenses: {
      count: 0, //总数量
    },
    //云笔记
    cloudNotes: {
      count: 0, //总数量
    },
    // 消费
    expenses: {
      daily: 0, //当日统计
    },
    // 收入
    income: {
    },
    //日记
    diary: {
      date: formatDate(new Date(), 'yyyy-MM-dd'), //当前日期
    },
    //记事本
    notes: {
      count: 0, //总数量
    },
    //密码
    password: {
      count: 0, //总数量
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
      this.loginSuccess(res.result)
    })
  },
  // 登录接口返回之后的逻辑
  loginSuccess (result) {
    wx.hideNavigationBarLoading()
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
  // 获取云数据库统计信息
  getCloudNotes () {
    if (!getApp().globalData.openId) {
      return
    }
    const db = wx.cloud.database()
    const notes = db.collection('notes')
    const expenses = db.collection('expenses')

    notes.where({
      _openid: getApp().globalData.openId,
    })
    .count()
    .then(res=>{
      this.setData({
        'cloudNotes.count': res.total
      })
    })
    expenses.where({
      _openid: getApp().globalData.openId,
    })
    .count()
    .then(res=>{
      this.setData({
        'cloudExpenses.count': res.total
      })
    })
  },
  // 获取统计数据和基础数据
  getDatas () {
    if (!getApp().globalData.token) {
      return
    }
    statistics.index().then(res=>{
      const {dailyExpenses, noteCount, passwordCount, source, handler, category} = res.Data
      this.setData({
        'expenses.daily': dailyExpenses || 0,
        'notes.count': noteCount || 0,
        'password.count': passwordCount || 0,
      })
      getApp().globalData.source = source
      getApp().globalData.handler = handler
      getApp().globalData.category = category
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 跳转到指定页面
   */
  toPage(e) {
    let page = e.currentTarget.dataset.page
    if (page) {
      wx.navigateTo({
        url: route[page],
      })
    }
  },
})
