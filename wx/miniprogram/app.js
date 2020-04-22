import config from 'config/config'

App({
  globalData: {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJVVUlEIjoiIiwiVFlQRSI6MywiTE9HSUNfSUQiOjEwMDIwMDAwMDAwMDAwMjU0MiwiZXhwIjoxNTkwMDY0OTg4LCJuYmYiOjE1ODc0NzI5ODh9.vyQrZhArNn-_ic63ljY-Q9qmBrlDGDPLwBF25KMmRKk',
    coldStart: true, //是否冷启动
  },
  onLaunch: function (options) {
    console.log("-------------Launch", config.version, options)
    // 初始化云函数环境
    this.cloudInit()
  },
  /*初始化云函数环境*/ 
  cloudInit () {
    wx.cloud.init({
      env: config.cloudEnv,
      traceUser: true,
    })
  },
})
