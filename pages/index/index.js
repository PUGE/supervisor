//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    openid: '',
    serverList: []
  },
  onLoad: function () {
    var app = getApp()
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log(res.code)
          const userCode = res.code
          //获取用户id
          wx.request({
            url: 'https://going.run/miniprogram',
            data: {
              route: 'getOpenID',
              code: userCode,
              appid: 'wxf4c672e17c4aac25'
            },
            success: (res) => {
              
              const data = JSON.parse(res.data)
              console.log(data['openID'])
              this.setData({
                openid: data['openID']
              })
              app.globalData.openid = data['openID']
              this.getData()
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
  },
  getData: function () {
    var app = getApp()
    wx.request({
      url: 'https://going.run/miniprogram',
      data: {
        route: 'getUserData',
        openid: app.globalData.openid,
        appid: 'wxf4c672e17c4aac25',
        name: 'supervisor'
      },
      success: (res) => {
        res = JSON.parse(res.data)
        if (res.err == 0) {
          let data = res.value.serverList
          if (!data) data = []
          app.globalData.serverList = data
          this.setData({
            serverList: data
          })
          console.log(data)
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
  }
})
