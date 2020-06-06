import { income } from '../../intercept/index'

Page({
  data: {
    isAdd: true,
    id: '',
    item: '',
    money: '',
    date: '',
    source: '',
    remark: '',
  },
  onLoad(options){
    if (options.id) {
      this.setData({
        isAdd: false,
        id: options.id,
        item: decodeURIComponent(options.income_item),
        money: decodeURIComponent(options.income_money),
        date: decodeURIComponent(options.income_date),
        source: decodeURIComponent(options.income_source),
        remark: decodeURIComponent(options.income_remark),
      })
      wx.setNavigationBarTitle({
        title: decodeURIComponent(options.income_item)
      })
    }
  },
  /*
   * 保存按钮
   */ 
  save(e){
    const {item, money, date, source, remark} = e.detail.value
    if (!item) {
      wx.showToast({
        title: '请填写项目',
        icon: 'none'
      })
      return
    }
    if (!money) {
      wx.showToast({
        title: '请填写金额',
        icon: 'none'
      })
      return
    }
    if (!date) {
      wx.showToast({
        title: '请填写日期',
        icon: 'none'
      })
      return
    }

    if (this.data.isAdd) {
      this.add({item, money, date, source, remark})
    } else {
      this.update({item, money, date, source, remark})
    }
  },
  /*
   * 新增
   * @params {string} params.item 项目
   * @params {object} params.money 金额
   * @params {object} params.date 日期
   * @params {object} params.source 来源
   * @params {object} params.remark 备注
   */
  add(params){
    income.add({
      income_item: params.item,
      income_money: params.money,
      income_date: params.date,
      income_source: params.source,
      income_remark: params.remark,
    }).then(res=>{
      wx.navigateBack()
    })
  },
  /*
   * 修改
   * @params {string} params.item 项目
   * @params {object} params.money 金额
   * @params {object} params.date 日期
   * @params {object} params.source 来源
   * @params {object} params.remark 备注
   */
  update(params){
    income.update({
      id: this.data.id,
      income_item: params.item,
      income_money: params.money,
      income_date: params.date,
      income_source: params.source,
      income_remark: params.remark,
    }).then(res=>{
      wx.navigateBack()
    })
  },
  /*
   * 删除
   */
  delete(){
    wx.showModal({
      title: `确认删除${this.data.item}?`,
      confirmText: '删除',
      confirmColor: '#F00',
      success: res=>{
        if (res.confirm) {
          income.delete({
            id: this.data.id
          }).then(res=>{
            wx.navigateBack()
          })
        }
      }
    })
  },
})
