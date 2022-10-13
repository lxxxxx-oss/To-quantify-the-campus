// pages/log/log.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sel_pass: false,
        sel_number: false,
        sel_code: false,
        number: '',
        pass: '',
        show: 0,
        userId: ""
    },
    
    //获取焦点
    bindfocus (e) {
        let type = e.currentTarget.dataset.type;
        let val = e.detail.value;
        this.setData({
            sel_number: type == 1 ? true : false,
            sel_pass: type == 2 ? true : false,
            show: val != '' ? type : 0,
        })
    },
    //失去焦点
    bindblur () {
        let that = this;
        that.setData({
            sel_pass: false,
            sel_number: false,
            show: 0
        })
    },
    // 获取用户输入值
    bindPhone(e) {
        // console.log(e.detail);
        this.setData({
            number: e.detail.value
        })
    },
    // 登录按钮
    login() {
        let inputNum = getCurrentPages()[0].data.number
        const app =getApp();
        // this.setData({
        //     userId: getCurrentPages()[0].data.number,
        // })

        // if(app.globalData.userId === 0) {
        //     this.setData({
        //         userId: 0
        //     })
        // }else if(app.globalData.userId === 1) {
        //     this.setData({
        //         userId: 1
        //     })
        // }else if(app.globalData.userId === 2) {
        //     this.setData({
        //         userId: 2
        //     })
        // }else if(app.globalData.userId === 3) {
        //     this.setData({
        //         userId: 3
        //     })
        // }
        // 直接访问当前页面数据并且可以直接对其赋值进行修改
        // getCurrentPages()[0].data.userId = 3
        // console.log(getCurrentPages()[0].data.userId);

        // 后端传来当前用户的权限ID，则进行判断
        if(inputNum == 0) {
            this.stuLoginAll();
        } else if(inputNum == 1) {
            this.comLoginAll();
        } else if(inputNum == 2) {
            this.couLoginAll()
        }else{
            this.houLoginAll()
        }

        // 请求用户权限
        // 获取用户头像,当用户数据已经在缓存中时，不再请求权限，直接展示
        if(!app.globalData.hasUserInfo) {
            wx.getUserProfile({
                desc: '获取用户头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    this.setData({
                        userInfo: res.userInfo,
                    })
                    app.globalData.hasUserInfo = true
                    // 将获取的用户数据存入缓存，避免用户再次登入小程序时重复弹窗  
                    wx.setStorage({
                        key: 'userInfo',
                        data: res.userInfo,
                    })
                }
            })
        }
        console.log(app.globalData.hasUserInfo);
    },

    // 除宿管外其他用户登录时展示的tabbar
    LoginTab() {
        const app =getApp();
        app.globalData.list = [
            {
                "pagePath": "pages/index/index",
                "text": "首页",
                "iconPath": "/assets/img/tabBar/index.png",
                "selectedIconPath": "/assets/img/tabBar/index-active.png"
            },
            {
                "pagePath": "pages/space/space",
                "text": "空间",
                "iconPath": "/assets/img/tabBar/space.png",
                "selectedIconPath": "/assets/img/tabBar/space-active.png",
                "isSpecial": true
            },
            {
                "pagePath": "pages/home/home",
                "text": "我的",
                "iconPath": "/assets/img/tabBar/my.png",
                "selectedIconPath": "/assets/img/tabBar/my-active.png"
            }
        ]
        wx.switchTab({
         url: '/pages/index/index',
        })
       },
    //宿管登录时展示的tabbar    
    houLoginTab() {
    const app =getApp();
    app.globalData.list = [
        {
            "pagePath": "pages/index/index",
            "text": "首页",
            "iconPath": "/assets/img/tabBar/index.png",
            "selectedIconPath": "/assets/img/tabBar/index-active.png"
        },
        {
            "pagePath": "pages/print/print",
            "text": "打印",
            "iconPath": "/assets/img/tabBar/print.png",
            "selectedIconPath": "/assets/img/tabBar/print-active.png",
            "isSpecial": true
        },
        {
            "pagePath": "pages/home/home",
            "text": "我的",
            "iconPath": "/assets/img/tabBar/my.png",
            "selectedIconPath": "/assets/img/tabBar/my-active.png"
        }
    ]
    wx.switchTab({
        url: '/pages/index/index',
    })
},

    // 不同用户展示不同页面
    // 学生登录时的页面
    // 可以在一个按钮上绑定多个点击函数
    stuLoginAll() {
        this.stuLogin()
        this.LoginTab()
    },
    stuLogin() {
        const app = getApp();
        app.globalData.isStu = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    
    //班委登录时的页面
    comLoginAll() {
        this.comLogin()
        this.LoginTab()
    },
    comLogin() {
        const app = getApp();
        app.globalData.isCom = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
        console.log("isCom:" + app.globalData.isCom);
    },

    // 辅导员登录时的页面
    couLoginAll() {
        this.couLogin()
        this.LoginTab()
    },
    couLogin() {
        const app = getApp();
        app.globalData.isCou = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    // 宿管登录时的页面
    houLoginAll() {
        this.houLogin()
        this.houLoginTab()
    },
    houLogin() {
        const app = getApp();
        app.globalData.isHou = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
})