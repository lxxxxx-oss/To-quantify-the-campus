// components/refreshTo/space/cou-capacity/stuAppoint/detailAppoint/detailAppoint.js
// 引入封装请求
const {requestTwo} = require("../../../../../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 从上一级页面携带过来的班级名
        classNum: "",
        // 存储班级学生姓名
        className: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options);
        this.setData({
            classNum: options.className
        })

        // 在页面加载的时候，就调用请求信息的方法
        this.getClassInfo()
    },

    // 请求学生信息
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
            console.log(res.data.studentInfo.records);
            let infoList = res.data.studentInfo.records
            infoList.forEach(e => {
                that.data.className.push(e.name)
            })
            that.setData({
                className: that.data.className
            })
        })
    },

    // 指定该学生为班委
    appointBtn(e) {
        wx.showModal({
            title: '提示',
            content: '是否任命该学生为班委？',
            success (res) {
                if (res.confirm) {
                    // console.log(e.currentTarget.dataset.index);
                    // 存储点击的那一项的索引值
                    let index = e.currentTarget.dataset.index
                    console.log(this.data.className[index]);
                    // 再次调用后端用户表，将指定那位学生的权限升级为班委
                    // TODO
                } else if (res.cancel) {
                    console.log('取消')
                }
            }
        })
    }
})