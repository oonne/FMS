import route from '../config/route'

/**
 * 如果是审核中，直接跳回首页
 */
export function auditRedirect() {
  if (getApp().globalData.token) return
  wx.redirectTo({
    url: route.INDEX,
  })
}

/**
 * 拼接url参数
 * @return key=value&key1=value1
 */
export function obj2url(params) {
  let tmpUrl = ''
  if (params) {
    tmpUrl = []
    for (let item in params) {
      tmpUrl = [
        tmpUrl.concat([
          [
            encodeURIComponent(item), encodeURIComponent(params[item])
          ].join('=')
        ]).join("&")
      ]
    }
  }
  return tmpUrl
}

/**
 * 获取n位的数字随机数
 */
export function randomn(n) {
  if (n > 21) return null
  return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
}

/**
 * 日期格式化
 * @param {date} date
 * @param {string} fmt
 * @returns {string}
 */
export function formatDate(date, fmt) {
  date = new Date(date)
  fmt = fmt || 'yyyy-MM-dd hh:mm'
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}