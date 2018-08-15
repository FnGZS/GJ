
var pay = require('../../utils/pay.js');
var app = getApp()
Page({
  data: {
    isShow: 0,
    currentTab: 0,
    xx: 5,
    orders: [],
    list: [],//商品图片
    iconn: [],//店铺图标
    daifu: [],// 待支付
    daifa: [],// 待发货
    daishou: [],// 待收货
    daiping: [], // 待评价
    display: 'none', //是否有商品
    displaypay: 'none', //是否有商品
    displayfa: 'none', //是否有商品
    displayshou: 'none', //是否有商品
    displayping: 'none',//是否有商品
    arrorder: [],//全部订单
    orderid: '',
    names: '',
    imgs: '',
    Anum: 0,
    numbers: 0,
    Anumbers: 0,
    Anumberss: 0,
    Anumbersss: 0,
    Anumm: 0,
    Anummm: 0,
    Anums: 0,
    dfu: [],
    dfa: [],
    dshou: [],
    dping: []
  },
  onLoad: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTab,
      isShow: e.currentTab
    })
    console.log(e.currentTab)
    this.onShow();
  },
  swichNav: function (e) {
    console.log(e)

    for (var i = 0; i < 5; i++) {
      if (i == e.currentTarget.dataset.current) {
        this.setData({
          isShow: e.currentTarget.dataset.current,
          currentTab: e.currentTarget.dataset.current
        })
      }
    }
    console.log(this.data.isShow)

  },
  // 链接的界面用商品的orderid判断
  Interface: function (e) {
    console.log(e)
    var start = e.currentTarget.dataset.state;
    var orderids = e.currentTarget.dataset.id;
    console.log(start)
    if (start == "待付款") {
      wx.navigateTo({
        url: '../Corderdetails/Corderdetails?orderid=' + orderids,
      })
    } else if (start == "待发货") {
      wx.navigateTo({
        url: '../Tobuy/Tobuy?orderid=' + orderids,
      })
    } else if (start == "待收货") {
      wx.navigateTo({
        url: '../Collectgoods/Collectgoods?orderid=' + orderids,
      })
    } else if (start == "待评价") {
      wx.navigateTo({
        url: '../evaluate/evaluate?orderid=' + orderids,
      })
    }
  },
  //付款
  payment: function (e) {
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var orderids = e.currentTarget.dataset.id;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要付款',
      confirmColor: "#56a4ff",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: URL + '/user/query_openid',
            data: {
              userId: UserId
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res);
              pay.Unified(res.data.openId);
             /*
              wx.request({
                url: URL + '/Order/pending_payment',
                data: {
                  orderId: orderids,
                  b: 1
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res)
                  wx.navigateTo({
                    url: '../Order/Order?currentTab=2'
                  })
                  that.onShow();//重加载
                }
              });
              */
            },
            complete:function()
            {
              
            }
            
          }) 
        }

      }
    });

  },
  //取消订单
  Cancellation: function (e) {
    var orderids = e.currentTarget.dataset.id;
    var URL = getApp().globalData.PHPURL;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定取消订单',
      confirmColor: "#56a4ff",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: URL + '/Order/pending_payment',
            data: {
              orderId: orderids,
              b: 0
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
              that.onShow();//重加载
            }
          });
        }

      }
    });

  },
  //待发货按钮（模拟物流）
  Deliver: function (e) {
    var orderids = e.currentTarget.dataset.id;
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '已发货',
      confirmColor: "#56a4ff",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: URL + '/Order/pending_delivery',
            data: {
              orderId: orderids,
              b: 1
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
              that.onShow();
            }
          });

        }
      }
    });
  },
  
 
  //待收货按钮（模拟物流）
  Collect: function (e) {
    var orderids = e.currentTarget.dataset.id;
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '已发货',
      confirmColor: "#56a4ff",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: URL + '/Order/receive_goods',
            data: {
              orderId: orderids,
              b: 1
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
              that.onShow();
            }
          });

        }
      }
    });

  },
  //评价
  evaluate: function (e) {
    console.log(e)
    var ord_id = e.currentTarget.dataset.orderid;
    var goods_id = e.currentTarget.dataset.id;
    console.log(ord_id)
    wx.navigateTo({
      url: '../pinglun/pinglun?goods_id=' + goods_id + '&orderids=' + ord_id,
    })
    this.onShow(); //重加载
  },

  onShow: function () {
    //  全部订单数据
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var imgURL = getApp().globalData.IMGURL;
    var arr = [];//商品图片
    var axx = [];//店铺图片

    var that = this;
    var numpay = 0;
    var numfa = 0;
    var numshou = 0;
    var numpin = 0;
    var numorder = 0;
    var arrpay = [];
    var arrfa = [];
    var arrshou = [];
    var arrping = [];
    var arrorder = [];
    that.data.daifu = [];
    that.data.daifa = [];
    that.data.daishou = [];
    that.data.daiping = [];
    that.data.arrorder = [];
    console.log(that.data.currentTab)
    wx.request({
      url: URL + '/Order/whole',
      data: {
        userId: UserId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data == null) {
          that.setData({
            display: 'block',
            displaypay: 'block',
            displayfa: 'block',
            displayshou: 'block',
            displayping: 'block'
          })
        }
        else {
          that.setData({
            orders: res.data
          })
          console.log(that.data.orders)
          var goodsSizes = [];
          var goodsCols = [];
          var prices = [];
          var deposits = [];
          var nums = [];
          var names = [];
          var imgss = [];
          console.log(that.data.orders[0].name)
          for (var i = 0; i < that.data.orders.length; i++) {
            arr[i] = JSON.parse(that.data.orders[i].img);
            axx[i] = imgURL + '/shopImg/' + that.data.orders[i].shopImg;
            names[i] = JSON.parse(that.data.orders[i].name);
            goodsSizes[i] = JSON.parse(that.data.orders[i].goodsSize);
            goodsCols[i] = JSON.parse(that.data.orders[i].goodsCol);
            prices[i] = JSON.parse(that.data.orders[i].price);
            deposits[i] = JSON.parse(that.data.orders[i].deposit);
            nums[i] = JSON.parse(that.data.orders[i].num);
            imgss[i] = JSON.parse(that.data.orders[i].img);
            that.data.orders[i].name = names[i];
            that.data.orders[i].goodsSize = goodsSizes[i];
            that.data.orders[i].goodsCol = goodsCols[i];
            that.data.orders[i].price = prices[i];
            that.data.orders[i].deposit = deposits[i];
            that.data.orders[i].num = nums[i];
            that.data.orders[i].img = imgss[i]
          }
          console.log(that.data.orders)
          that.setData({
            list: arr,
            iconn: axx
          })
          // console.log(that.data.list)
          for (var j = 0; j < that.data.orders.length; j++) {
            arrorder[j] = that.data.orders[j];
            numorder = numorder + 1;
            if (that.data.orders[j].state == "待付款") {
              arrpay[numpay] = that.data.orders[j];
              numpay = numpay + 1;
            }
            else if (that.data.orders[j].state == "待发货") {
              arrfa[numfa] = that.data.orders[j];
              numfa = numfa + 1;
            }
            else if (that.data.orders[j].state == "待收货") {
              arrshou[numshou] = that.data.orders[j];
              numshou = numshou + 1;
            }
            else if (that.data.orders[j].state == "待评价") {
              arrping[numpin] = that.data.orders[j];
              numpin = numpin + 1;
            }
          }
          numpay = numpay - 1;
          numfa = numfa - 1;
          numshou = numshou - 1;
          numpin = numpin - 1;
          console.log(arrping.length);
          if (arrpay.length == 0) {
            that.setData({
              displaypay: 'block'
            })
          } else {
            that.setData({
              displaypay: 'none'
            })
          }

          if (arrfa.length == 0) {
            that.setData({
              displayfa: 'block'
            })
          } else {
            that.setData({
              displayfa: 'none'
            })
          }
          console.log(arrshou.length)
          if (arrshou.length == 0) {
            that.setData({
              displayshou: 'block'
            })
          } else {
            that.setData({
              displayshou: 'none'
            })
          }
          console.log(that.data.displayshou)
          if (arrping.length == 0) {
            console.log(11111)
            that.setData({
              displayping: 'block'
            })
          } else {
            that.setData({
              displayping: 'none'
            })
          }

          console.log(arrpay)
          that.setData({
            daifu: arrpay,
            daifa: arrfa,
            daishou: arrshou,
            daiping: arrping,
            Anum: arrping.length,
            arrorder: arrorder,
            Anumm: arrpay.length,
            Anummm: arrfa.length,
            Anums: arrshou.length
          })
          if (that.data.daifu.length > 0) {
            that.setData({
              Anumbers: that.data.daifu[arrpay.length - 1].img.length,
            })
          }
          if (that.data.daifa.length > 0) {
            that.setData({
              Anumberss: that.data.daifa[arrfa.length - 1].img.length,
            })
          }
          if (that.data.daiping.length > 0) {
            that.setData({
              numbers: that.data.daiping[arrping.length - 1].img.length,
            })
          }
          if (that.data.daishou.length > 0) {
            that.setData({
              Anumbersss: that.data.daishou[arrshou.length - 1].img.length,
            })
          }
          // console.log(that.data.Anumbersss)
          // console.log(that.data.list)
          // console.log(that.data.Anums)
          console.log(that.data.daishou)
          // console.log(that.data.Anumbers)

          console.log(that.data.numbers)
          // console.log(that.data.daifu)
        }

      }
    });
  }
})