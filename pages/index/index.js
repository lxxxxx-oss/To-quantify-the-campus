// pages/index/index.js
Page({

    // 在最开始将所有身份的功能卡全部隐藏
    data: {
        swiperList: [{
            id: 0,
            type: 'image',
            url: '/assets/img/index/swiper.jpg'
          }, {
            id: 1,
              type: 'image',
              url: '/assets/img/index/swiper.jpg',
          }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 显示加载中loading效果 
        // wx.showLoading({  
        //     title: "加载中",
        //     mask: false, //开启蒙版遮罩
        //     icon: 'loading',
        //     duration: 200    //提示的延迟时间
        // });
        // var w = wx.getSystemInfoSync().windowWidth;
        // var h = wx.getSystemInfoSync().windowHeight;
        // console.log(w);
        // console.log(h);
        //根据登录时携带的ID信息,选择要展示的功能选项卡
       const app =getApp();
       // 普通学生
       if(app.globalData.isStu){
           this.setData({
               isStu: true
           })
       };
       // 宿管
       if(app.globalData.isHou){
            this.setData({
                isHou: true
            })
        };
        // 辅导员
        if(app.globalData.isCou){
            this.setData({
                isCou: true
            })
        };
        // 班委
        if(app.globalData.isCom){
            this.setData({
                isCom: true
            })
        }
        console.log(app.globalData);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        //添加选中效果,避免自定义tabbar闪烁
         if (typeof this.getTabBar === 'function' && this.getTabBar()) {
             this.getTabBar().setData({
                selected: 0 //这个数是，tabBar从左到右的下标，从0开始
             })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    // DotStyle(e) {
    //     this.setData({
    //       DotStyle: e.detail.value
    //     })
    //   },

})