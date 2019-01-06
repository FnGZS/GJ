var spec_id = 0;
var attr_id = 0;
var gooid = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneHeight:0,
    bannerItem:[],
    image:[],
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    } ,
    colornum: 0,
    sizenum:0,
    num2:1,
    colorfenlei:[
      {name:'',id:''},
    ],
    goods_num:'', //商品的数量
    goods:'',   
    goods_index:[], //商品的位置
    goods_img:'',   //独立图片
    goods_imgs:[],  //轮播图图片
    goods_size:[{size:'',id:''}],
    goods_pric: [{ pric: '', id: '' }],
    goods_price: [{ price: '', id: '' }],
    goods_kucun: [{ kucunn: '', id: '' }],
    colortext:'',
    sizetext:'',
    URL : getApp().globalData.PHPURL, 
    goods_id:0,  //商品id
    num:20,//测试
    money:'',
    kucun:'',
    snu:1,
    inventory:'',
    invento:'',
    price:'',
    color_shou:'#000000',
    color_gou:'#000000',
    comment:[],
    user:[],
    product_classify:[],
    product_style:[],
    z_color:[], //颜色展示
    y_color:'',
    num_color:0,
    size_index:0,
    arr :[],
    color_index:0,
    display_noComments: 'none',
    scrollTop: 0,
    scrollTopA: 0,
    scrollTopB: 0,
    scrollTopC: 0,
    scrollTopstart: 0,
    isClick: 0,
    goods_company:'',
  },
  getPhoneInfo: function () {
    this.setData({
      phoneHeight: 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight
    })
  },
//加入购物车跳转
  carttt:function(){
    if (wx.getStorageSync('login')) {
        
      this.gouwu();
        wx.navigateTo({
          url: '../shangcheng/shangcheng',
        })
    } else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false, //不显示取消按钮
        confirmColor: "#56a4ff",
        success(res) {
            wx.switchTab({
              url: '../wode/wode?a=' + 1,
            })
        }
      });
    }
  },
