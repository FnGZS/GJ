var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: getApp().globalData.PHPURL,
    URLimg: "",
    content:'',
    Case: false,
    Goods: true,
    case_num: 2,
    display1:'none',
    display2: 'flex',
    display_noGoods:'none',
    display_noCases:'none',
    goods: '',
    cases:'',
    goods_name:[],
    goods_price:[],
    goods_inventory:[],
    kucun:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      content:options.content,
      URLimg: iURL
    });
    this.getGoods();
  },
  //点击商品
  tapName: function (e) {
    console.log(e)
    var goods_id = e.currentTarget.dataset.id;
    console.log(goods_id);
    wx.navigateTo({
      url: '../detail/detail?goods_id='+ goods_id
    })
  },
  //获取商品列表
  getGoods:function(){
    var that = this;
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
      url: this.data.URL + '/Index/goods_search',
      data: {
        content: this.data.content,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          goods: res.data
        })
        var price = [];
        var inventory = [];
        var out = [];
        var sum = 0;
        var sell = 0;
        var kucun = [];
        var sell_inventory = [];
        if (res.data) {
          for (var i = 0; i < res.data.length; i++) {
            price.push(JSON.parse(res.data[i].goods_price));
            inventory.push(JSON.parse(res.data[i].goods_inventory));
            out.push(JSON.parse(res.data[i].goods_out));
            sum = 0;
            sell = 0;
            for (var k = 0; k < price[i].length; k++) {
              sum = sum + parseInt(inventory[i][k]);
              sell = sell + parseInt(out[i][k]);
              kucun[i] = sum; // 总库存
              sell_inventory[i] = sell; //已售
            }
          }
        } else {
          that.setData({
            display_noGoods: 'block'
          })
        }
        that.setData({
          goods_inventory: sell_inventory,
          kucun: kucun,
          goods_price: price
        });
      }
    }) 
  },
  //获取案例列表
  getCases:function(){
    var that = this;
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
      url: this.data.URL + '/Index/cases_search',
      data: {
        content: this.data.content,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data) {
          that.setData({
            cases: res.data
          })
        } else {
          that.setData({
            display_noCases: 'block'
          })
        }
        console.log(that.data.cases);
      }

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
    
  },

  //搜索控制器
  search_control: function (e) {
    var that = this;
    var sortid = e.currentTarget.dataset.search;
    if (sortid == 1) {  
      that.setData({
        Case: true,
        Goods: false,
        display1:'flex',
        display2:'none',
        display_noGoods:'none',
        display_noCases:'none'
      })
      this.getCases();
    } else {
      that.setData({
        Case: false,
        Goods: true,
        display1: 'none',
        display2: 'block',
        display_noGoods: 'none',
        display_noCases: 'none'
      })
      this.getGoods();
    }
  },
  serach_content:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  fresh :function(){
    var that = this;
    // this.serach_content();
    //获取搜索商品列表
    wx.request({
      url: this.data.URL + '/Index/goods_search',
      data: {
        content: this.data.content,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          goods:res.data
        })
        var price=[];
        var inventory = [];
        var out = [];
        var sum = 0;
        var sell = 0;
        var kucun = [];
        var sell_inventory = [];
        if(res.data){
          for (var i = 0; i < res.data.length; i++) {
            price.push(JSON.parse(res.data[i].goods_price));
            inventory.push(JSON.parse(res.data[i].goods_inventory));
            out.push(JSON.parse(res.data[i].goods_out));
            sum = 0;
            sell = 0;
             for(var k=0;k<price[i].length;k++){
               sum = sum + parseInt(inventory[i][k]);
               sell = sell + parseInt(out[i][k]);
               kucun[i] = sum; // 总库存
               sell_inventory[i] = sell; //已售
             }
          }
        }
        that.setData({
          goods_inventory: sell_inventory,
          kucun: kucun,
          goods_price: price
        })
        console.log(that.data.kucun)
        console.log(that.data.goods_inventory)
        console.log(that.data.goods);
      }
    })
    //获取案例列表
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
      url: this.data.URL + '/Index/cases_search',
      data: {
        content: this.data.content,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          cases: res.data
        })
        console.log(that.data.cases);
      }

    })     
  },

  //搜索
  search_btn:function(){
    this.uploadKeyword();
    //判断是否为空，如果是空就不能搜索
    if (this.data.content != null && this.data.content != '') {
      this.fresh();
    } else {
      wx.showToast({
        title: '请输入搜索的关键字',
        icon: 'none',
        duration: 1000
      })
    }
  },

//上传搜索数据到数据库中
  uploadKeyword: function (e) {
    wx.request({
      url: this.data.URL + '/Index/hot_search',
      data: {
        content: this.data.content,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      }

    })
  },

})