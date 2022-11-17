// 引入腾讯地图SDK
let QQMapWX= require("../../../../../utils/qqmap-wx-jssdk");
var qqMapSdk;
// 引入工具类
let util = require("../../../../../utils/util")
const app = getApp()
Component({
    data: {
        // 地图上的标记点
        markers: [{
            // marker id需要 number类型,但是这里的数据返回的是字符串，所以需要强制转换一下
            id: parseInt(1),
            width: "80rpx",
            height: "100rpx",
            latitude: "29.998516667194192",
            longitude: "106.23854474834057",
        }],
        // 用户信息
        userInfo:"",
        // 是否打卡
        status: false,
        // 日期信息
        now_time: '',//当前时间
        nowDate:'',//当前年月日
        now_time: '',//当前时间
        // 地址信息
        name: '',
        current_address: '',
        latitude: '',
        longitude: ''
    },
    lifetimes: {
        attached: function () {
            //异步获取缓存,如果该用户信息已存在，则直接显示该用户信息，避免重复弹窗
            wx.getStorage({
                key:"userInfo",//本地缓存中指定的 key
                success:(res)=>{ 
                console.log('获取缓存成功',res.data)      
                    this.setData({
                        userInfo:res.data, //将得到的缓存给key             
                    }) 
                    fail:(err)=>{
                        console.log("获取失败",err);
                    }                 
                }
            }),
            // 获取日期事件信息
            this.getCurrentTime();
            this.setData({
                now_time: this.getTime(),
                nowDate: util.formatTime(new Date()),
            })
        },
    },

    methods: {
        // 选择地点，返回具体经纬度
        // chooseLocation比getLocation获取的经纬度精度要高
        chooseLocation() {
            var _this = this;
            wx.chooseLocation({
                // 默认打开地图的位置是在学校图书馆
                latitude:"29.998516667194192",
                longitude:"106.23854474834057",
                success: function (res) {
                    var name = res.name
                    var address = res.address
                    var latitude = res.latitude
                    var longitude = res.longitude
                _this.setData({
                    name: name,
                    current_address: address,
                    latitude: latitude,
                    longitude: longitude
                })
                },
            })
        },
        // 获取当前日期
        getCurrentTime: function () {
            var time = setInterval(() => {
                this.setData({
                    now_time: this.getTime()
                })
            }, 1000)
        },
        // 获取具体时间
        getTime() {
            let dateTime = '';
            let hh = new Date().getHours()
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :
                new Date().getMinutes()
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() :
                new Date().getSeconds()
            dateTime = hh + ':' + mf + ':' + ss;
            return dateTime;
        },

        // 获取当前地址
        getLocation() {
            var that = this
            // 实例化腾讯地图API核心类
            const qqMapSdk = new QQMapWX({
                key: 'Y4NBZ-P44LK-VRPJL-A44UL-D6UUQ-MPFKQ'
            })
            // 获取当前位置
            wx.getLocation({
                type: 'gcj02',
                success: function(res) {
                    that.latitude = res.latitude
                    that.longitude = res.longitude
                    // 腾讯地图API逆地址解析
                    qqMapSdk.reverseGeocoder({
                        location: {
                            latitude: res.latitude,
                            longitude: res.longitude
                        },
                    success: function(res) {
                        let address = res.result.address + res.result.formatted_addresses.recommend;
                        // that.getSignRecord();
                        that.setData({
                            current_address:address,
                            latlng:[res.result.location.lat,res.result.location.lng]
                        })
                    },
                    fail: function(res) {
                        wx.showToast({
                            title: '获取定位失败，请打开手机定位，重新进入！',
                            icon: 'none'
                        });
                    }
                    })
                },
            })
        },
        // 打卡按钮
        punch() {
            this.getLocation()
            var that = this;
            if (!that.data.current_address) {
                return wx.showToast({
                    title: '未获取当前定位',
                    icon: 'error'
                })
            }
            wx.vibrateLong();//手机震动提示
            that.setData({
                status: true, //已打卡
            })
            wx.showToast({
                title: '打卡成功',
                icon: 'none'
            })
        },

        // 刷新位置
        refreshAdd() {
            this.getLocation()
        }
            
    }
})