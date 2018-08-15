var area = require('../../data/area')
var p = 0, c = 0, d = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    get_id:0,
    get_manames:'收货人',
    get_mareceiverPhone:'电话号码',
    get_mareceiverAddr:'浙江省绍兴市越城区群贤中路'
    
  },
  bindPickerChange1: function (e) {

    this.setData({
      index1: e.detail.value
    })
  },

  bindPickerChange2: function (e) {

    this.setData({
      index2: e.detail.value
    })
  },

  bindPickerChange3: function (e) {

    this.setData({
      index3: e.detail.value
    })
  },

  bindPickerChange4: function (e) {

    this.setData({
      index4: e.detail.value
    })
  },

  decor: function (e) {

    this.setData({
      decorindex: e.detail.value
    })
  },
  decorate: function (e) {

    this.setData({
      decorateindex: e.detail.value
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 加载数据
  onLoad: function (options) {
    this.setAreaData();
    console.log(options)
    this.setData({
      get_id: options.get_id
    })
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var that= this;
    wx.request({
      url: URL + '/User/send_edit',
      data: {
        userId: UserId,
        i:this.data.get_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
           get_manames:res.data.name,
           get_mareceiverPhone: res.data.receiverPhone,
           get_mareceiverAddr: res.data.receiverAddr,
        })
      }
    });

  },
  // 修改数据
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
     var UserId = wx.getStorageSync('UserId'); 
    var URL = getApp().globalData.PHPURL;
    var phones = e.detail.value.get_mareceiverPhone;
    var names = e.detail.value.name;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var moren = 0;
    var provincenum = 0;
    var citynum = 0;
    var areanum = 0;
    provincenum = this.data.province;
          if (e.detail.value.switch) {
            moren = 1;
          }
          else {
            moren = 0;
          }
          if (names.length == 0) {
            wx.showToast({
              title: '收货人必须填写',
              icon: 'success',
              duration: 1500
            })
            return false;
          }
          if (phones == '') {
            wx.showToast({
              title: '手机号为空',
              icon: 'success',
              duration: 1500
            })
            return false;
          } else if (phones.length < 11) {
            wx.showToast({
              title: '手机号长度有误！',
              icon: 'success',
              duration: 1500
            })
            return false;
          } else if (!myreg.test(phones)) {
            wx.showToast({
              title: '手机号有误！',
              icon: 'success',
              duration: 1500
            })
            return false;
          } else if (!e.detail.value.get_mareceiverAddr) {
            wx.showToast({
              title: '省市区需填写',
              icon: 'success',
              duration: 1500
            })
            return false;
          }
          else {
            console.log(this.data.get_id)
            wx.request({
              url: URL + '/User/update_receive',
                  data: {
                    userId: UserId,
                    i: this.data.get_id,
                    def: moren,
                    name: e.detail.value.name,
                    phone: e.detail.value.get_mareceiverPhone,
                    addr: e.detail.value.get_mareceiverAddr
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    console.log(res.data)
                  }
                });
               wx.navigateBack()
         }
      
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

  },
  changeProvince: function (e) {
    this.resetAreaData('province')
    p = e.detail.value
    this.setAreaData('province', p)
  },
  changeCity: function (e) {
    this.resetAreaData()
    c = e.detail.value
    this.setAreaData('city', p, c)
  },
  // 选择区
  changeDistrict: function (e) {
    d = e.detail.value
    this.setAreaData('district', p, c, d)
  },

  setAreaData: function (t, p, c, d) {
    switch (t) {
      case 'province':
        this.setData({
          provinceSelIndex: p,
          cityEnabled: true
        })
        break;
      case 'city':
        this.setData({
          citySelIndex: c,
          districtEnabled: true
        })
        break;
      case 'district':
        this.setData({
          districtSelIndex: d
        })
    }

    var p = p || 0 // provinceSelIndex
    var c = c || 0 // citySelIndex
    var d = d || 0 // districtSelIndex
    // 设置省的数据
    var province = area['100000']
    var provinceName = [];
    var provinceCode = [];
    for (var item in province) {
      provinceName.push(province[item])
      provinceCode.push(item)
    }
    this.setData({
      provinceName: provinceName,
      provinceCode: provinceCode
    })
    // 设置市的数据
    var city = area[provinceCode[p]]
    var cityName = [];
    var cityCode = [];
    for (var item in city) {
      cityName.push(city[item])
      cityCode.push(item)
    }
    this.setData({
      cityName: cityName,
      cityCode: cityCode
    })
    // 设置区的数据
    var district = area[cityCode[c]]
    var districtName = [];
    var districtCode = [];
    for (var item in district) {
      districtName.push(district[item])
      districtCode.push(item)
    }
    this.setData({
      districtName: districtName,
      districtCode: districtCode
    })
  },
  resetAreaData: function (type) {
    this.setData({
      districtName: [],
      districtCode: [],
      districtSelIndex: '',
      districtEnabled: false
    })
    if (type == 'province') {
      this.setData({
        cityName: [],
        cityCode: [],
        citySelIndex: ''
      })
    }
  },
})