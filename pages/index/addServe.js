// pages/index/addServe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: "49.232.216.171",
    port: 9001,
    index: "RPC2",
    userName: "puge",
    password: "mmit7750"
  },
  saveConfig: function (config) {
    var app = getApp()
    wx.request({
      url: 'https://going.run/supervisor',
      data: {
        openid: app.globalData.openid,
        route: 'saveConfig',
        config: config
      },
      success: (res) => {
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  check: function () {
    var app = getApp()
    wx.request({
      url: 'https://going.run/supervisor',
      data: {
        route: 'checkServer',
        ip: this.data.ip,
        port: this.data.port,
        index: this.data.index,
        userName: this.data.userName,
        password: this.data.password,
      },
      success: (res) => {
        if (res.errorCode) {
          wx.showToast({
            title: res.errorMessage,
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '服务器连接成功！',
            icon: 'success',
            duration: 2000
          })
          app.globalData.serverList.push({
            ip: this.data.ip,
            port: this.data.port,
            index: this.data.index,
            userName: this.data.userName,
            password: this.data.password,
          })
          this.saveConfig({
            serverList: app.globalData.serverList
          })
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  setIP: function (e) {
    this.setData({ip: e.detail.value})
  },
  setPort: function (e) {
    this.setData({port: e.detail.value})
  },
  setIndex: function (e) {
    this.setData({index: e.detail.value})
  },
  setUserName: function (e) {
    this.setData({userName: e.detail.value})
  },
  setPassword: function (e) {
    this.setData({password: e.detail.value})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})