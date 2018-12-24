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

    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync('code', res.code)
        console.log(res.code);
        // 获取用户信息
        wx.getSetting({
          success: response => {
            if (response.authSetting['scope.userInfo']) {
              //   if (!response.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId              
                  console.log(res);
                  wx.request({
                    url: 'https://www.sxscott.com/gujie/index.php' + '/Login',
                    data: {
                      'encryptedData': res.encryptedData,
                      'iv': res.iv,
                      'code': wx.getStorageSync('code')
                    },
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                      'content-type': 'application/json'
                    }, // 设置请求的 header
                    success: function (res) {
                      console.log(res.data.openId);
                      wx.request({
                        url: 'https://www.sxscott.com/gujie/index.php' + '/User/userquest',
                        data: {
                          'openId_data': res.data.openId,
                          'avatarUrl_data': res.data.avatarUrl,
                          'nickName_data': res.data.nickName,
                          // 'time_data':time,
                        },
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        header: {
                          'content-type': 'application/json'
                        }, // 设置请求的 header
                        success: function (resx) {
                          console.log(resx)
                          wx.setStorageSync('UserId', resx.data.userId);
                          wx.setStorageSync('login', 1);
                          wx.setStorageSync('avatarUrl', resx.data.avatarUrl);
                        },
                      })
                    },
                    fail: function (err) {
                      console.log(err);
                    }
                  })
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })

              //    }
            }
          }
        })
      }
    })
  
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