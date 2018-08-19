
// // pages/dizhiguanli/dizhiguanli.js
// const app = getApp()
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     fuxuankuan:'false',
//     display1:'none', //判断是否有地址存在
//     arr:[],
//     anames:[],//id名
//     num :0,  //数量
//     areceiverPhone:[], //用户的电话号码
//     areceiverAddr:[],  //用户的地址
//     items: [],  //存储和显示（前端）
//     startX: 0, //开始坐标
//     startY: 0,
//     pic:'',  //存储照片 
//     implement:0,//判断是否是选择地址还是查看地址
//     Sales: false,
//     price: false,
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     console.log(options.picture)
//     var avatarUrl = wx.getStorageSync('avatarUrl'); 
//     console.log(avatarUrl)
//     this.setData({
//       pic: avatarUrl,
//       implement: options.picture
//     })
//     if (!options.picture){
//       this.setData({
//         implement: 0
//       })
//     }
//     wx.stopPullDownRefresh()
//   },
//   //手指触摸动作开始 记录起点X坐标
//   touchstart: function (e) {
//     //开始触摸时 重置所有删除
//     this.data.items.forEach(function (v, i) {
//       if (v.isTouchMove)//只操作为true的
//         v.isTouchMove = false;
//     })
//     this.setData({
//       startX: e.changedTouches[0].clientX,
//       startY: e.changedTouches[0].clientY,
//       items: this.data.items
//     })
//   },
//   //滑动事件处理
//   touchmove: function (e) {
//     console.log(e)
//     var that = this,
//       index = e.currentTarget.dataset.index,//当前索引
//       startX = that.data.startX,//开始X坐标
//       startY = that.data.startY,//开始Y坐标
//       touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
//       touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
//       //获取滑动角度
//       angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
//     that.data.items.forEach(function (v, i) {
//       v.isTouchMove = false
//       //滑动超过30度角 return
//       if (Math.abs(angle) > 30) return;
//       if (i == index) {
//         if (touchMoveX > startX) //右滑
//           v.isTouchMove = false
//         else //左滑
//           v.isTouchMove = true
//       }
//     })
//     //更新数据
//     that.setData({
//       items: that.data.items
//     })
//   },
//   angle: function (start, end) {
//     var _X = end.X - start.X,
//       _Y = end.Y - start.Y
//     //返回角度 /Math.atan()返回数字的反正切值
//     return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
//   },
//   addnewaddress:function(){
//     var UserId = wx.getStorageSync('UserId');
//     var login = wx.getStorageSync('login');
//     var that = this;
//     if (login) {
//       wx.navigateTo({
//         url: '../tianjiadizhi/tianjiadizhi',
//       })
//     }
//     else {
//       wx.showModal({
//         title: '提示',
//         content: '请登录',
//         confirmColor: "#56a4ff",
//       });
//     }
  
