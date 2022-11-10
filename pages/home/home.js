const {requestTwo} = require("../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用户ID
        userId: "",
        // 用户信息
        userInfo: {},
        // 控制是否展开详细信息，默认不展开
        isShowInfo: false,
        isShowSet: false,
        infoList: [
            {
                "所属学院": "大数据与计算机科学学院",
                // "真实姓名": "黎鑫",
                "所属专业": "软件工程",
                "学号/工号": "2020211932",
                "辅导员": "彭崇清",
                "寝室号": "B2-406"
            }
        ],
        name: "黎鑫",
        number: "2020211932"
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        //添加选中效果,避免自定义tabbar闪烁
         if (typeof this.getTabBar === 'function' && this.getTabBar()) {
             this.getTabBar().setData({
             selected: 2 //这个数是，tabBar从左到右的下标，从0开始
             })
        }
    },

    onLoad(){
        var that = this
        //异步获取缓存,如果该用户信息已存在，则直接显示该用户信息，避免重复弹窗
        wx.getStorage({
            key:"userInfo",//本地缓存中指定的 key
            success:(res)=>{ 
            // console.log('获取缓存成功',res.data)      
                that.setData({
                    userInfo:res.data, //将得到的缓存给key             
                }) 
                fail:(err)=>{
                    console.log("获取失败",err);
                }                 
            },
        })
        wx.getStorage({
            // 从缓存中读取用户Id
            key: 'userId',
            success(res) {
                // console.log(res);
                that.setData({
                    userId: res.data
                })
                // console.log(that.data.userId);
                 // 根据用户登录携带的ID来获取用户信息
                that.getUesrInfo()
            }
        })

    },

    // 根据登录时存储的ID展示用户的信息
    getUesrInfo() {
        var that = this
        console.log(this.data.userId);
        requestTwo({
            url: `/api/role/${that.data.userId}`,
            // "https://xxxx.xxxx.com?aaa="+"bbb"
            methods: 'GET',
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    },

    // 设置点击展示详细信息
    unfoldInfo() {
        let data = this.data
        // 展示数据
        // 一个展开另一个就收回
        this.setData({
            isShowInfo: !data.isShowInfo,
            info: data.infoList[0],
            name: data.name,
            number: data.number,
            isShowSet: false
        })
    },

    // 点击展开更多设置选项
    unfoldSetting() {
        let data = this.data
        // 一个展开另一个就收回
        this.setData({
            isShowSet: !data.isShowSet,
            isShowInfo: false,
        })
    },
    // 页面跳转
    gotoChange() {
        wx.navigateTo({
          url: '/components/refreshTo/my/setting/change/change',
        })
    },
    gotoService() {
        wx.navigateTo({
          url: '/components/refreshTo/my/setting/customerService/customerService',
        })
    },
    // 关于我们
    aboutUs() {
        wx.navigateTo({
          url: '/components/refreshTo/my/setting/aboutUs/aboutUs',
        })
    },

    // 清除缓存
    clearStorage() {
        wx.showModal({
          title: '谨慎选择',
          content: '确定要清除缓存吗？',
          success (res) {
            if (res.confirm) {
                wx.clearStorage()
                wx.showToast({
                  title: '清除缓存成功',
                  icon: 'success',
                  duration: 3000
                })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
      })
    }
})