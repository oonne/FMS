import config from '../../config/config'
import route from '../../config/route'
import { obj2url, auditRedirect } from '../../utils/util'
import { income } from '../../intercept/index'


Page({
  data: {
    list: [],
    pageCount: 0, //总条数
    page: 0, //当前页数
    loading: false, //是否正在加载数据
  },
  onLoad() {
    auditRedirect()
  },
  onShow() {
    this.initData()
  },
  onPullDownRefresh(){
    this.initData()
  },
  onReachBottom(){
    this.fetchData()
  },
  /*
   * 初始化数据
   */ 
  initData(){
    this.data.list = []
    this.data.page = 0
    this.data.pageCount = 1
    this.fetchData()
  },
  /*
   * 获取下一页的数据
   */ 
  fetchData(){
    let {pageCount, page, loading, list} = this.data;
    // 防止重复刷新
    if (loading) {
      return
    }
    // 最后一页不再刷新
    if (page >= pageCount) {
      return
    }
    page++
    this.setData({
      loading: true
    })

    income.index({
      'per-page': config.pageSize,
      page: page
    }).then(res=>{
      let data = this.formatDate(res.data)
      this.setData({
        list: page===1 ? data : list.concat(data),
        page: res.meta.currentPage,
        pageCount: res.meta.pageCount,
        loading: false,
      })
      wx.stopPullDownRefresh()
    })
  },
  /*
   * 格式化数据
   * 将来源格式化成可展示的数据
   * params {array} list 服务端返回的列表
   * return {array} list 格式化后的列表
   */ 
  formatDate(list) {
    const sourceList = getApp().globalData.source
    return list.map(item=>{
      let source = sourceList.find(sourceItem=>sourceItem.id==item.income_source)
      item.source = source.income_source
      return item
    })
  },
  toDetail(e) {
    const id = e.currentTarget.dataset.id
    const income = this.data.list.find(item=>item.id===id)

    wx.navigateTo({
      url: `${route.INCOME_DETAIL}?${obj2url(income)}`,
    })
  },
})
