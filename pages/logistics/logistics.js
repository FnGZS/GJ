var URL = getApp().globalData.PHPURL;
var LogisticsURL = getApp().globalData.LogisticsURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wuliu: {
      company: '韵达快递',
      nu: '4326665981311546542',
      phone: '95533',
      img:'/images/sad.png',
      mes: [{
        time: '2018-03-21',
        context: '',
      
      },]
    }

  },
  getlogistics: function(e) {
    var that = this;
    console.log(e.order_id);
    //物流先查这个物流号可能在的公司，然后到每个可能的公司那里去找这个物流号是否可能存在
    wx.request({ //查物流订单号
      url: URL + '/Mall/goods_order_quiry',
      data: {
        orderId: e.order_id,

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(resorder) {
        console.log(resorder.data[0].data)
        var arr = JSON.parse(resorder.data[0].data);
        console.log(arr);
        var data = "wuliu.mes";
        var datacop = "wuliu.company";
        var dataimg="wuliu.img"
        var datanum= "wuliu.nu"
        that.setData({
          [data]: arr,
          [datanum]: resorder.data[0].order_num,
          [datacop]: resorder.data[0].expTextName,
          [dataimg]: 'https://www.sxscott.com/gujie/public/express/'+resorder.data[0].expSpellName+'.png',

        })
        console.log(that.data.wuliu.mes);
      }
    })
  },
  //   wx.request({
  //     url: URL +'/autoComNum.php'

  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var order_id = options.order_id;
    console.log(order_id);
    this.getlogistics(options);
    console.log(this.data.wuliu);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})