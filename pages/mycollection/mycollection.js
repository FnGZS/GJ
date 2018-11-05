var app = getApp()
Page({
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    coller: [],
    Goods: true,
    Case: false,
    display: ['none','none'],
    // price:[]
  },
  search_control: function(e) {
    var that = this;
    var sortid = e.currentTarget.dataset.search;
    if (sortid == 1) {
      that.setData({
        Case: false,
        Goods: true,
      })
      that.searchMall();
    } else {
      that.searchCase();
      that.setData({
        Case: true,
        Goods: false,
      })
    }
  },
  onLoad: function() {
    this.searchMall();
  },
  searchMall:function(){
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var imgURL = getApp().globalData.IMGURL;
    var num = 0;
    var that = this;
    wx.request({
      url: URL + '/Mall/goods_collect_display',
      data: {
        userId: UserId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(UserId);
        console.log(res)
        if (res.data != null) {
          that.setData({
            coller: res.data,
            // price: JSON.parse(that.data.coller.goods_price)
          })
          // var price = JSON.parse(that.data.coller.goods_price)
          console.log(that.data.coller[0].goods_price)
          // var price = JSON.parse(that.data.goods.goods_price);
          that.data.items = [];
          var sum = 0;
          for (var i = 0; i < that.data.coller.length; i++) {
            var price = JSON.parse(that.data.coller[i].goods_price);
            var out = JSON.parse(that.data.coller[i].goods_out);
            for (var j = 0; j < out.length; j++) {
              sum = sum + parseInt(out[j]);
            }
            that.data.items.push({
              goods_img: imgURL + "/goods/" + that.data.coller[i].goods_img,
              goods_name: that.data.coller[i].goods_name,
              collectNum: that.data.coller[i].collectNum,
              goods_out: sum,
              goods_price: price[0],
              goods_id: that.data.coller[i].id,
              isTouchMove: false //默认全隐藏删除
            })
          }
          that.setData({
            items: that.data.items
          })
        } else if (res.data == null) {
          var display = that.data.display;
          display[0] = 'block'
          that.setData({
            display: display
          })
        }

      }
    });
  },
  searchCase:function(){
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var imgURL = getApp().globalData.IMGURL;
    var num = 0;
    var that = this;
    wx.request({
      url: URL + '/Decorate/cases_collect_display',
      data: {
        userId: UserId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data != null) {
          that.setData({
            coller: res.data,
            // price: JSON.parse(that.data.coller.goods_price)
          })
          // var price = JSON.parse(that.data.coller.goods_price)
          // console.log(that.data.coller[0].goods_price)
          // var price = JSON.parse(that.data.goods.goods_price);
          that.data.items = [];
          console.log(that.data.coller)
          for (var i = 0; i < that.data.coller.length; i++) {
            that.data.items.push({
              caseImg: imgURL + "/cases/" + that.data.coller[i].caseImg,
              caseName: that.data.coller[i].caseName,
              collection: that.data.coller[i].collection,
              // goods_out: sum,
              caseStyle: that.data.coller[i].caseStyle,
              casePrice: that.data.coller[i].casePrice,
              cases_id: that.data.coller[i].id,
              isTouchMove: false //默认全隐藏删除
            })
          }
          that.setData({
            items: that.data.items
          })
        } else if (res.data == null) {
          var display = that.data.display;
          display[1] = 'block'
          that.setData({
            display: display
          })
        }

      }
    });
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.items.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  delMall: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      confirmColor: "#56a4ff",
      success(res) {
        if (res.confirm) {
          that.data.items.splice(e.currentTarget.dataset.index, 1) //删除
          that.setData({
            items: that.data.items
          })
          var UserId = wx.getStorageSync('UserId');
          var URL = getApp().globalData.PHPURL;
          var goods_id = e.currentTarget.dataset.goodsid;
          wx.request({
            url: URL + '/Mall/goods_collect',
            data: {
              userId: UserId,
              goodsId: goods_id
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              that.searchMall();
            }
          });
        }
      }
    });
  },
  delCase: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      confirmColor: "#56a4ff",
      success(res) {
        if (res.confirm) {
          that.data.items.splice(e.currentTarget.dataset.index, 1) //删除
          that.setData({
            items: that.data.items
          })
          var UserId = wx.getStorageSync('UserId');
          var URL = getApp().globalData.PHPURL;
          var cases_id = e.currentTarget.dataset.casesid;
          wx.request({
            url: URL + '/Decorate/case_collection',
            data: {
              userId: UserId,
              caseId: cases_id
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              that.searchCase();
            }
          });
        }
      }
    });
  },
  goods: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?goods_id=' + id,
    })
  },
  cases:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../jingdiananlie/jingdiananlie?caseid=' + id,
    })
  }
})