// var area = require('../../data/area')
// var p = 0, c = 0, d = 0
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     province:'',
//     city:'',
//     area:'',
//   },
//   formSubmit: function (e) {
//     console.log(e)
//     var URL = getApp().globalData.PHPURL;
//     // console.log('form发生了submit事件，携带数据为：', e.detail.value)
//     var UserId = wx.getStorageSync('UserId');
//     var that =this;
//     // console.log(UserId);
//     var phones = e.detail.value.phone;
//     var names = e.detail.value.name;
//     // console.log(names.length);
//     var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
//     var moren = 0;
//     var provincenum=0;
//     var citynum=0;
//     var areanum=0;
//     provincenum = this.data.province;
//     // console.log(provincenum)
//     // console.log(citynum)
//     // console.log(areanum)
//     if (e.detail.value.switch)
//      {
//           moren = 1;
//      }
//     else 
//      {
//           moren = 0;
//      }
//      if (names.length == 0) {
//        wx.showToast({
//          title: '收货人必须填写',
//          icon: 'success',
//          duration: 1500
//        })
//        return false;
//      }  
//     if (phones == '') {
//           wx.showToast({
//             title: '手机号为空',
//             icon: 'success',
//             duration: 1500
//           })
//           return false;
//       } else if (phones.length < 11) {
//         wx.showToast({
//           title: '手机号长度有误！',
//           icon: 'success',
//           duration: 1500
//         })
//         return false;
//       } else if (!myreg.test(phones)) {
//         wx.showToast({
//           title: '手机号有误！',
//           icon: 'success',
//           duration: 1500
//         })
//         return false;
//     } else if ( !this.data.province || !this.data.city ){
//       wx.showToast({
//         title: '省市区需填写',
//         icon: 'success',
//         duration: 1500
//       })
//       return false;
//     } 
//     else if (!e.detail.value.address){
//       wx.showToast({
//         title: '详细地址需添',
//         icon: 'success',
//         duration: 1500
//       })
//       return false;
//     }
//     // else{
//       console.log(UserId)
//       console.log(e.detail.value.name)
//       console.log(e.detail.value.phone)
//       console.log(this.data.province)
//       console.log(this.data.city)
//       console.log(this.data.area)
//       if (this.data.area == undefined)
//       {
//         this.setData({
//           area:''
//         })
//       }
//       console.log(this.data.area)
//       console.log(e.detail.value.address)
//       console.log(moren)
//           wx.request({
//             url: URL + '/User/add_receive',
//             data: {
//               userId: UserId,
//               name: e.detail.value.name,
//               phone: e.detail.value.phone,
//               province: this.data.province,
//               city: this.data.city,
//               distric: this.data.area,
//               area: e.detail.value.address,
//               def: moren
//             },
//             method: 'POST',
//             header: {
//               'content-type': 'application/x-www-form-urlencoded'
//             },
//             success: function (res) {
//               console.log(res.data)
//               if(res.data==-1)
//               {
//                 wx.showToast({
//                   title: '您超出字数限额',
//                 })
//               }
//               else if (res.data == 0){
//                 wx.showToast({
//                   title: '添加不成功',
//                 })
//               }else{
//                 wx.showToast({
//                   title: '保存成功',
//                 })
//                 wx.navigateBack();
//               }

//             }
//           });
//     // }
        


//   },
//   bindPickerChange1: function (e) {

//     this.setData({
//       index1: e.detail.value
//     }) 
//   },

//   bindPickerChange2: function (e) {

//     this.setData({
//       index2: e.detail.value
//     })
//   },

//   bindPickerChange3: function (e) {

//     this.setData({
//       index3: e.detail.value
//     })
//   },

//   bindPickerChange4: function (e) {

//     this.setData({
//       index4: e.detail.value
//     })
//   },

//   decor: function (e) {

//     this.setData({
//       decorindex: e.detail.value
//     })
//   },
//   decorate: function (e) {

//     this.setData({
//       decorateindex: e.detail.value
//     })
//   },



//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     this.setAreaData()
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   },
//   changeProvince: function (e) {
//     this.resetAreaData('province')
//     p = e.detail.value
//     this.setAreaData('province', p)
//   },
//   changeCity: function (e) {
//     this.resetAreaData()
//     c = e.detail.value
//     this.setAreaData('city', p, c)
//   },
//   // 选择区
//   changeDistrict: function (e) {
//     d = e.detail.value
//     this.setAreaData('district', p, c, d)
//   },

//   setAreaData: function (t, p, c, d) {
//     switch (t) {
//       case 'province':
//         this.setData({
//           provinceSelIndex: p,
//           cityEnabled: true
//         })
//         break;
//       case 'city':
//         this.setData({
//           citySelIndex: c,
//           districtEnabled: true
//         })
//         break;
//       case 'district':
//         this.setData({
//           districtSelIndex: d
//         })
//     }

