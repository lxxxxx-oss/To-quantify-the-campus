// components/pageComponents/index/counselor/punch-detail/punch-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 存储传递过来的值
        name: "",
        unfinishName: "",
        status: "",
        classId: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options);
        
        // 根据传递过来的值，动态决定页面标题
        wx.setNavigationBarTitle({
            title: options.name
        })

        // 由于传值过来的都是字符串，所以前一个页面的true或false不能直接使用，类型转换过来也不行，只能进行一个判断
        if(options.unfinishName != '无') {
            this.data.status = false
        }else this.data.status = true

        // 将字符串切割为数组，原因如上
        let arr = options.unfinishName.split(",")
        console.log(arr);

        // 存储传递过来的值
        this.setData({
            name: options.name,
            unfinishName: arr,
            status: this.data.status,
            classId: options.classId
        })
        // console.log(this.data.name);
        console.log(typeof(this.data.unfinishName));
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