gouwu:function(){
  var that = this;
  console.log(that.data.goods_id)
  console.log(that.data.num2)
  console.log(that.data.money)
  // wx.request({
  //   //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
  //   url: that.data.URL + '/Mall/trolley_add_query',
  //   data: {
  //     userId: wx.getStorageSync('UserId'),
  //     goodsId: that.data.goods_id,
  //     num: that.data.num2,
  //     deposit: that.data.money
  //   },
  //   method: 'POST',
  //   header: {
  //     'content-type': 'application/x-www-form-urlencoded'
  //   },
  //   success: function (res) {
  //     console.log(res.data)
  //     if (res.data == -1) {
  //       // wx.showToast({
  //       //   title: '添加成功',
  //       //   icon: 'succes',
  //       //   duration: 1000,
  //       //   mask: true
  //       // })
  //       that.setData({
  //         color_gou: '#FF0000'
  //       })
  //     } else if (res.data == 1) {
  //       // wx.showToast({
  //       //   title: '已经添加过',
  //       //   icon: 'succes',
  //       //   duration: 1000,
  //       //   mask: true
  //       // })
  //       that.setData({
  //         color_gou: '#000000'
  //       })
  //     }
  //   }
  // })
},
//加入购物车
  cart:function(){
    var that=this;
    //检查是否登录了
    that.setData({
      color_index: 0
    })
    if (wx.getStorageSync('login')) {
      //登录后添加到购物车
            wx.request({
              //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
              url: that.data.URL + '/Mall/trolley_add',
              data: {
                userId: wx.getStorageSync('UserId'),
                goodsId: that.data.goods_id,
                num:that.data.num2,
                goodsColor: that.data.colortext,
                goodsSize: that.data.sizetext, 
                price: that.data.price,
                deposit:that.data.money,
                isTeam:0
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res.data)
                    if(res.data >= 1)
                    {
                      wx.showToast({
                        title: '添加成功',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                      })
                      that.setData({
                        color_gou: '#FF0000'
                      })
                    } else if (res.data == -1){
                      wx.showToast({
                        title: '已经添加过',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                      })
                      that.setData({
                        color_gou: '#FF0000'
                      })
                    } else if (res.data == 0)
                    {
                      wx.showToast({
                        title: '更新数据',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                      })
                      that.setData({
                        color_gou: '#FF0000'
                      })
                    }
              }
            })
           
    }
    else {
      wx.showModal({
        content: '请登录',
        showCancel: false, //不显示取消按钮
        confirmText: '确定',
        confirmColor: "#56a4ff",
        success(res) {
          wx.switchTab({
            url: '../wode/wode?a=' + 1,
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getPhoneInfo();
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.IMGURL;
    var that=this;
    // console.log(options.goods_num)
    console.log(options)
    that.setData({
    //  goods_num:options.goods_num,
     goods_id: options.goods_id
      // goods_id: 1
    })
    gooid = that.data.goods_id;
  
  },
  // 商品收藏
  Commodity:function(){
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var login = wx.getStorageSync('login');
    console.log(this.data.goods_id)
    var that = this;
    if (login) {
     
      wx.request({
        url: URL + '/Mall/goods_collect',
        data: {
          goodsId: that.data.goods_id,
          userId: UserId
         
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          if(res.data >=0){
            wx.showToast({
              title: '收藏成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            that.setData({
              color_shou:'#FF0000'
            })
          } 
          else if (res.data ==-1){
            wx.showToast({
              title: '取消收藏',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            that.setData({
              color_shou: '#000000'
            })
          }
          console.log(that.data.color_shou)
        }
      });
      // wx.navigateTo({
      //   url: '../mycollection/mycollection',
      // })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false, //不显示取消按钮
        confirmColor: "#56a4ff",
        success(res) {
          wx.switchTab({
            url: '../wode/wode?a=' + 1,
          })
        }
      });
    }
  },
  //提交订单
  pay:function(e){
    console.log(this.data.price)
    var goods_img = this.data.goods_img;
    var UserId = wx.getStorageSync('UserId');
    var goods_name = this.data.goods_index.goods_name;
    var goods_earnest = this.data.money;
    var goods_price = this.data.price;
    var goods_dimension = this.data.sizetext;
    var goods_color = this.data.colortext; 
    var goods_id = this.data.goods_id;
    var numm = this.data.num2;
    var isTeam = 0;
    // console.log(UserId)
    var UserId = wx.getStorageSync('UserId');
    var login = wx.getStorageSync('login');
    var URL = getApp().globalData.PHPURL;
    var judge =1;
    var that = this;
    if (login) {
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
          console.log(res.data)
          console.log(res.data.addr)
          // 判断收货地址是否存在
            wx.navigateTo({
              url: '../Corder/Corder?numm=' + numm + '&goods_id=' + goods_id + '&goods_color=' + goods_color + '&goods_dimension=' + goods_dimension + '&goods_price=' + goods_price + '&goods_earnest=' + goods_earnest + '&goods_name=' + goods_name + '&goods_img=' + goods_img + '&judge=' + judge + '&isTeam=' + isTeam,
            })

        }
      })
          

    }
    else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false, //不显示取消按钮
        confirmColor: "#56a4ff",
        success(res) {
          wx.switchTab({
            url: '../wode/wode?a=' + 1,
          })
        }
      });
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
    
  // },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.IMGURL;
    var that =this;
    wx.request({
      url: that.data.URL + '/Mall/goods_detail',
      data: {
        goodsId: gooid,
        // goodsId:73
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          goods: res.data,
          goods_index: res.data,
          goods_img: res.data.goods_img,
          goods_company:JSON.parse(res.data.goods_company)[0]
        })
        console.log(that.data.goods)
        var num = JSON.parse(that.data.goods.goods_imgs);
        console.log(num.length)
        var sum = [];
        if (num != []) {
          for (var i = 0; i < num.length; i++) {
            // var num = 'bannerItem[' + i + ']';
            sum[i] = URL + '/goods/' + num[i]
          }
        }
        //判断商品有无收藏
        wx.request({
          url: that.data.URL + '/Mall/goods_collect_query',
          data: {
            goodsId: that.data.goods_id,
            userId: UserId
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            // console.log(res)
            if (res.data == 1) {
              that.setData({
                color_shou: '#FF0000'
              })
            }
            else if (res.data == -1) {
              that.setData({
                color_shou: '#000000'
              })
            }
          }
        });
      //购物车
        wx.request({
          url: that.data.URL + '/Mall/trolley_add_query',
          data: {
            goodsId: that.data.goods_id,
            userId: UserId
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data)
            if (res.data == 1) {
              that.setData({
                color_gou: '#FF0000'
              })
            }
            else if (res.data == -1) {
              that.setData({
                color_gou: '#000000'
              })
            }
            console.log(that.data.goods_id)
          }
        });
        //产品信息
          wx.request({
            url: that.data.URL + '/Mall/goods_product_information',
            data: {
              goodsId: that.data.goods_id
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
              that.setData({
                product_classify: res.data.goods_classify,
                product_style: res.data.goods_style
              })
            }
          });


        console.log(that.data.color_shou)
        //轮播图
        console.log(sum)
        that.setData({
          bannerItem: sum,
        })
        that.setData({
          image: that.data.bannerItem
        })
        console.log(that.data.image)
        // 轮播图 详情图
        that.setData({
          bottomItem: that.data.bannerItem,
        })
        //分类库存
        var dateList = JSON.parse(that.data.goods_index.goods_inventory);
        that.setData({
          inventory: dateList
        })
        // /库存
        var dateList = JSON.parse(that.data.goods_index.goods_inventory);
        console.log(dateList);
        var sum = 0;
        for (var i = 0; i < dateList.length; i++) {
          sum = sum + parseInt(dateList[i]);
        }
        console.log(sum)
        that.setData({
          kucun: sum
        })
        console.log(that.data.kucun)
        //字符串分割

        //尺寸和颜色 定金 价格拆分
        var dateList = JSON.parse(that.data.goods_index.goods_size);

        // console.log(that.data.goods_size[0].size)
        // console.log(that.data.goods_size[0].id)
        var li= [];
        var azz=[];
        var acc=[];
        var z = 0;
        var str = '';
        var strary  = [];

        for (var i = 0; i < dateList.length;i++){
            var hasRead = false;
            for (var k = 0; k < strary.length;k++)
            {
              if (strary[k] == dateList[i])
                 {
                   hasRead = true;
                 }
            }
            if (!hasRead){
                var _index = i, haveSame = false;
                for (var j = i + 1; j < dateList.length; j++) {
                  if (j == parseInt(i) + parseInt(1)) {
                    _index++;
                  }
                  if (dateList[i] == dateList[j]) {
                    _index += "," + (parseInt(j) + 1);
                    haveSame = true;
                  }
                }
                if (haveSame) {
                  strary.push(dateList[i]);
                  // str += "数组第" + _index + "个相同，相同值为" + arr[i] + "!!!\n";

                  azz[z] = _index
                  acc[z] = dateList[i]
                  z = z + 1;
                }

            }
            // console.log(acc)
            // console.log(azz)
            var c;
            var d;
            var add = JSON.parse(that.data.goods.goods_color);  //颜色
            var pric = JSON.parse(that.data.goods.goods_earnest); //定金
            var price = JSON.parse(that.data.goods.goods_price); //价格
            var inventory = JSON.parse(that.data.goods.goods_inventory); //库存
          
            for (var a = 0; a < azz.length; a++) {
              c = azz[a];
              d = acc[a];
              // console.log(c)
              // console.log(d)
              c = c.split(",");

              for (var i = 1; i < c.length; i++) {
                dateList[c[i] - 1] = ' '
                add[c[0] - 1] = add[c[0] - 1] + ',' + add[c[i] - 1]
                add[c[i] - 1] = ' '
                pric[c[0] - 1] = pric[c[0] - 1] + ',' + pric[c[i] - 1]
                pric[c[i] - 1] = ' '
                price[c[0] - 1] = price[c[0] - 1] + ',' + price[c[i] - 1]
                price[c[i] - 1] = ' '
                inventory[c[0] - 1] = inventory[c[0] - 1] + ',' + inventory[c[i] - 1]
                inventory[c[i] - 1] = ' '
              }
            }   
            // console.log(dateList)
            for (var a = 0; a < dateList.length; a++) {

              if (dateList[a] == ' ') {
                dateList.splice(a, 1);
                a--;
              }
              if (add[a] == ' ') {
                add.splice(a, 1);
                a--;
              }
              if (pric[a] == ' ') {
                pric.splice(a, 1);
                a--;
              }
              if (price[a] == ' ') {
                price.splice(a, 1);
                a--;
              }
              if (inventory[a] == ' ') {
                inventory.splice(a, 1);
                a--;
              }
            }
            console.log(dateList)  //尺寸
            console.log(add)       //颜色
            console.log(pric)       //定金
            console.log(price)       //价格
            console.log(inventory)       //库存
        }
        
       that.setData({
         arr: azz  //记录尺寸有重复值
       })


        //尺寸大小 
        var date_size = JSON.parse(that.data.goods_index.goods_size); //原有的尺寸
          for (var i in dateList) {
            var num = 'goods_size[' + i + '].size'
            var num2 = 'goods_size[' + i + '].id'
            that.setData({
              [num]: dateList[i],
              [num2]: i
            })
          }
        
        //颜色分类
        var date_color = JSON.parse(that.data.goods.goods_color);
          for (var i in add) {
            var num = 'colorfenlei[' + i + '].name'
            var num2 = 'colorfenlei[' + i + '].id'
            that.setData({
              [num]: add[i],
              [num2]: i
            })
          }
      //  定金分类
        var date_earnest = JSON.parse(that.data.goods.goods_earnest);

          for (var i in pric) {
            var num = 'goods_pric[' + i + '].pric'
            var num2 = 'goods_pric[' + i + '].id'
            that.setData({
              [num]: pric[i],
              [num2]: i
            })
          }
        // }
      // 价格分类
        var date_price = JSON.parse(that.data.goods.goods_price);
        console.log(date_price)
        console.log(price)
          for (var i in price) {
            var num = 'goods_price[' + i + '].price'
            var num2 = 'goods_price[' + i + '].id'
            that.setData({
              [num]: price[i],
              [num2]: i
            })
          }
        // }
        //商品库存分类        
        var date_inventory = JSON.parse(that.data.goods.goods_inventory);
        console.log(date_inventory)
        console.log(inventory)
          for (var i in inventory) {
            var num = 'goods_kucun[' + i + '].kucunn'
            var num2 = 'goods_kucun[' + i + '].id'
            that.setData({
              [num]: inventory[i],
              [num2]: i
            })
          }
        //默认颜色尺寸
        //颜色拆分
        if (azz.length > 0) {
          var colorr = [];
          var aqq = that.data.colorfenlei[0].name; //默认的第一条
          colorr = aqq.split(","); //组合起来
        }
        //定金拆分
        console.log(azz)
        if (azz.length > 0) {
          var earnest = [];
          var aqq = that.data.goods_pric[0].pric; //默认的第一条
          earnest = aqq.split(","); //组合起来
          // console.log(earnest);
        }
        //价格拆分
        if (azz.length > 0) {
          var price = [];
          var aqq = that.data.goods_price[0].price; //默认的第一条
          price = aqq.split(","); //组合起来
          // console.log(price);
        }
        //库存拆分
        if (azz.length > 0) {
          var kc = [];
          var aqq = that.data.goods_kucun[0].kucunn; //默认的第一条
          kc = aqq.split(","); //组合起来
          // console.log(kc)
        }
        if (azz.length > 0) {
          that.setData({
            z_color: colorr,  //显示颜色
            money: earnest, //显示定金
            price: price, //显示价格
            invento: kc, //显示库存
            colortext: colorr[0],
            sizetext: that.data.goods_size[0].size,
            sizenum:0
          })
        }
        // console.log(colorr)
        // console.log(earnest)
        // console.log(price)
        // console.log(kc)
        // console.log(colorr[0])
        // console.log(that.data.goods_size[0].size)
        if (azz.length == 0) {  //没有重复的
          var goods_size = JSON.parse(that.data.goods_index.goods_size);
          var goods_color = JSON.parse(that.data.goods_index.goods_color);
          var goods_earnest = JSON.parse(that.data.goods_index.goods_earnest);
          var goods_price = JSON.parse(that.data.goods_index.goods_price);
          var goods_inventory = JSON.parse(that.data.goods_index.goods_inventory);
          that.setData({ // 默认初始状态
            num_color:1, 
            y_color:goods_color[0],  //显示颜色
            money: goods_earnest[0], //显示定金
            price: goods_price[0], //显示价格
            invento: goods_inventory[0], //显示库存
            colortext: goods_color[0],
            sizetext: goods_size[0],
            sizenum:0
          })
          console.log(that.data.sizetext)
          console.log(that.data.colortext)
        }
       
        

        //评价
        wx.request({
          url: that.data.URL + '/Order/comment_display',
          data: {
            goodsId: gooid,
            isTeam:0
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
            if (res.data != null && res.data != 0) {
              that.setData({
                comment: res.data
              })
            } else {
              that.setData({
                display_noComments: 'block'
              })
            }
          }
        });

      }//suceess结束位置
    })
    
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
  tabGoods: function (e) {
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj,
      isClick: 1,
    })

    //点击下滑到指定距离（钟佳闱）
    var that = this;
    var key = e.target.dataset.key;

    var query = wx.createSelectorQuery()

    query.select(`#view_${key}`).boundingClientRect()
    query.selectViewport().scrollOffset()

    query.exec(function (res) {
      console.log(res)
      that.setData({
        scrollTop: that.data.scrollTopstart + res[0].top - 35
      })
    })
  },
  //获取三个导航栏的内容到顶部的高度
  getTabToTop: function () {
    var that = this;
    var queryA = wx.createSelectorQuery()
    queryA.select('#view_A').boundingClientRect()
    queryA.selectViewport().scrollOffset()
    queryA.exec(function (res) {
      that.setData({
        scrollTopA: res[0].top
      })
    })
    var queryB = wx.createSelectorQuery()
    queryB.select('#view_B').boundingClientRect()
    queryB.selectViewport().scrollOffset()
    queryB.exec(function (res) {
      that.setData({
        scrollTopB: res[0].top
      })
    })
    var queryC = wx.createSelectorQuery()
    queryC.select('#view_C').boundingClientRect()
    queryC.selectViewport().scrollOffset()
    queryC.exec(function (res) {
      that.setData({
        scrollTopC: res[0].top
      })
    })
    console.log(that.data.scrollTopA);
    console.log(that.data.scrollTopB);
    console.log(that.data.scrollTopC);
  },
  /**
   * 滚动条位置
   */
  handleScroll: function (e) {
    console.log(e)
    var that = this;
    if (this.data.isClick == 0) {
      this.getTabToTop(); //获取三个内容到顶部的距离
      var A = that.data.scrollTopA;
      var B = that.data.scrollTopB;
      var C = that.data.scrollTopC;
      var currentScroll = e.detail.scrollTop;
      console.log(currentScroll)
      var _obj = {};
      if (currentScroll < B - A) {
        _obj.curHdIndex = 0;
        _obj.curBdIndex = 0;
      } else if (currentScroll >= B - A && currentScroll < C - B - A) {
        _obj.curHdIndex = 1;
        _obj.curBdIndex = 1;
      } else {
        _obj.curHdIndex = 2;
        _obj.curBdIndex = 2;
      }
    } else {
      this.setData({
        isClick: 0
      })
    }

    //滑动
    this.setData({
      tabArr: _obj,
      scrollTopstart: e.detail.scrollTop
    })
  },
  //颜色分类
  changPro: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.spec_id;
    this.setData({
      color_index: index
    })
    var size_index = this.data.size_index;
    console.log(index)
    console.log(size_index)
    console.log(this.data.colorfenlei[size_index])
    var num = this.data.arr.length;  //有无重复值
    console.log(num)
    //定金
    if (num > 0) {
      //颜色
      var color = [];
      var aqq = this.data.colorfenlei[size_index].name; //拿出默认的第一条
      color = aqq.split(","); //组合起来
      console.log(color[index])
      //定金
      var earnest = [];
      var aqq = this.data.goods_pric[size_index].pric; //拿出默认的第一条
      earnest = aqq.split(","); //组合起来
    //商品价格
      var price = [];
      var aqq = this.data.goods_price[size_index].price; //拿出默认的第一条
      price = aqq.split(","); //组合起来
    //每个尺寸下默认的颜色的库存
      var invento = [];
      var aqq = this.data.goods_kucun[size_index].kucunn; //拿出默认的第一条
      invento = aqq.split(","); //组合起来
      this.setData({
        money: earnest[index],  //显示定金
        price: price[index],  //显示价格
        invento: invento[index],  //显示颜色库存
        colortext: color[this.data.color_index],
        sizetext: this.data.goods_size[size_index].size
      })
    }
    // 一对一的关系（尺寸没有重复的状态下）
    // if (num == 0) {  //没有重复值
    //   var goods_color = JSON.parse(this.data.goods_index.goods_color);
    //   var goods_earnest = JSON.parse(this.data.goods_index.goods_earnest);
    //   var goods_price = JSON.parse(this.data.goods_index.goods_price);
    //   var goods_inventory = JSON.parse(this.data.goods_index.goods_inventory);
    //   console.log(goods_color[0])
    //   this.setData({ // 默认初始状态
    //     num_color: 1,
    //     y_color: goods_color[index],  //显示颜色
    //     money: goods_earnest[index], //显示定金
    //     price: goods_price[index], //显示价格
    //     invento: goods_inventory[index] //显示库存
    //   })
    // }


    spec_id = e.currentTarget.dataset.spec_id;
    this.setData({
      colornum: spec_id,
      // size_index:0
    });  
  },
  //尺寸大小
  changSize: function (e) {
    console.log(e)
    
    var index = e.currentTarget.dataset.attr_id;
    this.setData({
      size_index:index
    })
    var color_index = this.data.color_index;
    console.log(this.data.goods_company)
    // console.log(this.data.goods_size[index])
    // console.log(this.data.colorfenlei[index])
    // console.log(this.data.goods_pric[index])
    //拆分数组
    var num = this.data.arr.length;  //有无重复值
    console.log(num)
    //颜色   
    if(num >0){
      var colorr = [];
      var aqq = this.data.colorfenlei[index].name; //拿出默认的第一条
      colorr = aqq.split(","); //组合起来
    //定金
      var earnest = [];
      var aqq = this.data.goods_pric[index].pric; //拿出默认的第一条
      earnest = aqq.split(","); //组合起来
    //商品价格
      var price = [];
      var aqq = this.data.goods_price[index].price; //拿出默认的第一条
      price = aqq.split(","); //组合起来
    //商品单位
      var goods_company = [];
      var aqq = this.data.goods_company[index];
      goods_company = aqq.split(",");
      console.log(goods_company)
    //每个尺寸下默认的颜色的库存
      var invento = [];
      var aqq = this.data.goods_kucun[index].kucunn; //拿出默认的第一条
      invento = aqq.split(","); //组合起来
      this.setData({
        z_color: colorr,  //显示颜色
        money: earnest[0],  //显示定金
        price: price[0],  //显示价格
        invento: invento[0],  //显示库存
        colortext: colorr[color_index],
        sizetext: this.data.goods_size[index].size,
        goods_company: goods_company[0]
      })
    }
    // console.log(colorr)

    if(num == 0){  //没有重复值
      var goods_size = JSON.parse(this.data.goods_index.goods_size);
      var goods_color = JSON.parse(this.data.goods_index.goods_color);
      var goods_earnest = JSON.parse(this.data.goods_index.goods_earnest);
      var goods_price = JSON.parse(this.data.goods_index.goods_price);
      var goods_inventory = JSON.parse(this.data.goods_index.goods_inventory);
      var goods_company = JSON.parse(this.data.goods_index.goods_company);
      console.log(goods_company)
      this.setData({ // 默认初始状态
        num_color: 1,
        y_color: goods_color[index],  //显示颜色
        money: goods_earnest[index], //显示定金
        price: goods_price[index], //显示价格
        invento: goods_inventory[index], //显示库存
        colortext: goods_color[index],
        sizetext: goods_size[index],
        goods_company: goods_company[index]
      })
    }
 
    attr_id = e.currentTarget.dataset.attr_id;
    this.setData({
      sizenum: attr_id,
      colornum:0,
     
    });


  },
   goods_add: function (e) {
    let num2 = this.data.num2;
    num2 = num2 + 1;
    this.setData({
      num2: num2
    });
  },
  goods_sub: function (e) {
    let num2 = this.data.num2;
    if (num2 <=1) {
      return false;
    }
    num2 = num2 - 1;
    this.setData({
      num2:num2
    });
  }
})