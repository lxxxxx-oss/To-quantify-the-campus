// components/stuAppoint/stuAppoint.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        ]
    },

    /**
     八生命周期函数--监听页面加载
     */
    onLoad(options) {
    },

    // 跳转到班委任命详情页面
    detailAppoint(e) {
        //   存储点击的索引值
        let index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: './detailAppoint/detailAppoint?className='+this.data.className[index].name,
        })
    }
})
