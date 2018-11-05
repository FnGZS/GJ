var goods_id =0;
var orderids = 0;
var isTeam = 0;
var num = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStars: [
      '/images/xingxing1.png',
      '/images/xingxing1.png',
      '/images/xingxing1.png',
      '/images/xingxing1.png',
      '/images/xingxing1.png'
    ],
    file: [],
    bizOppPics:'/images/2.jpg',
    haoping:'',
    text:''
  },
  starTap: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = '../../images/xingxing2.png'
      } else { // 其他是空心
        tempUserStars[i] = '../../images/xingxing1.png'
      }
    }
    num = index
    // 重新赋值就可以显示了
    this.setData({
      userStars: tempUserStars,
      
    })
    if(num == 0){
      this.setData({
        haoping: '一星好评',
      })
    } else if (num == 1)
    {
      this.setData({
        haoping: '二星好评',
      })
    } else if (num == 2) {
      this.setData({
        haoping: '三星好评',
      })
    } else if (num == 3) {
      this.setData({
        haoping: '四星好评',
      })
    } else if (num == 4) {
      this.setData({
        haoping: '五星好评',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    goods_id = options.goods_id;
    orderids = options.orderids;
    isTeam = options.isTeam;
    console.log(orderids)
  },
  comment:function(e){
    console.log(e)
    this.setData({
      text: e.detail.value
    })
  },
  //提交按钮
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  shangchuan:function(){
    console.log(this.data.haoping) 
    console.log(this.data.text) 
    var imgURL = getApp().globalData.IMGURL;

    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
   
    if (this.data.haoping == ''){
      wx.showToast({
        title: '未写看法',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    } else if (this.data.text == ''){
      wx.showToast({
        title: '未写看法',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }else{
      wx.request({
        url: URL + '/Order/evaluate_content',
        data: {
          userId: UserId,
          goodsId: goods_id,
          isTeam: isTeam,
          grade: this.data.haoping,
          content: this.data.text,
          orderId: orderids
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          if (res.data >= 0) {
            wx.request({
              url: URL + '/Mall/goods_addevaluate', //仅为示例，并非真实的接口地址
              data: {
                goodsId: goods_id,
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(666666666666666)
              }
            })
            wx.navigateBack({
              delta: 1,
            })
          } else if (res.data == 0) {
            wx.showToast({
              title: '评论失败',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
          }
        }
      });

    }


   
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