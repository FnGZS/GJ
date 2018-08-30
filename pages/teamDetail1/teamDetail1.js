var app = getApp();
var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({

  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    URL: getApp().globalData.PHPURL,
    URLimg: "",
    lodingHidden: true,
    id: '',
    detail: []
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      URLimg: iURL,
      id: options.id,
      // id:3,
      lodingHidden: false,
    })
    this.getDetail();
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  tabGoods: function (e) {
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    })
  },
  getDetail: function () {
    var that = this;
    wx.request({
      url: this.data.URL + '/user/teamdetail',
      data: {
        id: this.data.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          detail: res.data,
          lodingHidden: true,
        })
        console.log(that.data.detail)
      }
    })
  },
  //跳转到经典案例
  toCase: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../jingdiananlie/jingdiananlie?caseid=' + id,
    })
  },
  //跳转客服页面
  kefu: function () {
    wx.navigateTo({
      url: '../kefuhuihua/kefuhuihua',
    })
  },
  //跳转购物车页面
  carttt: function () {
    wx.navigateTo({
      url: '../shangcheng/shangcheng',
    })
  },
  //加入购物车
  cart: function () {
    var that = this;
    //检查是否登录了
    that.setData({
      color_index: 0
    })
    if (wx.getStorageSync('login')) {
      //登录后添加到购物车
      console.log(wx.getStorageSync('UserId'))
      wx.request({
        url: that.data.URL + '/Mall/trolley_add',
        data: {
          userId: wx.getStorageSync('UserId'),
          goodsId: that.data.detail.id,
          num: 1,
          goodsColor: that.data.detail.style,
          goodsSize: that.data.detail.goods_classify,
          price: that.data.detail.goods_price,
          deposit: 0,
          isTeam: 1
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          if (res.data >= 1) {
            wx.showToast({
              title: '添加成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            that.setData({
              color_gou: '#FF0000'
            })
          } else if (res.data == -1) {
            wx.showToast({
              title: '已经添加过',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            that.setData({
              color_gou: '#FF0000'
            })
          } else if (res.data == 0) {
            wx.showToast({
              title: '更新数据',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            that.setData({
              color_gou: '#FF0000'
            })
          }
        }
      })

    }
    else {
      wx.showModal({
        content: '请登录',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
    }
  },
  // 立即购买
  pay: function (e) {
    console.log(this.data.detail)
    var goods_img = this.data.detail.goods_img;
    var UserId = wx.getStorageSync('UserId');
    var goods_name = this.data.detail.goods_name;
    var goods_earnest = 0;
    var goods_price = this.data.detail.goods_price;
    // var goods_dimension = this.data.sizetext;
    var goods_style = this.data.detail.style;
    var goods_classify = this.data.detail.goods_classify;
    // var goods_color = this.data.colortext;
    var goods_id = this.data.detail.id;
    var numm = 1;
    var isTeam = 1;
    // console.log(UserId)
    var UserId = wx.getStorageSync('UserId');
    var login = wx.getStorageSync('login');
    var URL = getApp().globalData.PHPURL;
    var judge = 1;
    var that = this;
    if (login) {

      wx.navigateTo({
        url: '../Corder/Corder?numm=' + numm + '&goods_id=' + goods_id + '&goods_classify=' + goods_classify + '&goods_style=' + goods_style + '&goods_price=' + goods_price + '&goods_earnest=' + goods_earnest + '&goods_name=' + goods_name + '&goods_img=' + goods_img + '&judge=' + judge + '&isTeam=' + isTeam,
      })

    }
    else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        confirmColor: "#56a4ff",
      });
    }

  },

  onHide: function () {
    
  },
  onUnload: function () {
    
  },
  onPullDownRefresh: function () {
    
  },
  onReachBottom: function () {
    
  },
  onShareAppMessage: function () {
    
  }
})