//     var p = p || 0 // provinceSelIndex
//     var c = c || 0 // citySelIndex
//     var d = d || 0 // districtSelIndex
//     // 设置省的数据
//     var province = area['100000']
//     var provinceName = [];
//     var provinceCode = [];
//     for (var item in province) {
//       provinceName.push(province[item])
//       provinceCode.push(item)
//     }
//     this.setData({
//       provinceName: provinceName,
//       provinceCode: provinceCode
//     })
//     console.log(this.data.provinceName[this.data.provinceSelIndex]);
//     var pro = this.data.provinceName[this.data.provinceSelIndex];
//     this.setData({
//       province: pro
//     })
//     console.log(this.data.province)
//     // 设置市的数据
//     var city = area[provinceCode[p]]
//     var cityName = [];
//     var cityCode = [];
//     for (var item in city) {
//       cityName.push(city[item])
//       cityCode.push(item)
//     }
//     this.setData({
//       cityName: cityName,
//       cityCode: cityCode
//     })
//     console.log(this.data.cityName[this.data.citySelIndex]);
//     var cityy = this.data.cityName[this.data.citySelIndex];
//     this.setData({
//       city: cityy
//     })
//     console.log(this.data.city)
//     // 设置区的数据
//     var district = area[cityCode[c]]
//     var districtName = [];
//     var districtCode = [];
//     for (var item in district) {
//       districtName.push(district[item])
//       districtCode.push(item)
//     }
//     this.setData({
//       districtName: districtName,
//       districtCode: districtCode
//     })
//     console.log(this.data.districtName[this.data.districtSelIndex]);
//     var areas = this.data.districtName[this.data.districtSelIndex];
//     this.setData({
//       area: areas
//     })
//     console.log(this.data.area)
//   },
//   resetAreaData: function (type) {
//     this.setData({
//       districtName: [],
//       districtCode: [],
//       districtSelIndex: '',
//       districtEnabled: false
//     })
//     if (type == 'province') {
//       this.setData({
//         cityName: [],
//         cityCode: [],
//         citySelIndex: ''
//       })
//     }
//   },
// })


var area = require('../../data/area')
var p = 0, c = 0, d = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: '',
    city: '',
    area: '',
  },
  formSubmit: function (e) {
    var URL = getApp().globalData.PHPURL;
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var UserId = wx.getStorageSync('UserId');
    var that = this;
    // console.log(UserId);
    var phones = e.detail.value.phone;
    var names = e.detail.value.name;
    // console.log(names.length);
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var moren = 0;
    var provincenum = 0;
    var citynum = 0;
    var areanum = 0;
    provincenum = this.data.province;
    // console.log(provincenum)
    // console.log(citynum)
    // console.log(areanum)


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
    }
    else if (!myreg.test(phones)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else if (!this.data.province || !this.data.city) {
      wx.showToast({
        title: '省市区需填写',
        icon: 'success',
        duration: 1500
      })
      // return false;
    }
    else if (!e.detail.value.address) {
      wx.showToast({
        title: '详细地址需添',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    else {
      console.log(e.detail.value.switch)
      if (e.detail.value.switch) {
        moren = 1;
      }
      else {
        moren = 0;
      }
      if (this.data.area == undefined || this.data.area == '') {
        this.setData({
          area: ''
        })
      }

      console.log(this.data.area)
      console.log(e.detail.value.address)
      console.log(moren)
      wx.request({
        url: URL + '/User/add_receive',
        data: {
          userId: UserId,
          name: e.detail.value.name,
          phone: e.detail.value.phone,
          province: this.data.province,
          city: this.data.city,
          distric: this.data.area,
          area: e.detail.value.address,
          def: moren
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          if (res.data == -1) {
            wx.showToast({
              title: '您超出字数限额',
            })
          }
          else if (res.data == 0) {
            wx.showToast({
              title: '添加不成功',
            })
          } else {
            wx.showToast({
              title: '保存成功',
            })
            wx.navigateBack();
          }

        }
      });
    }



    console.log(UserId)
    console.log(e.detail.value.name)
    console.log(e.detail.value.phone)
    console.log(this.data.province)
    console.log(this.data.city)
    console.log(this.data.area)
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
  onLoad: function (options) {
    this.setAreaData()
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
    console.log(this.data.provinceName[this.data.provinceSelIndex]);
    var pro = this.data.provinceName[this.data.provinceSelIndex];
    this.setData({
      province: pro
    })
    console.log(this.data.province)
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
    console.log(this.data.cityName[this.data.citySelIndex]);
    var cityy = this.data.cityName[this.data.citySelIndex];
    this.setData({
      city: cityy
    })
    console.log(this.data.city)
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
    console.log(this.data.districtName[this.data.districtSelIndex]);
    var areas = this.data.districtName[this.data.districtSelIndex];
    this.setData({
      area: areas
    })
    console.log(this.data.area)
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




