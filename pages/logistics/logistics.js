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
      mes: [{
        day: '2018-03-21',
        time: '13:37',
        mes: '[浙江绍兴公司]快件已被 已签收 签收'
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
        console.log(resorder.data[0].order_num); //单号
        var data="wuliu.nu";
        that.setData({
          [data]: resorder.data[0].order_num
        })
        wx.request({ //查该订单号可能存在的公司
          url: LogisticsURL + '/autoComNum.php',
          data: {
            text: resorder.data[0].order_num,

          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
           
            res.data.auto.push({
              comCode: 'zhimakaimen'
            })
            for (var i = 0; i < res.data.auto.length; i++) { // 遍历有可能性的快递公司
              var comCode = res.data.auto[i].comCode; // 获取当前快递公司名称
              (function(comCode) { // 这个是匿名函数自执行，comCode的参数就是下面comCode传入的参数，也就是上面定义的参数，解决ajax与for参数异步的问题
                wx.request({ // 根据可能性的公司名称与单号进行详细查询
                  url: LogisticsURL + "/query.php",
                  data: {
                    type: comCode, // 传公司名称
                    postid: resorder.data[0].order_num // 传单号
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function(resdata) { // 那这边得出的结果，跟http://www.kuaidi100.com/?from=openv这个网址得出的结果是一样的
                    //这里就直接赋值了
                    if(resdata.data.data!='')
                    {
                      var data = "wuliu.mes";
                      var datacop ="wuliu.company"
                      that.setData({
                        [data]: resdata.data.data,
                        [datacop]: comCode
                      })
                  
                      console.log(that.data.wuliu.mes);
                    }
                 
                  }
                })
              })(comCode);
            }
          }
        })
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