//   },
//   // 编辑按钮
//   editor:function(e){
//     console.log(e)
//     var id = e.currentTarget.dataset.id;
//      console.log(id)
//     wx.navigateTo({
//       url: '../tianjiadizhibj/tianjiadizhibj?get_id=' + id 
//     })
//   },
//   // 删除地址
//   delete:function(e){
//     var UserId = wx.getStorageSync('UserId');
//     var URL = getApp().globalData.PHPURL;
//     // console.log(e.currentTarget.dataset.id)
//     var that=this;
//     wx.showModal({
//       title: '提示',
//       content: '确定要删除吗',
//       confirmColor: "#56a4ff",
//       success(res) { 
//         if (res.confirm){
//           wx.request({
//             url: URL + '/User/delete_receive',
//             data: {
//               i: e.currentTarget.dataset.id,
//               userId: UserId
//             },
//             method: 'POST',
//             header: {
//               'content-type': 'application/x-www-form-urlencoded'
//             },
//             success: function (res) {
//               console.log(res.data)
//               if(res.data ==1){
//                 that.onShow();
//               }
//             }
//           });
//         }
//       }
//     })
//   },
//   // 选择地址返回
//     Return:function(e){
//       // anames
//       // areceiverPhone
//       // areceiverAddr
//       console.log(this.data.arr)
//       var index_id = e.currentTarget.dataset.index;
//       var good_name = [];
//       var good_phone = [];
//       var good_address = [];
//       // console.log(this.data.anames[0])
//       good_name = this.data.anames[index_id];
//       good_phone = this.data.areceiverPhone[index_id];
//       good_address = this.data.areceiverAddr[index_id];
//       console.log(index_id);
//       console.log(good_name);
//       console.log(good_phone);
//       console.log(good_address);
//       if (this.data.implement == 1){
//         let pages = getCurrentPages();//当前页面
//         let prevPage = pages[pages.length - 2];//上一页面
//         prevPage.setData({//直接给上移页面赋值
//           good_name: good_name,
//           good_phone: good_phone,
//           good_address: good_address,
//           selAddress: 'yes'
//         });
//         wx.navigateBack({//返回
//           delta: 1
//         })
//       }
//       // console.log(this.data.implement)
//     },
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
      
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {   
//      var UserId = wx.getStorageSync('UserId');
//      var URL = getApp().globalData.PHPURL;
//      var numbers = 0;
//     //  console.log(this.data.display1)
//      var that = this;
//     wx.request({
//       url: URL + '/User/send',
//       data: {
//         userId: UserId
//       },
//       method: 'POST',
//       header: {
//         'content-type': 'application/x-www-form-urlencoded'
//       },
//       success: function (res) {
//         console.log(res)
//         that.setData({
//           arr: res.data,
//           anames: JSON.parse(res.data.name),
//           areceiverPhone: JSON.parse(res.data.receiverPhone),
//           areceiverAddr: JSON.parse(res.data.receiverAddr),
//         });
//         console.log(that.data.anames[0]) 
//         // String  xx = that.data.anames.substring(0,1)
//         // console.log(xx)
//         // console.log(that.data.anames)
//         numbers = that.data.anames.length;
//         that.setData({ 
//           num: numbers,
//         });
//         // console.log(that.data.anames)
//         that.data.items=[];
//         for (var i = 0; i < that.data.num; i++) {
//           that.data.items.push({
//             pic: that.data.pic,
//             aname: that.data.anames[i],
//             aPhone: that.data.areceiverPhone[i],
//             address: that.data.areceiverAddr[i],
//             first_name: that.data.anames[i].slice(0, 1),
//             isTouchMove: false //默认全隐藏删除   (重要)
//           })
//         } 
//         that.setData({
//           items: that.data.items
//         })
//         // console.log(that.data.num)
//         if (that.data.num == 0)
//         {
//           that.setData({
//              display1: 'block'
//           })
//         }
//         else{
//           that.setData({
//             display1: 'none'
//           })
//         }
//       }
      
//     });
    
//     wx.stopPullDownRefresh()

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
//    onPullDownRefresh: function () {
//     this.onShow();
//   }
// })


// pages/dizhiguanli/dizhiguanli.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fuxuankuan: 'false',
    display1: 'none', //判断是否有地址存在
    arr: [],
    anames: [],//id名
    num: 0,  //数量
    areceiverPhone: [], //用户的电话号码
    areceiverAddr: [],  //用户的地址
    items: [],  //存储和显示（前端）
    startX: 0, //开始坐标
    startY: 0,
    pic: '',  //存储照片 
    implement: 0,//判断是否是选择地址还是查看地址
    Sales: false,
    price: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.implement)
    var avatarUrl = wx.getStorageSync('avatarUrl');
    console.log(avatarUrl)
    this.setData({
      pic: avatarUrl,
      implement: options.implement
    })
    if (!options.implement) {
      this.setData({
        implement: 0
      })
    }
    wx.stopPullDownRefresh()
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    console.log(e)
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
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
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  addnewaddress: function () {
    var UserId = wx.getStorageSync('UserId');
    var login = wx.getStorageSync('login');
    var that = this;
    if (login) {
      wx.navigateTo({
        url: '../tianjiadizhi/tianjiadizhi',
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        confirmColor: "#56a4ff",
      });
    }

  },
  // 编辑按钮
  editor: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../tianjiadizhibj/tianjiadizhibj?get_id=' + id
    })
  },
  // 删除地址
  delete: function (e) {
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      confirmColor: "#56a4ff",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: URL + '/User/delete_receive',
            data: {
              i: e.currentTarget.dataset.id,
              userId: UserId
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              if (res.data == 1) {
                that.onShow();
              }
            }
          });
        }
      }
    })
  },
  // 选择地址返回
  Return: function (e) {
    // anames
    // areceiverPhone
    // areceiverAddr
    console.log(this.data.arr)
    var index_id = e.currentTarget.dataset.index;
    var good_name = [];
    var good_phone = [];
    var good_address = [];
    // console.log(this.data.anames[0])
    good_name = this.data.anames[index_id];
    good_phone = this.data.areceiverPhone[index_id];
    good_address = this.data.areceiverAddr[index_id];
    console.log(index_id);
    console.log(good_name);
    console.log(good_phone);
    console.log(good_address);
    if (this.data.implement == 1) {
      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      prevPage.setData({//直接给上移页面赋值
        good_name: good_name,
        good_phone: good_phone,
        good_address: good_address,
        selAddress: 'yes'
      });
      wx.navigateBack({//返回
        delta: 1
      })
    }
    // console.log(this.data.implement)
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
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var numbers = 0;
    //  console.log(this.data.display1)
    var that = this;
    wx.request({
      url: URL + '/User/send',
      data: {
        userId: UserId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          arr: res.data,
          anames: JSON.parse(res.data.name),
          areceiverPhone: JSON.parse(res.data.receiverPhone),
          areceiverAddr: JSON.parse(res.data.receiverAddr),
        });
        console.log(that.data.anames[0])
        // String  xx = that.data.anames.substring(0,1)
        // console.log(xx)
        // console.log(that.data.anames)
        numbers = that.data.anames.length;
        that.setData({
          num: numbers,
        });
        // console.log(that.data.anames)
        that.data.items = [];
        for (var i = 0; i < that.data.num; i++) {
          that.data.items.push({
            pic: that.data.pic,
            aname: that.data.anames[i],
            aPhone: that.data.areceiverPhone[i],
            address: that.data.areceiverAddr[i],
            first_name: that.data.anames[i].slice(0, 1),
            isTouchMove: false //默认全隐藏删除   (重要)
          })
        }
        that.setData({
          items: that.data.items
        })
        // console.log(that.data.num)
        if (that.data.num == 0) {
          that.setData({
            display1: 'block'
          })
        }
        else {
          that.setData({
            display1: 'none'
          })
        }
      }

    });

    wx.stopPullDownRefresh()

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
  onPullDownRefresh: function () {
    this.onShow();
  }
})