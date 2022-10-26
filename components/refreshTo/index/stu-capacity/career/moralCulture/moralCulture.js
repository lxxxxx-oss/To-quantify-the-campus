
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 上传所得奖项
        uploadAwards() {
            wx.navigateTo({
              url: '/components/refreshTo/index/stu-capacity/uploadAwards/uploadAwards',
            })
        }
    }
})
