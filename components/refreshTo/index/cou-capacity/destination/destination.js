// components/destination/destination.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: false,
        major: [
            {
                "classify": "工学",
                // "sub": "电气工程及其自动化\n人工智能\n自动化\n信息安全\n轨道交通电气与控制交通"
                "sub": "电气工程及其自动化"
            },
            {
                "classify": "管理学",
                // "sub": "供应链管理\n工商管理\n财务管理\n工程管理\n大数据管理与应用"
                "sub": "供应链管理"
            },
            {
                "classify": "艺术性",
                // "sub": "动画\n广播电视编导\n数字媒体技术\n戏剧影视文学"
                "sub": "动画"
            },
            {
                "classify": "文学",
                // "sub": "汉语\n英语\n德语"
                "sub": "汉语"
            },
            {
                "classify": "经济学",
                // "sub": "数字经济\n互联网金融"
                "sub": "数字经济"
            }

        ],
        changeMajor:"",
        majorNew: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

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

    // 跳转
    spread() {
        // wx.navigateTo({
        //   url: '../major/major',
        // })
        // 点击展示专业列表
        this.setData({
            isShow: !this.data.isShow
        })
        // console.log(this.data.isShow);
    },
    // 点击选择专业
    changeMajor(e) {
        // console.log(e.target.dataset.text);
        // 存储页面返回的文本内容
        let major = e.target.dataset.text
        // 但有多个文本时，进行切割
        let majorNew = major.split("\n")
        // console.log(majorNew);
        this.setData({
            changeMajor: majorNew
        })
        // console.log(this.data.changeMajor);
    }
})