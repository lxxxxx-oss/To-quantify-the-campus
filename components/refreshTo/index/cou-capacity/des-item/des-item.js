// components/refreshTo/index/cou-capacity/des-item/des-item.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 接收从des页面传递过来的数据
        num:"",
        major:"",
        // 班级信息
        classInform: [
            {
                "stuNum": "35",
                "leaveNum": "3"
            }
        ],
        // 请假人员详细信息
        leaveInform: [
            {
                "name": ["小咪", "小咪渣", "小咪渣"],
                "cause": ["事假", "事假", "事假"]
            },

        ],
        // 日期
        date: "2022/10/21"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        this.setData({
            num: options.num,
            major: options.major
        })
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

    }
})