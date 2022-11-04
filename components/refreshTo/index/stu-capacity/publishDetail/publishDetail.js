const {getInfo} = require("../../cou-capacity/inform/getInfo")
Page({

    data: {
        // 通知列表
        publishList: "",
        // 单独存储图片数据、
        imgList: [],
        // 几种活动类型
        allTag: ["学校通知", "活动通知", "比赛通知", "考试通知"],
        publishTag: [],
        // 所点击的通知的索引
        index: "",
        // 当前的通知详情
        currentPublish: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取用户头像
        wx.getStorage({
            key: 'userInfo',
            success(res) {
                that.setData({
                    userInfo: res.data
                })
            },
        })
        let that = this
        that.data.index = options.index
        // 从数据库获取数据
        getInfo().then((res) => {
            // console.log(res.data.infoList.records);
            // 将数据库里的图片遍历出来
            res.data.infoList.records.forEach(e => {
                that.data.imgList.push(e.imgSrc)
                // 获取活动类型
                that.data.publishTag.push(that.data.allTag[e.publishTag])
            })
            
            console.log(that.data.imgList);
            this.setData({
                publishList: res.data.infoList.records,
                imgList: that.data.imgList,
                publishTag: that.data.publishTag
            })
        })
        this.setData({
            index: this.data.index
        })
    },

    // 预览图片 
    viewImg(e) {
        wx.previewImage({
            urls: this.data.publishList[this.data.index].imgSrc,
            current: e.currentTarget.dataset.index
        });
        // console.log(e.currentTarget.dataset.index);
    },

})