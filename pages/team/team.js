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
    Sales: 1,
    price: 1,
    evaluate: 1,
    sortid: 0//控制销量价格评价 哪一个选项
    
  },
  //搜索
  search: function () {
    wx.navigateTo({
      url: '../search1/search1'
    });
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
                if (that.data.arr[i].profession == that.data.arr_occupation[j].goods_classify) {
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
            console.log(that.data.arr_occupation)
          },


        })
      },

    })  
  },
 
  //商品排序控制器
  sortGoods_control: function (e) {
    var that = this;

    that.setData({
      sortid: e.currentTarget.dataset.sort,
    })
    if (that.data.sortid == 1) {
      that.setData({
        evaluate: 1,
        price: 1
      })
      if (that.data.Sales % 2) {
        that.setData({
          Sales: 2,
        })
      } else {
        that.setData({
          Sales: 1,
        })
      }
    } else if (that.data.sortid == 2) {//看的我头都大了  价格
      that.setData({
        evaluate: 1,
        Sales: 1
      })
      if (that.data.price % 2) {
        that.setData({
          price: 2,
        })
      } else {
        that.setData({
          price: 1,
        })
      }
    } else if (that.data.sortid == 3) {
      that.setData({
        price: 1,
        Sales: 1
      })
      if (that.data.evaluate % 2) {
        that.setData({
          evaluate: 2,
        })
      } else {
        that.setData({
          evaluate: 1,
        })
      }
    }
    that.onShow();
  },

  //商品排序强行最基础排序
  sortGoods: function () {
    var that = this;
    console.log(that.data.teamMes);
    var classiyLT = that.data.teamMes
    //销量
    if (that.data.sortid == 1) {
      console.log(11221313)
      if (that.data.Sales == 1) {
        console.log(1113)
        var classiyLT = that.data.teamMes
        console.log(classiyLT.length);
        for (var i = 0; i < classiyLT.length; i++) {
          for (var j = 0; j < classiyLT[i].list.length - 1; j++) {
            for (var k = 0; k < classiyLT[i].list.length - 1 - j; k++) // j开始等于0，  
            {
              if (parseInt(classiyLT[i].list[k].goods_out) < parseInt(classiyLT[i].list[k + 1].goods_out)) {
                var arrt = classiyLT[i].list[k];
                classiyLT[i].list[k] = classiyLT[i].list[k + 1];
                classiyLT[i].list[k + 1] = arrt;
              }
            }
          }
        }
      } else if (that.data.Sales == 2) {
           console.log(1113)
        var classiyLT = that.data.teamMes
        for (var i = 0; i < classiyLT.length; i++) {
          for (var j = 0; j < classiyLT[i].list.length - 1; j++) {
            for (var k = 0; k < classiyLT[i].list.length - 1 - j; k++) // j开始等于0，  
            {
              if (parseInt(classiyLT[i].list[k].goods_out) >= parseInt(classiyLT[i].list[k + 1].goods_out)) {
                var arrt = classiyLT[i].list[k];
                classiyLT[i].list[k] = classiyLT[i].list[k + 1];
                classiyLT[i].list[k + 1] = arrt;
              }
            }
          }
        }
      }//价格
    } else if (that.data.sortid == 2) {
      if (that.data.price == 1) {
        var classiyLT = that.data.teamMes
        for (var i = 0; i < classiyLT.length; i++) {
          for (var j = 0; j < classiyLT[i].list.length - 1; j++) {
            for (var k = 0; k < classiyLT[i].list.length - 1 - j; k++) // j开始等于0，  
            {
              if (parseInt(classiyLT[i].list[k].goods_price) >= parseInt(classiyLT[i].list[k + 1].goods_price)) {
                var arrt = classiyLT[i].list[k];
                classiyLT[i].list[k] = classiyLT[i].list[k + 1];
                classiyLT[i].list[k + 1] = arrt;
              }
            }
          }
        }
      } else if (that.data.price == 2) {
        var classiyLT = that.data.teamMes
        for (var i = 0; i < classiyLT.length; i++) {
          for (var j = 0; j < classiyLT[i].list.length - 1; j++) {
            for (var k = 0; k < classiyLT[i].list.length - 1 - j; k++) // j开始等于0，  
            {
              if (parseInt(classiyLT[i].list[k].goods_price) < parseInt(classiyLT[i].list[k + 1].goods_price)) {
                var arrt = classiyLT[i].list[k];
                classiyLT[i].list[k] = classiyLT[i].list[k + 1];
                classiyLT[i].list[k + 1] = arrt;
              }
            }
          }
        }
      }
    } else if (that.data.sortid == 3) {
      if (that.data.evaluate == 1) {
        var classiyLT = that.data.teamMes
        for (var i = 0; i < classiyLT.length; i++) {
          for (var j = 0; j < classiyLT[i].list.length - 1; j++) {
            for (var k = 0; k < classiyLT[i].list.length - 1 - j; k++) // j开始等于0，  
            {
              if (parseInt(classiyLT[i].list[k].evaluate) >= parseInt(classiyLT[i].list[k + 1].evaluate)) {
                var arrt = classiyLT[i].list[k];
                classiyLT[i].list[k] = classiyLT[i].list[k + 1];
                classiyLT[i].list[k + 1] = arrt;
              }
            }
          }
        }
      } else if (that.data.evaluate == 2) {
        var classiyLT = that.data.teamMes
        for (var i = 0; i < classiyLT.length; i++) {
          for (var j = 0; j < classiyLT[i].list.length - 1; j++) {
            for (var k = 0; k < classiyLT[i].list.length - 1 - j; k++) // j开始等于0，  
            {
              if (parseInt(classiyLT[i].list[k].evaluate) < parseInt(classiyLT[i].list[k + 1].evaluate)) {
                var arrt = classiyLT[i].list[k];
                classiyLT[i].list[k] = classiyLT[i].list[k + 1];
                classiyLT[i].list[k + 1] = arrt;
              }
            }
          }
        }
      }
    }


    //  else if (that.data.price) {

    // } else {
    //   classiyLT = that.data.backups;
    // }
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
      url: '../teamDetail1/teamDetail1?id=' + id
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