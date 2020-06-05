import { password } from '../../intercept/index'

Page({
  data: {
    isAdd: true,
    id: '',
    title: '',
    content: '',
  },
  onLoad(options){
    if (options.id) {
      this.setData({
        isAdd: false,
        id: options.id,
        title: decodeURIComponent(options.note_title),
        content: decodeURIComponent(options.note_content),
      })
    }
  },
  /*
   * 保存按钮
   */ 
  save(e){
    const {title, content} = e.detail.value
    if (!title) {
      wx.showToast({
        title: '请填写标题',
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
      this.add({title, content})
    } else {
      this.update({title, content})
    }
  },
  /*
   * 新增
   * @params {string} params.title 标题
   * @params {object} params.content 内容
   */
  add(params){
    note.add({
      note_title: params.title,
      note_content: params.content,
    }).then(res=>{
      wx.navigateBack()
    })
  },
  /*
   * 修改
   * @params {string} params.title 标题
   * @params {object} params.content 内容
   */
  update(params){
    note.update({
      id: this.data.id,
      note_title: params.title,
      note_content: params.content,
    }).then(res=>{
      wx.navigateBack()
    })
  },
  /*
   * 删除
   */
  delete(){
    wx.showModal({
      title: `确认删除${this.data.title}?`,
      confirmText: '删除',
      confirmColor: '#F00',
      success: res=>{
        if (res.confirm) {
          note.delete({
            id: this.data.id
          }).then(res=>{
            wx.navigateBack()
          })
        }
      }
    })
  },
})
