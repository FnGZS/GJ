// pages/Personaldetails/Personaldetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id:0,
     get_id:111111
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var img = [];
    img.push(e.currentTarget.dataset.img);
    console.log(img);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: img // 需要预览的图片http链接列表  
    })
  },   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      get_id: options.get_id,
      get_name: options.get_name,
      get_subtitle: options.get_subtitle,
      get_year: options.get_year,
      get_img:options.get_img,
    });
  },
  yuyue:function(e){
    var UserId = wx.getStorageSync('UserId');
    var login = wx.getStorageSync('login'); 
    var that = this;
    var id = that.data.get_id;

    if (login)
    {
        console.log(id)
        wx.navigateTo({
          url: '../yuyue/yuyue?get_id=' + id,
        })
    }
    else{    
        wx.showModal({
          title: '提示',
          content: '请登录',
          confirmColor: "#56a4ff",
        });
    }
  },
  /*,
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
  
  },
  
})