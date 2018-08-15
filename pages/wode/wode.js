var util = require('../../utils/util.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    URL: getApp().globalData.PHPURL,
    a: 0,
    picture: '',
    orders: [],
    numpay: 0,
    numfa: 0,
    numshou: 0,
    numpin: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function(options) {

    //返回界面的有些问题
    // console.log(11111)
    // this.setData({
    //   a: options.a ,
    // });
    // console.log(this.data.a);
    // console.log(11111)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }

  },
  collection: function() {
    var UserId = wx.getStorageSync('UserId');
    var login = wx.getStorageSync('login');
    var that = this;
    if (login) {
      wx.navigateTo({
        url: '../mycollection/mycollection',
      })
    } else {
      wx.showToast({
        title: '请登录',
      })
    }


  },

  getUserInfo: function(e) {
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(time);
    var that = this;
    console.log(e);
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync('code', res.code)
        console.log(res.code);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: response => {
        console.log(response);
        //   if (!response.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId              
            console.log(res);
            wx.request({
              url: that.data.URL + '/Login',

              data: {
                'encryptedData': res.encryptedData,
                'iv': res.iv,
                'code': wx.getStorageSync('code')
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                'content-type': 'application/json'
              }, // 设置请求的 header
              success: function(res) {
                console.log(res.data.openId);
                wx.request({
                  url: that.data.URL + '/User/userquest',
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
                  success: function(resx) {
                    wx.setStorageSync('UserId', resx.data.userId);
                    wx.setStorageSync('login', 1);
                    wx.setStorageSync('avatarUrl', resx.data.avatarUrl);
                    that.setData({
                      picture: resx.data.avatarUrl,
                    })
                    that.onShow();
                  },
                })
              },
              fail: function(err) {
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
    })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this.data.get_id)
    if (this.data.get_id == 1) {
      wx.navigateBack();
    }
  },
  // 地址管理
  address: function() {
    var login = wx.getStorageSync('login');
    var that = this;
    if (login) {
      var UserId = wx.getStorageSync('UserId');
      wx.navigateTo({
        url: '../dizhiguanli/dizhiguanli?picture=' + that.data.picture,
      })
    } else {
      wx.showToast({
        title: '请登录',
      })
    }
  },
  // 我的订单
  Myorder: function() {
    var login = wx.getStorageSync('login');
    var UserId = wx.getStorageSync('UserId');
    var that = this;
    if (login) {
      wx.navigateTo({
        url: '../Order/Order?currentTab=0',
      })
    } else {
      wx.showToast({
        title: '请登录',
      })
    }
  },
  toast: function() {

    wx.navigateTo({
      url: '../Order/Order?currentTab=1'
    })
  },
  toast2: function() {
    wx.navigateTo({
      url: '../Order/Order?currentTab=2'
    })
  },
  toast3: function() {
    wx.navigateTo({
      url: '../Order/Order?currentTab=3'
    })
  },
  toast4: function() {
    //等待微信接口
  },
  onShow: function() {

    var that = this;
    var UserId = wx.getStorageSync('UserId');
    console.log(UserId)
    //  新加入 获取订单信息个数
    if (UserId != 'gujer') {
      wx.request({
        url: that.data.URL + '/Order/whole',
        data: {
          userId: UserId
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          var numpay = 0,
            numfa = 0,
            numshou = 0,
            numpin = 0;
          that.setData({
            orders: res.data
          })
          if (that.data.orders==null) {

          } else {
  
            for (var j = 0; j < that.data.orders.length; j++) {
              if (that.data.orders[j].state == "待付款") {
                numpay = numpay + 1;
              } else if (that.data.orders[j].state == "待发货") {
                numfa = numfa + 1;
              } else if (that.data.orders[j].state == "待收货") {
                numshou = numshou + 1;
              } else if (that.data.orders[j].state == "待评价") {
                numpin = numpin + 1;
              }
            }
          }
          that.setData({
            numpay: numpay,
            numfa: numfa,
            numshou: numshou,
            numpin: numpin
          })
        }
      });
    }

  },
  // 购物车
  ShoppingCart: function() {
    var login = wx.getStorageSync('login');
    var that = this;
    if (login) {
      var UserId = wx.getStorageSync('UserId');
      wx.navigateTo({
        url: '../shangcheng/shangcheng',
      })
    } else {
      wx.showToast({
        title: '请登录',
      })
    }
  }
})