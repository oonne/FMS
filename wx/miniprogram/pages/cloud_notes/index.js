import route from '../../config/route'

Page({
  data: {
    list: [],
  },
  onShow () {
    this.fetchData()
  },

  toItem(e) {
    let page = e.currentTarget.dataset.id

    
    if (page) {
      wx.navigateTo({
        url: route[page],
      })
    }
  },
})
