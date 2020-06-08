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
      wx.setNavigationBarTitle({
        title: decodeURIComponent(options.title)
      })
    } else {
      wx.setNavigationBarTitle({
        title: '新增笔记'
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
    const expenses = db.collection('expenses')
    
    expenses.add({
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
    const expenses = db.collection('expenses')

    expenses.doc(this.data.id)
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
    wx.showModal({
      title: `确认删除${this.data.title}?`,
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
