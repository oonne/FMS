import config from '../../config/config'
import route from '../../config/route'
import { obj2url } from '../../utils/util'
import { diary } from '../../intercept/index'


Page({
  data: {
    list: [],
    pageCount: 0, //总条数
    page: 0, //当前页数
    loading: false, //是否正在加载数据
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

    diary.index({
      'per-page': config.pageSize,
      page: page
    }).then(res=>{
      this.setData({
        list: page===1 ? res.data : list.concat(res.data),
        page: res.meta.currentPage,
        pageCount: res.meta.pageCount,
        loading: false,
      })
      wx.stopPullDownRefresh()
    })
  },
  toDetail(e) {
    const id = e.currentTarget.dataset.id
    const diaryItem = this.data.list.find(item=>item.id===id)
    wx.setStorageSync('diary', diaryItem.diary_content)
    const params = {
      id: diaryItem.id,
      diary_date: diaryItem.diary_date,
    }

    wx.navigateTo({
      url: `${route.DIARY_DETAIL}?${obj2url(params)}`,
    })
  },
})
