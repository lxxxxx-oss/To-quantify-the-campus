// components/refreshTo/space/cou-capacity/stuGool/detailInfo/detailInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 违规类型
        category: "",
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.category);
        wx.setNavigationBarTitle({
            title: options.category+"详细信息查看" //页面标题为路由参数
        })
        this.setData({
            category: options.category
        })
    }
})