import config from '../../config/config';
import route from '../../config/route';
import { obj2url } from '../../utils/util';
import { expenses } from '../../intercept/index';

Page({
  data: {
    list: [],
    pageCount: 0, // 总条数
    page: 0, // 当前页数
    loading: false, // 是否正在加载数据
  },
  onShow() {
    this.initData();
  },
  onPullDownRefresh() {
    this.initData();
  },
  onReachBottom() {
    this.fetchData();
  },
  /*
   * 初始化数据
   */
  initData() {
    this.data.list = [];
    this.data.page = 0;
    this.data.pageCount = 1;
    this.fetchData();
  },
  /*
   * 获取下一页的数据
   */
  fetchData() {
    let { pageCount, page, loading, list } = this.data;
    // 防止重复刷新
    if (loading) {
      return;
    }
    // 最后一页不再刷新
    if (page >= pageCount) {
      return;
    }
    page++;
    this.setData({
      loading: true,
    });

    expenses
      .index({
        'per-page': config.pageSize,
        page,
      })
      .then((res) => {
        const data = this.formatDate(res.data);
        this.setData({
          list: page === 1 ? data : list.concat(data),
          page: res.meta.currentPage,
          pageCount: res.meta.pageCount,
          loading: false,
        });
        wx.stopPullDownRefresh();
      });
  },
  /*
   * 格式化数据
   * 将分类和经手人格式化成可展示的数据
   * params {array} list 服务端返回的列表
   * return {array} list 格式化后的列表
   */
  formatDate(list) {
    const categoryList = getApp().globalData.category;
    const handlerList = getApp().globalData.handler;
    return list.map((item) => {
      const category = categoryList.find(
        (categoryItem) => categoryItem.id == item.expenses_category,
      );
      item.category = category.category_name;
      const handler = handlerList.find(
        (handlerItem) => handlerItem.id == item.expenses_handler,
      );
      item.handler = handler.handler_name;
      return item;
    });
  },
  toDetail(e) {
    const { id } = e.currentTarget.dataset;
    const expenses = this.data.list.find((item) => item.id === id);

    wx.navigateTo({
      url: `${route.EXPENSES_DETAIL}?${obj2url(expenses)}`,
    });
  },
});
