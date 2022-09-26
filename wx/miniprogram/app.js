import config from 'config/config';

App({
  globalData: {
    openId: '',
    token: '',
    name: '',

    source: [],
    handler: [],
    category: [],
  },
  onLaunch(options) {
    console.log('-------------Launch', config.version, options);
    // 初始化云函数环境
    this.cloudInit();
    // 检查更新版本
    this.updateVersion();
  },
  /* 初始化云函数环境 */
  cloudInit() {
    wx.cloud.init({
      env: config.cloudEnv,
      traceUser: true,
    });
  },
  /* 更新版本 */
  updateVersion() {
    const updateManager = wx.getUpdateManager();

    updateManager.onUpdateReady(async () => {
      wx.showModal({
        content: '新版本已经准备好，点击重启应用',
        showCancel: false,
        success() {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        },
      });
    });

    // 更新失败
    updateManager.onUpdateFailed(async () => {
      console.error('更新失败，请重新打开小程序');
    });
  },
});
