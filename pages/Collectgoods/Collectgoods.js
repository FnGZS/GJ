
var imgURL = getApp().globalData.IMGURL;
var URL = getApp().globalData.PHPURL;
/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 */

// 定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数
var total_micro_second;

/* 毫秒级倒计时 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second)
  });

  if (total_micro_second <= 0) {
    that.setData({
      clock: "已经截止"
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that);
  }, 10)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return hr + "天" + min + "时" + sec + "秒";
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clock: '',
    address: [],
    consignee: '', //收件人姓名
    receivePhone: '',//收件人电话号码
    receiveAddress: '',//收件人地址
    img: '',//商品图片
    name: '',//商品name
    message: '',//买家留言
    goodsSize: '',//尺寸
    goodsCol: '',//颜色
    deposit: '',//定金
    shopImg: '',//小图标
    shopName: '',//店家名称
    num: 0,
    orderId: '',
    goodsSizes: [],
    goodsCols: [],
    prices: [],
    deposits: [],
    nums: [],
    names: [],
    imgs: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    total_micro_second = 36 * 60 * 60 * 1000; //时间
    count_down(this);//时间

    console.log(options)
    this.setData({
      orderId: options.orderid
    })
    var that = this;
    wx.request({
      url: URL + '/Order/order_details',
      data: {
        orderId: that.data.orderId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          address: res.data,
          consignee: res.data.consignee,
          receivePhone: res.data.receivePhone,
          receiveAddress: res.data.receiveAddress,
          shopImg: imgURL + '/shopImg/' + res.data.shopImg,
          shopName: res.data.shopName,
        })
        var goodsSizess = [];
        var goodsColss = [];
        var pricess = [];
        var depositss = [];
        var numss = [];
        var namess = [];
        var img = [];
        var xx = [];
        namess = JSON.parse(that.data.address.name);
        goodsSizess = JSON.parse(that.data.address.goodsSize);
        goodsColss = JSON.parse(that.data.address.goodsCol);
        pricess = JSON.parse(that.data.address.price);
        depositss = JSON.parse(that.data.address.deposit);
        numss = JSON.parse(that.data.address.num);
        img = JSON.parse(that.data.address.img);
        for (var i = 0; i < img.length; i++) {
          xx.push(imgURL + '/goods/' + img[i]);
        }
        that.setData({
          goodsSizes: goodsSizess,
          names: namess,
          goodsCols: goodsColss,
          prices: pricess,
          deposits: depositss,
          nums: numss,
          imgs: xx
        })
        console.log(that.data.address)
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
              orderId: that.data.orderId,
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
  //待发货
  Collect: function (e) {
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
              orderId:that.data.orderId,
              b: 1
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
              wx.navigateBack({
                delta: 1,
              })
            }
          });

        }
      }
    });

  },
  // 付款
  payment: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要付款',
      confirmColor: "#56a4ff",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: URL + '/Order/pending_payment',
            data: {
              orderId: that.data.orderId,
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
            }
          });
        }

      }
    });
  },
  message: function (e) {
    console.log(e)
    this.setData({
      message: e.detail.value
    })
    console.log(this.data.message)
  },
  Choice: function () {
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