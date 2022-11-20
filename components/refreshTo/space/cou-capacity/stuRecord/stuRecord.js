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
                "name": "软工十班"
            },
            {
                "name": "软工九班"
            },
            {
                "name": "软工八班"
            },
            {
                "name": "软工七班"
            },
            {
                "name": "软工六班"
            },
            {
                "name": "软工五班"
            },
            {
                "name": "软工四班"
            },
            {
                "name": "软工三班"
            },
            {
                "name": "软工二班"
            },
            {
                "name": "软工一班"
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

    // 切换类别
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
    },

    // 跳转页面
    changeDetail(e) {
        var that = this
        wx.navigateTo({
          url: './detailRecord/detailRecord?category='+that.data.category[that.data.TabCur],
        })
    }
})