// page/component/new-pages/cart/cart.js
const app = getApp()
var pro = [' '];
var x=-1;
Page({
  data: { 
    goods_num:[],
    carts : [],               // 购物车列表
    check:0, 
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,    // 全选状态，默认全选
    obj: {
      name: "hello"
    },
    URL: getApp().globalData.PHPURL,
    imgurl: getApp().globalData.IMGURL,
    list: [],  //图片地址
    display:'none', //判断是否有商品
    dis: 'block', //无商品不显示横条，有商品显示横条
    product:[], //存数据goodsid给后台判断
    cun:[], //存
    chuancan:[],
    names :[],
    imgs:[],
    sizes:[],
    yanses:[],
    nums:[],
    guiges:[],
    goodsid:[],
    isTeam:[],
  
  },
  carts_query:function(){
    var userId = wx.getStorageSync('UserId');
    var that=this;
    var arr=[];
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
      url: that.data.URL + '/Mall/trolley_display',
      data: {
        userId: userId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
          if(res.data == null)
          {
            that.setData({
              display: 'block',
              dis:'none',
              carts: res.data,
            })
          }
          else{
              that.setData({
                carts: res.data,
                cun: res.data
              })
              for (var i = 0; i < that.data.carts.length; i++) {
                if (that.data.carts[i].tro.isTeam == 0){
                  arr[i] = that.data.imgurl + '/' + 'goods/' + that.data.carts[i].goods_img;
                }
                else{
                  arr[i] = that.data.imgurl + '/' + 'team/' + that.data.carts[i].goods_img;
                }
              }
              that.setData({
                list: arr
              })
          }
        console.log(that.data.carts)
          
      }
     
    })
 
  },
  //判断是否登录
  checkLogin:function(){
      var that=this;
      if (wx.getStorageSync('login')){
        that.setData({
          check:1
        })
        this.carts_query();
      }
 
    
  },
 
  onLoad:function(){
    
  },
  onShow() {
    // console.log(1111111)
    // this.carts_query();
    var that = this;
    this.checkLogin();
    this.getTotalPrice();
    this.setData({
      totalPrice:0,
      product:0
    })
    
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {

    const index = e.currentTarget.dataset.index;
    console.log(index)

    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    console.log(this.data.carts)
    this.getTotalPrice();
  },
  click:function(e){
    console.log(e)
    var goods_id = e.currentTarget.dataset.id; 
    console.log(goods_id)
     wx.navigateTo({
       url: '../detail/detail?goods_id=' + goods_id,
     })
  },
  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    let carts = this.data.carts;
    let id = parseInt(carts[index].id);
    let gouwuche_id = carts[index].tro.id
    console.log(gouwuche_id)
    var that = this;
     wx.showModal({
        title: '提示',
        content: '确定要删除吗', 
        confirmColor: "#56a4ff",
        success(res){

          if (res.confirm)
          {
            that.data.carts.splice(e.currentTarget.dataset.index, 1)   //删除
            that.setData({
              carts: that.data.carts
            })
            if (res.confirm) {
              wx.request({
                url: URL + '/Mall/delete_trolley',
                data: {
                  // userId: UserId,
                  // goodsId: id,
                  trolleyId: gouwuche_id // 购物车id
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  if (res.data) {
                    that.carts_query();
                  }
                }
              });
            }
          }
                     
        }
      });
  },
  // 立即结算
  payment:function(){
    
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var that=this;
    console.log(that.data.product.length)
    var m=  that.data.product.length;
    console.log(m)
    if (that.data.product.length > 0){
      var zz = JSON.stringify(that.data.product);
      var yy = JSON.stringify(that.data.cun);
      var num = m;
      var name = JSON.stringify(that.data.names);
      var img = JSON.stringify(that.data.imgs);
      var size = JSON.stringify(that.data.sizes);
      var yanse = JSON.stringify(that.data.yanses);
      var guige = JSON.stringify(that.data.guiges);
      var nums = JSON.stringify(that.data.nums);
      var goodsid = JSON.stringify(that.data.goodsid);
      var isTeam = JSON.stringify(that.data.isTeam);
      console.log(goodsid)
      wx.navigateTo({
        url: '../Corder_2/Corder_2?judge=' + 1 + '&product=' + zz + '&cun=' + yy + '&num=' + num + '&name=' + name + '&img=' + img + '&size=' + size + '&yanse=' + yanse + '&guige=' + guige + '&nums=' + nums + '&goodsid=' + goodsid + '&isTeam=' + isTeam,
      })
    }
    else if (that.data.product == 0){
      wx.showToast({
        title: '未勾选',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }
   

      // wx.navigateTo({
      //   url: '../Corder_2/Corder_2?judge=' + 1
      // })
  },
  /**
   * 购物车全选事件
   */
  selectAll(e) {
    
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });

    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = parseInt(carts[index].tro.num);
    num = num + 1;
    console.log(num)
    carts[index].tro.num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts; 
    let num = parseInt(carts[index].tro.num);
    console.log(num)
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    console.log(num)
    carts[index].tro.num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let m = 0;
    let total = 0;
    let pro = [''];//商品id
    let mon = [''];

    let name = [''];
    let img = [''];
    let guige = [''];
    let size = [''];
    let yanse = [''];
    let numbered = [''];
    let goodsid = [''];
    let isTeam = [''];
    // console.log(carts.length)
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {    // 判断选中才会计算价格  
        if (carts[i].tro.isTeam == 0){
          total += carts[i].tro.num * carts[i].tro.deposit;   // 所有价格加起来
        } else{
          total += carts[i].tro.num * carts[i].tro.price;   // 所有价格加起来          
        }              
        // pro[i] = carts[i].
        // console.log(carts[i].tro.goodsId)
        pro[i] = carts[i].tro.id;
        if (carts[i].tro.isTeam == 0){
          mon[i] = carts[i].tro.deposit;
        }else{
          mon[i] = carts[i].tro.price;
        }
        name[i] = carts[i].goods_name;
        img[i] = carts[i].goods_img;
        guige[i] = carts[i].goods_classify;
        size[i] = carts[i].tro.goodsSize;
        yanse[i] = carts[i].tro.goodsColor;
        numbered[i] = carts[i].tro.num;
        goodsid[i] = carts[i].tro.goodsId;
        isTeam[i] = carts[i].tro.isTeam;
      }

    }
    console.log(mon.length)
    console.log(pro.length)
    for (var j = 0; j < pro.length;j++){
      if (pro[j] == "")
      {
        pro.splice(j, 1);
         j--;
      }
      else if(pro[j] == undefined){
        pro.splice(j, 1);
        j--;
      }
     
    }
    for (var k = 0; k < mon.length; k++) {
      if (mon[k] == "") {
        mon.splice(k, 1);
        k--;
      }
      else if (mon[k] == undefined) {
        mon.splice(k, 1);
        k--;
      }
    }
    for (var k = 0; k < name.length; k++) {
      if (name[k] == "") {
        name.splice(k, 1);
        k--;
      }
      else if (name[k] == undefined) {
        name.splice(k, 1);
        k--;
      }
    }
    for (var k = 0; k < img.length; k++) {
      if (img[k] == "") {
        img.splice(k, 1);
        k--;
      }
      else if (img[k] == undefined) {
        img.splice(k, 1);
        k--;
      }
    }
    for (var k = 0; k < size.length; k++) {
      if (size[k] == "") {
        size.splice(k, 1);
        k--;
      }
      else if (size[k] == undefined) {
        size.splice(k, 1);
        k--;
      }
    }
    for (var k = 0; k < yanse.length; k++) {
      if (yanse[k] == "") {
        yanse.splice(k, 1);
        k--;
      }
      else if (yanse[k] == undefined) {
        yanse.splice(k, 1);
        k--;
      }
    }
    for (var k = 0; k < guige.length; k++) {
      if (guige[k] == "") {
        guige.splice(k, 1);
        k--;
      }
      else if (guige[k] == undefined) {
        guige.splice(k, 1);
        k--;
      }
    }
    for (var k = 0; k < numbered.length; k++) {
      if (numbered[k] == "") {
        numbered.splice(k, 1);
        k--;
      }
      else if (numbered[k] == undefined) {
        numbered.splice(k, 1);
        k--;
      }
    }
    for (var k = 0; k < goodsid.length; k++) {
      if (goodsid[k] == "") {
        goodsid.splice(k, 1);
        k--;
      }
      else if (goodsid[k] == undefined) {
        goodsid.splice(k, 1);
        k--;
      }
    }
    for (var k = 0; k < isTeam.length; k++) {
      if (isTeam[k] == "") {
        isTeam.splice(k, 1);
        k--;
      }
      else if (isTeam[k] == undefined) {
        isTeam.splice(k, 1);
        k--;
      }
    }
    console.log(goodsid)
    // console.log(mon)
    // console.log(pro)
    // console.log(name)
    // console.log(img)
    // console.log(size)
    // console.log(yanse)
    // console.log(numbered)
    // console.log(guige)
    
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2),
      product: pro,
      cun: mon,
      names:name,
      imgs:img,
      sizes:size,
      yanses:yanse,
      nums: numbered,
      guiges:guige,
      goodsid: goodsid,
      isTeam: isTeam
    });
    console.log(this.data.product)
  }

})