// components/inform/inform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 通知列表的数据
        publishList: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        // 获取缓存中通知的信息
        wx.getStorage({
            key: 'publishList',
            // 将缓存中的数据存储到页面数据中
            success(res) {
                that.setData({
                    publishList: res.data
                })
            },
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