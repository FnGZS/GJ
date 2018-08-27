var utilMd5 = require('md5.js');
var URL = getApp().globalData.PHPURL;
var success=false
/* 随机数 */
function randomString () {
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < 32; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
/* 获取prepay_id */
function getXMLNodeValue (node_name, xml) {
  var tmp = xml.split("<" + node_name + ">")
  var _tmp = tmp[1].split("</" + node_name + ">")
  return _tmp[0]
}

/* 时间戳产生函数   */
function createTimeStamp () {
  return parseInt(new Date().getTime() / 1000) + ''
}
/* 支付   */
function pay (param,order_number,openId) {//传进统一付款需要的param 和付款的订单号 后者可查询订单是否成功
  wx.requestPayment({
    timeStamp: param.timeStamp,
    nonceStr: param.nonceStr,
    package: param.package,
    signType: param.signType,
    paySign: param.paySign,
    success: function (res) {
      
    
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
         
   
    },
    fail: function (message) {
      // fail
      console.log(message);
      console.log("支付失败")
    },
    complete: function () {
      // complete
      console.log("pay complete")
      wx.setStorageSync('success', true);
    }
  })
}
function Unified(openId){

  var that=this;

  wx.request({
    url: URL + '/User/getIp',
    success: function (e) {
  
      //微信支付
      var OpenId = openId;
     
      var appid = 'wx5df54af6861286cb';//appid  
      var body = '绍兴古杰装饰设计有限公司';//商户名
      var mch_id = '1497178752';//商户号  
      var nonce_str = randomString();//随机字符串，不长于32位。  
      var notify_url = URL + '/User/notice';//通知地址z
      var spbill_create_ip = e.data;//ip
      // var total_fee = parseInt(that.data.wxPayMoney) * 100;
      var total_fee = 1;
      var out_trade_no = mch_id + createTimeStamp()
      
      var trade_type = "JSAPI";
      var key = 'wanghang18867152140gujiexiaochen';
      var unifiedPayment = 'appid=' + appid + '&body=' + body + '&mch_id=' + mch_id + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + OpenId + '&out_trade_no=' + out_trade_no + '&spbill_create_ip=' + spbill_create_ip + '&total_fee=' + total_fee + '&trade_type=' + trade_type + '&key=' + key
      console.log(unifiedPayment);
      var sign = utilMd5.md5(unifiedPayment).toUpperCase()
      // var sign = utilMd5.md5('wanghanghao王杭').toUpperCase()
      console.log(sign)
      var formData = "<xml>"
      formData += "<appid>" + appid + "</appid>"
      formData += "<body>" + body + "</body>"
      formData += "<mch_id>" + mch_id + "</mch_id>"
      formData += "<nonce_str>" + nonce_str + "</nonce_str>"
      formData += "<notify_url>" + notify_url + "</notify_url>"
      formData += "<openid>" + OpenId + "</openid>"
      formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>"
      formData += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>"
      formData += "<total_fee>" + total_fee + "</total_fee>"
      formData += "<trade_type>" + trade_type + "</trade_type>"
      formData += "<sign>" + sign + "</sign>"
      formData += "</xml>"
      console.log(formData)

      //统一支付
      wx.request({
        url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
        method: 'POST',
        head: 'application/x-www-form-urlencoded',
        data: formData, // 设置请求的 header
        success: function (res) {

          var result_code = getXMLNodeValue('result_code', res.data.toString("utf-8"))
          var resultCode = result_code.split('[')[2].split(']')[0]
          if (resultCode == 'FAIL') {
            var err_code_des = getXMLNodeValue('err_code_des', res.data.toString("utf-8"))
            var errDes = err_code_des.split('[')[2].split(']')[0]
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
              success: function (res) {
                wx.showToast({
                  title: errDes,
                  icon: 'success',
                  duration: 2000
                })
              },

            })
          } else {
            //发起支付
            var prepay_id = getXMLNodeValue('prepay_id', res.data.toString("utf-8"))
            console.log(prepay_id);
            var tmp = prepay_id.split('[')
            var tmp1 = tmp[2].split(']')
            //签名  
         
            var key = 'wanghang18867152140gujiexiaochen';
            var appId = 'wx5df54af6861286cb';
            var timeStamp = createTimeStamp();
            var nonceStr = randomString();
            var stringSignTemp = "appId=" + appId + "&nonceStr=" + nonceStr + "&package=prepay_id=" + tmp1[0] + "&signType=MD5&timeStamp=" + timeStamp + "&key=" + key
            console.log(stringSignTemp);
            var sign = utilMd5.md5(stringSignTemp).toUpperCase()
            console.log(sign)
            var param = { "timeStamp": timeStamp, "package": 'prepay_id=' + tmp1[0], "paySign": sign, "signType": 'MD5', "nonceStr": nonceStr }
           pay(param, out_trade_no,openId)
        
          }

        },

      })
    }
  })

}
       

module.exports = {
  randomString: randomString,
  getXMLNodeValue: getXMLNodeValue,
  createTimeStamp: createTimeStamp,
  Unified: Unified,
  pay: pay,
}  