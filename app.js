//app.js
App({
  globalData: {
    openid: null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: (res) => {
        if (res.code) {
          console.log(res.code)
          const userCode = res.code
          //获取用户id
          wx.request({
            url: 'https://going.run/miniprogram',
            data: {
              type: 'login',
              code: userCode
            },
            success: (res) => {
              // console.log(res.data)
              const data = JSON.parse(res.data)
              this.globalData.openID = data['openID']
              console.log(data['openID'])
            },
            fail: (res) => {
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})