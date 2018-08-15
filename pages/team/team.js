// pages/test/test.js
var app = getApp();
var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URLimg: "",
    arr: [],
    arr_occupation: [],
    teamMes:[],//原始数据
    teamMes_backups:[],//备份数据
    indexSize: 0,
    indicatorDots: false,
    autoplay: false,
    duration: 1, //可以控制动画
    list: '',
    yuyueid:0,
    Sales: false,
    price: false
    
  },
  
  change(e) {
    console.log(e);
    this.setData({
      indexSize: e.detail.current
    })
   
  },
  scrollTo(e) {
    this.setData({
      indexSize: e.target.dataset.index
    })
    console.log(this.data.indexSize)
  },
  

  /** 
   * 生命周期函数--监听页面加载
   */

 
  onLoad: function (options) {
    this.setData({
      URLimg: iURL,
    })
    this.getTeamMes();
    
  },
  getTeamMes:function(){
    var that = this;
    var URL = getApp().globalData.PHPURL;
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: URL + '/User/occupation',
      data: {
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          arr: res.data,
        });
        wx.request({
          //上线接口地址要是https测试可以使用http接口方式
          url: URL + '/User/number',
          data: {
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
            that.setData({
              arr_occupation: res.data,
            });
            //将两张表数据进行相关联 进行判断将成员添加到职业数组中去    
            var teamMes = [];
            for (var i in that.data.arr) {
              var f = 0
              console.log(that.data.arr[i]);
              teamMes.push(that.data.arr[i]);
              for (var j in that.data.arr_occupation) {

                var num = 'arr[' + i + '].list[' + f + ']'
                if (that.data.arr[i].profession == that.data.arr_occupation[j].occupation) {
                  f = f + 1;
                  that.setData({
                    [num]: that.data.arr_occupation[j]
                  })

                }
              }
            }
            that.setData({
              teamMes: teamMes,
              teamMes_backups:teamMes
            })
            console.log(that.data.teamMes)
          },


        })
      },

    })  
  },
  //团队排序控制器
  sortGoods_control: function (e) {
    var that = this;
    var sortid = e.currentTarget.dataset.sort;
    if (sortid == 1) {
      var Sales = !that.data.Sales
      that.setData({
        Sales: Sales,
        price: false
      })
    } else {
      var price = !that.data.price
      that.setData({
        Sales: false,
        price: price
      })
    }
    that.onShow();
    console.log(that.data.arr_occupation);
  },
  sortGoods: function () {
    var that = this;
    var classiyLT = that.data.teamMes
    console.log(classiyLT); 
    if (that.data.Sales) {
      var classiyLT = that.data.teamMes
      for (var i = 0; i < classiyLT.length; i++) {
        for (var j = 0; j < classiyLT[i].list.length - 1; j++) {
          for (var k = 0; k < classiyLT[i].list.length - 1 - j; k++)// j开始等于0，  
          {
            if (parseInt(classiyLT[i].list[k].out) < parseInt(classiyLT[i].list[k + 1].out)) {
              var arrt = classiyLT[i].list[k];
              classiyLT[i].list[k] = classiyLT[i].list[k + 1];
              classiyLT[i].list[k + 1] = arrt;
            }
          }
        }
      }
    }
    else if (that.data.price) {

      var classiyLT = that.data.teamMes
      for (var i = 0; i < classiyLT.length; i++) {
 
        for (var j = 0; j < classiyLT[i].list.length - 1; j++) {
          for (var k = 0; k < classiyLT[i].list.length - 1 - j; k++)// j开始等于0，  
          {
            if (parseInt(classiyLT[i].list[k].price) > parseInt(classiyLT[i].list[k + 1].price)) {
              var arrt = classiyLT[i].list[k];
              classiyLT[i].list[k] = classiyLT[i].list[k + 1];
              classiyLT[i].list[k + 1] = arrt;
            }
          }
        }
      }
    } else {
      classiyLT = that.data.teamMes_backups;
    }
    return classiyLT;
  },

  //自定义 页面传值
  toDetail: function (e) {
    console.log(e);
    //这里需要前台加一个data-xx 这里才能获取
    var title = e.currentTarget.dataset.title;
    var year = e.currentTarget.dataset.year;
    var img = e.currentTarget.dataset.img;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../teamDetail/teamDetail?id=' + id
    });
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
    var that = this;
    var arrt = that.sortGoods()
    that.setData({
      teamMes: arrt,
      //  goods_img: JSON.parse(res.data[6].goods_img)//json字符串转数组
    });
    console.log(arrt);
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