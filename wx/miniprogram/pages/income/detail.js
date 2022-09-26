import { income } from '../../intercept/index';
import { formatDate } from '../../utils/util';

Page({
  data: {
    sourceArray: [],
    isAdd: true,
    id: '',
    item: '',
    money: '',
    date: '',
    source: 0,
    sourceName: '',
    remark: '',
    loading: true,
  },
  onLoad(options) {
    const sourceList = getApp().globalData.source;
    const sourceArray = sourceList.map((item) => item.income_source);
    if (options.id) {
      // 修改则读取数据
      const sourceIndex = sourceList.findIndex(
        (item) => item.id === Number(options.income_source),
      );
      const sourceName = sourceArray[sourceIndex];
      this.setData({
        sourceArray,
        isAdd: false,
        id: options.id,
        item: decodeURIComponent(options.income_item),
        money: decodeURIComponent(options.income_money),
        date: decodeURIComponent(options.income_date),
        source: sourceIndex,
        sourceName,
        remark: decodeURIComponent(options.income_remark),
        loading: false,
      });
      wx.setNavigationBarTitle({
        title: decodeURIComponent(options.income_item),
      });
    } else {
      // 新增则默认今天
      const today = formatDate(new Date(), 'yyyy-MM-dd');
      this.setData({
        sourceArray,
        date: today,
        source: 0,
        sourceName: sourceArray[0],
        loading: false,
      });
      wx.setNavigationBarTitle({
        title: '新增收入',
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
   * 修改来源
   */
  changeSource(e) {
    const { value } = e.detail;
    this.setData({
      source: value,
      sourceName: this.data.sourceArray[value],
    });
  },
  /*
   * 保存按钮
   */
  save(e) {
    const { item, money, date, source, remark } = e.detail.value;
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
    const sourceList = getApp().globalData.source;
    const incomeSource = sourceList[source].id;

    this.setData({
      loading: true,
    });
    if (this.data.isAdd) {
      this.add({ item, money, date, incomeSource, remark });
    } else {
      this.update({ item, money, date, incomeSource, remark });
    }
  },
  /*
   * 新增
   * @params {string} params.item 项目
   * @params {object} params.money 金额
   * @params {object} params.date 日期
   * @params {object} params.incomeSource 来源
   * @params {object} params.remark 备注
   */
  add(params) {
    income
      .add({
        income_item: params.item,
        income_money: params.money,
        income_date: params.date,
        income_source: params.incomeSource,
        income_remark: params.remark,
      })
      .then(() => {
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
   * @params {object} params.incomeSource 来源
   * @params {object} params.remark 备注
   */
  update(params) {
    income
      .update({
        id: this.data.id,
        income_item: params.item,
        income_money: params.money,
        income_date: params.date,
        income_source: params.incomeSource,
        income_remark: params.remark,
      })
      .then(() => {
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
      success: async (res) => {
        if (!res.confirm) {
          return;
        }
        await income.delete({
          id: this.data.id,
        });
        wx.navigateBack();
      },
    });
  },
});
