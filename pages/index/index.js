var app = getApp()
var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({
  data: {
    URL: getApp().globalData.PHPURL,
    URLimg: "",
    lodingHidden:true,
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    scrollTop: {
    scroll_top: 0,
    goTop_show: false
    },
    list: [],
    sorting:[],
    goods:[],
    cases: '',
    casesF:0,
    casetop:0,//案例上拉刷新时候需要传的两个值
    casebase:5
  },
 
  scrollTopFun: function (e) {
     console.log(e.detail);
    if (e.detail.scrollTop > 100) {//触发gotop的显示条件  
      this.setData({
        'scrollTop.goTop_show': true
      });
      // console.log(this.data.scrollTop)
    } else {
      this.setData({
        'scrollTop.goTop_show': false
      });
    }
  },
  onLoad_d:function(){
    var URL = getApp().globalData.PHPURL;
    var URP = getApp().globalData.IMGURL;
    var arr = [];
    var ayy = [];
    console.log(URP)
    console.log('onLoad test');
    var that = this;
    this.setData({
      URLimg: iURL
    });
    wx.request({
      url: URL + '/Sowingmap/img_play',
      data: {
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          // list: res.data,
          //res代表success函数的事件对，data是固定的，list是数组
          imgUrls: JSON.parse(res.data.img)
        })
        // console.log(JSON.parse(res.data.img));   
        // console.log(that.data.imgUrls);      
        for (var i = 0; i < that.data.imgUrls.length; i++) {
          arr[i] = URP + '/' + 'sowing_map' + '/' + that.data.imgUrls[i];
        }
        //  console.log(arr)
        that.setData({
          list: arr,
        })
        //  console.log(that.data.list);
        // 九宫格
        wx.request({
          url: URL + '/Mall/goods_query_refresh_nine',
          data: {
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //  console.log(res)
            that.setData({
              sorting: res.data
            })
            //  console.log(that.data.sorting) 

            for (var i = 0; i < that.data.sorting.length; i++) {
              ayy[i] = URP + '/' + 'goods' + '/' + that.data.sorting[i].goods_img;
            }
            // console.log(ayy);
            that.setData({
              goods: ayy,
            })
            // console.log(that.data.goods[0])
          }
        });
      }
    });
    this.getJingdian();
    wx.stopPullDownRefresh()
  },

  onLoad: function () {
    this.onLoad_d();
    this.getJingdian();
  },
  onShow:function(){
   
  },
  //上拉刷新
  onReachBottom:function(){
   console.log(123123);
    var that = this;
    //经典案例
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
      url: this.data.URL + '/Index/index_cases',
      data: {
        casetop: that.data.casetop + that.data.casesF,
        casebase: that.data.casebase + that.data.casesF,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
     
        var arr = that.data.cases;
        var arr2 = res.data;
        arr = arr.concat(arr2)
        console.log(that.data.cases)
        that.setData({
          cases: arr
        })
        if (res.data.length == 0) {
          wx.showToast({
            title: '没有了',
            image: '/images/W.png'
          })
        } else {
          that.setData({
            casesF: that.data.casesF + 5
          })
          wx.showToast({
            title: '加载中',
            icon: 'loading'
          })
        }
        
      },
      complete: function () {
        // complete
       
        wx.hideNavigationBarLoading() //完成停止加载
     
      }
    })
   
   
  },
  
  getJingdian:function(){
    var that = this;
    //经典案例
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
      url: this.data.URL + '/Index/index_cases',
      data: {
        casetop:that.data.casetop+that.data.casesF,
        casebase: that.data.casebase+that.data.casesF,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          cases: res.data
        })
        console.log(res);
     
      }
    }) 
 
  },
  latex: function (e) {
    var goods_id = e.currentTarget.dataset.id;
    var UserId = wx.getStorageSync('UserId');
    var login = wx.getStorageSync('login');
    var that = this;
    console.log(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: '../detail/detail?goods_num=' + e.currentTarget.dataset.num + "&goods_id=" + goods_id,
      })

  },
  toCalculator: function () {
    wx.navigateTo({
      url: '../calculator/calculator'
    });
  },
  toYuyue: function () {
    wx.navigateTo({
      url: '../yuyue/yuyue'
    });
  },

  toZaixiangongdi: function () {
    wx.navigateTo({
      url: '../gongdifenbu/gongdifenbu'
    });
  },
  toAnli:function(){
    wx.switchTab({
      url: '../zaixiangongdi/zaixiangongdi',
    })
  },
  toShangcheng:function(){
    wx.switchTab({
      url: '../mall/mall',
    })
  },
  team: function () {
    wx.switchTab({
      url: '../team/team'
    });
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search' 
    });
  },
  anli:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../jingdiananlie/jingdiananlie?caseid=' + id,
    })
  },
  // 整体刷新
  onPullDownRefresh: function () {
    this.setData({
      casesF:0,
      casetop:0,
      casebase:5
    })
    this.onLoad_d();
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }
})  