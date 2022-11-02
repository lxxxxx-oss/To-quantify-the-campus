// components/refreshTo/space/com-capacity/attendance/attendance.js
const {requestTwo} = require("../../../../../utils/request")
Page({  

    /**
     * 页面的初始数据
     */
    data: {
        // 出勤率
        proportion: "",
        // 请假人数
        leaveNum: "",
        // 日期
        date: "2022/10/21",
        // 班级名单
        className: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {      
        this.getClassInfo()
        // #region 
        // 计算出勤率
        // 班级总人数
        // let sum = this.data.className.length
        // // 计数器
        // let count1 = 0
        // let count2 = 0
        // // 遍历整个数组对象
        // this.data.className.forEach(e => {
        //     if(e.status) count1 ++
        //     if(!e.status && e.leave) count2++
        // })
        // // 出勤率
        // let attendance = count1 / sum * 100
        // // 请假人数
        // let leave = count2
        // // 保留两位小数
        // attendance = attendance.toFixed(2)
        // this.setData({
        //     proportion: attendance,
        //     leaveNum: leave
        // })
        //#endregion
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
        // this.getClassInfo()
    },

    // 获取班级信息
    getClassInfo() {
        var that = this  
        return requestTwo({
            url: '/api/student/1/20', 
            method: 'GET',
            // data: {
            //     currentPage: 1,
            //     pageSize: 10,
            // }
        }).then((res) => {
            // console.log(res.data.studentInfo.records);
            let infoList = res.data.studentInfo.records
            infoList.forEach(e => {
                that.data.className.push(e.name)
            })
            that.setData({
                className: that.data.className
            })
        })
    }
})