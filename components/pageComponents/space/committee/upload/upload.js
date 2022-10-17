var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        // 文件上传地址
        uploadUrl: "",
        // 上传图片地址
        // imgSrc: app.globalData.imgSrc
    },
    /**
     * 组件的方法列表
     */
    methods: {
        userInput(e) {
            let html = e.detail.html
            let text = e.detail.text
            console.log(text);
            this.triggerEvent("input", {
                text: text
            }, {})
            console.log(text);
        }
    }
})
