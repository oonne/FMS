import route from '../../config/route'

/*
 * 添加按钮
 * 功能：点击跳转到指定的表单
 */
Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  properties: {
    page: {
      type: String,
      value: 'INDEX',
    },
  },
  data: {
    color: ''
  },
  attached(){
    this.setColor()
  },
  methods: {
    setColor(){
      let color = ''
      switch (this.properties.page) {
        case "CLOUD_NOTES_DETAIL":
          color = 'cloud-notes'
          break
      }
      this.setData({
        color: color
      })
    },
    onAdd(){
      wx.navigateTo({
        url: route[this.properties.page]
      })
    },
  }
})
