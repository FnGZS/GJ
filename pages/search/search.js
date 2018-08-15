// pages/search/search.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    hotSearch :['办公桌','木地板','客厅','地砖','墙贴']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 获取搜索内容
    content_input: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  search_btn:function(){
    wx.navigateTo({
      url: '../searchResult/searchResult?content=' + this.data.content,
    })
  },
  //热门搜索跳转
  toHotSearch:function(e){
    console.log(e)
    var content = e.currentTarget.dataset.content;
    this.setData({
      content:content
    })
    wx.navigateTo({
      url: '../searchResult/searchResult?content=' + this.data.content,
    })
  }
})