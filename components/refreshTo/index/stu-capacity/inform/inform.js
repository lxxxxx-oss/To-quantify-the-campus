const {getInfo} = require("../../cou-capacity/inform/getInfo")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 通知列表的数据
        publishList: "",
        // 单独存储图片数据、
        imgList: [],
        // 几种活动类型
        allTag: ["学校通知", "活动通知", "比赛通知", "考试通知"],
        publishTag: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        // 从数据库获取数据
        getInfo().then((res) => {
            console.log(res.data.infoList.records);
            // 将数据库里的图片遍历出来
            res.data.infoList.records.forEach(e => {
                that.data.imgList.push(e.imgSrc)
                that.data.publishTag.push(e.publishTag)
            })
            // 获取活动类型
            console.log(that.data.publishTag);
            this.setData({
                publishList: res.data.infoList.records,
                imgList: that.data.imgList,
                publishTag: that.data.publishTag
            })
        })
    },

    // 跳转到发布通知的操作页
    publishInform() {
        wx.navigateTo({
          url: '/components/refreshTo/index/cou-capacity/publish/publish',
        })
    },

    // 跳转到通知详情页
    publishDetail(e) {
        // 拿到点击的那条通知的索引
        let index = e.currentTarget.dataset.index
        wx.navigateTo({
          url: '/components/refreshTo/index/stu-capacity/publishDetail/publishDetail?index='+index,
        })
    }
})