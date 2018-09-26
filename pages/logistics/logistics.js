var URL = getApp().globalData.PHPURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wuliu:
    {
      company: '韵达快递',
      nu: '4326665981311546542',
      phone: '95533',
      mes: [
        { day: '2018-03-21', time: '13:37', mes: '[浙江绍兴公司]快件已被 已签收 签收' },
        { day: '2018-03-21', time: '13:18', mes: '[浙江绍兴公司]快件已被 入快递柜 代签收如有问题请联系' },
        { day: '2018-03-21', time: '08:45', mes: '[浙江绍兴公司]进行派件扫描；派送业务员：马鼎；联系电话：18258002525' },
        { day: '2018-03-21', time: '03:47', mes: '[浙江绍兴分拨中心]从站点发出，本次转运目的地：浙江绍兴公司' },
        { day: '2018-03-20', time: '21:22', mes: '[山东青岛分拨中心]进行装车扫描，即将发往：浙江杭州分拨中心' },
        { day: '2018-03-20', time: '21:22', mes: '[山东青岛分拨中心]在分拨中心进行称重扫描' },
        { day: '2018-03-20', time: '13:45', mes: '[山东青岛城阳区一公司]进行揽件扫描' }
      ]
    }

  },
  getlogistics:function(order_id){
    var that=this;
    wx.request({
      url: URL +'Mall/goods_order_quiry',
      data: {
        orderId: order_id,
      
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)

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
  onLoad: function (options) {
    var order_id=options.order_id;
    console.log(order_id);
    this.getlogistics(options);
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