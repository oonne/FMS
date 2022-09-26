import route from '../../config/route';
import { formatDate } from '../../utils/util';
import { statistics } from '../../intercept/index';

Page({
  data: {
    // 消费
    expenses: {
      daily: 0, // 当日统计
    },
    // 收入
    income: {},
    // 日记
    diary: {
      date: formatDate(new Date(), 'yyyy-MM-dd'), // 当前日期
    },
    // 记事本
    notes: {
      count: 0, // 总数量
    },
    // 密码
    password: {
      count: 0, // 总数量
    },
  },
  onLoad() {
    wx.showNavigationBarLoading();
    this.fetchLogin();
  },
  onShow() {
    this.getDatas();
  },
  // 发起登录请求
  fetchLogin() {
    wx.cloud
      .callFunction({
        name: 'login',
      })
      .then((res) => {
        this.loginSuccess(res.result);
      });
  },
  // 登录接口返回之后的逻辑
  loginSuccess(result) {
    wx.hideNavigationBarLoading();
    getApp().globalData.openId = result.wxContext.OPENID;
    getApp().globalData.token = result.res.data.access_token;
    getApp().globalData.name = result.res.data.nickname;

    // 先存在本地，方便以后直接从本地获取
    wx.setStorage({
      key: 'openId',
      data: result.wxContext.OPENID,
    });

    // 登录完成之后，刷新数据
    this.getDatas();
  },

  /**
   * 刷新数据
   */
  // 获取统计数据和基础数据
  async getDatas() {
    if (!getApp().globalData.token) {
      return;
    }

    wx.showLoading({
      mask: true,
    });
    const res = await statistics.index();

    const {
      dailyExpenses,
      noteCount,
      passwordCount,
      source,
      handler,
      category,
    } = res.Data;
    this.setData({
      'expenses.daily': dailyExpenses || 0,
      'notes.count': noteCount || 0,
      'password.count': passwordCount || 0,
    });
    getApp().globalData.source = source;
    getApp().globalData.handler = handler;
    getApp().globalData.category = category;

    wx.hideLoading();
  },

  /**
   * 跳转到指定页面
   */
  toPage(e) {
    const { page } = e.currentTarget.dataset;
    if (page) {
      wx.navigateTo({
        url: route[page],
      });
    }
  },
});
