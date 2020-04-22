const cloud = require('wx-server-sdk')
const rp = require('request-promise')
const api = require('config/api')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 登录接口
 * 查询openid是否在user表中，如果是则返回token，如果不是则未登录
 * 调用方式：数据预加载
 * 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('调用登录接口', wxContext)
  let options = {
    url: api.login,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      openid: wxContext.OPENID,
    },
    json: true,
    timeout: 3600,
  }
  return await rp(options)
                 .then(function (res) {
                    return {
                      code: 0,
                      res: res,
                      wxContext: wxContext,
                    }
                  })
}
