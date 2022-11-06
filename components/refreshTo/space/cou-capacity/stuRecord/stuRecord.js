// components/stuRecord/stuRecord.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        scrollLeft:0,
        category: ['综测', '获奖'],
        className: [
            {
                "name": "软工一班"
            },
            {
                "name": "软工二班"
            },
            {
                "name": "软工三班"
            },
            {
                "name": "软工四班"
            },
            {
                "name": "软工五班"
            },
            {
                "name": "软工六班"
            },
            {
                "name": "软工七班"
            },
            {
                "name": "软工八班"
            },
            {
                "name": "软工九班"
            },
            {
                "name": "软工十班"
            }
        ],
        // 存储获奖信息
        infoList: "",
        userInfo: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        // 获取缓存中用户填入的信息
        wx.getStorage({
            key: 'infoList',
            // 将缓存中的数据存储到页面数据中
            success(res) {
                that.setData({
                    infoList: res.data
                })
            },
        })

        // 用户信息
        wx.getStorage(({
            key: 'userInfo',
            success(res) {
                that.setData({
                    userInfo: res.data.avatarUrl
                })
                // console.log(res);
            }
        }))
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        // console.log("下拉刷新");
        // wx.showNavigationBarLoading() //在标题栏中显示加载
    },

    // 切换类别
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
    },
})