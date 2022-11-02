// pages/log/log.js
const {requestTwo} = require("../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sel_pass: false,
        sel_number: false,
        // 账号
        number: '',
        // 密码
        pass: '',
        show: 0,
        // 登录凭证
        userCode: "",
        // 不同身份类型
        userType: ""
    },
    // #region
    onLoad() {
      var that = this
        // 获取登录凭证code
        wx.login({
            success(res) {
                that.setData({
                    userCode: res.code
                })
            }
        })
        // console.log(this.data.userCode);

    },
    // #region 
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
    bindNumber(e) {
        // console.log(e.detail);
        this.setData({
            number: e.detail.value
        })
    },
    bindPass(e) {
      // console.log(e.detail);
      this.setData({
          pass: e.detail.value
      })
    },
    // #endregion
    // 登录按钮
    login() {
        const app =getApp();
        var that = this
        wx.request({
            url : "https://alaskaboo.cn/login",
            method: "POST",
            data: {
                username : that.data.number,
                password : that.data.pass,
                code: JSON.stringify(that.data.userCode)
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                console.log(res);
                let loginStatus = res.data.flag
                let userId = res.data.data.currentUser.id;
                // 将用户的id存入缓存，方便其他页面调用
                wx.setStorage({
                    key: 'userId',
                    data: userId
                })
                // 账号密码不能为空
                if(that.data.number == "" || that.data.pass == "" ) {
                    wx.showToast({
                        title: '账号或密码为空',
                        icon: 'error'
                    });
                // 判断登录状态
                }else if(loginStatus) {
                    that.setData({
                        // 获取登录用户的身份类型
                        userType: res.data.data.currentUser.userType
                    })
                    let inputNum = that.data.userType
                    console.log(loginStatus);
                    // 后端传来当前用户的类型ID，则展示不同页面
                    if(inputNum == 4) {
                        that.stuLoginAll();
                    } else if(inputNum == 5) {
                        that.comLoginAll();
                    } else if(inputNum == 2) {
                        that.couLoginAll()
                    }else{
                        that.houLoginAll()
                    }
                    // 请求用户权限
                    // 获取用户头像,当用户数据已经在缓存中时，不再请求权限，直接展示
                    if(!app.globalData.hasUserInfo) {
                        wx.getUserProfile({
                            desc: '获取用户头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                            success: (res) => {
                                that.setData({
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
                }else if(!loginStatus) {
                    wx.showToast({
                      title: '账号或密码错误',
                      icon: 'error'
                    })
                }
               
            },
            fail: function (err) {
                wx.showModal({
                    title: '提示',
                    content: err,
                })
            }
        })
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
        var that = this
        that.stuLogin()
        that.LoginTab()
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
        var that = this
        that.comLogin()
        that.LoginTab()
    },
    comLogin() {
        const app = getApp();
        app.globalData.isCom = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    // 辅导员登录时的页面
    couLoginAll() {
        var that = this
        that.couLogin()
        that.LoginTab()
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
        var that = this
        that.houLogin()
        that.houLoginTab()
    },
    houLogin() {
        const app = getApp();
        app.globalData.isHou = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    // #endregion
    userLogin() {
        // var that = this
        // console.log(that.data.number);
        // console.log(that.data.pass);
        // wx.request({
        //     url : "https://alaskaboo.cn/login",
        //     method: "POST",
        //     data: {
        //         username : that.data.number,
        //         password : that.data.pass,
        //         code: JSON.stringify(that.data.userCode)
        //     },
        //     header: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     success: function (res) {
        //         console.log(res);
        //         // 获取登录用户的身份类型
        //         // console.log(res.data.data.currentUser.userType);
        //         that.setData({
        //             userType: res.data.data.currentUser.userType
        //         })
        //         let inputNum = that.data.userType
        //         console.log(inputNum);
        //         // 后端传来当前用户的权限ID，则进行判断
        //         if(inputNum == 4) {
        //             that.stuLoginAll();
        //         } else if(inputNum == 5) {
        //             that.comLoginAll();
        //         } else if(inputNum == 2) {
        //             that.couLoginAll()
        //         }else{
        //             that.houLoginAll()
        //         }
        //     },
        //     fail: function (err) {
        //         wx.showModal({
        //             title: '提示',
        //             content: err,
        //         })
        //     }
        // })
    }
})