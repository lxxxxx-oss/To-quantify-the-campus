// components/gather/gather.js
Page({

    data: {
        // 显示和隐藏
        isShow: false
    },

    onLoad(options) {

    },
     

    // 点击切换功能选项卡
    // 打卡功能
    punchItem() {
        // 点击则显示该选项卡的内容
        
        this.setData({
            isShow:false
        })
    },
    // 文件收集功能
    fileItem() {
        this.setData({
            isShow: true
        })
    }
})