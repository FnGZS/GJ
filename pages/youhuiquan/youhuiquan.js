// pages/youhuiquan/youhuiquan.js
var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: getApp().globalData.PHPURL,
    all_num:0,
    youhuiquan:[],
    bgcolor:'#46CBC3'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var login = wx.getStorageSync('login');
    if(login){
      this.getCouponMes();
    }else{
      wx.showToast({
        title: '请登录后再查看优惠券噢~',
        icon: 'none',
        duration: 2000
      })
    }
    
  },

  //获取优惠券信息
  getCouponMes:function(){
    var UserId = wx.getStorageSync('UserId');
    var login = wx.getStorageSync('login');
    var that = this;
    wx.request({
      url: this.data.URL + '/Coupon/coupon_display',
      data: {
        userId: UserId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)

        var array = [];
        
        for(var i= 0 ; i < res.data.length ; i ++){
          var obj = {};
          if(res.data[i].label == '全部'){
            obj = res.data[i];
            obj['type'] = '全品类（特例商品除外）';
          }else{
            obj = res.data[i];
            obj['type'] = '指定类（特例商品除外）';
          }
          array.push(obj);

        }
        var num = array.length;
        that.setData({
          youhuiquan:array,
          all_num: num
        })
        console.log(that.data.youhuiquan)
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})