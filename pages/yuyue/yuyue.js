Page({

  /**
   * 页面的初始数据
   */
  data: {
    get_id: 111111,
    phone:0,
    name:0,
    code:0,
    judgeName:0,
    judgePhone:0,
    list:0,
    UsId:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var UserId= wx.getStorageSync('UserId'); 
    console.log(UserId)
    var login = wx.getStorageSync('login'); 
    console.log(1111);
    console.log(UserId);

    if (login)
    {
      this.setData({
        get_id: options.get_id,
        UsId: UserId,
      });
    }
    else{    
        wx.showModal({
          title: '提示',
          content: '请登录',
          confirmColor: "#56a4ff",
          success(res) {
            console.log(res.confirm);
            if (res.confirm) {
              console.log('用户点击确定')
              wx.switchTab({
                url: '../wode/wode?a=' + 1,
              })
            }

          }
        });
    }
  },
  // tijiao:function(e){
  //   var id = this.data.get_id;
  //   console.log(id);

  // },
  formSubmit: function (e) {
    var URL = getApp().globalData.PHPURL;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formext = e.detail.value;
     if(this.judge()!=1)
     {
       this.judge();
     }
     else if(this.data.code == '')
    {
      wx.showToast({
        title: '手机验证码为空',
      })
      return false;
    }
    else{
       var that = this;
       wx.request({
         //上线接口地址要是https测试可以使用http接口方式
         url: URL + '/Reservations/Reser',
         data: {
           userid_data: this.data.UsId,
           name_data: formext.name,
           phone_data: formext.phone,
           teamId_data: this.data.get_id,
         },
         method: 'post',
         header: {
           'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {

           that.setData({
             list: res.data,
             //res代表success函数的事件对，data是固定的，list是数组
           })
           console.log(that.data.list);
           if (that.data.list == -1) {
             wx.showToast({
               title: '您已经预约一次',
             })
           }
         }
       })
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */ 
  voteT:function(e){ //获取验证码
    this.setData({
      code: e.detail.value
    })
  },
  vote:function(e){ //获取姓名
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name);
  },
  voteTitle: function (e) {//获取手机号码
    this.setData({
      phone: e.detail.value
    })
  }, 
  judge:function(e){   //判断手机号码是否为正以及姓名是否为空
    var num = this.data.phone;
    console.log(num);
    var name = this.data.name;
    console.log(name.length);
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (name == '') {
      wx.showToast({
        title: '输入的姓名为空',
      })
      return false;
    }
    else if (num == '') {
      wx.showToast({
        title: '手机号为空',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else if (num.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(num)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    } 
    return 1;
  }, 
 
   yancode:function(){
     var URL = getApp().globalData.PHPURL;
     var code = Math.random().toString(9).substr(2, 4);
     var phone = this.data.phone;
     console.log(code);
     this.judge();
     console.log(phone);
    // wx.request({
    //   url: URL + '/Message/sendSms',
    //   data: {
    //     code:code,
    //     phone:phone,
    //   },
    //   method: 'post',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //    console.log(res)
    //   }
    // })
   },
  
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