import { password } from '../../intercept/index'
import { auditRedirect } from '../../utils/util'

Page({
  data: {
    isAdd: true,
    id: '',
    item: '',
    userName: '',
    password: '',
    remark: '',
  },
  onLoad(options){
    auditRedirect()
    
    if (options.id) {
      this.setData({
        isAdd: false,
        id: options.id,
        item: decodeURIComponent(options.password_item),
        userName: decodeURIComponent(options.user_name),
        password: decodeURIComponent(options.password),
        remark: decodeURIComponent(options.password_remark),
      })
      wx.setNavigationBarTitle({
        title: decodeURIComponent(options.password_item)
      })
    } else {
      wx.setNavigationBarTitle({
        title: '新增密码'
      })
    }
  },
  /*
   * 保存按钮
   */ 
  save(e){
    const {item, userName, password, remark} = e.detail.value
    if (!item) {
      wx.showToast({
        title: '请填写密码项',
        icon: 'none'
      })
      return
    }
    if (!userName) {
      wx.showToast({
        title: '请填写用户名',
        icon: 'none'
      })
      return
    }
    if (!password) {
      wx.showToast({
        title: '请填写密码',
        icon: 'none'
      })
      return
    }

    if (this.data.isAdd) {
      this.add({item, userName, password, remark})
    } else {
      this.update({item, userName, password, remark})
    }
  },
  /*
   * 新增
   * @params {string} params.item 密码项
   * @params {object} params.userName 用户名
   * @params {object} params.password 密码
   * @params {object} params.remark 备注
   */
  add(params){
    password.add({
      password_item: params.item,
      user_name: params.userName,
      password: params.password,
      password_remark: params.remark,
    }).then(res=>{
      wx.navigateBack()
    })
  },
  /*
   * 修改
   * @params {string} params.item 密码项
   * @params {object} params.userName 用户名
   * @params {object} params.password 密码
   * @params {object} params.remark 备注
   */
  update(params){
    password.update({
      id: this.data.id,
      password_item: params.item,
      user_name: params.userName,
      password: params.password,
      password_remark: params.remark,
    }).then(res=>{
      wx.navigateBack()
    })
  },
  /*
   * 删除
   */
  delete(){
    wx.showModal({
      title: `确认删除${this.data.item}?`,
      confirmText: '删除',
      confirmColor: '#F00',
      success: res=>{
        if (res.confirm) {
          password.delete({
            id: this.data.id
          }).then(res=>{
            wx.navigateBack()
          })
        }
      }
    })
  },
})
