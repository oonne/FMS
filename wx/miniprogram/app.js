import config from 'config/config'

App({
  globalData: {
    openId: '',
    token: '',
  },
  onLaunch: function (options) {
    console.log("-------------Launch", config.version, options)
    // 初始化云函数环境
    this.cloudInit()
    // 检查更新版本
    this.updataVersion()
  },
  /*初始化云函数环境*/ 
  cloudInit () {
    wx.cloud.init({
      env: config.cloudEnv,
      traceUser: true,
    })
  },
  /*更新版本*/ 
  updataVersion () {
    try {
      const updateManager = wx.getUpdateManager()
      updateManager.onUpdateReady(function () {
        setTimeout(function () {
          wx.showModal({
            content: '新版本已经准备好，点击重启应用',
            showCancel: false,
            success: function (res) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          })
        }, 2000)
      })
    } catch (e) {}
  },
})
