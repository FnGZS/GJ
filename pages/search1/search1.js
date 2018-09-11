// pages/search/search.js
var URL = getApp().globalData.PHPURL;
var iURL = getApp().globalData.IMGURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: getApp().globalData.PHPURL,
    content: '',
    hotSearch: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotSearch();
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
  //跳转搜索结果
  search_btn: function () {
    this.uploadKeyword();
    if (this.data.content != null && this.data.content != '') {
      wx.navigateTo({
        url: '../searchResult/searchResult?content=' + this.data.content,
      })
    } else {
      wx.showToast({
        title: '请输入搜索的关键字',
        icon: 'none',
        duration: 1000
      })
    }

  },
  //上传搜索数据到数据库中
  uploadKeyword: function (e) {
    wx.request({
      url: this.data.URL + '/Index/hot_search',
      data: {
        content: this.data.content,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
      }

    })
  },
  //获取热门搜索
  getHotSearch: function (e) {
    var that = this;
    wx.request({
      url: this.data.URL + '/Index/hot_display',
      data: {
        content: this.data.content,
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var hotSearch = [];
        for (var i = 0; i < res.data.length; i++) {
          hotSearch.push(res.data[i].keyword);
        }
        that.setData({
          hotSearch: hotSearch
        })
        console.log(that.data.hotSearch);
      }

    })
  },
  //热门搜索跳转
  toHotSearch: function (e) {
    console.log(e)
    var content = e.currentTarget.dataset.content;
    this.setData({
      content: content
    })
    wx.navigateTo({
      url: '../searchResult/searchResult?content=' + this.data.content,
    })
  }
})