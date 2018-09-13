var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
// pages/gongdifenbu/gongdifenbu.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    URL: getApp().globalData.PHPURL,
    URLimg: "",
    second_height: 0,
    xx:0,
    yy:0,
    markers: [],
    foot:null,
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211, 
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color: '#7cb5ec88',
    //   width: 2,
    //   dottedLine: true
    // }], 
    // controls: [{          //  地图控件留用
    //   id: 1,
    //   iconPath: '../../images/location.png',
    //   position: {
    //     left: 20,
    //     top: 350,
    //     width: 30,
    //     height: 30
    //   },
    //   clickable: true
    // }],
   
   
  

    
  },
  
  regionchange(e) {
    // console.log(e.type)
  },
  markertap(e) {
    // console.log(e.markerId)
    // wx.navigateTo({
    //   url: '../jingdiananlie/jingdiananlie'
    // })
    
  },
  callouttap(e) {
    // console.log(e);
    wx.navigateTo({
      url: '../jingdiananlie/jingdiananlie',
    })
  },
  controltap(e) {
    // console.log(e.controlId)
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var txt;
    this.uploadFoot(); //获取好友足迹
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
         txt=res
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res.latitude)
        console.log(res.longitude)
        that.setData({
          xx: latitude,
          yy: longitude,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })  
      }
    }),
 
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.getCenterLocation({
      success: function (res) {
        //  console.log(res.longitude)
        //  console.log(res.latitude)
         
      }, 
     
    }), 
     this.mapCtx.moveToLocation() 
   
    // console.log('onLoad')              //页面高度

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
          second_height: res.windowHeight - res.windowWidth / 750 * 300+8
      
        })
      } 
    }),

    //获取工地分布经纬度
      wx.request({
        //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
      url: this.data.URL + '/Decorate/location_global',
        data: {
          content: this.data.content,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          
          var array = [];
          for(var i = 0 ; i < res.data.length ; i ++){
            var obj = {};
            obj['iconPath']= "../../images/zuobiao.png";
            obj['id'] = res.data[i].id;
            obj['latitude'] = res.data[i].latitude;
            obj['longitude'] = res.data[i].longitude;
            obj['width'] = 40;
            obj['height'] = 40;
            var objin={};
            objin['content'] = res.data[i].caseName;
            objin['color'] = "#ffffff";
            objin['fontSize'] = '15';
            objin['borderRadius'] = '10';
            objin['bgColor'] = '#ECC743';
            objin['padding'] = '5';
            objin['display'] = 'ALWAYS';
            obj['callout'] = objin;
            array.push(obj);
          }
          // console.log(array);
          that.setData({
            markers:array
          })
          console.log(that.data.markers);
        }
      }) 
    

  },
  moveToLocation: function () {    
    this.mapCtx.moveToLocation()
  },
   translateMarker: function () {    //地图  
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        // console.log('animation end')
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

  //获取好友足迹
  uploadFoot:function (){
    var that = this;
    wx.request({
      url: this.data.URL + '/Decorate/site_foot',
      data: {
        userId: wx.getStorageSync('UserId')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          foot:res.data
        })
      }
    }) 
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
    console.log('上拉加载');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
}) 