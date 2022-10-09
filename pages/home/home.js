// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        // 控制是否展开详细信息，默认不展开
        isShowInfo: false,
        isShowSet: false,
        infoList: [
            {
                "所属学院": "大数据与计算机科学学院",
                "真实姓名": "黎鑫",
                "所属专业": "软件工程",
                "学号/工号": "2020211932",
                "辅 导 员": "彭崇清"
            }
        ],
        name: "黎鑫",
        number: "2020211932"
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
             selected: 2 //这个数是，tabBar从左到右的下标，从0开始
             })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },
    
    onLoad(){
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
        })
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    // 设置点击展示详细信息
    unfoldInfo() {
        let data = this.data
        // 展示数据
        this.setData({
            isShowInfo: !data.isShowInfo,
            info: data.infoList[0],
            name: data.name,
            number: data.number
        })
    },

    // 点击展开更多设置选项
    unfoldSetting() {
        let data = this.data
        this.setData({
            isShowSet: !data.isShowSet
        })
    },
    // 页面跳转
    gotoChange() {
        wx.navigateTo({
          url: '/components/refreshTo/my/stu-capacity/setting/change/change',
        })
    },
    gotoService() {
        wx.navigateTo({
          url: '/components/refreshTo/my/stu-capacity/setting/customerService/customerService',
        })
    }
})