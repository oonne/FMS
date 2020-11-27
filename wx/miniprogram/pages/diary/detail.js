import { diary } from '../../intercept/index'
import { formatDate } from '../../utils/util'

Page({
  data: {
    isAdd: true,
    id: '',
    date: '',
    content: '',
  },
  onLoad(options){
    if (options.id) {
      // 修改则读取数据
      const content = wx.getStorageSync('diary')
      this.setData({
        isAdd: false,
        id: options.id,
        date: decodeURIComponent(options.diary_date),
        content: content,
      })
      wx.setNavigationBarTitle({
        title: decodeURIComponent(options.diary_date)
      })
    } else {
      // 新增则默认今天
      let today = formatDate(new Date(), 'yyyy-MM-dd')
      this.setData({
        date: today,
      })
      wx.setNavigationBarTitle({
        title: today
      })
    }
  },
  onUnload(){
    wx.removeStorage({
      key: 'diary'
    })
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
    const {date, content} = e.detail.value
    if (!date) {
      wx.showToast({
        title: '请填写日期',
        icon: 'none'
      })
      return
    }
    if (!content) {
      wx.showToast({
        title: '请填写内容',
        icon: 'none'
      })
      return
    }

    if (this.data.isAdd) {
      this.add({date, content})
    } else {
      this.update({date, content})
    }
  },
  /*
   * 新增
   * @params {string} params.date 日期
   * @params {object} params.content 内容
   */
  add(params){
    diary.add({
      diary_date: params.date,
      diary_content: params.content,
    }).then(res=>{
      wx.navigateBack()
    })
  },
  /*
   * 修改
   * @params {string} params.date 日期
   * @params {object} params.content 内容
   */
  update(params){
    diary.update({
      id: this.data.id,
      diary_date: params.date,
      diary_content: params.content,
    }).then(res=>{
      wx.navigateBack()
    })
  },
  /*
   * 删除
   */
  delete(){
    wx.showModal({
      title: `确认删除${this.data.date}?`,
      confirmText: '删除',
      confirmColor: '#F00',
      success: res=>{
        if (res.confirm) {
          diary.delete({
            id: this.data.id
          }).then(res=>{
            wx.navigateBack()
          })
        }
      }
    })
  },
})
