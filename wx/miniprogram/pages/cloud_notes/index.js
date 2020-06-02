import route from '../../config/route'

Page({
  data: {
    list: [],
  },
  onShow () {
    this.fetchData()
  },
  fetchData(){

  },
  toItem(e) {
    wx.navigateTo({
      url: route[page],
    })
  },
})
