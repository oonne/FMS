import config from '../../config/config'
import route from '../../config/route'
import { obj2url } from '../../utils/util'

Page({
  data: {
    list: [],
    count: 0, //总条数
    page: 1, //当前页数
    loading: false, //是否正在加载数据
  },
  onShow() {
    this.initData()
  },
  onPullDownRefresh(){
    this.fetchData()
  },
  onReachBottom(){
    this.fetchData(true)
  },
  /*
   * 初始化数据
   */ 
  initData(){
    wx.showNavigationBarLoading()
    this.setData({
      list: [],
      count: 0,
      page: 1,
      loading: true,
    })
    const db = wx.cloud.database()
    const expenses = db.collection('expenses')

    expenses.where({
      _openid: getApp().globalData.openId,
    })
    .count()
    .then(res=>{
      let count = res.total
      this.setData({
        count: count,
        loading: false,
      })
      if (count) {
        this.fetchData()
      }
      wx.hideNavigationBarLoading()
    })
  },
  /*
   * 获取下一页的数据
   * @params {Boolean} next 是否加载下一页，默认否
   */ 
  fetchData(next=false){
    let {page, count, loading, list} = this.data;
    // 防止重复刷新
    if (loading) {
      return
    }
    // 最后一页不再刷新
    if ((page-1)*config.pageSize > count) {
      return
    }
    if (next) {
      page++
    }
    this.setData({
      loading: true
    })

    const db = wx.cloud.database()
    const expenses = db.collection('expenses')

    expenses.where({
      _openid: getApp().globalData.openId,
    })
    .orderBy('updated_at', 'desc')
    .skip((page-1)*config.pageSize)
    .limit(config.pageSize)
    .get()
    .then(res=>{
      this.setData({
        list: page===1 ? res.data : list.concat(res.data),
        page: page,
        loading: false,
      })
      wx.stopPullDownRefresh()
    })
  },
  toDetail(e) {
    const id = e.currentTarget.dataset.id
    const expenses = this.data.list.find(item=>item._id===id)

    wx.navigateTo({
      url: `${route.CLOUD_NOTES_DETAIL}?${obj2url(expenses)}`,
    })
  },
})
