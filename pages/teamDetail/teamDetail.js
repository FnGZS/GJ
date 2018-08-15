var app = getApp();
var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: getApp().globalData.PHPURL,
    URLimg: "",
    lodingHidden: true,
    id:'',
    detail:[]
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      URLimg: iURL,
      // id:options.id,
      id:3,
      lodingHidden: false,
    })
    this.getDetail();
  },
  onShow: function () {
    
  },
  onPullDownRefresh: function () {
    this.getDetail();
   
    wx.stopPullDownRefresh();
  },
  getDetail:function(){
    var that = this;
    wx.request({
      url: this.data.URL + '/user/teamdetail',
      data: {
        id:this.data.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          detail:res.data,
          lodingHidden: true,
        })
      }
    }) 
  },
  toCase:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../jingdiananlie/jingdiananlie?caseid=' + id,
    })
  }

})