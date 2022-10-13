// pages/space/space.js
Page({

    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //根据登录时携带的ID信息,选择要展示的功能选项卡
        const app =getApp();
        if(app.globalData.isStu) {
            this.setData({
                isStu: true
            })
        }
        if(app.globalData.isCom) {
            this.setData({
                isCom: true
            })
        }
        if(app.globalData.isCou) {
            this.setData({
                isCou: true
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    onShow() {
        //添加选中效果,避免自定义tabbar闪烁
         if (typeof this.getTabBar === 'function' && this.getTabBar()) {
             this.getTabBar().setData({
             selected: 1 //这个数是，tabBar从左到右的下标，从0开始
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

    }
})
