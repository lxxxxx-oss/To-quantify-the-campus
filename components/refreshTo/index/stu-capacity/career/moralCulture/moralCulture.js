const {requestTwo} = require("../../../../../../utils/request")
Component({
    // 组件使用全局样式
    options: {
        addGlobalClass: true
    },
    lifetimes: {
        attached() {
            var that = this
            // 获取用户头像
            wx.getStorage({
                key: 'userInfo',
                success(res) {
                    that.setData({
                        userInfo: res.data
                    })
                },
            })
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
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 存储描述信息
        infoList: "",
        // 存储图片
        imgList: [],
        userInfo: "",
        // 总计综测总分
        total: "0"
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 上传所得奖项
        uploadAwards() {
            wx.navigateTo({
              url: '/components/refreshTo/index/stu-capacity/uploadAwards/uploadAwards',
            })
        },

        // 计算综测总分，刷新页面
        refresh() {
            // component.attached()
            // 计算综测总分
            let count1 = 0
            this.data.infoList.forEach(e => {
                let count2 = parseInt(e.awardScore)
                // console.log(e.awardScore);
                count1 += count2
            })
            // 刷新数据
            this.setData({
                infoList: this.data.infoList,
                total: count1
            })
        },

        // 对信息进行修改
        viewInfo(e) {
            // 获取点击的对象索引
            let index = e.currentTarget.dataset.index;
            let currentInfo = this.data.infoList[index]
            console.log(currentInfo);
            // 对传递的对象数据进行转换（转换为json格式的数据）
            var data = JSON.stringify(currentInfo);
            wx.navigateTo({
                url: '/components/refreshTo/index/stu-capacity/amendMoral/amendMoral?currentInfo='+data+'&index='+index,
            })
            
        },
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
    }
})
