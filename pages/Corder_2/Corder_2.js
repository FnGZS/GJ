var pay = require('../../utils/pay.js');
var app = getApp()
var URL = getApp().globalData.PHPURL;
var cou_id = 0 ;
var heji =0;
var xx = [];
var Total = 0;// 总值
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    array: ['暂无优惠券'],
    Consignee : '',
    phone: [],
    address:[],
    goods_icon:[],
    Shopping_name:[],
    list:[],
    goods_id:0,
    item:'',
    selAddress:'',
    addresss:'',//地址传回来的地址值
    addname: '',//地址传回来的用户名值
    addphone: '',//地址传回来的电话号码值
    judge:'',
    add: '暂无',//地址传回来的地址值
    adn: '暂无',//地址传回来的用户名值
    adp: '暂无',//地址传回来的电话号码值
    goods_id:0,
    goods_color:'',
    goods_dimension:'',
    goods_earnest:'',
    numm:'',
    goods_price:'',
    Coupons_conter:'',
    couponId:0,
    earnest:0,
    shocse:[],//暂时存放优惠券
    messages:'',
    numberss:0,
    cun:[],
    product:[],
    pic:[],
    ids:[],
    sum:[],
    order:[],//购物车id
    names: [],
    imgs: [],
    sizes: [],
    yanses: [],
    nums: [],
    guiges: [],
    goodsid:[],
    isTeam:[],
    Coupon_id:'',
    guige:[]
  },
  bindPickerChange: function (e) {
    this.setData({
      sum: Total,
    })
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.array[indexx])
    var indexx = e.detail.value;
    this.setData({
      Coupon_id: indexx
    })
    var g_earnest = this.data.sum; //获取商品的总价  
    console.log(g_earnest)
    this.setData({
      index: e.detail.value, 
    })
    if (this.data.array[indexx] != '暂无优惠券' || this.data.array[indexx] == undefined) {//满足条件减去相应的值
    var g_satisfy = this.data.Coupons_conter[indexx].satisfy; //满足条件的
    cou_id = this.data.couponId[indexx].id;
    console.log(cou_id)
      if (parseInt(g_earnest) >= parseInt(g_satisfy)){
        g_earnest = g_earnest - this.data.Coupons_conter[indexx].price;
            //  console.log(this.data.Coupons_conter[indexx].price)
        }
    }
    this.setData({
      sum: g_earnest,
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
      var an = '';
      var ap = '';
      var ad = '';
    console.log(options)
    this.setData({
      judge: options.judge,
      cun: JSON.parse(options.cun),
      numberss: JSON.parse(options.num),
      product: JSON.parse(options.product),
      names: JSON.parse(options.name),
      imgs: JSON.parse(options.img),
      sizes: JSON.parse(options.size),
      yanses: JSON.parse(options.yanse),
      guiges: JSON.parse(options.guige),
      nums: JSON.parse(options.nums),
      goodsid: JSON.parse(options.goodsid),
      isTeam: JSON.parse(options.isTeam),
    })
    var qq = [];
    for (var i = 0; i < this.data.numberss;i++)
    {
      if (this.data.isTeam[i] == 0){
        qq[i] = imgURL + "/goods/" + this.data.imgs[i];
        console.log(qq[i]);
      }else{
        qq[i] = imgURL + "/team/" + this.data.imgs[i];
        
      }
    }
    console.log(qq)
    this.setData({
      imgs:qq
    })
    // 地址
    var that = this;
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
        ap = that.data.phone[0];
        ad = that.data.address[0];
        that.setData({
          adn: an,
          add: ad,
          adp: ap
        })
      }
    });
    
    var summ = 0;
    for (var i = 0; i < that.data.cun.length; i++) {
      summ = summ + (parseInt(that.data.cun[i]) * parseInt(that.data.nums[i]) )  ;
    }
    Total = summ;
    this.setData({
      sum: summ
    })
    console.log(Total);

  },
  //立即结算
  Immediate:function(){
    var UserId = wx.getStorageSync('UserId');
    var that = this;
    var b = 0;
    wx.showModal({
      title: '提示',
      content: '确定要提交吗',
      confirmColor: "#56a4ff",
      success(res) {
        if (res.confirm) {
          // 付款成功
          b =1;
          wx.redirectTo({
            url: '../jysuccess/jysuccess'
          })
        }
        else {
          // 待付款
          // 模拟支付接口
          b = 0;
              wx.redirectTo({
                url: '../Order/Order?currentTab=1'
              })
        }
        console.log(b)
        wx.request({
          url: URL + '/Mall/trolley_buy',
          data: {
            id: that.data.product,
            userId: UserId,
            num: that.data.numberss,
            address: that.data.add,
            phone: that.data.adp,
            name: that.data.adn,
            message: that.data.messages,
            b: b,
            couponId: that.data.Coupon_id,
              
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data)
          }
        });

      }     
    });
  },
  message:function(e){
    console.log(e.detail.value)
    this.setData({
      messages: e.detail.value
    })
  },
  Choice:function(){
    this.setData({
      judge:''
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
    var imgURL = getApp().globalData.IMGURL;
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var that = this;
    
    //添加地址
  
    console.log(that.data.judge)
    if (this.data.judge == '1') {
    } else {
      let pages = getCurrentPages();
      let currPage = pages[pages.length - 1];
      if (currPage.data.selAddress == "") {
        that.getUserAddress(that.data.userId);
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
    //数据
        var arr = [];
        wx.request({
          url: URL + '/Mall/trolley_coupon',
          data: {
            userId: UserId,
            goodsId: that.data.goodsid,
            num: that.data.numberss
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
            

            if (res.data == -1 || res.data==null) {
              that.setData({
                array: ['暂无优惠券']
              })
              console.log(1111111)
            }
            else {
              for (var i = 0; i < res.data.length; i++) {
                var label = res.data[i].label;
                var satisfy = res.data[i].satisfy;
                var price = res.data[i].price;
                arr.push('类型' + label + ':' + '   ' + '满' + satisfy + '元减' + price + '元');
              }
              // console.log(arr)
              that.setData({
                array: arr,
                Coupons_conter: res.data,
                earnest: heji
              })
              // console.log(that.data.shocse)
            }
          }
        });
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (e) {

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