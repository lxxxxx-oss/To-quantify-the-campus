// 获取通知消息
const {getInfo} = require("../../components/refreshTo/index/cou-capacity/inform/getInfo")
// 和风天气申请的Key
const APIKEY = "804506a95ce74d1b870cbf7b0e5da6a9";
Page({

    // 在最开始将所有身份的功能卡全部隐藏
    data: {
        swiperList: [{
            id: 0,
            type: 'image',
            url: '/assets/img/index/swiper.jpg'
          }, {
            id: 1,
              type: 'image',
              url: '/assets/img/index/swiper.jpg',
          }
        ],
        // 存储通知栏里面的内容
        mainText: "",
        // 用来标识通知是否被阅读
        flag: false,
        // 存储天气信息
        now: "",
        // 根据当天天气状况决定提示消息
        prompt: [
            {
                "tips": "今天天气很好出去走走吧"
            },
            {
                "tips": "出门前记得带伞哦"
            },
            {
                "tips": "今天风很大，记得收衣服哦"
            },
            {
                "tips": "天气转冷注意保暖哦"
            },
            {
                "tips": "今天可以晒晒被子哦"
            }
        ],
        currentPrompt: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        //#region 
        //根据登录时携带的ID信息,选择要展示的功能选项卡
       const app =getApp();
       // 普通学生
       if(app.globalData.isStu){
           this.setData({
               isStu: true
           })
       };
       // 宿管
       if(app.globalData.isHou){
            this.setData({
                isHou: true
            })
        };
        // 辅导员
        if(app.globalData.isCou){
            this.setData({
                isCou: true
            })
        };
        // 班委
        if(app.globalData.isCom){
            this.setData({
                isCom: true
            })
        }
        // console.log(app.globalData);
        //#endregion
        // 拿到通知的主要内容
        // 从数据库获取数据
        getInfo().then((res) => {
            // console.log(res.data.infoList.records);
            // 拿到通知的主要内容
            // console.log(res.data.infoList.records[0].textareaValue);
            // 内容长度
            // console.log(res.data.infoList.records[1].textareaValue.length);
            // 将内容切割成数组 
            let splited = res.data.infoList.records[1].textareaValue.split("",res.data.infoList.records[1].textareaValue.length)
            // 过滤掉数组中的空格和换行
            let newArr = splited.filter((item) => {
                return item != " " && item != "\n"
            })
            // 将数组转换成字符串，不用分隔符
            let strText = newArr.join("")
            // console.log(strText);
            that.setData({
                mainText: strText
            })
        })

        // 调用天气预报接口
        this.getLocation()
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
        //添加选中效果,避免自定义tabbar闪烁
         if (typeof this.getTabBar === 'function' && this.getTabBar()) {
             this.getTabBar().setData({
                selected: 0 //这个数是，tabBar从左到右的下标，从0开始
             })
        }
    },

    // 点击查看详细通知内容
    detailText() {
        var that = this
        wx.showModal({
            title: '全部内容',
            content: this.data.mainText,
            success (res) {
                if (res.confirm) {
                    // 第一次点击收到的时候展示提示框
                    if(!that.data.flag) {
                        wx.showToast({
                            title: '你已接收该通知',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                    // 点击确定，收到通知
                    that.setData({
                        flag: true
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //#region 
    // 天气预报的展示
    //选择定位
    selectLocation() {
    var that = this
    wx.chooseLocation({
        success(res) {
        //console.log(res)
        that.setData({
            location: res.longitude + "," + res.latitude
        })
        that.getWeather()
        that.getCityByLoaction()
        }
        , fail() {
        wx.getLocation({
            type: 'gcj02',
            fail() {
            wx.showModal({
                title: '获取地图位置失败',
                content: '为了给您提供准确的天气预报服务,请在设置中授权【位置信息】',
                success(mRes) {
                if (mRes.confirm) {
                    wx.openSetting({
                    success: function (data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                        that.selectLocation()
                        } else {
                        wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                            duration: 1000
                        })
                        }
                    }, fail(err) {
                        console.log(err)
                        wx.showToast({
                        title: '唤起设置页失败，请手动打开',
                        icon: 'none',
                        duration: 1000
                        })
                    }
                    })
                }
                }
            })
            }
        })

        }
    })
    },
    /**
     * 获取定位
     */
    getLocation() {
    var that = this
    wx.getLocation({
        type: 'gcj02',
        success(res) {
        that.setData({
            location: res.longitude + "," + res.latitude
        })
        that.getWeather()
        that.getCityByLoaction()
        }, fail(err) {
        wx.showModal({
            title: '获取定位信息失败',
            content: '为了给您提供准确的天气预报服务,请在设置中授权【位置信息】',
            success(mRes) {
            if (mRes.confirm) {
                wx.openSetting({
                success: function (data) {
                    if (data.authSetting["scope.userLocation"] === true) {
                    wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                    })
                    that.getLocation()
                    } else {
                    wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                    })
                    that.setData({
                        location: "116.41,39.92"
                    })
                    that.getWeather()
                    that.getCityByLoaction()
                    }
                }, fail(err) {
                    console.log(err)
                    wx.showToast({
                    title: '唤起设置页失败，请手动打开',
                    icon: 'none',
                    duration: 1000
                    })
                    that.setData({
                    location: "116.41,39.92"
                    })
                    that.getWeather()
                    that.getCityByLoaction()
                }
                })
            } else if (mRes.cancel) {
                that.setData({
                location: "116.41,39.92"
                })
                that.getWeather()
                that.getCityByLoaction()
            }
            }
        })
        }
    })
    },
    /**
     * 根据坐标获取城市信息
     */
    getCityByLoaction() {
    var that = this
    wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup?key=' + APIKEY + "&location=" + that.data.location,
        success(result) {
        var res = result.data
        if (res.code == "200") {
            var data = res.location[0]
            that.setData({
            City: data.adm2,
            County: data.name
            })
        } else {
            wx.showToast({
            title: '获取城市信息失败',
            icon: 'none'
            })
        }

        }
    })
    },
    //#endregion
    /**
     * 获取天气
     */
    getWeather() {
        var that = this
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://devapi.qweather.com/v7/weather/now?key=' + APIKEY + "&location=" + that.data.location,
            success(result) {
            var res = result.data
            //console.log(res)
            that.setData({
                now: res.now
            })
            // console.log(that.data.now);
            // console.log(that.data.now.temp);
            // 根据天气状况，决定提醒信息
            if(that.data.now.temp <= 20) {
                that.setData({
                    currentPrompt: that.data.prompt[3].tips
                })
            }else if(that.data.now.precip > 0.0) {
                that.setData({
                    currentPrompt: that.data.prompt[1].tips
                })
            }else if(that.data.now.text == '晴天') {
                that.setData({
                    currentPrompt: that.data.prompt[4].tips
                })
            }else if(that.data.now.windScale >= 5) {
                that.setData({
                    currentPrompt: that.data.prompt[2].tips
                })
            }else if(that.data.now.precip == 0.0 && that.data.now.temp > 20) {
                that.setData({
                    currentPrompt: that.data.prompt[0].tips
                })
            }
        }
    })
    wx.request({
        url: 'https://devapi.qweather.com/v7/weather/24h?key=' + APIKEY + "&location=" + that.data.location,
        success(result) {
        var res = result.data
        //console.log(res)
        res.hourly.forEach(function (item) {
            item.time = that.formatTime(new Date(item.fxTime)).hourly
        })
        that.setData({
            hourly: res.hourly
        })
        }
    })
    wx.request({
        url: 'https://devapi.qweather.com/v7/weather/7d?key=' + APIKEY + "&location=" + that.data.location,
        success(result) {
        var res = result.data
        //console.log(res)
        res.daily.forEach(function (item) {
            item.date = that.formatTime(new Date(item.fxDate)).daily
            item.dateToString = that.formatTime(new Date(item.fxDate)).dailyToString
        })
        that.setData({
            daily: res.daily
        })
        wx.hideLoading()
        }
    })
    },
    // 格式时间
    formatTime(date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
        const isToday = date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
        return {
            hourly: [hour, minute].map(this.formatNumber).join(":"),
            daily: [month, day].map(this.formatNumber).join("-"),
            dailyToString: isToday ? "今天" : weekArray[date.getDay()]
        }
    },
    // 补零
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },

    // 跳转到未来几天的天气页面
    detailWeather() {
        wx.navigateTo({
          url: '/components/refreshTo/index/common/weather/weather',
        })
    }

})