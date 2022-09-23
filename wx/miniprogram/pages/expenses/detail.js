import { expenses } from '../../intercept/index';
import { formatDate } from '../../utils/util';

Page({
  data: {
    categoryArray: [],
    handlerArray: [],
    isAdd: true,
    id: '',
    item: '',
    money: '',
    date: '',
    category: 0,
    categoryName: '',
    handler: 0,
    handlerName: '',
    remark: '',
    loading: true,
  },
  onLoad(options) {
    const categoryList = getApp().globalData.category;
    const categoryArray = categoryList.map((item) => item.category_name);
    const handlerList = getApp().globalData.handler;
    const handlerArray = handlerList.map((item) => item.handler_name);
    if (options.id) {
      // 修改则读取数据
      const categoryIndex = categoryList.findIndex(
        (item) => item.id == options.expenses_category,
      );
      const categoryName = categoryArray[categoryIndex];
      const handlerIndex = handlerList.findIndex(
        (item) => item.id == options.expenses_handler,
      );
      const handlerName = handlerArray[handlerIndex];
      this.setData({
        categoryArray,
        handlerArray,
        isAdd: false,
        id: options.id,
        item: decodeURIComponent(options.expenses_item),
        money: decodeURIComponent(options.expenses_money),
        date: decodeURIComponent(options.expenses_date),
        category: categoryIndex,
        categoryName,
        handler: handlerIndex,
        handlerName,
        remark: decodeURIComponent(options.expenses_remark),
        loading: false,
      });
      wx.setNavigationBarTitle({
        title: decodeURIComponent(options.expenses_item),
      });
    } else {
      // 新增则默认今天
      const today = formatDate(new Date(), 'yyyy-MM-dd');
      this.setData({
        categoryArray,
        handlerArray,
        date: today,
        category: 0,
        categoryName: categoryArray[0],
        handler: 0,
        handlerName: handlerArray[0],
        loading: false,
      });
      wx.setNavigationBarTitle({
        title: '新增消费',
      });
    }
  },
  /*
   * 修改日期
   */
  changeDate(e) {
    this.setData({
      date: e.detail.value,
    });
  },
  /*
   * 修改分类
   */
  changeCategory(e) {
    const { value } = e.detail;
    this.setData({
      category: value,
      categoryName: this.data.categoryArray[value],
    });
  },
  /*
   * 修改经手人
   */
  changeHandler(e) {
    const { value } = e.detail;
    this.setData({
      handler: value,
      handlerName: this.data.handlerArray[value],
    });
  },
  /*
   * 保存按钮
   */
  save(e) {
    const { item, money, date, category, handler, remark } = e.detail.value;
    if (!item) {
      wx.showToast({
        title: '请填写项目',
        icon: 'none',
      });
      return;
    }
    if (!money) {
      wx.showToast({
        title: '请填写金额',
        icon: 'none',
      });
      return;
    }
    if (!date) {
      wx.showToast({
        title: '请填写日期',
        icon: 'none',
      });
      return;
    }
    const categoryList = getApp().globalData.category;
    const expenses_category = categoryList[category].id;
    const handlerList = getApp().globalData.handler;
    const expenses_handler = handlerList[handler].id;

    this.setData({
      loading: true,
    });
    if (this.data.isAdd) {
      this.add({
        item,
        money,
        date,
        expenses_category,
        expenses_handler,
        remark,
      });
    } else {
      this.update({
        item,
        money,
        date,
        expenses_category,
        expenses_handler,
        remark,
      });
    }
  },
  /*
   * 新增
   * @params {string} params.item 项目
   * @params {object} params.money 金额
   * @params {object} params.date 日期
   * @params {object} params.expenses_category 分类
   * @params {object} params.expenses_handler 经手人
   * @params {object} params.remark 备注
   */
  add(params) {
    expenses
      .add({
        expenses_item: params.item,
        expenses_money: params.money,
        expenses_date: params.date,
        expenses_category: params.expenses_category,
        expenses_handler: params.expenses_handler,
        expenses_remark: params.remark,
      })
      .then((res) => {
        this.setData({
          loading: false,
        });
        wx.navigateBack();
      });
  },
  /*
   * 修改
   * @params {string} params.item 项目
   * @params {object} params.money 金额
   * @params {object} params.date 日期
   * @params {object} params.expenses_category 分类
   * @params {object} params.expenses_handler 经手人
   * @params {object} params.remark 备注
   */
  update(params) {
    expenses
      .update({
        id: this.data.id,
        expenses_item: params.item,
        expenses_money: params.money,
        expenses_date: params.date,
        expenses_category: params.expenses_category,
        expenses_handler: params.expenses_handler,
        expenses_remark: params.remark,
      })
      .then((res) => {
        this.setData({
          loading: false,
        });
        wx.navigateBack();
      });
  },
  /*
   * 删除
   */
  delete() {
    wx.showModal({
      title: `确认删除${this.data.item}?`,
      confirmText: '删除',
      confirmColor: '#F00',
      success: (res) => {
        if (res.confirm) {
          expenses
            .delete({
              id: this.data.id,
            })
            .then((res) => {
              wx.navigateBack();
            });
        }
      },
    });
  },
});
