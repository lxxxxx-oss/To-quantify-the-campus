// components/refreshTo/space/com-capacity/file/file.js
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
        // 控制点击选中效果,默认选中上传文件
        "selectedCheck": false,
        "selectedUpload": true,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        upload() {
            // 点击选中则切换样式
            this.setData({
                selectedUpload: !this.data.selectedUpload,
                selectedCheck: false
            })
        },
        check() {
            this.setData({
                selectedCheck: !this.data.selectedCheck,
                selectedUpload: false
            })
        }

    }
})
