Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    lifetimes: {
        attached() {
            this.getClassInfo()
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 所有学生信息
        infoList: [],
        // 出勤率
        proportion: "",
        // 请假人数
        leaveNum: "",
        // 请假人名单
        leaveName: [],
        // 日期
        date: "",
        // 班级名单
        className: [],
        // 出勤人名单
        isAttended: [],
        // 未出勤人名单
        unattended: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getClassInfo() {  
            let that = this
            wx.request({
                url: 'https://alaskaboo.cn/attendance/9', 
                method: 'POST',
                header: 'application/json',
                data: {
                    "week": JSON.stringify(4),
                    "day": JSON.stringify(4),
                    "attend": JSON.stringify(1)
                },
                success(res) {
                    let infoList = res.data.data.data
                    console.log(infoList);
                    // 拿到该对象的所有键
                    let keys = Object.keys(infoList)
                    // 遍历，访问所有数据
                    keys.forEach(e => {
                        that.data.infoList.push(infoList[e])
                        // console.log(that.data.infoList);
                        // 存储学生的出勤状态
                        if(infoList[e].status == "请假") {
                            // 存储请假学生
                            that.data.leaveName.push(infoList[e].studentInfo.name)
                        }else if(infoList[e].status == "出勤") {
                            // 存储出勤学生
                            that.data.isAttended.push(infoList[e].studentInfo.name)
                        }else if(infoList[e].status !== "出勤" && infoList[e].status == "请假") {
                            // 存储未出勤学生
                            that.data.unattended.push(infoList[e].studentInfo.name)
                        }
                        // 存储所有学生的名字
                        that.data.className.push(infoList[e].studentInfo.name)
                    })
                    
                    // console.log(that.data.isAttended);
                    // console.log(that.data.className);
                    
                    // 拿到该对象的所有值
                    // console.log(Object.values(infoList));
                    that.setData({
                        infoList: that.data.infoList,
                        className: that.data.className,
                        isAttended: that.data.isAttended,
                        unattended: that.data.unattended,
                        leaveName: that.data.leaveName
                    })
                },
                fail(err) {
                    console.log(err);
                }
            })
        },
    }
})
