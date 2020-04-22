Page({
  data: {
  },

  h1 () {
    wx.request({
      url: 'https://afms.oonne.com',
      enableHttp2: false,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res)
      }
    })
  },
  h2 () {
    wx.request({
      url: 'https://afms.oonne.com',
      enableHttp2: true,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res)
      }
    })
  },
})
