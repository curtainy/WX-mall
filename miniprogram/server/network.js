/**
 * 发送网络请求
 */
export default function request(options){
  return new Promise((resolve,reject) => {
    wx.request({
      url: "http://123.207.32.32:8000/api/wh"+options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}