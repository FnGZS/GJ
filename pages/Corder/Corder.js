var util = require('../../utils/util.js');
var pay = require('../../utils/pay.js');
var cou_id = 0;
var heji = 0;
var adphone = "";
var adress = "";
var adphoness = "";
Page({
  data: { 
    array: ['暂无优惠券'],
    Consignee: '',
    phone: [],
    address: [],
    goods_icon: [],
    Shopping_name: [],
    list: [],
    goods_id: 0,
    item: '',
    selAddress: '',
    addresss: '',//地址传回来的地址值
    addname: '',//地址传回来的用户名值
    addphone: '',//地址传回来的电话号码值
    judge: '',
    add: '暂无',//地址传回来的地址值
    adn: '暂无',//地址传回来的用户名值
    adp: '暂无',//地址传回来的电话号码值
    goods_id: 0,
    goods_color: '',
    goods_dimension: '',
    goods_earnest: '',
    numm: '',
    goods_price: '',
    goods_classify: '',
    goods_style: '',
    isTeam: '',
    Coupons_conter: '',
    couponId: 0,
    earnest: 0,
    shocse: [],//暂时存放优惠券
    messages: '',
    shopName: '',
    invoice:[],
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var indexx = e.detail.value;
    var g_earnest = this.data.earnest; //获取商品的总价


    console.log(g_earnest)
    this.setData({
      index: e.detail.value,
    })
    if (this.data.array[indexx] != '暂无优惠券' || this.data.array[indexx] == undefined) {//满足条件减去相应的值
      var g_satisfy = this.data.Coupons_conter[indexx].satisfy;
      cou_id = this.data.couponId[indexx].id;
      console.log(cou_id)
      if (parseInt(g_earnest) >= parseInt(g_satisfy)) {
        g_earnest = g_earnest - this.data.Coupons_conter[indexx].price;
        //  console.log(this.data.Coupons_conter[indexx].price)
      }
    }
    this.setData({
      earnest: g_earnest,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var imgURL = getApp().globalData.IMGURL;
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var that = this;
    var an = '';
    var ap = '';
    var ad = '';
    var arr = [];

    console.log(imgURL)
    if (options.isTeam == 0) {
      this.setData({
        judge: options.judge,
        goods_img: imgURL + '/goods/' + options.goods_img,
        goods_name: options.goods_name,
        goods_price: options.goods_price,
        goods_color: options.goods_color,
        goods_dimension: options.goods_dimension,
        goods_earnest: options.goods_earnest,
        goods_id: options.goods_id,
        numm: options.numm,
        earnest: options.goods_earnest * options.numm,
        isTeam: options.isTeam
      })
    } else {
      this.setData({
        judge: options.judge,
        goods_img: imgURL + '/team/' + options.goods_img,
        goods_name: options.goods_name,
        goods_price: options.goods_price,
        goods_classify: options.goods_classify,
        goods_style: options.goods_style,
        goods_earnest: options.goods_earnest,
        goods_id: options.goods_id,
        numm: options.numm,
        earnest: options.goods_price * options.numm,
        isTeam: options.isTeam
      })
    }

    heji = this.data.earnest;
    // 相关信息
    wx.request({
      url: URL + '/Mall/order_addr_shop',
      data: {
        userId: UserId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data,
          Consignee: JSON.parse(res.data.name),
          phone: JSON.parse(res.data.phone),
          goods_icon: imgURL + '/shopImg/' + res.data.shopImg,
          address: JSON.parse(res.data.addr),
          Shopping_name: res.data.shopName,
        })
        an = that.data.Consignee[0];
        console.log(that.data.Consignee);
        ap = that.data.phone[0];
        ad = that.data.address[0];
        that.setData({
          adn: an,
          add: ad,
          adp: ap
        })
        // console.log(an)
        // // 判断收货地址是否存在
        // if(an == undefined || ap == undefined || ad == undefined ){
        //       wx.showToast({
        //         title: '暂无收货地址信息',
        //       })
        //       wx.switchTab({
        //         url: '../wode/wode' 
        //       })
        // }
        //优惠券
        wx.request({
          url: URL + '/Mall/order_coupon',
          data: {
            userId: UserId,
            goodsId: that.data.goods_id,
            // goodsCol: that.data.goods_color,   //颜色
            // goodsSize: that.data.goods_dimension, //尺寸大小
            // deposit: that.data.goods_earnest,  //定金
            // num:that.data.numm,     //数量
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              couponId: res.data
            })
            // console.log(that.data.couponId.length)
            if (res.data == -1) {
              that.setData({
                array: ['暂无优惠券']
              })
            }
            else {
              for (var i = 0; i < res.data.length; i++) {
                var label = res.data[i].label;
                var satisfy = res.data[i].satisfy;
                var price = res.data[i].price;
                arr.push('类型' + label + ':' + '   ' + '满' + satisfy + '元减' + price + '元');
              }
              // console.log(arr)
              heji = util.formatnumber(heji,2);//防止出现0.01.0这种情况
              console.log(heji);
              that.setData({
                array: arr,
                Coupons_conter: res.data,
                earnest: heji
              })
              // console.log(that.data.shocse)
             
            }
          }
        });


      }
    });
  //  console.log(that.data.adn)
    adphone = that.data.adn;
    adress = that.data.add;
    adphoness = that.data.adp;
   // console.log(adphone)
  },

  //发票选择
  chooseInvoiceTitle() {
    var that=this;
    wx.chooseInvoiceTitle({
      success: (res) => {
        console.log(res)
        that.setData({
           invoice:res
        })
        console.log(that.data.invoice);
    
      },
      fail: (err) => {
        console.error(err)
      }
    })
  },
  getcancel:function(){
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var that = this;
    console.log(1111111111111111111111111111111111111);
    var invoicemes = JSON.stringify(that.data.invoice);
      
    wx.request({
      url: URL + '/Mall/order_buy',
      data: {
        userId: UserId,  //用户id
        goodsId: that.data.goods_id, //商品id
        couponId: cou_id,  //优惠券的id
        price: that.data.goods_price, //商品价格
        color: that.data.goods_classify,   //颜色
        size: that.data.goods_style, //尺寸大小
        deposit: that.data.goods_earnest,  //定金
        num: that.data.numm,     //数量
        pay: that.data.earnest,  //实付金额
        b: 0,//模拟接口（未付款）
        message: that.data.messages,//买家留言
        name: that.data.adn, //收件人
        phone: that.data.adp,//地址电话号码
        address: that.data.add, //详细地址
        isTeam: that.data.isTeam,
        invoice:invoicemes,
        Total: that.data.goods_earnest
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        //模拟支付接口
        wx.redirectTo({
          url: '../Order/Order?currentTab=1'
        })

      }
    });
  },
  getpaymented:function(){
    //付款成功
    var invoicemes = JSON.stringify(this.data.invoice);
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var that = this;
    if (that.data.isTeam == 0) {
      console.log(that.data.earnest);
      wx.request({
        url: URL + '/Mall/order_buy',
        data: {
          userId: UserId,  //用户id
          goodsId: that.data.goods_id, //商品id
          couponId: cou_id,  //优惠券的id
          price: that.data.goods_price, //商品价格
          color: that.data.goods_color,   //颜色
          size: that.data.goods_dimension, //尺寸大小
          deposit: that.data.goods_earnest,  //定金
          num: that.data.numm,     //数量
          pay: that.data.earnest,  //实付金额
          b: 1, //模拟接口（付款成功）
          message: that.data.messages,//买家留言
          name: that.data.adn, //收件人
          phone: that.data.adp,//地址电话号码
          address: that.data.add, //详细地址
          isTeam: that.data.isTeam,
          invoice: invoicemes,
          Total: that.data.goods_earnest
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          //模拟支付接口
          wx.redirectTo({
            url: '../jysuccess/jysuccess'
          })

        }
      });
    } else {
      wx.request({
        url: URL + '/Mall/order_buy',
        data: {
          userId: UserId,  //用户id
          goodsId: that.data.goods_id, //商品id
          couponId: cou_id,  //优惠券的id
          price: that.data.goods_price, //商品价格
          color: that.data.goods_classify,   //从事什么
          size: that.data.goods_style, //擅长风格
          deposit: that.data.goods_earnest,  //定金
          num: that.data.numm,     //数量
          pay: that.data.earnest,  //实付金额
          b: 1, //模拟接口（付款成功）
          message: that.data.messages,//买家留言
          name: that.data.adn, //收件人
          phone: that.data.adp,//地址电话号码
          address: that.data.add, //详细地址
          isTeam: that.data.isTeam,
          invoice: invoicemes,
          Total: that.data.goods_earnest
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          //模拟支付接口
          wx.redirectTo({
            url: '../jysuccess/jysuccess'
          })

        }
      });
    }
  },
  //立即结算
  Immediate: function () {
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var that = this;
    var total = that.data.earnest;
    if (that.data.adp == '暂无' || that.data.adp == undefined || that.data.adp == null) {
      wx.showModal({
        title: '提示',
        content: '您还没有收货信息',
        confirmColor: "#56a4ff",
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '确定要提交吗',
        confirmColor: "#56a4ff",
        success(res) {
          if (res.confirm) {
            wx.request({
              url: URL + '/user/query_openid',
              data: {
                userId: UserId
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res);
                var open_id = res.data.openId;
                console.log(open_id);
                let infoOpt = {
                  openId: open_id,
                  toTal: total
                }
                //promise异步处理 写的头大
                pay.Unified(infoOpt).then((res) => {
                  var data = res;
                  pay.pay(data).then((res) => {
                    console.log(res);
                    that.getpaymented()
                  }).catch(function (res) {
                    that.getcancel();
                  })
                })
              }
            })


          }
          else {
            //待付款
            var invoicemes = JSON.stringify(that.data.invoice);
            if (that.data.isTeam == 0) {
              wx.request({
                url: URL + '/Mall/order_buy',
                data: {
                  userId: UserId,  //用户id
                  goodsId: that.data.goods_id, //商品id
                  couponId: cou_id,  //优惠券的id
                  price: that.data.goods_price, //商品价格
                  color: that.data.goods_color,   //颜色
                  size: that.data.goods_dimension, //尺寸大小
                  deposit: that.data.goods_earnest,  //定金
                  num: that.data.numm,     //数量
                  pay: that.data.earnest,  //实付金额
                  b: 0,//模拟接口（未付款）
                  message: that.data.messages,//买家留言
                  name: that.data.adn, //收件人
                  phone: that.data.adp,//地址电话号码
                  address: that.data.add, //详细地址
                  isTeam: that.data.isTeam,
                  invoice: invoicemes,
                  Total: that.data.goods_earnest
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res.data)
                  //模拟支付接口
                  wx.redirectTo({
                    url: '../Order/Order?currentTab=1'
                  })

                }
              });
            } else {
              that.getcancel();
            }



          }
        }
      });
    }

   

  },
  //买家留言
  message: function (e) {
    console.log(e.detail.value)
    this.setData({
      messages: e.detail.value
    })
  },
  Choice: function () {
    this.setData({
      judge: ''
    })
    console.log(this.data.goods_id)
    wx.navigateTo({
      url: '../dizhiguanli/dizhiguanli?implement=' + 1,
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

    var Address_turn = '';
    var phone = '';
    var name_turn = '';
    var that = this;
    //添加地址
    if (this.data.judge == '1') {
    } else {
      
      let pages = getCurrentPages();
      let currPage = pages[pages.length - 1];
      if (currPage.data.selAddress == "") {
      } else {
        that.setData({//将携带的参数赋值 
          addresss: currPage.data.good_address,
          addname: currPage.data.good_name,
          addphone: currPage.data.good_phone
        });
      }
      Address_turn = that.data.addresss;
      phone = that.data.addphone;
      name_turn = that.data.addname
      that.setData({
        adn: name_turn,
        add: Address_turn,
        adp: phone
      })
    }
    adphone = that.data.adn;
    adress = that.data.add;
    adphoness = that.data.adp;
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