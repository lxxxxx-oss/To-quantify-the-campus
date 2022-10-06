// pages/log/log.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
    // 除宿管外其他用户登录时展示的tabbar
    LoginTab() {
        const app =getApp();
        app.globalData.list = [
            {
                "pagePath": "pages/index/index",
                "text": "首页",
                "iconPath": "/assets/img/tabBar/index.png",
                "selectedIconPath": "/assets/img/tabBar/index-active.png"
            },
            {
                "pagePath": "pages/space/space",
                "text": "空间",
                "iconPath": "/assets/img/tabBar/space.png",
                "selectedIconPath": "/assets/img/tabBar/space-active.png",
                "isSpecial": true
            },
            {
                "pagePath": "pages/home/home",
                "text": "我的",
                "iconPath": "/assets/img/tabBar/my.png",
                "selectedIconPath": "/assets/img/tabBar/my-active.png"
            }
        ]
        wx.switchTab({
         url: '/pages/index/index',
        })
       },
       //宿管登录时展示的tabbar    
       houLoginTab() {
        const app =getApp();
        app.globalData.list = [
            {
                "pagePath": "pages/index/index",
                "text": "首页",
                "iconPath": "/assets/img/tabBar/index.png",
                "selectedIconPath": "/assets/img/tabBar/index-active.png"
            },
            {
                "pagePath": "pages/print/print",
                "text": "打印",
                "iconPath": "/assets/img/tabBar/print.png",
                "selectedIconPath": "/assets/img/tabBar/print-active.png",
                "isSpecial": true
            },
            {
                "pagePath": "pages/home/home",
                "text": "我的",
                "iconPath": "/assets/img/tabBar/my.png",
                "selectedIconPath": "/assets/img/tabBar/my-active.png"
            }
        ]
        wx.switchTab({
         url: '/pages/index/index',
        })
    },

    // 不同用户展示不同页面
    // 学生登录时的页面
    // 可以在一个按钮上绑定多个点击函数
    stuLoginAll() {
        this.stuLogin()
        this.LoginTab()
    },
    stuLogin() {
        const app = getApp();
        app.globalData.isStu = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    // 辅导员登录时的页面
    couLoginAll() {
        this.couLogin()
        this.LoginTab()
    },
    couLogin() {
        const app = getApp();
        app.globalData.isCou = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    // 宿管登录时的页面
    houLoginAll() {
        this.houLogin()
        this.houLoginTab()
    },
    houLogin() {
        const app = getApp();
        app.globalData.isHou = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
})