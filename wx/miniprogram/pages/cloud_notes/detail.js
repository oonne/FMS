Page({
  data: {
    isAdd: true,
    id: '',
    title: '',
    content: '',
  },
  onLoad(options){
    if (options._id) {
      this.setData({
        isAdd: false,
        id: options._id,
        title: decodeURIComponent(options.title),
        content: decodeURIComponent(options.content),
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
      data: {
        title: params.title,
        content: params.content,
        created_at: db.serverDate(),
        updated_at: db.serverDate(),
      }
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

    notes.doc(this.data.id)
    .update({
      data: {
        title: params.title,
        content: params.content,
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
    const db = wx.cloud.database()
    const notes = db.collection('notes')

    notes.doc(this.data.id)
    .remove().then(()=>{
      wx.navigateBack()
    })
  },
})
