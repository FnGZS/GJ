var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // img:['tu0.png','tu1.png', 'tu2.png', 'tu3.png', 'tu4.png', 'tu5.png', 'tu6.png', 'tu7.png'],
    URL: getApp().globalData.PHPURL,
    URLimg: "",
    img:"tu0",
    kongbaiHeight:null,
    caseid:null,
    caseMes:null,
    commentState:'none',
    comment_placeholder:'写评论（最多100字）',
    comment_content:null,
    casesDetail:null,
    footHead:null,
    stage:null,
    Dynamic:[],
    shortComment:[],
    current_scheId:null,
    current_dynId:null,
    current_userId:null,
    colleaction_text1:'收藏',
    colleaction_text2: '案例'
  },
  blank_click:function(e){
    // console.log(e);
    this.setData({
      commentState: 'none'
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      URLimg: iURL,
      caseid: options.caseid
    });
    this.getCasesDetail(); //获取案例详情
    this.getStateMes(); //获取案例阶段信息
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          kongbaiHeight: res.windowHeight - 100 / 750 
        })
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
  getCasesDetail:function(){
    var that = this;
    wx.request({
      url: this.data.URL + '/Decorate/detail_case',
      data: {
        caseId:this.data.caseid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res);
        var array = [];
        var obj = res.data;
        array.push(obj);
        that.setData({
          casesDetail: array
        })
        // console.log(that.data.casesDetail)
        that.setData({
          footHead:that.data.casesDetail[0].friHead
        })
      } 
    }) 
  },

  //获取阶段信息
  getStateMes:function(){
    var that = this;
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
      url: this.data.URL + '/Decorate/dyn_schedule',
      data: {
        caseId:this.data.caseid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          stage:res.data
        })  
        // console.log(that.data.stage);
        
        for (var i = 0; i < that.data.stage.length ; i ++){
          that.getDynamicMes(that.data.stage[i].scheId);
        }
        
      }
    }) 
  },
  //获取动态信息
  getDynamicMes: function (scheId){
    // console.log(scheId);
    var that = this;
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式 获取左侧列表中包含着获取货物列表
      url: this.data.URL + '/Decorate/dyn_comment',
      data: {
        caseId: this.data.caseid,
        scheId: scheId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var array = that.data.Dynamic;
        var arrayimg = that.data.DynamicImg;
        var obj = res.data;
        for(var i = 0 ; i < obj.length ; i ++){
          obj[i]['scheId'] = scheId;
        }
        
        array[scheId]=obj;

        // console.log(array);
        
        for (var i = 0; i < array[scheId].length; i ++){
          var img = JSON.parse(array[scheId][i].dynContent.contentImg);    
          array[scheId][i].dynContent.contentImg = img
        }
        that.setData({
          Dynamic: array
        })      
        // console.log(that.data.Dynamic);

        //调用评论数据
        for (var i = 0; i < that.data.Dynamic.length; i++) {
          if (that.data.Dynamic[i] == null) {
            continue;
          } else {
            for (var j = 0; j < that.data.Dynamic[i].length ; j ++){
              var shortid = JSON.parse(that.data.Dynamic[i][j].dynContent.belongContent);
              // console.log("阶段id" + i + "动态id" + that.data.Dynamic[i][j].dynContent.id + "获取到评论id" + shortid);
              that.getShortComment(i, that.data.Dynamic[i][j].dynContent.id);
            }  
            
          }
        }
      }
    }) 
  },

  //获取小评论
  getShortComment: function (scheId,dynId){
    // console.log("我在更新动态" + dynId );
    
    var that = this;
    wx.request({
      url: this.data.URL + '/Decorate/short_comment',
      data: {
        dynId: dynId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res);
        var obj = res.data;
        var array = that.data.shortComment;
        array[dynId] = obj;
        
        that.setData({
          shortComment:array
        })
        // console.log(that.data.shortComment[1]);
      }
    }) 
  },

  comment: function (e) {
    var login = wx.getStorageSync('login');
    if(login){
      this.setData({
        commentState: 'flex',
        current_scheId: e.currentTarget.dataset.scheid,
        current_dynId: e.currentTarget.dataset.dynid,
        current_userId: null,
        comment_content: null
      })
      console.log(this.data.comment_content)
    }
    else{
      wx.showToast({
        title: '请登录后再评论',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  //评论
  comment_input:function(e){
    console.log(e.detail.value)
    this.setData({
      comment_content: e.detail.value
    })
  },

  // 发送评论
  comment_send:function(){
    var that = this;
    var UserId = wx.getStorageSync('UserId');
    var URL = getApp().globalData.PHPURL;
    var login = wx.getStorageSync('login');
    console.log(this.data.shortComment);
    
    if (this.data.comment_content != '' && this.data.comment_content != null){
      wx.request({
        url: this.data.URL + '/Decorate/case_comment',
        data: {
          dynId: this.data.current_dynId,
          caseId: this.data.caseid,
          content: this.data.comment_content,
          userId: UserId
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          that.setData({
            commentState: 'none',
            comment_content: null
          })
          that.getShortComment(that.data.current_scheId, that.data.current_dynId);
        }
      }) 
      that.setData({
        commentState: 'none',
        comment_content: null
      })
    }
    else{
      wx.showToast({
        title: '请输入内容后再评论',
        icon: 'none',
        duration: 2000
      })
    }
    console.log(this.data.comment_content);
  },

  //收藏
  collection:function(){
    var that = this;
    var UserId = wx.getStorageSync('UserId');
    var login = wx.getStorageSync('login');
    if(login){
      wx.request({
        url: this.data.URL + '/Decorate/case_collection',
        data: {
          caseId: this.data.caseid,
          userId: UserId
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          if (res.data == -1) {
            that.setData({
              colleaction_text1: '收藏',
              colleaction_text2: '案例'
            })
          }
          else {
            that.setData({
              colleaction_text1: '取消',
              colleaction_text2: '收藏'
            })
          }
        }
      }) 
    }
    else{
      wx.showToast({
        title: '请登录后再收藏',
        icon: 'none',
        duration: 2000
      })
    }
    
  },

  //预约参观
  yuyue:function(){
    wx.navigateTo({
      url: '../yuyue/yuyue',
    })
  }
})