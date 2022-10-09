var QQMapWX = require('../../../../../assets/libs/qqmap-wx-jssdk');
var qqmapsdk;
Page({
 
    onLoad: function () {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'Y4NBZ-P44LK-VRPJL-A44UL-D6UUQ-MPFKQ'
        });
    },
    onShow: function () {
        // 调用接口
        qqmapsdk.search({
            keyword: '酒店',
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            },
        complete: function (res) {
            console.log(res);
        }
     });
  }
})