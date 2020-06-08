import { formatDate } from '../../utils/util'

Page({
  data: {
    isAdd: true,
    id: '',
    item: '',
    date: '',
    money: '',
  },
  onLoad(options){
    if (options._id) {
      this.setData({
        isAdd: false,
        id: options._id,
        item: decodeURIComponent(options.item),
        date: decodeURIComponent(options.date),
        money: decodeURIComponent(options.money),
      })
      wx.setNavigationBarTitle({
        title: decodeURIComponent(options.item)
      })
    } else {
      // 新增则默认今天
      let today = formatDate(new Date(), 'yyyy-MM-dd')
      this.setData({
        date: today,
      })
      wx.setNavigationBarTitle({
        title: '新增记账'
      })
    }
  },
  /*
   * 修改日期
   */
  changeDate (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /*
   * 保存按钮
   */ 
  save(e){
    const {item, date, money} = e.detail.value
    if (!item) {
      wx.showToast({
        title: '请填写项目',
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
    if (!money) {
      wx.showToast({
        title: '请填写金额',
        icon: 'none'
      })
      return
    }

    if (this.data.isAdd) {
      this.add({item, date, money})
    } else {
      this.update({item, date, money})
    }
  },
  /*
   * 新增
   * @params {string} params.item 项目
   * @params {object} params.date 日期
   * @params {object} params.money 金额
   */
  add(params){
    const db = wx.cloud.database()
    const expenses = db.collection('expenses')
    
    expenses.add({
      data: {
        item: params.item,
        date: params.date,
        money: params.money,
        created_at: db.serverDate(),
        updated_at: db.serverDate(),
      }
    }).then(()=>{
      wx.navigateBack()
    })
  },
  /*
   * 修改
   * @params {string} params.item 项目
   * @params {object} params.date 日期
   * @params {object} params.money 金额
   */
  update(params){
    const db = wx.cloud.database()
    const expenses = db.collection('expenses')

    expenses.doc(this.data.id)
    .update({
      data: {
        item: params.item,
        date: params.date,
        money: params.money,
        updated_at: db.serverDate(),
      }
    }).then(()=>{
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
          const db = wx.cloud.database()
          const expenses = db.collection('expenses')

          expenses.doc(this.data.id)
          .remove().then(()=>{
            wx.navigateBack()
          })
        }
      }
    })
  },
})
