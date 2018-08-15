Page({

  /**
   * 页面的初始数据
   */
  data: {
    province:'',
    city:'',
    distric:'',
    area:'',
    pattern_shi:1,
    pattern_ting:1,
    pattern_chu:1,
    pattern_wei:1,
    style:'',
    grade:'',
    price:'',
    mes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mes: JSON.parse(options.mes)
    })
    console.log(this.data.mes);
    this.setData({
      province: this.data.mes[0].province,
      city: this.data.mes[0].city,
      distric: this.data.mes[0].distric,
      area: this.data.mes[0].area,
      pattern_shi: this.data.mes[0].shi,
      pattern_ting: this.data.mes[0].ting,
      pattern_chu: this.data.mes[0].chu,
      pattern_wei: this.data.mes[0].wei,
      style: this.data.mes[0].style,
      grade: this.data.mes[0].grade,
      price: this.data.mes[0].price,

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