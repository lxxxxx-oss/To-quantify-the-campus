const {requestTwo} = require("../../../../../../utils/request")
Component({
    // 组件使用全局样式
    options: {
        addGlobalClass: true
    },
    
    lifetimes: {
        attached() {
            var that = this
            // 获取缓存中用户填入的信息
            wx.getStorage({
                key: 'infoList',
                // 将缓存中的数据存储到页面数据中
                success(res) {
                    that.setData({
                        infoList: res.data
                    })
                },
            })
            // 获取用户头像
            wx.getStorage({
                key: 'userInfo',
                success(res) {
                    that.setData({
                        userInfo: res.data
                    })
                },
            })

            // 获取数据库的综测数据
            this.getMoral()
        }
    },
    

    /**
     * 组件的初始数据
     */
    data: {
        infoList: "",
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

        // 计算综测总分
        refresh() {
            // component.attached()
            // 计算综测总分
            let count1 = 0
            this.data.infoList.forEach(e => {
                let count2 = parseInt(e.marks)
                count1 += count2
            })
            console.log(count1);
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
            // console.log(currentInfo);
            // 对传递的对象数据进行转换（转换为json格式的数据）
            var data = JSON.stringify(currentInfo);
            wx.navigateTo({
              url: '/components/refreshTo/index/stu-capacity/uploadAwards/uploadAwards?currentInfo='+data+'&index='+index,
            })
            
        },
        // 从数据库里拿到数据
        getMoral() {
            return requestTwo({
                url: '/api/honor/student/3',
                methods: "GET",
                success(res) {
                    console.log(res);
                },
                fail(err) {
                    console.log(err);
                }
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
})
