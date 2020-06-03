import route from '../../config/route'

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
        title: options.title,
        content: options.content,
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
    const db = wx.cloud.database()
    const notes = db.collection('notes')
    
    notes.add({
      data: params
    }).then(()=>{
      wx.navigateBack()
    })
  },
  /*
   * 修改
   * @params {string} params.title 标题
   * @params {object} params.content 内容
   */
  update(params){
    const db = wx.cloud.database()
    const notes = db.collection('notes')
  },
  /*
   * 删除
   */
  delete(){
  },
})
