// components/refreshTo/index/stu-capacity/publishDetail/publishDetail.js
Page({

    data: {
        // 通知列表
        publishList: "",
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
        // 获取缓存中通知的信息
        wx.getStorage({
            key: 'publishList',
            // 将缓存中的数据存储到页面数据中
            success(res) {
                that.setData({
                    publishList: res.data,
                    index: that.data.index
                })
            },
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