import route from '../../config/route';
import { formatDate } from '../../utils/util';
import { user, statistics } from '../../intercept/index';

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
    this.login();
  },
  onShow() {
    this.getDatas();
  },
  /**
   * 登录流程
   */
  // 登录
  async login() {
    wx.showLoading({
      mask: true,
    });

    // 获取 openId
    const openId =
      wx.getStorageSync('openId') || 'or4p85dDj9Tbn7jaD6X0fxmt3EOg';
    getApp().globalData.openId = openId;

    // 登录接口
    const {
      data: { access_token: accessToken, nickname },
    } = await user.login({
      openid: openId,
    });

    getApp().globalData.token = accessToken;
    getApp().globalData.name = nickname;

    // 登录完成之后，刷新数据
    await this.getDatas();
    wx.hideLoading();
  },

  /**
   * 刷新数据
   */
  // 获取统计数据和基础数据
  async getDatas() {
    if (!getApp().globalData.token) {
      return;
    }

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
