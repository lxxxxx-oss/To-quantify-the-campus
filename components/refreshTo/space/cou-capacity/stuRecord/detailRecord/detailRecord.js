const {requestTwo} = require("../../../../../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 学生信息列表
        infoList: [],
        // 学生姓名
        className: [],
        // 存储图片
        imgList: [],
        grade: Math.ceil(Math.random()*10),
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/G1ZzPMHc2vUb1k1A5NqBTlHOLnBealCjme3Libj4OIoRKTQVNjzgBBk1aTdLF26icyI52YZdYk9R1GfRLC085Hvw/132'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this
        // console.log(options.category);
        wx.setNavigationBarTitle({
           title: options.category+"详细信息查看" //页面标题为路由参数
        })
        this.setData({
            category: options.category
        })
        this.getStuName()
         // 获取数据库的综测描述数据
         this.getMoralinfo().then((res) => {
            // console.log(res.data.studentInfo.honorList);
            // 判断数组是否为空
            if(JSON.stringify(res.data.studentInfo.honorList) !== '[]') {
                that.data.infoList = res.data.studentInfo.honorList
                // 格式化时间
                that.data.infoList.forEach(e => {
                    e.awardTime = Array.from(e.awardTime)
                    e.awardTime.splice(10)
                    // e.awardTime.splice(10, 1, "-")
                    e.awardTime = e.awardTime.join("")
                })
                this.setData({
                    infoList: this.data.infoList
                })
                // console.log(that.data.infoList[0].awardTime);
                // 在信息数据获取成功后，再调取图片数据
                // 获取数据库的图片数据
                this.getMoralImg().then((res) => {
                    let that = this
                    // console.log(res);
                    if(JSON.stringify(res.data) !== '{}') {
                        console.log(res.data.studentInfo.honorList);
                        res.data.studentInfo.honorList.forEach(e => {
                            e.fileList.forEach(img => {
                                that.data.imgList.push(img.path)
                            })
                            // console.log(that.data.imgList);
                        })
                    }   
                    // // 将图片数组里面的数据存入整个信息数组，方便页面渲染
                    that.data.infoList.forEach((e, index)=> {
                        e.img = []
                        e.img.push(that.data.imgList[index])
                        // console.log(e.img);
                    })
                    that.setData({
                        infoList: that.data.infoList,
                        imgList: that.data.imgList
                    })
                    // console.log(that.data.infoList);
                })
            }
        })
    },

    // 获取全部学生姓名
    getStuName() {  
        let that = this
        wx.request({
            url: 'https://alaskaboo.cn/attendance/309', 
            method: 'POST',
            header: 'application/json',
            data: {
                "week": JSON.stringify(4),
                "day": JSON.stringify(4),
                "attend": JSON.stringify(1)
            },
            success(res) {
               // console.log(res.data.data.data);
               let infoList = res.data.data.data
               // 拿到该对象的所有键
               let keys = Object.keys(infoList)
               keys.forEach(e => {
                    // 存储所有学生的名字
                    that.data.className.push(infoList[e].studentInfo.name)
                })
                that.setData({
                    className: that.data.className
                })
                // console.log(that.data.infoList);
            },
            fail(err) {
                console.log(err);
            }
        })
    },

    // 获取学生获奖信息
    // 从数据库里拿到描述数据
    getMoralinfo() {
        return requestTwo({
            url: '/api/honor/student/3',
            methods: "GET",
            success(res) {
                console.log(res);
            },
            fail(err) {
                console.log(err);
            }
        })
    },
    // 从数据库里拿到图片数据
    getMoralImg() {
        return requestTwo({
            url: '/api/honor/student/3',
            methods: "GET",
            success(res) {
                console.log(res);
            },
            fail(err) {
                console.log(err);
            }
        })
    }
})