var app = getApp();
var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({
  data: {
    URL: getApp().globalData.PHPURL,
    URLimg: "",
    filterdata: null,  //筛选条件数据
    cases:null,//案例列表数据
    showfilter: false, //是否显示下拉筛选
    showfilterindex: null, //显示哪个筛选类目
    priceindex: 0,  //一级分类索引
    areaindex: 0, //二级分类索引
    styleindex: 0, //三级分类索引
    nearbyindex: 0, //四级分类索引
    areaindex: 0,  //一级城市索引
    areaid: null,  //一级城市id
    subareaindex: 0,  //二级城市索引
    subareaid: null, //二级城市id
    testdata: [], //服务集市列表ffzz
    scrolltop: null, //滚动位置
    page: 0, //分页 
    abcc:1,
    second_height: 0,
    scorll_height:0,
    xx:0,
    yy:0,
    price:"装修价格",
    Area:"装修面积",
    Style:"装修风格",
    Nearby:"附近",
  },
  onReady:function(){
    let that=this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude)
        console.log(longitude)
        that.setData({
          xx: 30.0699950000,
          yy: 120.5411110000,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
        console.log(that.data.latitude)
        console.log(that.data.longitude)
      }
    })
  },
  onLoad: function () { //加载数据渲染页面
    this.setData({
      URLimg: iURL
    });
    this.fetchTestData();
    this.fetchFilterData();
    this.fetchCaseData();
        this.mapCtx = wx.createMapContext('myMap')  //地图
    this.mapCtx.getCenterLocation({
      success: function (res) {
         console.log(res.longitude)
         console.log(res.latitude)
      }
    }),
      this.mapCtx.moveToLocation() 


    console.log('onLoad')              //页面高度
  
    var that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        that.setData({
          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
          second_height: res.windowHeight -100 / 750 * 300,
          scorll_height: res.windowHeight - 100 / 750 * 300 + 200, 
        })
      }
    })


   },



  moveToLocation: function () {      //地图
    this.mapCtx.moveToLocation()
  },

  translateMarker: function () {    //地图  
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: this.data.xx,
        longitude: this.data.yy,
      },
      animationEnd() {
        console.log('animation end')
      },

    })
  },
  includePoints: function () {      //地图
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: this.data.xx,
        longitude: this.data.yy,
      }, {
          latitude: this.data.xx,
          longitude: this.data.yy,
      }]
    }) 
  },
  fetchFilterData: function () { //获取筛选条件
  var that = this;
    wx.request({
      url: this.data.URL + '/Decorate/decor_tabs',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        // console.log(res.data[0].tabs.length);

        var tabs1 = JSON.parse(res.data[0].tabs);
        var tabs2 = JSON.parse(res.data[1].tabs);
        var tabs3 = JSON.parse(res.data[2].tabs);
        var tabs4 = JSON.parse(res.data[3].tabs);
        var price = [];
        var area = [];
        var style = [];
        var nearby = [];
        for (var i = 0; i < tabs1.length;i++){
          var obj = {};
          obj['name'] = tabs1[i];
          price.push(obj);
        }
        for (var i = 0; i < tabs2.length; i++) {
          var obj = {};
          obj['name'] = tabs2[i];
          area.push(obj);
        }
        for (var i = 0; i < tabs3.length; i++) {
          var obj = {};
          obj['name'] = tabs3[i];
          style.push(obj);
        }
        for (var i = 0; i < tabs4.length; i++) {
          var obj = {};
          obj['name'] = tabs4[i];
          nearby.push(obj);
        }
        var filter_data = [];
        var obj_res = {};
        obj_res['price'] = price;
        obj_res['area'] = area;
        obj_res['style'] = style;
        obj_res['nearby'] = nearby;

        filter_data.push(obj_res);
        that.setData({
          filterdata: filter_data
        })
        console.log(that.data.filterdata);
        
      }
    }) 
    
  },
  fetchTestData: function () {  //获取城市列表
    let _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    const perpage = 15;
    this.setData({
      page: this.data.page + 1
    })
    const page = this.data.page;
    const newlist = [];
    for (var i = (page - 1) * perpage; i < page * perpage; i++) {
      newlist.push({
        "id": i + 1,
        "name": "微信小程序下拉刷新上拉加载" + (i + 1)
      })
    } 
    setTimeout(() => {
      _this.setData({
        testdata: _this.data.testdata.concat(newlist)
      })
    }, 1500) 
  },
  //获取案例列表
  fetchCaseData:function(e){   
    var that = this;
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
          url: that.data.URL + '/Decorate/decor_tabs_display',
          data: {
            p: that.data.priceindex, //传装修价格
            pp: that.data.areaindex, //传装修面积
            ppp: that.data.styleindex, //传装修风格
            pppp: that.data.nearbyindex, //传附近工地
            lat: latitude, //传纬度
            lng: longitude //传经度

          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //  console.log(res);
            that.setData({
              cases: res.data
            })
            console.log(that.data.cases);
          }
        }) 
      }
    })
   
  },
  setFilterPanel: function (e) { //展开筛选面板
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if (d.showfilterindex == i) {
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    } else {
      this.setData({
        showfilter: true,
        showfilterindex: i,
      })
    }
  },
  setPriceIndex: function (e) { //分类一级索引  装修价格
    console.log(e);
    const d = this.data; 
    const dataset = e.currentTarget.dataset;
    var dataname = e.currentTarget.dataset.price;
    this.setData({
      priceindex: dataset.priceindex,
      cases:null,
    })
    if(this.data.priceindex)
    {
      this.setData({
        price: dataname,
      })
    }else{
      this.setData({
        price: "装修价格",
      })
    }
    this.fetchCaseData();
    this.hideFilter();
    console.log(this.data.priceindex);
  },  
  
  setAreaIndex: function (e) { //分类二级索引  装修面积
    console.log(e);
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    var dataname = e.currentTarget.dataset.area;
    console.log(dataname)
    this.setData({
      areaindex: dataset.areaindex,
      cases: null
    })
    if (this.data.areaindex) {
      this.setData({
        Area: dataname,
      })
    } else {
      this.setData({
        Area: "装修面积",
      })
    }
    this.fetchCaseData();
    this.hideFilter();
    console.log(this.data.areaindex);
  },  

  setStyleIndex: function (e) { //分类三级索引  装修风格
    console.log(e);
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    var dataname = e.currentTarget.dataset.style;
    console.log(dataname);
    this.setData({
      styleindex: dataset.styleindex,
      cases: null
    })
    if (this.data.styleindex) {
      this.setData({
        Style: dataname,
      })
    } else {
      this.setData({
        Style: "装修风格",
      })
    }
    this.hideFilter();
    this.fetchCaseData();
      console.log(this.data.styleindex);
  },  
 
  setNearbyIndex: function (e) { //分类四级索引  附近工地
    console.log(e);
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    var dataname = e.currentTarget.dataset.nearby;
    this.setData({
      nearbyindex: dataset.nearbyindex,
      cases: null
    })
    if (this.data.nearbyindex) {
      this.setData({
        Nearby: dataname,
      })
    } else {
      this.setData({
        Nearby: "装修风格",
      })
    }
    this.hideFilter();
    this.fetchCaseData();
      console.log(this.data.nearbyindex);
  },  

  hideFilter: function () { //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },
  scrollHandle: function (e) { //滚动事件
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },
  goToTop: function () { //回到顶部
    this.setData({
      scrolltop: 0
    })
  },
  scrollLoading: function () { //滚动加载
    var that = this;
    
    
    wx.request({
      url: this.data.URL + '/Decorate/decor_display_refresh',
      data: {
        start: this.data.cases.length,
        p: this.data.priceindex,
        pp: this.data.areaindex,
        ppp: this.data.styleindex
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data == null) {
          wx.showToast({
            title: '没有了',
            image: '/images/W.png'
          })
        } else {
          var array = that.data.cases;
          for (var i = 0; i < res.data.length; i++) {
            array.push(res.data[i]);
          }
          // console.log(array);
          that.setData({
            cases: array
          })
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 500
          })
        }
        
      }
    }) 

  },
  onPullDownRefresh: function () { //下拉刷新
    this.setData({
      page: 0,
      testdata: []
    })
    this.fetchTestData();
    this.fetchFilterData();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
   anli: function (e) {
     console.log(e);
     var caseid = e.currentTarget.dataset.caseid;
    wx.navigateTo({
      url: '../jingdiananlie/jingdiananlie?caseid=' + caseid
    });
  },
   gongdifenbu: function () {
     wx.navigateTo({
       url: '../gongdifenbu/gongdifenbu'
     });
   },
})