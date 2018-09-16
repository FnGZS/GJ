const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//小数位补零
function formatnumber(value,num) {
  var a, b, c, i;
  a = value.toString();
  b = a.indexOf(".");
  c = a.length;
  if (num == 0) {
    if (b != -1) {
      a = a.substring(0, b);
    }
  } else {//如果没有小数点
    if (b == -1) {
      a = a + ".";
      for (i = 1; i <= num; i++) {
        a = a + "0";
      }
    } else {//有小数点，超出位数自动截取，否则补0
      a = a.substring(0, b + num + 1);
      for (i = c; i <= b + num; i++) {
        a = a + "0";
      }
    }
  }
  return a;
}
module.exports = {
  formatTime: formatTime,
  formatnumber: formatnumber
}
