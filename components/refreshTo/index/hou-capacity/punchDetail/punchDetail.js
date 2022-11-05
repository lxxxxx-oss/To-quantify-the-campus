// components/refreshTo/index/hou-capacity/punchDetail/punchDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        floor: "",
        // 当前楼层所有寝室信息
        dormInfo: [
            {
                "doors": "201",
                "status": false,
                "unfinishName": "小红、小黑、小蓝、小红、小黑、小蓝"
            },
            {
                "doors": "202",
                "status": false,
                "unfinishName": ""
            },
            {
                "doors": "203",
                "status": false,
                "unfinishName": "小绿、小紫"
            },
            {
                "doors": "204",
                "status": false,
                "unfinishName": "小白"
            },
            {
                "doors": "205",
                "status": false,
                "unfinishName": ""
            },
            {
                "doors": "206",
                "status": false,
                "unfinishName": "小橙、小黑白"
            },
            {
                "doors": "207",
                "status": false,
                "unfinishName": ""
            },
        ],
        // 统计未完成打卡的寝室
        unfinishDoors: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 根据上级页面携带的信息，来判断当前楼层
        this.setData({
            floor: options.floor
        })
        // 根据是否有未打卡的成员，来判断当前寝室是否完成打卡
        this.data.dormInfo.forEach(e => {
            if(e.unfinishName == "") {
                e.status = true
            }else {
                this.data.unfinishDoors.push(e.doors)
            }
        })
        // 更新数据
        this.setData({
            dormInfo: this.data.dormInfo,
            unfinishDoors: this.data.unfinishDoors
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