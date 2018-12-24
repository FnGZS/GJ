var area = require('../../data/area')
var app = getApp();
var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
var p = 0, c = 0, d = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: getApp().globalData.PHPURL,
    array1: ['1室', '2室', '3室', '4室'],
    index1: 0,

    array2: ['1厅', '2厅', '3厅', '4厅'],
    index2: 0,

    array3: ['1厨', '2厨', '3厨', '4厨'],
    index3: 0,

    array4: ['1卫', '2卫', '3卫', '4卫'],
    index4: 0,

    decorarray: [],
    decorindex: 0,

    decoratearry: [],
    decorateindex: 0,

    provinceName: "",
    provinceSelIndex: "",
    cityName: "",
    citySelIndex: "",
    districtName: "",
    districtSelIndex: "",
    phone: "",
    URL: getApp().globalData.PHPURL,
    mes:[
      { province: '', city: '', distric: '', area: 0, shi: 1, ting: 1, chu: 1, wei: 1, style :'',grade:'',phone:'',price:''}
    ]


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
    this.getMes();
    this.setAreaData();
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  changeProvince: function (e) {

    this.resetAreaData('province')
    p = e.detail.value
    this.setAreaData('province', p)

  },
  getMes:function(){
    var that = this;
    wx.request({
      url: that.data.URL + '/Quotation/quo_display',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var decorarray = res.data.quotation_style;
        var decoratearry = res.data.quotation_grade;
        that.setData({
          decorarray: decorarray,
          decoratearry: decoratearry
        })
      }
    })
  },
  //选择城市
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
  //获取房屋面积
  areaInput: function (e) {
    this.setData({
      area: e.detail.value
    })
  },
  //获取手机号
  phoneinput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //立即报价
  clickButton: function () {
    var that = this;
    var province = that.data.provinceName[that.data.provinceSelIndex];
    var city = that.data.cityName[that.data.citySelIndex];
    var distric = that.data.districtName[that.data.districtSelIndex];
    var area = that.data.area;
    var shi = that.data.array1[that.data.index1].substring(0, 1);
    var ting = that.data.array2[that.data.index2].substring(0, 1);
    var chu = that.data.array3[that.data.index3].substring(0, 1);
    var wei = that.data.array4[that.data.index4].substring(0, 1);
    var style = that.data.decorarray[that.data.decorindex];
    var grade = that.data.decoratearry[that.data.decorateindex];
    var phone = that.data.phone;
    // var phone = '17857058385';
    // var area = 100;

    var price = area * 500 + shi * 2000 + ting * 3000 + chu * 4000 + wei * 5000 + 1000 + 1000;

    if(province == null ){
      wx.showToast({ title: '请选择省份', icon: 'none',duration:1000});
    }
    else{
      if(city == null){
        wx.showToast({ title: '请选择城市', icon: 'none', duration: 1000 });
      }
      else{
        if (distric == null){
          wx.showToast({ title: '请选择地区', icon: 'none', duration: 1000 });
        }
        else{
          if(area == '' || area == null || area == '0'){
            wx.showToast({ title: '请输入正确的房屋面积', icon: 'none', duration: 1000 });
          }
          else{
            if(phone == '' || phone == null ){
              wx.showToast({ title: '请输入您的手机号', icon: 'none', duration: 1000 });
            }
            else if(phone.length != 11){
              wx.showToast({ title: '请输入正确位数的手机号', icon: 'none', duration: 1000 });
            }
            else{
              var mes_province = "mes[" + 0 + "].province";
              var mes_city = "mes[" + 0 + "].city";
              var mes_distric = "mes[" + 0 + "].distric";
              var mes_area = "mes[" + 0 + "].area";
              var mes_shi = "mes[" + 0 + "].shi";
              var mes_ting = "mes[" + 0 + "].ting";
              var mes_chu = "mes[" + 0 + "].chu";
              var mes_wei = "mes[" + 0 + "].wei";
              var mes_style = "mes[" + 0 + "].style";
              var mes_grade = "mes[" + 0 + "].grade";
              var mes_phone = "mes[" + 0 + "].phone";
              var mes_price = "mes[" + 0 + "].price";

              this.setData({
                [mes_province]: province,
                [mes_city]: city,
                [mes_distric]: distric,
                [mes_area]: area,
                [mes_shi]: shi,
                [mes_ting]: ting,
                [mes_chu]: chu,
                [mes_wei]: wei,
                [mes_style]: style,
                [mes_grade]: grade,
                [mes_phone]: phone,
                [mes_price]: price
              });

              var UserId = wx.getStorageSync('UserId');
              console.log(UserId);
              var login = wx.getStorageSync('login');
              var that = this;
              if (login) {
                wx.request({
                  //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
                  url: this.data.URL + '/Quotation/quotation',
                  data: {
                    userid_data: UserId,
                    province: province,
                    city: city,
                    distric: distric,
                    area: area,
                    pattern_shi: shi,
                    pattern_ting: ting,
                    pattern_chu: chu,
                    pattern_wei: wei,
                    style: style,
                    grade: grade,
                    phone: phone,
                    // price: price
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    console.log(res);
                  }
                })
                wx.navigateTo({
                  url: '../calculatorResult/calculatorResult?mes=' + JSON.stringify(this.data.mes)
                })
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '请登录',
                  confirmColor: "#56a4ff",
                });
              }

             
            }
            
          }
        }
      }
    }

    

    console.log(this.data.mes);
    

  },

})