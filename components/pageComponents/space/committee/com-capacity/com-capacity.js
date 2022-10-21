// components/pageComponents/space/committee/com-capacity.js
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
        // 跳转页面
        gotoAttendance() {
            wx.navigateTo({
              url: '/components/refreshTo/space/com-capacity/attendance/attendance',
            })
        },
        gotoFile() {
            wx.navigateTo({
              url: '/components/refreshTo/space/com-capacity/file/file',
            })
        }
    }
})
