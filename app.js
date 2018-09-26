//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('URL', 'https://www.sxscott.com/gujie/')
   
    wx.setStorageSync('UserId', 'gujer')//用户ID
    wx.setStorageSync('login', 0)//登录状态
    wx.setStorageSync('carts',0)//购物车货物
    wx.setStorageSync('success',false)//订单付款是否成功
  },
  onLoad:function(){
    
  },
  globalData: {
    userInfo: null,
    PHPURL:"https://www.sxscott.com/gujie/index.php",
    IMGURL:"https://www.sxscott.com/gujie/public",
    LogisticsURL:"https://www.sxscott.com/gujie/WEB/Lib/Action",
  }
})