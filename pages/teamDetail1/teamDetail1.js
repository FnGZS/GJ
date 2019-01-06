var app = getApp();
var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({

  data: {
    phoneHeight:0,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    URL: getApp().globalData.PHPURL,
    URLimg: "",
    lodingHidden: true,
    display_noComments: 'none',
    scrollTop: 0,
    scrollTopA: 0,
    scrollTopB: 0,
    scrollTopC: 0,
    scrollTopstart: 0,
    isClick: 0,
    id: '',
    detail: [],
    comment: []
  },
  onLoad: function(options) {
    this.getPhoneInfo();
    console.log(options)
    this.setData({
      URLimg: iURL,
      id: options.id,
      // id: 1,
      lodingHidden: false,
    })
    this.getDetail(); //获取团队用户的详情
    this.getComment(); //获取团队成员的评价

  },
  onReady: function() {

  },
  onShow: function() {

  },
  getPhoneInfo: function () {
    this.setData({
      phoneHeight: 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight
    })
  },
  tabGoods: function(e) {
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj,
      isClick: 1,
    })

    //点击下滑到指定距离（钟佳闱）
    var that = this;
    var key = e.target.dataset.key;

    var query = wx.createSelectorQuery()

    query.select(`#view_${key}`).boundingClientRect()
    query.selectViewport().scrollOffset()

    query.exec(function(res) {
      console.log(res)
      that.setData({
        scrollTop: that.data.scrollTopstart + res[0].top - 35
      })
    })
  },
  //获取三个导航栏的内容到顶部的高度
  getTabToTop: function() {
    var that = this;
    var queryA = wx.createSelectorQuery()
    queryA.select('#view_A').boundingClientRect()
    queryA.selectViewport().scrollOffset()
    queryA.exec(function(res) {
      that.setData({
        scrollTopA: res[0].top
      })
    })
    var queryB = wx.createSelectorQuery()
    queryB.select('#view_B').boundingClientRect()
    queryB.selectViewport().scrollOffset()
    queryB.exec(function(res) {
      that.setData({
        scrollTopB: res[0].top
      })
    })
    var queryC = wx.createSelectorQuery()
    queryC.select('#view_C').boundingClientRect()
    queryC.selectViewport().scrollOffset()
    queryC.exec(function(res) {
      that.setData({
        scrollTopC: res[0].top
      })
    })
    console.log(that.data.scrollTopA);
    console.log(that.data.scrollTopB);
    console.log(that.data.scrollTopC);
  },
  /**
   * 滚动条位置
   */
  handleScroll: function(e) {
    console.log(e)
    var that = this;
    if (this.data.isClick == 0) {
      this.getTabToTop(); //获取三个内容到顶部的距离
      var A = that.data.scrollTopA;
      var B = that.data.scrollTopB;
      var C = that.data.scrollTopC;
      var currentScroll = e.detail.scrollTop;
      console.log(currentScroll)
      var _obj = {};
      if (currentScroll < B - A) {
        _obj.curHdIndex = 0;
        _obj.curBdIndex = 0;
      } else if (currentScroll >= B - A && currentScroll < C - B - A) {
        _obj.curHdIndex = 1;
        _obj.curBdIndex = 1;
      } else {
        _obj.curHdIndex = 2;
        _obj.curBdIndex = 2;
      }
    } else {
      this.setData({
        isClick: 0
      })
    }
    // console.log(this.data.isClick);
    // if (this.data.isClick == 0){
    //   this.getTabToTop(); //获取三个内容到顶部的距离    
    //   var A = that.data.scrollTopA;
    //   var B = that.data.scrollTopB;
    //   var C = that.data.scrollTopC;
    //   var _obj = {};
    //   if()
    //   // if (A - 35 <= 0 && B - 35 > 0 && C -- 35 > 0) {
    //   //   _obj.curHdIndex = 0;
    //   //   _obj.curBdIndex = 0;
    //   // }
    //   // else if (B - 35 <= 0 && C - 35 > 0) {
    //   //   _obj.curHdIndex = 1;
    //   //   _obj.curBdIndex = 1;
    //   // }
    //   // else if (C - 35 <= 0) {
    //   //   _obj.curHdIndex = 2;
    //   //   _obj.curBdIndex = 2;
    //   // }
    // }else{
    //   this.setData({
    //     isClick:0
    //   })
    // }

    //滑动
    this.setData({
      tabArr: _obj,
      scrollTopstart: e.detail.scrollTop
    })
  },
  //获取团队成员的详情
  getDetail: function() {
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
      success: function(res) {
        console.log(res)
        if (res.data.goods_imgs=='无'){
          res.data.goods_imgs = res.data.goods_img
        }
        var detail = res.data;
        detail['goods_imgs'] = JSON.parse(detail.goods_imgs);
        that.setData({
          detail:detail,
          lodingHidden: true,
        })
      }
    })
  },
  goodsImgsYu:function(e){
      console.log(e)
      var pic = e.currentTarget.dataset.img;
      var pics = this.data.detail.goods_imgs;
    console.log(pic)
    for(var i = 0 ; i < pics.length ; i ++){
      pics[i] = this.data.URLimg + '/team/' + pics[i];
    }
    console.log(pics)
      wx.previewImage({
        current: pic,     //当前图片地址
        urls: pics,               //所有要预览的图片的地址集合 数组形式
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
  },
  //获取团队成员的评价
  getComment: function() {
    var that = this;
    var id = this.data.id;
    //评价
    wx.request({
      url: that.data.URL + '/Order/comment_display',
      data: {
        goodsId: id,
        isTeam: 1
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        if (res.data == null || res.data.length == 0) {

          that.setData({
            display_noComments: 'block'
          })
        } else {
          that.setData({
            comment: res.data
          })
          
        }

      }
    });
  },
  //跳转到经典案例
  toCase: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../jingdiananlie/jingdiananlie?caseid=' + id,
    })
  },
  //跳转客服页面
  kefu: function() {
    wx.navigateTo({
      url: '../kefuhuihua/kefuhuihua',
    })
  },
  //跳转购物车页面
  carttt: function() {
    wx.navigateTo({
      url: '../shangcheng/shangcheng',
    })
  },
  //加入购物车
  cart: function() {
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
        success: function(res) {
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

    } else {
      wx.showModal({
        content: '请登录',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
    }
  },
  // 立即购买
  pay: function(e) {
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

    } else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        confirmColor: "#56a4ff",
      });
    }

  },
  //跳转回我的团队
  toTeam: function () {
    wx.switchTab({
      url: '../team/team',
    })
  },


  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  }
})