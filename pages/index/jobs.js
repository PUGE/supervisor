// pages/index/jobs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobsList: [],
    serverInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    const serverInfo = app.globalData.serverList[options.index]
    this.data.serverInfo = serverInfo
    this.getJobsInfo()
  },
  sendMessage: function (event) {
    const route = event.currentTarget.dataset.route
    const name = event.currentTarget.dataset.name
    const serverInfo = this.data.serverInfo
    wx.request({
      url: 'https://going.run/supervisor',
      data: {
        route: route,
        name: name,
        ip: serverInfo.ip,
        port: serverInfo.port,
        index: serverInfo.index,
        userName: serverInfo.userName,
        password: serverInfo.password,
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
            title: '操作成功!',
            icon: 'success',
            duration: 2000
          })
          this.getJobsInfo()
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  getJobsInfo: function () {
    const serverInfo = this.data.serverInfo
    wx.request({
      url: 'https://going.run/supervisor',
      data: {
        route: 'getAllProcessInfo',
        ip: serverInfo.ip,
        port: serverInfo.port,
        index: serverInfo.index,
        userName: serverInfo.userName,
        password: serverInfo.password,
      },
      success: (res) => {
        if (res.errorCode) {
          wx.showToast({
            title: res.errorMessage,
            icon: 'success',
            duration: 2000
          })
        } else {
          console.log(res.data)
          res.data.forEach(element => {
            switch (element.state) {
              case 0:
                element.stateText = '已停止'
                break;
              case 20:
                element.stateText = '运行中'
                break;
            
              default:
                element.stateText = element.statename
                break;
            }
          });
          this.setData({
            jobsList: res.data
          })
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
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